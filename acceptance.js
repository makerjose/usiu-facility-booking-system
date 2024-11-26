
const puppeteer = require('puppeteer');
const assert = require('assert');

(async () => {
  try {
    // Launch Puppeteer with headless mode
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // Create a new page
    const page = await browser.newPage();

    // Navigate to the test page
    await page.goto("https://usiu-facility-booking.onrender.com/", {
      waitUntil: 'networkidle0'
    });

    console.log('Navigation completed');

    // Wait for specific selectors before interacting with them
    const selectors = [
      '#venue',
      '#name',
      '#capacity',
      '#date',
      '#time',
      '#book-event-btn'
    ];

    for (const selector of selectors) {
      await page.waitForSelector(selector, { timeout: 5000 });
      console.log(`${selector} element found`);
    }

    // Fill out form fields
    await page.type('#name', 'RedBull Meeting');
    await page.type('#capacity', '90');
    await page.type('#date', '08-15-2023');
    await page.type('#time', '19:00');

    // Click book event button
    const bookBtn = await page.$('#book-event-btn');
    if (bookBtn) {
      await bookBtn.click({ delay: 100 });
    } else {
      console.error('Booking button not found');
    }

    // Wait for navigation after clicking the button
    const navigationPromise = page.waitForNavigation({ waitUntil: 'networkidle0' });
    await navigationPromise;

    // Verify the page title after booking
    const pageTitle = await page.title();
    assert(pageTitle === 'Report', 'Page title mismatch');

    console.log("Title matched successfully");

    // Close the browser
    await browser.close();

  } catch (error) {
    console.error('Error occurred:', error);
  }
})();

