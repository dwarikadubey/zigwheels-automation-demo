import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;
let errorMessage: string | undefined;

Given('I am on the ZigWheels login page', async function () {
    loginPage = new LoginPage(this.page);
    await loginPage.goto();
});

When('I try to login with Google using invalid account details', async function () {
    await loginPage.loginWithGoogleInvalid();
});

Then('I should see an error message for invalid login', async function () {
    const msg = await loginPage.getErrorMessage();
    errorMessage = msg === null ? undefined : msg;
    if (!errorMessage || !/invalid|error|failed/i.test(errorMessage)) {
        throw new Error('No error message for invalid login!');
    }
    // eslint-disable-next-line no-console
    console.log('Login error message:', errorMessage);
});
