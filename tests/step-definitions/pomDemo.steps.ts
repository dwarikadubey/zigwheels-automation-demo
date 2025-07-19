import { Given, When, Then } from '@cucumber/cucumber';
import { POMDemoPage } from '../pages/POMDemoPage';
import { expect } from '@playwright/test';

Given('I am writing automation scripts', async function () {
    this.pomDemoPage = new POMDemoPage(this.page);
});

When('I implement the Page Object Model', async function () {
    await this.pomDemoPage.gotoDemoPage();
    this.bikeNames = await this.pomDemoPage.getBikeNames();
});

Then('my code should be modular and maintainable', async function () {
    expect(Array.isArray(this.bikeNames)).toBeTruthy();
    // Optionally, print or assert on the bike names
    if (this.bikeNames.length === 0) {
        throw new Error('No bike names found, check selector or page structure.');
    }
});
