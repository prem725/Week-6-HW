import {test,expect} from  "@playwright/test"
import credentials from "../../../testData/leaftaps.json"

test.describe.serial("role based testing for leaftaps",()=>{
for(let credential of credentials){
test(`test leaftaps login using the role:${credential.role}`,async({page})=>{

// 1. Navigate
    await page.goto("http://leaftaps.com/opentaps/control/main")
// 2. Enter the username and password 
    await page.getByLabel("Username").fill(credential.username)
    await page.getByLabel("Password").fill(credential.password)
// 3. Click Login 
    await page.getByRole("button",{name:"Login"}).click()
// 4. Click CRM/SFA 
    await page.getByText("CRM/SFA").click()
// 5. Click Leads 
    await page.locator(`//a[text()='Leads']`).click()
// 6. Click Create Leads 
    await page.locator(`//a[text()='Create Lead']`).click()
// 7. Fill all the mandatory fields such as Company name, First name and Last name 
    await page.locator(`#createLeadForm_companyName`).fill(credential.companyName)
    await page.locator(`#createLeadForm_firstName`).fill("Prem kumar")
    await page.locator(`#createLeadForm_lastName`).fill("A")
// 8. Select Direct Mail from the Source dropdown using label 
    await page.selectOption(`#createLeadForm_dataSourceId`,{value:'Playwright'})
// 9. Select Demo Marketing Campaign from the Marketing Campaign dropdown using value 
     await page.selectOption(`#createLeadForm_marketingCampaignId`,{value:'DEMO_MKTG_CAMP'})
// 10. Get the count and print all the values in the Marketing Campaign dropdown 
    const marketingOptions = await page.locator('#createLeadForm_marketingCampaignId option').allTextContents()
    console.log(`Marketing Campaign Count : ${marketingOptions.length}`)
    console.log('Marketing Campaign Values:')
    marketingOptions.forEach((option) => console.log(option))
// 11. Select General Services from the Industry dropdown using index
    await page.selectOption('#createLeadForm_industryEnumId', {index: 6})
// 12. Select INR from the Preferred Currency dropdown 
    await page.selectOption('#createLeadForm_currencyUomId', {label: 'INR - Indian Rupee'})
// 13. Select India from the Country dropdown 
    await page.selectOption('#createLeadForm_generalCountryGeoId', {label: 'India'})
// 14. Select any state from the State dropdown  
    await page.selectOption('#createLeadForm_generalStateProvinceGeoId', {value: 'USA-84057'})
// 15. Get the count of all states and print the values in the console
    const states = await page.locator('#createLeadForm_generalStateProvinceGeoId option').allTextContents()
     console.log(`State Count : ${states.length}`)
     console.log('States List:')
     states.forEach((state) => console.log(state))
// 16. Click Create Lead
    await page.getByRole('button', {name:"Create Lead"}).click()
    await expect(page).toHaveTitle(/View Lead/)
    console.log('Lead created successfully')
})
}
})