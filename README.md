# Playwright Sample Project

## Prerequisites

To continue you need to have the following installed:
- NodeJS >= 18.17.1
- Playwright Test for VSCode plugin
- Install playwright using `npm init playwright@latest`

## How PW works

It uses browser-specific DevTools protocols (e.g., Chrome DevTools Protocol for Chromium).
Playwright sends these commands to the browser through a WebSocket connection using the native DevTools protocol.

Browser → Context(s) → Page(s)

Browser
Represents the browser process (e.g., Chrome, Firefox, WebKit). Each browser instance can have multiple contexts.

Browser Context
Think of it as an isolated incognito session. Each context has its own cookies, cache, storage.
You can create multiple contexts within the same browser for parallel, independent sessions.

Page
A single browser tab within a context.
You interact with the DOM using the page object (click, type, etc.).

## How to TS/JS works

TypeScript (.ts) → [tsc / transpiler] → JavaScript (.js)
JavaScript → [Node.js V8 engine] → AST → Bytecode → Machine Code
console.log("test") → process.stdout.write() → Terminal Output


##  ✅ Locator Strategy Ranking in Playwright (Best → Worst)

| **Rank** | **Strategy**                                  | **Why it's Good / Bad**                                                                 |
|----------|----------------------------------------------|----------------------------------------------------------------------------------------|
| **1**    | **`id`** (`#id`)                             | ✅ **Fastest** (browsers optimize for `getElementById`) <br> ✅ **Unique** (HTML spec) <br> ❌ Can be dynamic. |
| **2**    | **`data-test-id` or custom test attributes** | ✅ **Stable** for automation <br> ✅ Avoids CSS-based breakage <br> ❌ Requires dev support. |
| **3**    | **Accessible roles / labels** (`getByRole`, `getByLabelText`) | ✅ Semantic and stable <br> ✅ Improves readability <br> ❌ Requires proper ARIA/labels. |
| **4**    | **Name attribute** (`[name="username"]`)     | ✅ Common in forms <br> ❌ Not always unique.                                           |
| **5**    | **CSS selector** (class, tag, hierarchy)     | ✅ Flexible <br> ❌ Fragile if UI changes (CSS classes often change).                  |
| **6**    | **Text locator** (`getByText`, `locator('text=Login')`) | ✅ Easy to read <br> ❌ Breaks with text changes (e.g., translations).                  |
| **7**    | **XPath** (`//div[@id='x']`)                 | ✅ Powerful for complex DOM <br> ❌ Slow (evaluated in JS engine) <br> ❌ Hard to maintain. |
| **8**    | **Chained selectors with nth-child**         | ❌ Very fragile (layout changes break it) <br> ❌ Hard to maintain.                     |

## Different commands for playwright
- Install - npm init playwright@latest
- Run test - npx playwright test
- Generate report - npx playwright show-report
- To run tests in parallel - npx playwright test --workers 3 (3 tests running in parallel)
- To run particular test -  npx playwright test .\tests\example.spec.ts
- To run 2 or more specific files -  npx playwright test .\tests\one.spec.ts .\tests\two.spec.ts
- To run test with specific title - npx playwright test -g “Add to cart”
- To run test on single browser - npx playwright test —-project=chromium
- To run test in headed mode  - npx playwright test —-project=chromium –-headed
- To open the ui mode feature in playwright for debugging - npx playwright test —-ui
- To install/upgrade playwright - npm install playwright --save-dev
- To install playwright tests - npm install @playwright/test --save-dev

## Playwright methods
- to locate an element using id
    - page.locator('#abc')
    - page.locator('[id="abc"]')

- to locate an element using class
    - page.locator('.abc')
    - page.locator('[class="abc"]')

- to locate an element using value if id or class attribute is not there
    - page.locator('[value="def"]')

- to enter value inside textfield - fill()
- to click on button - click()
- to capture title of page - page.title()
- to take screenshot of page - page.screenshot({path: 'homepage.png'})
