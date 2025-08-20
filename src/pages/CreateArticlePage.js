import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.titleInput = page.getByPlaceholder('Article Title');
    this.descriptionInput = page.getByPlaceholder("What's this article about?");
    this.bodyTextarea = page.getByPlaceholder('Write your article (in');
    this.tagInput = page.getByPlaceholder('Enter tags');
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
  async fillArticleTitle(articleTitle) {
    await test.step(`Fill the 'Article Title' field`, async () => {
      await this.titleInput.fill(articleTitle);
    });
  }
  async fillArticleDescription(articleDescription) {
    await test.step(`Fill the 'What's this article about?' field`, async () => {
      await this.descriptionInput.fill(articleDescription);
    });
  }

  async fillArticleBody(articleBody) {
    await test.step(`Fill the 'Write your article (in markdown)' field`, async () => {
      await this.bodyTextarea.fill(articleBody);
    });
  }

  async fillArticleTags(articleTags) {
    await test.step(`Fill the 'Enter Tags' field`, async () => {
      await this.tagInput.fill(articleTags);
      await this.tagInput.press('Enter');
    });
  }

  async assertArticleCreation(articleTitle) {
    const articleTitleAfterCreation = this.page.getByRole('heading', {
      name: articleTitle,
    });

    await test.step(`Assert the article with the name - '${articleTitle}' is created`, async () => {
      await expect(articleTitleAfterCreation).toContainText(articleTitle);
    });
  }

  async assertArticleIsPosted(title) {
    await test.step(`Assert the article '${title}' is posted`, async () => {
      await expect(this.page.locator('h1')).toContainText(title);
    });
  }
}
