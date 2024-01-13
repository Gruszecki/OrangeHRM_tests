/// <reference types="cypress" />

import { enumSidePanelNames } from "../support/enums"
import { general } from "../support/general"
import { onLoginPage } from "../support/page_objects/loginPage"
import { navigateTo } from "../support/page_objects/navigation"


function searchInSidePanel(text) {
    cy.get('.oxd-sidepanel input').clear().type(text)
}

function verifySearch(text) {
    cy.get('.oxd-main-menu .oxd-main-menu-item').then(menuItem => {
        cy.wrap(menuItem).should('have.length', 1)
        cy.wrap(menuItem).should('contain', text)
    })
}

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

    it.only('Search box', () => {
        for (const key in enumSidePanelNames) {
            searchInSidePanel(enumSidePanelNames[key])
            verifySearch(enumSidePanelNames[key])
        }
    })
})