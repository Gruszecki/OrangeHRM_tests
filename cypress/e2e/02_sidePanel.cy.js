import { onLoginPage } from "../support/page_objects/loginPage"
import { navigateTo } from "../support/page_objects/navigationPage"

describe('Operations with side panel', () => {
    beforeEach('Go to login page', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
    })

    it('Verify navigation across the pages', () => {
        navigateTo.adminPage()
        navigateTo.pimPage()
        navigateTo.leavePage()
        navigateTo.timePage()
        navigateTo.recruitmentPage()
        navigateTo.myInfoPage()
        navigateTo.performancePage()
        navigateTo.dashboardPage()
        navigateTo.directoryPage()
        navigateTo.maintenancePage()
        navigateTo.claimPage()
        navigateTo.buzzPage()
    })


    
})