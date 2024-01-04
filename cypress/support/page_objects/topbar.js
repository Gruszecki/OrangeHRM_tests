class Topbar {
    logout() {
        cy.get('.oxd-topbar-header-userarea').then(userArea => {
            cy.wrap(userArea).find('i').click()
            cy.wrap(userArea).find('li').eq(4).should('contain', 'Logout').click()
        })
    }
}

export const topbar = new Topbar()