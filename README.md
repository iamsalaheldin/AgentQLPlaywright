# AgentQL Playwright POC

This project is a proof-of-concept (POC) demonstrating the integration of **Playwright** with **AgentQL** to automate login and validation of elements on a web application. AgentQL is an AI-powered query language that simplifies web automation by allowing natural-language-style element selection and interaction, reducing the need for complex CSS or XPath selectors. This POC showcases how AgentQL can be leveraged within Playwright to efficiently locate and interact with web elements during UI automation.

For more details on AgentQL and its capabilities, refer to the official documentation: [AgentQL Quick Start](https://docs.agentql.com/quick-start).

## Table of Contents
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Test Scenario](#test-scenario)
- [Script Breakdown](#script-breakdown)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Installation

Ensure you have **Node.js** installed (v16 or later is recommended). Then, install Playwright using:

```sh
npm init playwright@latest
```

Follow the interactive setup to configure Playwright for your project.

### Modify `package.json`
After Playwright is installed, manually add the required dependencies by modifying your `package.json` file to include:

```json
"dependencies": {
  "@playwright/test": "latest",
  "agentql": "latest",
  "dotenv": "latest"
}
```

Then run:

```sh
npm install
```

This ensures all required dependencies are installed.

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

---

## Script Breakdown

### **1. Import Dependencies & Configure AgentQL**
- The script imports `@playwright/test`, `agentql`, and `dotenv`.
- The API key for AgentQL is loaded from the `.env` file to ensure authentication with the AgentQL service.
- `wrap(page)` is used to enable AgentQL's enhanced querying capabilities in Playwright.

### **2. Define Queries**
- `loginFormQuery`: Identifies the login form elements, including `Username`, `Password`, and `SignIn` button.
- `loginCredQuery`: Extracts credentials dynamically from the page.
- `homepageQuery`: Identifies the `ShopName` element to validate a successful login.

### **3. Test Execution Steps**
- **Navigate to the Login Page:** The script first loads the target URL using `page.goto(URL)`.
- **Extract Credentials Using AgentQL:** AgentQL queries retrieve username and password values dynamically from the page.
- **Fill in the Login Form:**
  - `loginForm.Username.fill(userName)`: Inputs the extracted username.
  - `loginForm.Password.fill(password)`: Inputs the extracted password.
  - `loginForm.SignIn.click()`: Clicks the login button.
- **Validate the Login Process:**
  - The script queries the homepage and asserts that `ShopName` is visible using `expect(homepagecheck.ShopName).toBeVisible()`, ensuring that login was successful.

### **4. Error Handling & Timeouts**
- The script sets a default timeout using `page.setDefaultTimeout(100000)` to handle potential slow-loading elements.
- If an element is not found, Playwright provides detailed logs, making it easier to debug missing selectors or incorrect queries.

### **5. Headless vs. Non-Headless Execution**
- The script currently runs in a **headful** mode (`headless: false`) for better visibility while debugging.
- To run tests in a headless mode (faster execution), modify the Playwright configuration:
  ```sh
  npx playwright test --headless
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

