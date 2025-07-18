import { Given, When, Then } from '@cucumber/cucumber';
import { UsedPopularModelsPage } from '../pages/UsedPopularModelsPage';
import { expect } from '@playwright/test';

let pageObj: UsedPopularModelsPage;

Given('I navigate to the ZigWheels website', async function () {
  pageObj = new UsedPopularModelsPage(this.page);
  await pageObj.goto();
});

When('I select {string} and city as {string}', async function (section, city) {
  await pageObj.selectUsedCars(city);
});

Then('I should see a list of used popular car models', async function () {
  const models = await pageObj.getPopularModels();
  expect(models.length).toBeGreaterThan(0);
});
