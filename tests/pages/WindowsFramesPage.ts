import { Page, Frame } from '@playwright/test';

export class WindowsFramesPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async openNewWindow(url: string) {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.evaluate((url) => window.open(url, '_blank'), url)
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        return newPage;
    }

    async switchToFrame(frameNameOrIndex: string | number) {
        let frame: Frame | null = null;
        if (typeof frameNameOrIndex === 'string') {
            frame = this.page.frame({ name: frameNameOrIndex });
        } else {
            frame = this.page.frames()[frameNameOrIndex];
        }
        if (!frame) throw new Error('Frame not found');
        return frame;
    }

    async interactWithElementInFrame(frame: Frame, selector: string, action: 'click' | 'type', value?: string) {
        if (action === 'click') {
            await frame.click(selector);
        } else if (action === 'type' && value !== undefined) {
            await frame.fill(selector, value);
        }
    }
}
