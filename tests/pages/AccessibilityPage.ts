import { Page } from '@playwright/test';

export interface AccessibilityResult {
    violations: Array<{
        id: string;
        impact: string;
        description: string;
        nodes: any[];
    }>;
}

export class AccessibilityPage {
    readonly page: Page;
    results: AccessibilityResult | null = null;

    constructor(page: Page) {
        this.page = page;
    }

    async runAxeAccessibilityCheck() {
        // Inject axe-core if not present
        await this.page.addScriptTag({
            url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.2/axe.min.js',
        });
        // Run axe
        this.results = await this.page.evaluate(async () => {
            // @ts-ignore
            return await window.axe.run();
        });
    }

    getViolations() {
        return this.results?.violations || [];
    }
}
