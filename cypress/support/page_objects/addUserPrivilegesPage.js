import { enumAddUserPrivilegesLabels } from "../enums"
import { general } from "../general"

class AddUserPrivilegesPage {
    fillFields(userRole, employeeName, userStatus, username, password, confirmPassword) {
        if(userRole) { general.selectFromDropdown(enumAddUserPrivilegesLabels.userRole, userRole) }
        if(employeeName) { general.fillInputBoxWithHint(enumAddUserPrivilegesLabels.employeeName, employeeName) }
        if(userStatus) { general.selectFromDropdown(enumAddUserPrivilegesLabels.status, userStatus) }
        if(username) { general.fillInputBox(enumAddUserPrivilegesLabels.username, username) }
        if(password) { general.fillInputBox(enumAddUserPrivilegesLabels.password, password) }
        if(confirmPassword) { general.fillInputBox(enumAddUserPrivilegesLabels.confirmPassword, confirmPassword) }
    }

    verifyRequiredFields(listOfMissingRequiredValues) {
        cy.get('.oxd-input-field-error-message').should('have.length', listOfMissingRequiredValues.length).then(errorMsgs => {
            cy.wrap(errorMsgs).each(errorMsg => {
                cy.wrap(errorMsg).parents('.oxd-input-group').find('.oxd-label').invoke('text').then(errorFieldLabelText => {
                    cy.wrap(listOfMissingRequiredValues).should('include', errorFieldLabelText)
                })
            })
        })
    }
}

export const onAddUserPrivilegesPage = new AddUserPrivilegesPage()