import { Given, When, Then } from '@cucumber/cucumber';
import { PerformanceMetricsPage } from '../pages/PerformanceMetricsPage';

Given('I am running automated tests', async function () {
    this.performanceMetricsPage = new PerformanceMetricsPage(this.page);
});

When('I measure response time, throughput, and error rate', async function () {
    // You can adjust the URL as needed for your test
    const url = 'https://www.zigwheels.com/';
    await this.performanceMetricsPage.measureResponseTime(url);
    await this.performanceMetricsPage.simulateThroughput(url, 5);
});

Then('I should capture and report these performance metrics', async function () {
    const metrics = this.performanceMetricsPage.getMetrics();
    console.log('Performance Metrics:', metrics);
    // Optionally, add assertions or attach to report
    if (metrics.responseTime <= 0) throw new Error('Invalid response time');
    if (metrics.throughput <= 0) throw new Error('Invalid throughput');
});
