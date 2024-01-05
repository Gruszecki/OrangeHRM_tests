/// <reference types="cypress" />

import { general } from "../support/page_objects/general"
import { onLoginPage } from "../support/page_objects/loginPage"
import { navigateTo } from "../support/page_objects/navigation"

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
        general.hideSidePanel()
        general.getSidePanelWidth().should('equal', 83)
        general.showSidePanel()
        general.getSidePanelWidth().should('equal', 256)
    })
    
})