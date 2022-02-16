const { expect } = require("chai");
const { Builder, By, until } = require("selenium-webdriver");

// Pre-conditions
const baseUrl = 'https://www.perfectionlearning.com';

// Locators
const myAccountButtonLocator = By.xpath('(//*[text() = \'My Account\'])[1]');
const logInCreateLocator = By.xpath('//*[text() = \'Log In / Create Account\']');
const emailLocator = By.id('email');
const passwordLocator = By.id('pass');
const signInButtonLocator = By.xpath('(//*[@name=\'send\'])[1]');
const eSchoolMenuLocator = By.id('ui-id-2');
const eSchoolUlLi1Locator = By.id('ui-id-7');
const langArtsLi3Locator = By.xpath('(//h3)[3]');
const addToWishListLi1Locator = By.xpath('//*[@class = \'action towishlist\']');
const myWishlistPopUpLocator = By.xpath('//*[contains(text(), \'My Wishlist\')]');
const wishListLi1Locator = By.xpath('//*[@id = \'wishlist-view-form\']//li');
const addToCartFromWishListLocator = By.xpath('//*[text() = \'Add to Cart\']');
const studentEditioneBookLocator = By.xpath('//*[text() = \'Student Edition eBook\']');
const addToCardLocator = By.xpath('//*[text() = \'Add to Cart\']');
const qtyLocator = By.id('qty');

// Test data
const email = 'perfectionlearningtestacc@gmail.com';
const password = 'Plearning!2022';

// Util
const timeout = 20000;

async function waitLocatedVisibleEnabled(locator) {
    await driver.wait(until.elementLocated(locator), timeout);
    await driver.wait(until.elementIsVisible(driver.findElement(locator)), timeout);
    await driver.wait(until.elementIsEnabled(driver.findElement(locator)), timeout);
}
async function click(locator) {
    await waitLocatedVisibleEnabled(locator);
    await driver.findElement(locator).click();
}
async function sendKeys(locator, keys) {
    await waitLocatedVisibleEnabled(locator);
    await driver.findElement(locator).clear();
    await driver.findElement(locator).sendKeys(keys);
}

describe('Wish list', () => {

    it('should add items to the cart', async () => {

        try {
            // driver init
            global.driver = new Builder().forBrowser('chrome').build();
            await driver.manage().window().maximize();

            // open perfectionlearning.com
            await driver.get(baseUrl);

            // click login/register menu
            await click(myAccountButtonLocator);

            // click login item
            await click(logInCreateLocator);

            // enter email
            await sendKeys(emailLocator, email);

            // enter password
            await sendKeys(passwordLocator, password);

            // click Sign In button
            await click(signInButtonLocator);

            // click Elementary School List
            await click(eSchoolMenuLocator);

            // select Language Arts item
            await click(eSchoolUlLi1Locator);

            // click third element in Elementary School Menu
            await click(langArtsLi3Locator);

            // click Add to With List first item
            await click(addToWishListLi1Locator);

            // click My Wishlist popUp
            await click(myWishlistPopUpLocator);

            // hover under the first item in Wish List
            await driver.actions().move({ duration: 100, origin: driver.findElement(wishListLi1Locator), x: 0, y: 0 })
                .perform();

            // click add to cart
            await click(addToCartFromWishListLocator);

            // select studentEditioneBook option
            await click(studentEditioneBookLocator);

            // click add to card
            await click(addToCardLocator);

            // enter qty 25
            await sendKeys(qtyLocator, '25');

            // wait 2 seconds
            await driver.sleep(2000);

            // click add to card
            await click(addToCardLocator);

            // assert
            await driver.sleep(2000);
            let actualTitle = await driver.getTitle();
            expect(actualTitle).not.equal('404 Not Found | Perfection Learning');
        }

        finally {
            //await driver.sleep(10000);
            await driver.quit();
        }

    });
});