import { setWorldConstructor, IWorldOptions } from '@cucumber/cucumber';
import { Browser, Page, BrowserContext } from 'playwright';

export class CustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {}
}

setWorldConstructor(CustomWorld);
