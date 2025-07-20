import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    expect: {
        timeout: 5000
    },
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'never' }]
    ],
    use: {
        headless: false,
        launchOptions: {
            args: ['--disable-popup-blocking']
        },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        baseURL: 'https://www.zigwheels.com'
    }
});
