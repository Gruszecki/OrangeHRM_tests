import { enumEmployeeInformationLabels } from "../enums"
import { general } from "../general"
import { PageInputSystem } from "../pageInputSystem"

class PimPage extends PageInputSystem{
    fillFields(employeeName, employeeId, employmentStatus, include, supervisorName, jobTitle, subUnit) {
        if(employeeName) { general.fillInputBoxWithHint(enumEmployeeInformationLabels.employeeName, employeeName) }
        if(employeeId) { general.fillInputBox(enumEmployeeInformationLabels.employeeId, employeeId) }
        if(employmentStatus) { general.selectFromDropdown(enumEmployeeInformationLabels.employmentStatus, employmentStatus) }
        if(include) { general.selectFromDropdown(enumEmployeeInformationLabels.include, include) }
        if(supervisorName) { general.fillInputBoxWithHint(enumEmployeeInformationLabels.supervisorName, supervisorName) }
        if(jobTitle) { general.selectFromDropdown(enumEmployeeInformationLabels.jobTitle, jobTitle) }
        if(subUnit) { general.selectFromDropdown(enumEmployeeInformationLabels.subUnit, subUnit) }
    }

    deleteUserById(id) {
        this.fillFields(undefined, id)
        this.clickSearch()
        cy.contains('.oxd-table-row', id).then(tableRow => {
            cy.wrap(tableRow).find('.bi-trash').click()
            general.clickButton('Yes, Delete')
            general.verifyToast('Successfully Deleted')
        })
    }

    verifyPageContent() {
        cy.get('.oxd-topbar-header-title h6').should('contain', 'PIM')
        cy.get('.oxd-topbar-body nav[role="navigation"] li').then(topbarMenu => {
            cy.wrap(topbarMenu)
                .should('contain', 'Configuration')
                .and('contain', 'Employee List')
                .and('contain', 'Add Employee')
                .and('contain', 'Reports')
        })
        cy.get('.oxd-table-filter').then(filterBar => {
            cy.wrap(filterBar)
                .should('contain', 'Employee Information')
                .and('contain', 'Employee Name')
                .and('contain', 'Employee Id')
                .and('contain', 'Employment Status')
                .and('contain', 'Include')
                .and('contain', 'Supervisor Name')
                .and('contain', 'Job Title')
                .and('contain', 'Sub Unit')
            cy.wrap(filterBar).find('input').should('have.length', 3)
            cy.wrap(filterBar).find('.oxd-select-wrapper').should('have.length', 4)
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

export const onPimPage = new PimPage()