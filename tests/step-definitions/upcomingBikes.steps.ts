import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { UpcomingBikesPage } from '../pages/UpcomingBikesPage';

let upcomingBikesPage: UpcomingBikesPage;

Given('I am on the ZigWheels upcoming honda bikes page', async function () {
    upcomingBikesPage = new UpcomingBikesPage(this.page);
    await upcomingBikesPage.goto();
});


Given('I filter bikes with price less than {int} Lac', async function (maxPriceLac: number) {
    this.maxPriceLac = maxPriceLac;
});


Then('I should see a list of upcoming Honda bikes with their name, price, and expected launch date', async function () {
    await upcomingBikesPage.navigateToUpcomingBikes(this.maxPriceLac);
});






