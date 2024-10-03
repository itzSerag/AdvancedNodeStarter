const puppeteer = require("puppeteer");

let browser, page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
  });
  page = await browser.newPage();
});

beforeEach(async () => {
  // Reset page state before each test if needed
  // if we added one more it will create new instance
  await page.goto("http://localhost:3000");
});

test("ADD two numbers", () => {
  const sum = 5 + 2;
  expect(sum).toEqual(7);
});

test("OPEN CHROME", async () => {
  const logoText = await page.$eval("a.brand-logo", (el) =>
    el.innerHTML.trim()
  );
  expect(logoText).toEqual("Blogster");
});

test("Clicking on login with Google", async () => {
  await page.click(".right a");
  const currURL = await page.url();
  console.log(currURL);

  // the test answer
  // we can use toMatch
  expect(currURL).toContain("accounts.google.com");
});

afterAll(async () => {
  await browser.close();
});
