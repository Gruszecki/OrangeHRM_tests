/// <reference types="cypress" />

import { onLoginPage } from "../support/page_objects/loginPage"

describe('Login to Dashboard', () => {
    it('Page content', () => {
        cy.openLoginPage()
        onLoginPage.verifyPageContent()
    })

    it.only('Correct credentials', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
        onLoginPage.verifyLoginPass()
    })

    it('Wrong credentials', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData('wrong_username', 'wrong_password')
        onLoginPage.verifyLoginFail()
    })

    it('Wrong username', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData('wrong_username', Cypress.env('password'))
        onLoginPage.verifyLoginFail()
    })

    it('Wrong password', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), 'wrong_password')
        onLoginPage.verifyLoginFail()
    })

    it('Empty credentials', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData('', '')
        onLoginPage.verifyRequiredFields()
    })
})
    