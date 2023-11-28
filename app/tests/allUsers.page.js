import { Selector } from 'testcafe';

class AllUsersPage {
  constructor() {
    this.pageId = '#AllUsers-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const allUsersPage = new AllUsersPage();
