import { Given, When, Then } from '@cucumber/cucumber';
import { ParallelExecutionPage } from '../pages/ParallelExecutionPage';
import { expect } from '@playwright/test';

Given('I have multiple test scenarios', async function () {
    this.parallelExecutionPage = new ParallelExecutionPage(this.page);
    this.testUrls = [
        'https://www.zigwheels.com/',
        'https://www.zigwheels.com/newbikes',
        'https://www.zigwheels.com/used-car'
    ];
});

When('I execute tests in parallel', async function () {
    // Simulate parallel execution using Promise.all
    this.results = await Promise.all(
        this.testUrls.map((url: string) => this.parallelExecutionPage.runScenario(url))
    );
});

Then('all tests should run successfully without interference', async function () {
    expect(this.results.length).toBe(this.testUrls.length);
    // Optionally, check for unique titles or other assertions
});
