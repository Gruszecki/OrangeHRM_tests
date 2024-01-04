class SidePanel {
    show() {
        cy.get('button .bi-chevron-right').click()
    }

    hide() {
        cy.get('button .bi-chevron-left').click()
    }

    getWidth() {
        return cy.get('.oxd-navbar-nav').invoke('prop', 'offsetWidth')
    }

    logout() {
        cy.get('.oxd-topbar-header-userarea').then(userArea => {
            cy.wrap(userArea).find('i').click()
            cy.wrap(userArea).find('li', 'Logout').click()
        })
    }
}

export const sidePanel = new SidePanel()