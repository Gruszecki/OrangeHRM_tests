/// <reference types="cypress" />

import { onAddUserPrivilegesPage } from "../support/page_objects/addUserPrivilegesPage"
import { onAdminPage } from "../support/page_objects/adminPage"
import { onLoginPage } from "../support/page_objects/loginPage"
import { navigateTo } from "../support/page_objects/navigation"
import { enumAddEmployeeLabels, enumAddUserPrivilegesLabels, enumUserRoles, enumUserStatus } from "../support/enums"
import { onPimPage } from "../support/page_objects/pimPage"
import { onAddEmployeePage } from "../support/page_objects/addEmployeePage"
import { general } from "../support/general"
import { onEditUserPrivilegesPage } from "../support/page_objects/editUserPrivilegesPage"

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
    var PASSWORD = general.generateRandomPassword(10)
    var USERNAME = `${FIRSTNAME.charAt(0)}${LASTNAME}`
    var EMPLOYEE_ID = undefined // general.generateRandomId()

    console.log(`Generated user name: ${FIRSTNAME} ${MIDDLENAME} ${LASTNAME}`)

    before('Create new user', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
        navigateTo.pimPage()
        onPimPage.clickAdd()

        // Get user ID if not provided
        if (!EMPLOYEE_ID) {
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
        }

        onAddEmployeePage.saveNewUser(FIRSTNAME, undefined, LASTNAME, EMPLOYEE_ID)
        general.logout()
    })

    beforeEach('Go to login page', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
        navigateTo.adminPage()
    })

    // after('Delete created user', () => {
    //     navigateTo.pimPage()
    //     onPimPage.deleteUserById(EMPLOYEE_ID)
    // })

    it('Cancel adding user\'s privileges', () => {
        onAdminPage.clickAdd()
        onAddUserPrivilegesPage.fillFields(
            enumUserRoles.admin, 
            `${FIRSTNAME} ${LASTNAME}`, 
            enumUserStatus.enabled, 
            USERNAME, 
            PASSWORD, 
            PASSWORD
        )
        onAddUserPrivilegesPage.clickCancel()
        navigateTo.adminPage()

        onAdminPage.verifyNoUserFoundInTable(USERNAME)
        general.verifyToast('No Records Found')
    })

    it.only('Create user\'s privileges: empty data', () => {
        onAdminPage.clickAdd()
        onAddUserPrivilegesPage.clickSave()

        let listOfMissingRequiredValues = Object.values(enumAddUserPrivilegesLabels)
        onAddUserPrivilegesPage.verifyRequiredFields(listOfMissingRequiredValues)
    })

    it('Create user\'s privileges: valid data', () => {
        onAdminPage.clickAdd()
        onAddUserPrivilegesPage.fillFields(
            enumUserRoles.admin, 
            `${FIRSTNAME} ${LASTNAME}`, 
            enumUserStatus.enabled, 
            USERNAME, 
            PASSWORD, 
            PASSWORD
        )
        onAddUserPrivilegesPage.clickSave()

        general.verifyToast('Successfully Saved')
        navigateTo.adminPage()
        onAdminPage.verifyUsersPrivileges(USERNAME, enumUserRoles.admin, `${FIRSTNAME} ${LASTNAME}`, enumUserStatus.enabled)
    })

    it('Update user\'s privileges data: valid data', () => {
        onAdminPage.editUserPrivileges(USERNAME)

        USERNAME = `${FIRSTNAME}${LASTNAME}`
        onEditUserPrivilegesPage.editPrivileges(enumUserRoles.ess, undefined, enumUserStatus.disabled, USERNAME)
        general.verifyToast('Successfully Updated')
        navigateTo.adminPage()
        onAdminPage.verifyUsersPrivileges(USERNAME, enumUserRoles.ess, `${FIRSTNAME} ${LASTNAME}`, enumUserStatus.disabled)
    })

    it('Delete user\'s privileges', () => {
        onAdminPage.deleteUsersPrivilegesByUsername(USERNAME)
        general.verifyToast('Successfully Deleted')
        onAdminPage.verifyNoUserFoundInTable(USERNAME)
    })
})