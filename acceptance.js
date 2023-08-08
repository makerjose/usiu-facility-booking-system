const puppeteer = require('puppeteer');
const assert = require('assert');

try{
    (async () => {
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    await page.goto("https://usiu-facility-booking.onrender.com");

    const searchInput = await page.$('#capacity')
    await searchInput.type('22' )
   
    const searchBtn = await page.$('#book-event-btn')
    await searchBtn.click()
   
    const pageTitle = await page.title();
   
    assert(pageTitle === 'Report');
    console.log("Title matched successfully");

    await browser.close();
    })();

} catch (err) {
    console.error(err);
}

