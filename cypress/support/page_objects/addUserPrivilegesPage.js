import { enumAddUserPrivilegesLabels } from "../enums"
import { general } from "../general"
import { PageInputSystem } from "../pageInputSystem"

class AddUserPrivilegesPage extends PageInputSystem{
    fillFields(userRole, employeeName, userStatus, username, password, confirmPassword) {
        if(userRole) { general.selectFromDropdown(enumAddUserPrivilegesLabels.userRole, userRole) }
        if(employeeName) { general.fillInputBoxWithHint(enumAddUserPrivilegesLabels.employeeName, employeeName) }
        if(userStatus) { general.selectFromDropdown(enumAddUserPrivilegesLabels.status, userStatus) }
        if(username) { general.fillInputBox(enumAddUserPrivilegesLabels.username, username) }
        if(password) { general.fillInputBox(enumAddUserPrivilegesLabels.password, password) }
        if(confirmPassword) { general.fillInputBox(enumAddUserPrivilegesLabels.confirmPassword, confirmPassword) }
    }
}

export const onAddUserPrivilegesPage = new AddUserPrivilegesPage()