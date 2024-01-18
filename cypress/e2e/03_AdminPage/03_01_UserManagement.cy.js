/// <reference types="cypress" />

import { onAddUserPrivilegesPage } from "../../support/page_objects/addUserPrivilegesPage"
import { onAdminPage } from "../../support/page_objects/adminPage"
import { onLoginPage } from "../../support/page_objects/loginPage"
import { navigateTo } from "../../support/page_objects/navigation"
import { enumAddEmployeeLabels, enumAddUserPrivilegesLabels, enumUserRoles, enumUserStatus } from "../../support/enums"
import { onPimPage } from "../../support/page_objects/pimPage"
import { onAddEmployeePage } from "../../support/page_objects/addEmployeePage"
import { general } from "../../support/general"
import { onEditUserPrivilegesPage } from "../../support/page_objects/editUserPrivilegesPage"

describe('Admin/User Management page content', () => {
    beforeEach('Go to login page', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
        navigateTo.adminPage()
    })

    it('Verify page content', () => {
        onAdminPage.verifyUserManagementContent()
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
        general.clickButton('Add')

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

    after('Delete created user', () => {
        navigateTo.pimPage()
        onPimPage.deleteUserById(EMPLOYEE_ID)
    })

    it('Cancel adding user\'s privileges', () => {
        general.clickButton('Add')
        onAddUserPrivilegesPage.fillFields(
            enumUserRoles.admin, 
            `${FIRSTNAME} ${LASTNAME}`, 
            enumUserStatus.enabled, 
            USERNAME, 
            PASSWORD, 
            PASSWORD
        )
        general.clickButton('Cancel')
        navigateTo.adminPage()

        onAdminPage.verifyNoUserFoundInTable(USERNAME)
        general.verifyToast('No Records Found')
    })

    it('Create user\'s privileges: empty required fields', () => {
        general.clickButton('Add')
        general.clickButton('Save')

        let listOfMissingRequiredValues = Object.values(enumAddUserPrivilegesLabels)
        onAddUserPrivilegesPage.verifyRequiredFields(listOfMissingRequiredValues)
    })

    it('Create user\'s privileges: valid data', () => {
        general.clickButton('Add')
        onAddUserPrivilegesPage.fillFields(
            enumUserRoles.admin, 
            `${FIRSTNAME} ${LASTNAME}`, 
            enumUserStatus.enabled, 
            USERNAME, 
            PASSWORD, 
            PASSWORD
        )
        general.clickButton('Save')

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

    it('Filter user role', () => {
        onAdminPage.editUserPrivileges(USERNAME)
        onEditUserPrivilegesPage.editPrivileges(enumUserRoles.admin)
        general.verifyToast('Successfully Updated')
        
        cy.wrap(onAdminPage.verifyFilteredData(undefined, enumUserRoles.admin))
        onAdminPage.editUserPrivileges(USERNAME)
        onEditUserPrivilegesPage.editPrivileges(enumUserRoles.ess)
        general.verifyToast('Successfully Updated')
        onAdminPage.verifyFilteredData(undefined, enumUserRoles.ess)
    })

    it('Filter user status', () => {
        onAdminPage.editUserPrivileges(USERNAME)
        onEditUserPrivilegesPage.editPrivileges(undefined, undefined, enumUserStatus.disabled)
        general.verifyToast('Successfully Updated')

        onAdminPage.verifyFilteredData(undefined, undefined, undefined, enumUserStatus.disabled)
        onAdminPage.editUserPrivileges(USERNAME)
        onEditUserPrivilegesPage.editPrivileges(undefined, undefined, enumUserStatus.enabled)
        general.verifyToast('Successfully Updated')
        onAdminPage.verifyFilteredData(undefined, undefined, undefined, enumUserStatus.enabled)
    })

    it('Reset filter settings', () => {
        onAdminPage.fillFields(USERNAME, enumUserRoles.ess, `${FIRSTNAME} ${LASTNAME}`, enumUserStatus.enabled)
        general.clickButton('Reset')
        onAdminPage.verifyInputFieldsEmpty()
    })

    it('Delete user\'s privileges', () => {
        onAdminPage.deleteUsersPrivilegesByUsername(USERNAME)
        general.verifyToast('Successfully Deleted')
        onAdminPage.verifyNoUserFoundInTable(USERNAME)
    })
})