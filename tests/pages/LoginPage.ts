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
        await this.page.locator('div.lgn-sc.googleSignIn').click();
        await this.page.waitForTimeout(2000);
        let popup;
        try {
            popup = await this.page.waitForEvent('popup', { timeout: 15000 });
            console.log('Popup window detected');
        } catch (e) {
            console.log('No popup window detected:', e);
        }

        if (popup) {
            await popup.waitForLoadState('domcontentloaded');
            console.log('Popup URL:', popup.url());
            const email_input = popup.locator('#identifierId');
            await email_input.waitFor({ state: 'visible', timeout: 10000 });
            // await email_input.focus();
            await email_input.fill('12##$$%%');
            await popup.waitForTimeout(500);
            await popup.locator('span.VfPpkd-vQzf8d:has-text("Next")').click();
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
