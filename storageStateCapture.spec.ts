import {test,expect} from "@playwright/test"

test("Saving login authentication information for SalesForce site",async({page})=>{
    //Launch browser
    //Navigate to Salesforce login
    await page.goto('https://login.salesforce.com')
    await page.getByRole("textbox", { name: 'Username' }).fill('dilipkumar.rajendran@testleaf.com')
    await page.getByLabel("Password",{exact: true}).fill('TestLeaf@2025')
    //Perform login
    await page.getByRole("button",{ name :'Log In'}).click()
    //Save storage state as sf-storage.json
    await page.context().storageState({path:(`../../../testData/salesAuth.json`)})
   //adding assertion to make sure page loaded fully
     await expect(page).toHaveTitle(/Salesforce/)
    //Retrieves all data stored in browser's local storage
    // printing the locat storage
    const localData = await page.evaluate(() => ({...localStorage}));
    console.log('local storage state is captured',localData)
})