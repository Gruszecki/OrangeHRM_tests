/// <reference types="cypress" />

import { general } from "../../support/general"
import { onJobTitlesPage } from "../../support/page_objects/adminPage/job/jobTitles"
import { onPayGradesPage } from "../../support/page_objects/adminPage/job/paygrades"
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
        onJobTitlesPage.verifyPageContent()
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
        onJobTitlesPage.fillFieldsAddJobTitle(title, description)
        general.clickButton('Save')
        general.verifyToast('Successfully Saved')
        onJobTitlesPage.verifyJobTitlePresence(title, description)

        general.deleteTabelContent(title)
    })

    it('Add job title - long description', () => {
        const title = 'Janitor ' + general.generateRandomId()
        const description =  "The job of a janitor involves cleaning and maintaining the cleanliness of buildings, including sweeping, mopping, and dusting. They are also responsible for ensuring that the premises are secure and addressing any maintenance issues that may arise."

        general.clickButton('Add')
        onJobTitlesPage.fillFieldsAddJobTitle(title, description)
        general.clickButton('Save')
        general.verifyToast('Successfully Saved')
        onJobTitlesPage.verifyJobTitlePresence(title, description)

        general.deleteTabelContent(title)
    })

    it('Edit job title and description', () => {
        const former_title = 'Janitor ' + general.generateRandomId()
        const updated_title = `${former_title} updated`
        const former_description =  "Maintaining cleanliness and security."
        const updated_description =  "Security and maintaining cleanliness."

        general.clickButton('Add')
        onJobTitlesPage.fillFieldsAddJobTitle(former_title, former_description)
        general.clickButton('Save')
        general.verifyToast('Successfully Saved')
        onJobTitlesPage.verifyJobTitlePresence(former_title, former_description)

        onJobTitlesPage.editJobTitle(former_title)
        onJobTitlesPage.fillFieldsAddJobTitle(updated_title, updated_description)
        general.clickButton('Save')
        general.verifyToast('Successfully Updated')
        onJobTitlesPage.verifyJobTitlePresence(updated_title, updated_description)

        general.deleteTabelContent(updated_title)
    })

    it('Remove job title', () => {
        const title = 'Janitor ' + general.generateRandomId()

        general.clickButton('Add')
        onJobTitlesPage.fillFieldsAddJobTitle(title)
        general.clickButton('Save')
        general.verifyToast('Successfully Saved')
        onJobTitlesPage.verifyJobTitlePresence(title)

        general.deleteTabelContent(title)
        general.verifyToast('Successfully Deleted')
        onJobTitlesPage.verifyJobTitleAbsence(title)
    })
})

describe('Pay Grades CRUD', () => {
    beforeEach('Go to login page', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
        navigateTo.adminPage()
        navigateTo.topbarMenuItem('Job', 'Pay Grades')
    })

    it.only('Add pay grade name only', () => {
        const name = 'Grade ' + general.generateRandomId()

        general.clickButton('Add')
        general.fillInputBox('Name', name)
        general.clickButton('Save')

        cy.wait(1000)
        navigateTo.topbarMenuItem('Job', 'Pay Grades')
        onPayGradesPage.verifyPayGradeNameAndCurrency(name)

        general.deleteTabelContent(name)
    })

    it.only('Add pay grade name and currency - no salary', () => {
        const name = 'Grade ' + general.generateRandomId()
        const currency = 'PLN - Polish Zloty'

        general.clickButton('Add')
        general.fillInputBox('Name', name)
        general.clickButton('Save')

        general.clickButton('Add')
        general.selectFromDropdown('Currency', currency)
        onPayGradesPage.clickSaveCurrency()

        cy.wait(1000)
        navigateTo.topbarMenuItem('Job', 'Pay Grades')
        general.deleteTabelContent(name)
    })
})