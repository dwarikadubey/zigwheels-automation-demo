import { Page } from '@playwright/test';

export class UpcomingBikesPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {

        await this.page.goto('https://www.zigwheels.com/upcoming-honda-bikes', { timeout: 60000 });

    }

    async navigateToUpcomingBikes(maxPriceLac: number) {

        await this.page.evaluate(async () => {
            let lastHeight = 0;
            let scrolled = false;
            do {
                scrolled = false;
                const currentHeight = document.body.scrollHeight;
                if (currentHeight > lastHeight) {
                    window.scrollTo(0, currentHeight);
                    lastHeight = currentHeight;
                    scrolled = true;
                    await new Promise(res => setTimeout(res, 1000));
                }
            } while (scrolled);
        });
        await this.page.waitForTimeout(2000);

        const bikeCards = this.page.locator('div[data-track-label="model-name"]').locator('..');
        const count = await bikeCards.count();

        function parsePrice(priceStr: string): number {
            const cleaned = priceStr.replace(/Rs\.|,|\s|Lakh|-/g, '').trim();
            if (cleaned.includes('to')) {
                const parts = cleaned.split('to');
                return parseFloat(parts[1]) || 0;
            }
            let value = parseFloat(cleaned);
            if (priceStr.includes('Lakh')) {
                return value;
            } else if (value > 100000) {
                return value / 100000;
            } else if (value > 1000) {
                return value / 100000;
            }
            return value;
        }

        for (let i = 0; i < count; i++) {
            const card = bikeCards.nth(i);

            const name = (await card.locator('[data-track-label="model-name"]').textContent())?.replace(/\n/g, '').trim() || '';

            const price = (await card.locator('div.b.fnt-15').textContent())?.trim() || '';

            let launchDate = '';
            const launchDateEl = card.locator('div.clr-try.fnt-14');
            if (await launchDateEl.count()) {
                launchDate = (await launchDateEl.textContent())?.replace('Expected Launch :', '').trim() || '';
            }

            if (parsePrice(price) > 0 && parsePrice(price) < maxPriceLac) {

                console.log(`Bike: ${name} | Price: ${price} | Launch Date: ${launchDate}`);
            }
        }
    }
}

