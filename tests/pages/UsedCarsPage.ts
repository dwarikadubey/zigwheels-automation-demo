import { Page } from '@playwright/test';

export class UsedCarsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async gotoChennaiUsedCars() {
        await this.page.goto('https://www.zigwheels.com/used-car/Chennai', { timeout: 60000 });
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
