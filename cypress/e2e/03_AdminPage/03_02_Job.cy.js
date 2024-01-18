/// <reference types="cypress" />

import { general } from "../../support/general"
import { onAdminPage } from "../../support/page_objects/adminPage"
import { onLoginPage } from "../../support/page_objects/loginPage"
import { navigateTo } from "../../support/page_objects/navigation"

describe('Admin/Job page content', () => {
    beforeEach('Go to login page', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
        navigateTo.adminPage()
        navigateTo.topbarMenuItem('Job', 'Job Titles')
    })

    it('Verify page content', () => {
        onAdminPage.verifyJobContent()
    })
})

describe('Job Title CRUD', () => {
    beforeEach('Go to login page', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
        navigateTo.adminPage()
        navigateTo.topbarMenuItem('Job', 'Job Titles')
    })

    it('Add job title - short description', () => {
        const title = 'Janitor ' + general.generateRandomId()
        const description =  "Maintaining cleanliness and security."

        general.clickButton('Add')
        onAdminPage.fillFieldsAddJobTitle(title, description)
        general.clickButton('Save')
        general.verifyToast('Successfully Saved')
        onAdminPage.verifyJobTitlePresence(title, description)
    })

    it('Add job title - long description', () => {
        const title = 'Janitor ' + general.generateRandomId()
        const description =  "The job of a janitor involves cleaning and maintaining the cleanliness of buildings, including sweeping, mopping, and dusting. They are also responsible for ensuring that the premises are secure and addressing any maintenance issues that may arise."

        general.clickButton('Add')
        onAdminPage.fillFieldsAddJobTitle(title, description)
        general.clickButton('Save')
        general.verifyToast('Successfully Saved')
        onAdminPage.verifyJobTitlePresence(title, description)
    })
})