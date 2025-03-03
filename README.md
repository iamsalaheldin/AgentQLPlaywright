# AgentQL Playwright POC

This project is a proof-of-concept (POC) demonstrating the integration of **Playwright** with **AgentQL** to automate login and validation of elements on a web application.

## Table of Contents
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Test Scenario](#test-scenario)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Installation

Ensure you have **Node.js** installed (v16 or later is recommended). Then, install the required dependencies:

```sh
npm install @playwright/test agentql dotenv
```

To install Playwright browsers:

```sh
npx playwright install
```

---

## Setup

1. Create a `.env` file in the root directory and add your AgentQL API key:

   ```ini
   AgentQL_API_KEY=your_api_key_here
   ```

2. Ensure that the required environment variables are loaded before running the test.

---

## Usage

To execute the test, run:

```sh
npx playwright test
```

or, if Playwright is installed globally:

```sh
playwright test
```

---

## Test Scenario

This test automates the login process on [Rahul Shetty Academy's Login Page](https://rahulshettyacademy.com/loginpagePractise/) and verifies that the homepage is displayed after successful authentication.

### Steps Performed:

1. Navigate to the login page.
2. Extract login credentials using AgentQL queries.
3. Fill in the username and password fields.
4. Click the **Sign In** button.
5. Validate the presence of an element on the homepage (**ShopName**) to confirm successful login.

### Test Code:

```javascript
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
});
```

---

## Troubleshooting

### 1. **AgentQL API Key Issues**
Ensure that your API key is correctly set up in the `.env` file. If authentication fails, check if your key is valid.

### 2. **Element Not Found Error**
If Playwright throws an error related to missing elements, ensure:
- The page has fully loaded before querying elements.
- The query selectors in `loginFormQuery` and `homepageQuery` match the actual page elements.

### 3. **Playwright Not Installed**
If Playwright commands are not recognized, install it using:

```sh
npx playwright install
```

---

## License
This project is for educational and demonstration purposes only.

