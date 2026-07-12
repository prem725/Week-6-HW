import {test,expect} from "@playwright/test"


test.describe("salesforce Tests cases",()=>{
   //Reuse session and verify homepage
    
    test.use({storageState:`../../../testData/salesAuth.json`})
    //if we use test only, only this tc will run
    //test.only("logged in using saved Authentication",async({page})=>{
    test("logged in using saved Authentication",async({page})=>{
    await page.goto('https://testleaf.my.salesforce.com/')
    // Verify Salesforce home page using title
    const pagetitle = await page.title()
    console.log("Title of the page is :"+pagetitle)
    await expect(page).toHaveTitle(/Salesforce/)
    })
    
    //Navigate to page  test.slow()
    test("will test slowly", async({page})=>{
    await page.goto('https://testleaf.my.salesforce.com/')
    test.slow() //Triple the timeout for a slow-running test.
    await page.getByRole('link',{name:'Leads'}).click()
    await expect(page).toHaveTitle(/Leads/)
    })

    //Invalid session fi test.fail()
    test.fail("test case will fail",async({page})=>{
    await page.goto('https://testleaf.my.salesforce.com/')
    await page.getByRole("textbox", { name: 'Username' }).fill('dilipkumar.rajendran@testleaf.com')
    await page.getByLabel("Password",{exact: true}).fill('TestLeaf@2025')
    })

})