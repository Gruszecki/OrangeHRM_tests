import { enumAddUserPrivilegesLabels, enumUserStatus } from "../enums"
import { general } from "../general"

class AdminPage {
    fillFields(username, userRole, employeeName, status) {
        if (username) { general.fillInputBox(enumAddUserPrivilegesLabels.username, username) }
        if (userRole) { general.selectFromDropdown(enumAddUserPrivilegesLabels.userRole, userRole) }
        if (employeeName) { general.fillInputBoxWithHint(enumAddUserPrivilegesLabels.employeeName, employeeName) }
        if (status) { general.selectFromDropdown(enumAddUserPrivilegesLabels.status, status) }
    }

    fillFieldsAddJobTitle(jobTitle, jobDescription, jobSpecification, note) {
        if (jobTitle) { general.fillInputBox('Job Title', jobTitle) }
        if (jobDescription) { general.fillTextArea('Job Description', jobDescription) }
        // TODO: Job Specification
        if (note) { general.fillTextArea('Job Description', note) }
    }

    deleteUsersPrivilegesByUsername(username) {
        this.fillFields(username)
        general.clickButton('Search')
        cy.contains('.oxd-table-row', username).then(tableRow => {
            cy.wrap(tableRow).find('.bi-trash').click()
            general.clickButton('Yes, Delete')
            general.verifyToast('Successfully Deleted')
        })
    }

    editUserPrivileges(username) {
        this.fillFields(username)
        general.clickButton('Search')
        cy.contains('.oxd-table-row', username).then(tableRow => {
            cy.wrap(tableRow).find('.bi-pencil-fill').click()
        })
    }

    verifyUserManagementContent() {
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

    verifyJobContent() {
        cy.get('.oxd-topbar-header-title h6').then(topbarTitle => {
            cy.wrap(topbarTitle)
                .should('contain', 'Admin')
                .and('contain', 'Job')
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
        cy.get('.orangehrm-container').should('not.contain', '.oxd-table-body')
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
    
    verifyJobTitlePresence(title, description) {
        cy.get('.oxd-table-row').contains(title).parents('.oxd-table-row').then(row => {
            cy.wrap(row).should('contain', title)
            if (description) { 
                if (description.length >= 50) {
                    cy.wrap(row).should('contain', `${description.slice(0, 50)}...`)
                    cy.wrap(row).should('contain', 'Show More')
                } else {
                    cy.wrap(row).should('contain', description)
                }
            }
        })
    }
}

export const onAdminPage = new AdminPage()