import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);

  const user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();
});

test('Creat an article without required fields', async () => {
  const articleTitle = 'Article Title';
  const articleDescription = 'Article Description';
  const articleBody = 'Some text for article body';
  const tag = 'some-tag';
  await homePage.clickNewArticleLink();
  //await createArticlePage.fillArticleTitle(articleTitle);
  await createArticlePage.fillArticleDescription(articleDescription);
  await createArticlePage.fillArticleBody(articleBody);
  await createArticlePage.fillArticleTags(tag);
  await createArticlePage.clickPublishArticleButton();
  //await createArticlePage.assertArticleCreation(articleTitle);
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article title cannot be empty',
  );
});
