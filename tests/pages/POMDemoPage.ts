import { Page } from '@playwright/test';

export class POMDemoPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async gotoDemoPage() {
        await this.page.goto('https://www.zigwheels.com/newbikes');
    }

    async getBikeNames(): Promise<string[]> {
        // Example: extract bike names from the new bikes page
        await this.page.waitForSelector('.modelName');
        const names = await this.page.$$eval('.modelName', els => els.map(e => e.textContent?.trim() || ''));
        return names;
    }
}
