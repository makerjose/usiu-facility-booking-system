const puppeteer = require('puppeteer');
const assert = require('assert');
try{
    (async () => {
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    await page.goto("https://usiu-facility-booking.onrender.com/");
    const venue = await page.$('#venue')
    await venue.type('auditorium' )
    const name = await page.$('#name')
    await name.type('RedBull Meeting' )
    const capacity = await page.$('#capacity')
    await capacity.type('90' )
    const date = await page.$('#date')
    await date.type('2023-08-15' )
    const time = await page.$('#time')
    await time.type('19:00' )
    const bookBtn = await page.$('#book-event-btn')
    await bookBtn.click()
    const pageTitle1 = await page.title();
    const bookNewBtn = await page.$('#book-new-event-btn')
    await bookNewBtn.click()
    const pageTitle2 = await page.title();
    await venue.type('tvroom_2' )
    await name.type('Mercedes Meeting' )
    await capacity.type('15' )
    await date.type('2023-08-15' )
    await time.type('20:00' )
    await bookBtn.click()
    const viewEventsBtn = await page.$('#view-events-btn')
    await viewEventsBtn.click()
    const pageTitle3 = await page.title();
    await bookNewBtn.click()
    const pageTitle4 = await page.title();
    assert(pageTitle1 === 'Report' && pageTitle2 === 'Home'  && pageTitle3 === 'Events' && pageTitle4 === 'Home');
    console.log("Titles matched successfully");
    await browser.close();
    })();
} catch (err) {
    console.error(err);
}
