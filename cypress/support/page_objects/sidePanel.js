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
}

export const sidePanel = new SidePanel()