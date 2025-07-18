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
        // Wait for the login modal to appear
        await this.page.waitForTimeout(6000);

        await this.page.locator('div.lgn-sc.googleSignIn').click();
        // Wait extra time to allow popup to open (helps in automation)
        await this.page.waitForTimeout(2000);
        // If popup still does not open, try running Playwright in headed mode for debugging

        // Wait for the Google login popup window
        let popup;
        try {
            popup = await this.page.waitForEvent('popup', { timeout: 15000 });
            console.log('Popup window detected');
        } catch (e) {
            console.log('No popup window detected:', e);
        }

        if (popup) {
            // Wait for the popup to be visible and get the correct frame if needed
            await popup.waitForLoadState('domcontentloaded');
            // Debug: log popup URL
            console.log('Popup URL:', popup.url());
            // Try to focus the input before filling
            const email_input = popup.locator('#identifierId');
            await email_input.waitFor({ state: 'visible', timeout: 10000 });
            await email_input.focus();
            await email_input.fill('12##$$%%');
            // Optionally, add a small wait before clicking next
            await popup.waitForTimeout(500);
            // Use a robust selector for the Next button span (CSS, not XPath)
            await popup.locator('span.VfPpkd-vQzf8d:has-text("Next")').click();
        } else {
            console.log('Google login popup did not appear.');
        }
    }

    async getErrorMessage() {
        // Wait for Google error message in the popup
        // Try to find the error message in the Google login popup
        let errorMsgText = '';
        // Try the Google error selector first
        const googleError = this.page.locator('div.Ekjuhf.Jj6Lae');
        try {
            await googleError.waitFor({ state: 'visible', timeout: 10000 });
            errorMsgText = (await googleError.textContent()) ?? '';
        } catch (e) {
            // Fallback to generic selectors if Google error not found
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
