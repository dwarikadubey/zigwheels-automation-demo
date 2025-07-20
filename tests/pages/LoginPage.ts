import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://www.zigwheels.com/user/login', { timeout: 60000 });
    }

    async loginWithGoogleInvalid() {
        await this.page.locator('#des_lIcon').click();

        await this.page.waitForTimeout(6000);
        let popup;
        try {
            [popup] = await Promise.all([
                this.page.waitForEvent('popup', { timeout: 15000 }),
                this.page.locator('div.lgn-sc.googleSignIn').click()
            ]);
            console.log('Popup window detected');
        } catch (e) {
            console.log('No popup window detected:', e);
        }

        if (popup) {
            await popup.waitForSelector('#identifierId', { state: 'visible', timeout: 10000 });
            console.log('Popup URL:', popup.url());
            const email_input = popup.locator('#identifierId');

            const invalidEmails = ['invalid1@email', 'invalid2@email', 'invalid3@email'];
            for (const email of invalidEmails) {
                await email_input.fill(email);
                await popup.waitForTimeout(500);
                await popup.locator('#identifierNext > div > button > span').click();
                // Wait for error message or input to be ready again
                const errorSelector = 'div.Ekjuhf.Jj6Lae';
                try {
                    await popup.waitForSelector(errorSelector, { state: 'visible', timeout: 5000 });
                    const errorMsg = await popup.locator(errorSelector).textContent();
                    console.log(`Login error message for '${email}': ${errorMsg?.trim()}`);
                } catch (e) {
                    console.log(`No error message found for '${email}'.`);
                }
                await popup.waitForTimeout(500);
            }
        } else {
            console.log('Google login popup did not appear.');
        }
    }

    async getErrorMessage() {
        let errorMsgText = '';
        const googleError = this.page.locator('div.Ekjuhf.Jj6Lae');
        try {
            await googleError.waitFor({ state: 'visible', timeout: 10000 });
            errorMsgText = (await googleError.textContent()) ?? '';
        } catch (e) {

            const errorMsg = await this.page.locator('.error, .alert-danger, [role="alert"]').first();
            try {
                await errorMsg.waitFor({ state: 'visible', timeout: 10000 });
                errorMsgText = (await errorMsg.textContent()) ?? '';
            } catch (e2) {
                errorMsgText = 'No error message found.';
            }
        }
        console.log('Captured error message:', errorMsgText.trim());
        return errorMsgText.trim();
    }
}
