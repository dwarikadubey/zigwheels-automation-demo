import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { MenuFramesPage } from '../pages/MenuFramesPage';

let menuFramesPage: MenuFramesPage;
let menuItems: string[] = [];

Given('I am on a page with menu items inside frames', async function () {
    menuFramesPage = new MenuFramesPage(this.page);
    await menuFramesPage.goto();
});

When('I extract the menu items', async function () {
    // Example: extract all text from the first frame
    menuItems = await menuFramesPage.extractMenuItemsFromFrame(0, 'body');
});

Then('I should store the menu items in a collection', async function () {
    console.log('Extracted menu items:', menuItems);
    expect(menuItems.length).toBeGreaterThan(0);
});
