import { Selector } from 'testcafe';

class AllVendorsPage {
  constructor() {
    this.pageId = '#AllVendors-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const allVendorsPage = new AllVendorsPage();
