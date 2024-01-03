class AdminPage {
    clickAdd() {
        cy.contains('button', 'Add').click()
    }

    verifyPageContent() {
        cy.get('.oxd-topbar-header-title h6').then(topbarTitle => {
            cy.wrap(topbarTitle)
                .should('contain', 'Admin')
                .and('contain', 'User Management')
        })
        cy.get('.oxd-topbar-body nav[role="navigation"] li').then(topbarMenu => {
            cy.wrap(topbarMenu)
                .should('contain', 'User Management')
                .and('contain', 'Job')
                .and('contain', 'Organization')
                .and('contain', 'Qualifications')
                .and('contain', 'Nationalities')
                .and('contain', 'Corporate Branding')
                .and('contain', 'Configuration')
        })
        cy.get('.oxd-table-filter').then(filterBar => {
            cy.wrap(filterBar)
                .should('contain', 'System Users')
                .and('contain', 'Username')
                .and('contain', 'User Role')
                .and('contain', 'Employee Name')
                .and('contain', 'Status')
            cy.wrap(filterBar).find('input').should('have.length', 2)
            cy.wrap(filterBar).find('.oxd-select-wrapper').should('have.length', 2)
            cy.wrap(filterBar).find('button')
                .should('contain', 'Reset')
                .and('contain', 'Search')
        })
        cy.get('.orangehrm-paper-container').then(records => {
            cy.wrap(records).find('button').should('contain', 'Add')
            cy.wrap(records).find('.orangehrm-container')
        })
    }


}

export const onAdminPage = new AdminPage()