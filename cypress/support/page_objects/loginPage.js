class loginPage {
    submitLoginData(username, password) {
        if (username) {
            cy.get('input[name="username"]').type(username)
        }
        
        if (password) {
            cy.get('input[type="password"]').type(password)
        }
        
        cy.get('button[type="submit"]').click()
    }

    verifyLoginPass() {
        cy.get('header').should('contain', 'Dashboard')
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