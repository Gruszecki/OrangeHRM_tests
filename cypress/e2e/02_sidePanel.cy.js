/// <reference types="cypress" />

import { onLoginPage } from "../support/page_objects/loginPage"
import { navigateTo } from "../support/page_objects/navigation"
import { sidePanel } from "../support/page_objects/sidePanel"

describe('Operations with side panel', () => {
    beforeEach('Go to login page', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
    })

    it('Navigation across the pages', () => {
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

    it('Hide/show side panel', () => {
        sidePanel.hide()
        sidePanel.getWidth().should('equal', 83)
        sidePanel.show()
        sidePanel.getWidth().should('equal', 256)
    })
    
})