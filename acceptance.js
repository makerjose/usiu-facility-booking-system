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
