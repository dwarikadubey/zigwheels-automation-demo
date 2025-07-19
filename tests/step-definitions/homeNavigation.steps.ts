import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomeNavigationPage } from '../pages/HomeNavigationPage';

Given('I am on any page of the site', async function () {
    this.homeNavigationPage = new HomeNavigationPage(this.page);
    await this.homeNavigationPage.gotoAnyPage();
});

When('I click the home button or link', async function () {
    await this.homeNavigationPage.clickHomeButton();
});

Then('I should be navigated back to the home page', async function () {
    const isHome = await this.homeNavigationPage.isOnHomePage();
    expect(isHome).toBeTruthy();
});
