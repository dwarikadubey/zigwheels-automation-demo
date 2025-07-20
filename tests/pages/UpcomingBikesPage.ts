import { Page } from '@playwright/test';

export class UpcomingBikesPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {

        await this.page.goto('https://www.zigwheels.com', { timeout: 60000 });

    }

    async navigateToUpcomingBikes(maxPriceLac: number) {

        // Click the 'NEW BIKES' navigation link
        const newBikesNav = this.page.locator('a[data-track-label="nav-newbikes"]');
        await newBikesNav.waitFor({ state: 'visible', timeout: 10000 });
        await newBikesNav.click();
        await this.page.waitForLoadState('domcontentloaded');


        // Click the 'Upcoming' tab
        const upcomingTab = this.page.locator('li[data-track-label="upcoming-tab"]');
        await upcomingTab.waitFor({ state: 'visible', timeout: 10000 });
        await upcomingTab.click();
        await this.page.waitForLoadState('domcontentloaded');

        // Click the 'All Upcoming Bikes' link (more specific selector)
        const upcomingBikesLink = this.page.locator('a[data-track-label="view-all-bike"][title="All Upcoming Bikes"]');
        await upcomingBikesLink.waitFor({ state: 'visible', timeout: 10000 });
        await upcomingBikesLink.click();
        await this.page.waitForLoadState('domcontentloaded');


        // Scroll until the Honda brand link is visible
        const hondaLink = this.page.locator('a[data-track-label="filter-by-brand"]', { hasText: 'Honda' });
        let hondaVisible = false;
        let scrollAttempts = 0;
        while (!hondaVisible && scrollAttempts < 15) {
            try {
                await hondaLink.waitFor({ state: 'visible', timeout: 1000 });
                hondaVisible = true;
            } catch {
                await this.page.evaluate(() => window.scrollBy(0, 200));
                await this.page.waitForTimeout(300);
                scrollAttempts++;
            }
        }
        if (!hondaVisible) throw new Error('Honda brand link not found after scrolling.');
        await hondaLink.scrollIntoViewIfNeeded();
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'load' }),
            hondaLink.click()
        ]);

        // Scroll until the bike cards list is visible
        const bikeCards = this.page.locator('ul#modelList li');
        let cardsVisible = false;
        let cardScrollAttempts = 0;
        while (!cardsVisible && cardScrollAttempts < 15) {
            try {
                await bikeCards.first().waitFor({ state: 'visible', timeout: 1000 });
                cardsVisible = true;
            } catch {
                await this.page.evaluate(() => window.scrollBy(0, 300));
                await this.page.waitForTimeout(300);
                cardScrollAttempts++;
            }
        }
        if (!cardsVisible) throw new Error('Bike cards not found after scrolling.');
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

            // Print only Honda bikes with price less than 4 lakh
            if (parsePrice(price) > 0 && parsePrice(price) < 4) {
                console.log(`Bike: ${name} | Price: ${price} | Launch Date: ${launchDate}`);
            }
        }
    }
}

