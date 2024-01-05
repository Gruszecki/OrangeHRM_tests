/// <reference types="cypress" />

import { onAddUserPrivilegesPage } from "../support/page_objects/addUserPrivilegesPage"
import { onAdminPage } from "../support/page_objects/adminPage"
import { onLoginPage } from "../support/page_objects/loginPage"
import { navigateTo } from "../support/page_objects/navigation"
import { enumAddEmployeeLabels, enumUserRoles, enumUserStatus } from "../support/enums"
import { onPimPage } from "../support/page_objects/pimPage"
import { onAddEmployeePage } from "../support/page_objects/addEmployeePage"
import { general } from "../support/page_objects/general"

describe('Admin page content', () => {
    beforeEach('Go to login page', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
        navigateTo.adminPage()
    })

    it('Verify page content', () => {
        onAdminPage.verifyPageContent()
    })
})

describe('User rights CRUD', () => {
    const FIRSTNAME = general.generateRandomName(3)
    const MIDDLENAME = general.generateRandomName(4)
    const LASTNAME = general.generateRandomName(5)
    const PASSWORD = general.generateRandomPassword(10)
    const USERNAME = `${FIRSTNAME.charAt(0)}${LASTNAME}`
    var EMPLOYEE_ID = ''

    console.log(`Generated user name: ${FIRSTNAME} ${MIDDLENAME} ${LASTNAME}`)

    before('Create new user', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
        navigateTo.pimPage()
        onPimPage.clickAdd()

        cy.get('.oxd-input-group').then(idLabel => {
            cy.wrap(idLabel)
                .contains(enumAddEmployeeLabels.employeeId)
                .parents('.oxd-input-group')
                .find('input')
                .invoke('prop', 'value')
                .then(readID => {
                    EMPLOYEE_ID = readID
                    console.log(`Employee ID: ${EMPLOYEE_ID}`)
                })
        })

        onAddEmployeePage.saveNewUser(FIRSTNAME, undefined, LASTNAME)
        general.logout()
    })

    beforeEach('Go to login page', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
        navigateTo.adminPage()
    })

    after('Delete created user', () => {
        navigateTo.pimPage()
        onPimPage.deleteUserById(EMPLOYEE_ID)
    })

    it.only('Create valid user\'s privileges', () => {
        onAdminPage.clickAdd()
        onAddUserPrivilegesPage.saveNewUser(
            enumUserRoles.admin, 
            `${FIRSTNAME} ${LASTNAME}`, 
            enumUserStatus.enabled, 
            USERNAME, 
            PASSWORD, 
            PASSWORD
        )

        general.verifySuccessToast()
        navigateTo.adminPage()
        onAdminPage.verifyNewUsersPrivileges(
            USERNAME, 
            enumUserRoles.admin, 
            `${FIRSTNAME} ${LASTNAME}`, 
            enumUserStatus.enabled
        )
    })
})