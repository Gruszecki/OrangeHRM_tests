import { enumAddUserPrivilegesLabels } from "../enums";
import { general } from "../general";
import { PageInputSystem } from "../pageInputSystem";

class EditUserPrivilegesPage extends PageInputSystem {
    fillFields(userRole, employeeName, status, username, changePassword, password, confirmPassword) {
        if (userRole) { general.selectFromDropdown(enumAddUserPrivilegesLabels.userRole, userRole) }
        if (employeeName) { general.fillInputBoxWithHint(enumAddUserPrivilegesLabels.employeeName, employeeName) }
        if (status) { general.selectFromDropdown(enumAddUserPrivilegesLabels.status, status) }
        if (username) { general.fillInputBox(enumAddUserPrivilegesLabels.username, username) }

        if (changePassword || password || confirmPassword) {
            general.checkCheckbox('Change Password ?', true)
            if (password) { cy.contains('.oxd-input-group', 'Password').not('Confirm').find('input').type(password) }
            if (confirmPassword) { cy.contains('.oxd-input-group', 'Confirm Password').find('input').type(confirmPassword) }
        }
    }

    editPrivileges(userRole, employeeName, status, username, changePassword, password, confirmPassword) {
        this.fillFields(userRole, employeeName, status, username, changePassword, password, confirmPassword)
        this.clickSave()
    }
}

export const onEditUserPrivilegesPage = new EditUserPrivilegesPage()

