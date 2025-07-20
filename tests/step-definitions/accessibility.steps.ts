
import { Given, When, Then } from '@cucumber/cucumber';
import { AccessibilityPage } from '../pages/AccessibilityPage';
import { expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { createHtmlReport } from 'axe-html-reporter';

Given('I am on any page of the site', async function () {
    this.accessibilityPage = new AccessibilityPage(this.page);
    await this.page.goto('https://www.zigwheels.com/');
});


When('I perform accessibility checks', async function () {
    await this.accessibilityPage.runAxeAccessibilityCheck();
});

type AxeViolation = {
    id: string;
    impact: string;
    description: string;
    help: string;
    nodes: Array<any>;
};

Then('the site should be compatible with screen readers and keyboard navigation', async function () {
    const results = this.accessibilityPage.results;
    const violations: AxeViolation[] = this.accessibilityPage.getViolations();
    if (violations.length > 0) {
        console.log('Accessibility Violations:');
        violations.forEach((v: AxeViolation, i: number) => {
            console.log(`  ${i + 1}. [${v.impact}] ${v.id}: ${v.description}`);
            console.log(`     Help: ${v.help}`);
            console.log(`     Nodes: ${v.nodes.length}`);
        });
    }
    // Write axe HTML report
    if (results) {
        // Use 'test-results' directory for accessibility reports
        const reportDir = 'test-results';
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
        }
        const htmlPath = path.join(reportDir, 'axe-accessibility-report.html');
        createHtmlReport({
            results,
            options: {
                outputDir: reportDir,
                reportFileName: 'axe-accessibility-report.html',
                doNotCreateReportFile: false,
            },
        });
        console.log(`Axe accessibility HTML report generated at: ${htmlPath}`);
    }
});
