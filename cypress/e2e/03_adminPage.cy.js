/// <reference types="cypress" />

import { onAddUserPrivilegesPage } from "../support/page_objects/addUserPrivilegesPage"
import { onAdminPage } from "../support/page_objects/adminPage"
import { onLoginPage } from "../support/page_objects/loginPage"
import { navigateTo } from "../support/page_objects/navigation"
import { enumUserRoles, enumUserStatus } from "../support/enums"
import { onPimPage } from "../support/page_objects/pimPage"
import { onAddEmployeePage } from "../support/page_objects/addEmployeePage"
import { topbar } from "../support/page_objects/topbar"

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
    before('Create new user', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
        navigateTo.pimPage()
        onPimPage.clickAdd()
        onAddEmployeePage.saveNewUser('John', undefined, 'Montelupi')
        topbar.logout()
    })

    beforeEach('Go to login page', () => {
        cy.openLoginPage()
        onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
        navigateTo.adminPage()
    })

    it.only('Create valid user\'s right', () => {
        onAdminPage.clickAdd()
        onAddUserPrivilegesPage.saveNewUser(enumUserRoles.admin, undefined, enumUserStatus.enabled)
    })
})