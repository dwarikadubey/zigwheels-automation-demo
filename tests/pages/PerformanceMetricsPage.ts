import { Page } from '@playwright/test';

export interface PerformanceMetrics {
    responseTime: number; // ms
    throughput: number;   // requests/sec (simulated)
    errorRate: number;    // %
}

export class PerformanceMetricsPage {
    readonly page: Page;
    metrics: PerformanceMetrics = { responseTime: 0, throughput: 0, errorRate: 0 };

    constructor(page: Page) {
        this.page = page;
    }

    async measureResponseTime(url: string) {
        const start = Date.now();
        const response = await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        const end = Date.now();
        this.metrics.responseTime = end - start;
        // Optionally, check for errors
        this.metrics.errorRate = response && response.ok() ? 0 : 100;
    }

    async simulateThroughput(url: string, requests: number = 5) {
        const start = Date.now();
        let errors = 0;
        for (let i = 0; i < requests; i++) {
            const response = await this.page.request.get(url);
            if (!response.ok()) errors++;
        }
        const end = Date.now();
        const durationSec = (end - start) / 1000;
        this.metrics.throughput = requests / durationSec;
        this.metrics.errorRate = (errors / requests) * 100;
    }

    getMetrics(): PerformanceMetrics {
        return this.metrics;
    }
}
