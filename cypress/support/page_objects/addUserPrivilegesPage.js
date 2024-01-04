class AddUserPrivilegesPage {
    saveNewUser(userRole, employeeName, userStatus, username, password, confirmPassword) {
        this.fillFields(userRole, employeeName, userStatus, username, password, confirmPassword)
    }

    fillFields(userRole, employeeName, userStatus, username, password, confirmPassword) {
        if(userRole) {
            cy.contains('.oxd-input-group', 'User Role').find('i').click()
            cy.get('[role="listbox"] [role="option"]').contains(userRole).click()
        }
        if(userStatus) {
            cy.contains('.oxd-input-group', 'Status').find('i').click()
            cy.get('[role="listbox"] [role="option"]').contains(userStatus).click()
        }
    }
}

export const onAddUserPrivilegesPage = new AddUserPrivilegesPage()