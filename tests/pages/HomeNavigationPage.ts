import { Page } from '@playwright/test';

export class HomeNavigationPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async gotoAnyPage() {
        // Go to a subpage for demonstration
        await this.page.goto('https://www.zigwheels.com/newbikes');
    }

    async clickHomeButton() {
        // Try common selectors for home button or logo
        const homeSelectors = [
            'a[title="ZigWheels"]', // logo link
            'a[href="/"]',         // home link
            'a:has-text("Home")',  // nav link
            'img[alt="ZigWheels"]',// logo image
        ];
        for (const selector of homeSelectors) {
            const el = this.page.locator(selector);
            if (await el.count()) {
                await el.first().click();
                return;
            }
        }
        throw new Error('Home button or link not found');
    }

    async isOnHomePage() {
        // Check for a unique element or URL on the home page
        await this.page.waitForLoadState('domcontentloaded');
        return this.page.url() === 'https://www.zigwheels.com/' || (await this.page.title()).includes('ZigWheels');
    }
}
