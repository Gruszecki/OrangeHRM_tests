import { onLoginPage } from "../support/page_objects/loginPage"

describe('Login to Dashboard', () => {
    // beforeEach('Go to login page', () => {
    //     cy.openLoginPage()
    //     onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
    // })

    it('01_correctCreds', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
        onLoginPage.verifyLoginPass()
    })

    it('02_wrongCreds', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData('wrong_username', 'wrong_password')
        onLoginPage.verifyLoginFail()
    })

    it('03_wrongUsername', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData('wrong_username', Cypress.env('password'))
        onLoginPage.verifyLoginFail()
    })

    it('04_wrongPassword', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), 'wrong_password')
        onLoginPage.verifyLoginFail()
    })

    it('05_emptyCredentials', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData('', '')
        onLoginPage.verifyRequiredFields()
    })

    it('06_pageContent', () => {
        cy.openLoginPage()
        onLoginPage.verifyPageContent()
    })
})
    