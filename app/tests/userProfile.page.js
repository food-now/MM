import { Selector } from 'testcafe';

class UserProfilePage {
  constructor() {
    this.pageId = '#UserProfile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const userProfilePage = new UserProfilePage();
