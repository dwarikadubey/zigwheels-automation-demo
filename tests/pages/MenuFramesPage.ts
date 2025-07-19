import { Page, Frame } from '@playwright/test';

export class MenuFramesPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        // Example: demo page with menu in frame
        await this.page.goto('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_frame_cols');
    }

    async extractMenuItemsFromFrame(frameIndex: number = 0, menuSelector: string = 'body') {
        const frame = this.page.frames()[frameIndex];
        if (!frame) throw new Error('Frame not found');
        const items = await frame.$$eval(menuSelector, nodes => nodes.map(n => n.textContent?.trim() || ''));
        return items;
    }
}
