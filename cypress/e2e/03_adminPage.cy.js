/// <reference types="cypress" />

let USERNAME = 'Wojciech'

import { onAddUserPage } from "../support/page_objects/addUserPage"
import { onAdminPage } from "../support/page_objects/adminPage"
import { onLoginPage } from "../support/page_objects/loginPage"
import { navigateTo } from "../support/page_objects/navigation"
import { enumUserRoles, enumUserStatus } from "../support/enums"

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
        // Create new user
    })

    beforeEach('Go to login page', () => {
        if(!onLoginPage.verifyLoginPass) {
            cy.openLoginPage()
            onLoginPage.submitLoginData(Cypress.env('username'), Cypress.env('password'))
        }
        navigateTo.adminPage()
    })

    it.only('Create valid user\'s right', () => {
        onAdminPage.clickAdd()
        onAddUserPage.saveNewUser(enumUserRoles.admin, undefined, enumUserStatus.enabled)
    })
})