import { Page } from '@playwright/test';

export class UsedPopularModelsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.zigwheels.com');
  }

  async selectUsedCars(city: string) {
    // TODO: Add logic to select used cars and set city
  }

  async getPopularModels(): Promise<string[]> {
    return await this.page.$$eval('.modelClassSelector', els => els.map(e => e.textContent || ''));
  }
}
