import { test, expect } from '@playwright/test';
const { wrap, configure } = require("agentql");
require('dotenv').config();

var URL = "https://rahulshettyacademy.com/loginpagePractise/";

const loginFormQuery = `{
    Username,
    Password,
    SignIn
  }`;
  
  const loginCredQuery = `{
    rahulshettyacademy,
    learning
  }`;
  
  const homepageQuery = `{
    ShopName
  }`;

  test('Should login and display ShopName', async ({ page }) => {
    configure({
        apiKey: process.env.AgentQL_API_KEY,
    });

    page.setDefaultTimeout(100000);
    await page.goto(URL);

    const agentPage = await wrap(page);

    const loginData = await agentPage.queryElements(loginCredQuery);
    const userName = await loginData.rahulshettyacademy.textContent();
    const password = await loginData.learning.textContent();

    const loginForm = await agentPage.queryElements(loginFormQuery);
    await loginForm.Username.fill(userName);
    await loginForm.Password.fill(password);
    await loginForm.SignIn.click();

    const homepagecheck = await agentPage.queryElements(homepageQuery);
    await expect(homepagecheck.ShopName).toBeVisible();
  })