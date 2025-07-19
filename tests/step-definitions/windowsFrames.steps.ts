import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { WindowsFramesPage } from '../pages/WindowsFramesPage';

let windowsFramesPage: WindowsFramesPage;
let newPage: any;
let frame: any;

Given('I am on a page with multiple windows or frames', async function () {
    // Use this.context and this.page if available from Cucumber World
    const playwright = require('playwright');
    const context = this.context || (await playwright.chromium.launch().then((b: import('playwright').Browser) => b.newContext()));
    const page = this.page || (await context.newPage());

    // Step: Navigate to a page with multiple windows/frames (example URL)
    await page.goto('https://demo.automationtesting.in/Frames.html');

    // Save for later steps
    this.context = context;
    this.page = page;
});

When('I switch between windows and frames', async function () {
    const page = this.page;
    const context = this.context;

    const frame = page.frameLocator("iframe[id='singleframe']");
    await frame.locator('input[type="text"]').fill('Playwright Frame Handling');

    // ==== Handle Window Popup ====
    // Navigate to a page that opens a new tab/window
    await page.goto('https://demoqa.com/browser-windows');

    [newPage] = await Promise.all([
        context.waitForEvent('page'), // Wait for new tab to open
        page.click('#windowButton')   // Trigger opening
    ]);
});

Then('I should be able to interact with elements in each window or frame', async function () {
    await newPage.waitForLoadState();
    const bodyText = await newPage.locator('body').innerText();
    console.log('New window text:', bodyText);

    // Assert or interact
    expect(bodyText).toContain('This is a sample page'); // sample text
});
