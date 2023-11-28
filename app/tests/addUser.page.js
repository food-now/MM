import { Selector } from 'testcafe';

class AddUserPage {
  constructor() {
    this.pageId = '#AddUser-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const addUserPage = new AddUserPage();
