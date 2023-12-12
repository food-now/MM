import { Selector } from 'testcafe';

class AddItemPage {
  constructor() {
    this.pageId = '#AddItemAdmin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const addItemPage = new AddItemPage();
