import { Given, When, Then } from '@cucumber/cucumber';
import { UsedCarsPage } from '../pages/UsedCarsPage';

let usedCarsPage: UsedCarsPage;
let popularModels: string[] = [];

Given('I am on the ZigWheels used cars page for Chennai', async function () {
    usedCarsPage = new UsedCarsPage(this.page);
    await usedCarsPage.gotoChennaiUsedCars();
});

When('I view the list of popular used car models', async function () {
    popularModels = await usedCarsPage.getPopularModels();
});

Then('I should see all popular models displayed in a list', async function () {
    if (!popularModels || popularModels.length === 0) {
        throw new Error('No popular used car models found!');
    }
    // Optionally, print or assert
    popularModels.forEach(model => {
        // eslint-disable-next-line no-console
        console.log('Popular Used Car Model:', model);
    });
});
