import { Page } from '@playwright/test';

export class SimpleFormPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://demoqa.com/text-box');
    }

    async submitInvalidForm() {
        // Leave required fields empty and submit
        await this.page.click('#submit');
    }

    async getWarningMessage() {
        // Try to get a warning or error message
        const errorMsg = this.page.locator('.field-error, .text-danger, .error-message, .was-validated .form-control:invalid');
        if (await errorMsg.count()) {
            return await errorMsg.first().textContent();
        }
        // Fallback: check for browser validation message
        const input = this.page.locator('#userName');
        if (await input.count()) {
            return await input.evaluate((el: any) => el.validationMessage);
        }
        return 'No warning message found.';
    }
}
