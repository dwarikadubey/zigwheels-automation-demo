import { Page } from '@playwright/test';

export class UsedCarsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async gotoChennaiUsedCars(): Promise<Page> {
        await this.page.goto('https://www.zigwheels.com', { timeout: 60000 });
        // Hover on 'More' menu using the span with class 'icon-down-arrow' and text 'MORE'
        const moreMenuSelector = 'span.c-p.icon-down-arrow:has-text("MORE")';
        await this.page.hover(moreMenuSelector);
        // Wait for menu animation
        await this.page.waitForTimeout(500);
        // Wait for Used Cars option to appear
        const usedCarsSelector = 'a[title="Used Cars"]';
        await this.page.waitForSelector(usedCarsSelector, { state: 'visible', timeout: 5000 });
        // Listen for new page (tab) opening
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.click(usedCarsSelector, { button: 'middle' }) // open in new tab
        ]);
        await newPage.bringToFront();
        await newPage.waitForLoadState('domcontentloaded');
        return newPage;
    }

    async getPopularModels() {

        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.page.waitForTimeout(2000); // wait for any lazy loading


        const modelLocators = this.page.locator('a.fnt-22.zm-cmn-colorBlack.n.zw-sr-headingPadding.clickGtm.saveslotno[data-track-label="Car-name"]');
        const models = (await modelLocators.allTextContents()).map(m => m.trim()).filter(Boolean);

        models.forEach(model => {

            console.log(`Popular Used Car Model: ${model}`);
        });
        return models;
    }
}
