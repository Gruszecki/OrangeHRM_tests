import { general } from "../general"
import { PageInputSystem } from "../pageInputSystem"

class loginPage extends PageInputSystem{
    fillFields(username, password) {
        if (username) { general.fillInputBox('Username', username) }
        if (password) { general.fillInputBox('Password', password) }
    }

    submitLoginData(username, password) {
        this.fillFields(username, password) 
        general.clickButton('Login')
    }

    verifyLoginPass() {
        cy.get('.oxd-topbar-header-userarea').should('exist')
    }

    verifyLoginFail() {
        cy.get('.oxd-alert').invoke('text').should('contain', 'Invalid credentials')
    }

    verifyRequiredFields() {
        cy.contains('.oxd-form-row', 'Username')
            .find('.oxd-text')
            .invoke('text')
            .should('contain', 'Required')
        cy.contains('.oxd-form-row', 'Password')
            .find('.oxd-text')
            .invoke('text')
            .should('contain', 'Required')
    }

    verifyPageContent() {
        cy.get('.orangehrm-login-title').invoke('text').should('contain', 'Login')
        cy.get('input[name="username"]').invoke('attr', 'placeholder').should('contain', 'Username')
        cy.get('input[name="password"]').invoke('attr', 'placeholder').should('contain', 'Password')
        cy.get('button[type="submit"]').invoke('text').should('contain', 'Login')
    }
}

export const onLoginPage = new loginPage()