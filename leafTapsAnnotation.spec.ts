import test from "@playwright/test";

test.describe("LeafTaps Test cases",()=>{
    //Login and verify homepage
    test("Login and verify homepage",async({page})=>
    {
    await page.goto("https://leaftaps.com/opentaps/control/login")
    await page.locator(`#username`).fill("democsr")
    await page.locator(`#password`).fill("crmsfa")
    await page.getByRole('button', {name:"Login"}).click()      
    await page.getByRole('link', {name:"CRM/SFA"}).click()
    const homepage = await page.title()
    console.log("Title of the home page is :"+homepage)
    })
    // Invalid login fi test.fail()
    test.fail("This test case should fail",async({page})=>
    {
    await page.goto("https://leaftaps.com/opentaps/control/login")
    await page.locator(`#username`).fill("democsr1")
    await page.locator(`#password`).fill("crmsfa")
    await page.getByRole('button', {name:"Login"}).click()      
    })
     // Incomplete flow fi test.fixme()
    test.fixme("This test case is having bug",async({page})=>
    {
        console.log(`This is a Known issue need to fix`)
    })
    //Optional -> test.skip()
    test.skip("we can skip this case",async({page})=>
    {
        console.log(`This test case is not requried for this iteration`)
    })
})



