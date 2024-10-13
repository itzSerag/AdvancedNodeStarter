const puppeteer = require("puppeteer");
const SessionFactory = require("./factories/sessionFactory");
let browser, page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
  });
  page = await browser.newPage();
});

beforeEach(async () => {
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
  expect(currURL).toContain("accounts.google.com");
});

test("When we signed in show logout button", async () => {
  const id = "66f47f8a2a76c57f7252f54a";

  const { session, sig } = SessionFactory();

  await page.setCookie({ name: "session", value: session });
  await page.setCookie({ name: "session.sig", value: sig });

  await page.goto("http://localhost:3000"); // Use await here to ensure page loads
  const logoutButton = await page.$eval(
    ".right > li > a[href='/auth/logout']",
    (el) => el.innerHTML
  );
  expect(logoutButton).toEqual("Logout");
});

afterEach(async () => {
  // Close the browser if needed, or leave it as is for debugging purposes
  // await browser.close();
});
