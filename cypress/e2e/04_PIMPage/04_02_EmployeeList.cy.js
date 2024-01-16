/// <reference types="cypress" />

import { onLoginPage } from "../../support/page_objects/loginPage"
import { navigateTo } from "../../support/page_objects/navigation"
import { onPimPage } from "../../support/page_objects/pimPage"

describe('PIM page content', () => {
    beforeEach('Go to login page', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
        navigateTo.pimPage()
    })

    it('Verify page content', () => {
        onPimPage.verifyPageContent()
    })
})