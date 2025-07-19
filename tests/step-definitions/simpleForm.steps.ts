import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SimpleFormPage } from '../pages/SimpleFormPage';

let simpleFormPage: SimpleFormPage;
let warningMsg: string;

Given('I am on a form page', async function () {
    simpleFormPage = new SimpleFormPage(this.page);
    await simpleFormPage.goto();
});

When('I submit the form with invalid or incomplete data', async function () {
    await simpleFormPage.submitInvalidForm();
});

Then('I should see a warning message', async function () {
    warningMsg = await simpleFormPage.getWarningMessage();
    console.log('Warning message:', warningMsg);
    expect(warningMsg).not.toBe('No warning message found.');
});
