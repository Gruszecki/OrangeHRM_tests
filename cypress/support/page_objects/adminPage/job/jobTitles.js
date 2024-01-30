import { general } from "../../../general"

class JobTitlesPage {
    fillFieldsAddJobTitle(jobTitle, jobDescription, jobSpecification, note) {
        if (jobTitle) { general.fillInputBox('Job Title', jobTitle) }
        if (jobDescription) { general.fillTextArea('Job Description', jobDescription) }
        // TODO: Job Specification
        if (note) { general.fillTextArea('Job Description', note) }
    }

    editJobTitle(jobTitle) {
        cy.contains('.oxd-table-row', jobTitle).then(tableRow => {
            general.clickPencil(tableRow)
        })
    }
    
    verifyPageContent() {
        cy.get('.oxd-topbar-header-title h6').then(topbarTitle => {
            cy.wrap(topbarTitle)
                .should('contain', 'Admin')
                .and('contain', 'Job')
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

    verifyJobTitleAbsence(title) {
        cy.get('.oxd-table-row').each(row => {
            cy.wrap(row).should('not.contain', title)
        })
    }
}

export const onJobTitlesPage = new JobTitlesPage()