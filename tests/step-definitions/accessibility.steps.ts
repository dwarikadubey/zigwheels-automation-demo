import { Given, When, Then } from '@cucumber/cucumber';
import { AccessibilityPage } from '../pages/AccessibilityPage';
import { expect } from '@playwright/test';

Given('I am on the site for accessibility testing', async function () {
    this.accessibilityPage = new AccessibilityPage(this.page);
    // Optionally, navigate to a page if needed
    await this.page.goto('https://www.zigwheels.com/');
});

When('I perform accessibility checks', async function () {
    await this.accessibilityPage.runAxeAccessibilityCheck();
});

Then('the site should be compatible with screen readers and keyboard navigation', async function () {
    const violations = this.accessibilityPage.getViolations();
    if (violations.length > 0) {
        console.log('Accessibility Violations:', violations);
    }
    expect(violations.length).toBe(0);
});
