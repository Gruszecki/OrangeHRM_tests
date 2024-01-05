import { enumAddUserPrivilegesLabels } from "../enums"
import { general } from "./general"

class AddUserPrivilegesPage {
    saveNewUser(userRole, employeeName, userStatus, username, password, confirmPassword) {
        this.fillFields(userRole, employeeName, userStatus, username, password, confirmPassword)
        general.clickButton('Save')
    }

    fillFields(userRole, employeeName, userStatus, username, password, confirmPassword) {
        if(userRole) { general.selectFromDropdown(enumAddUserPrivilegesLabels.userRole, userRole) }
        if(employeeName) { general.fillInputBoxWithHint(enumAddUserPrivilegesLabels.employeeName, employeeName) }
        if(userStatus) { general.selectFromDropdown(enumAddUserPrivilegesLabels.status, userStatus) }
        if(username) { general.fillInputBox(enumAddUserPrivilegesLabels.username, username) }
        if(password) { general.fillInputBox(enumAddUserPrivilegesLabels.password, password) }
        if(confirmPassword) { general.fillInputBox(enumAddUserPrivilegesLabels.confirmPassword, confirmPassword) }
    }

    clickAdd() {
        general.clickButton('Add')
    }

}

export const onAddUserPrivilegesPage = new AddUserPrivilegesPage()