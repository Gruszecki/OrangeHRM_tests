import { enumAddUserPrivilegesLabels, enumUserStatus } from "../../../enums"
import { general } from "../../../general"

class AdminPage {
    fillFields(username, userRole, employeeName, status) {
        if (username) { general.fillInputBox(enumAddUserPrivilegesLabels.username, username) }
        if (userRole) { general.selectFromDropdown(enumAddUserPrivilegesLabels.userRole, userRole) }
        if (employeeName) { general.fillInputBoxWithHint(enumAddUserPrivilegesLabels.employeeName, employeeName) }
        if (status) { general.selectFromDropdown(enumAddUserPrivilegesLabels.status, status) }
    }

    deleteUsersPrivilegesByUsername(username) {
        this.fillFields(username)
        general.clickButton('Search')
        cy.contains('.oxd-table-row', username).then(tableRow => {
            cy.wrap(tableRow).find('.bi-trash').click()
            general.clickButton('Yes, Delete')
        })
    }

    editUserPrivileges(username) {
        this.fillFields(username)
        general.clickButton('Search')
        cy.contains('.oxd-table-row', username).then(tableRow => {
            general.clickPencil(tableRow)
        })
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


    verifyUsersPrivileges(username, userRole, employeeName, status) {
        this.fillFields(username)
        general.clickButton('Search')

        cy.contains('.oxd-table-row', username).then(tableRow => {
            cy.wrap(tableRow).should('contain', userRole)
            cy.wrap(tableRow).should('contain', employeeName)
            cy.wrap(tableRow).should('contain', status)
        })
    }

    verifyNoUserFoundInTable(username) {
        this.fillFields(username)
        general.clickButton('Search')
        general.verifyNoUserFoundInTable()
    }

    verifyFilteredData(username, userRole, employeeName, status) {
        cy.wrap(onAdminPage.fillFields(username, userRole, employeeName, status)).then(() => {
            cy.wrap(general.clickButton('Search')).then(() => {
                cy.wait(1000)
                cy.get('.oxd-table-body .oxd-table-row').each(tableRow => {
                    if (username) { cy.wrap(tableRow).should('contain', username) }
                    if (userRole) { cy.wrap(tableRow).should('contain', userRole) }
                    if (employeeName) { cy.wrap(tableRow).should('contain', employeeName) }
                    if (status) { cy.wrap(tableRow).should('contain', status) }
                })
            })
        })
    }

    verifyInputFieldsEmpty() {
        cy.get('input').each(input => {
            cy.wrap(input).invoke('text').should('contain', '')
        })

        cy.get('.oxd-select-text-input').each(selectInput => {
            cy.wrap(selectInput).should('contain', enumUserStatus.select)
        })
    }

}

export const onAdminPage = new AdminPage()