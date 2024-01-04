class AddEmployeePage {
    saveNewUser(firstName, middleName, lastName, id, createLoginDetails, username, userStatus, password, confirmPassword) {
        this.fillFields(firstName, middleName, lastName, id, createLoginDetails, username, userStatus, password, confirmPassword)
        this.clickSave()
    }

    cancelNewUser(firstName, middleName, lastName, id, createLoginDetails, username, userStatus, password, confirmPassword) {
        this.fillFields(firstName, middleName, lastName, id, createLoginDetails, username, userStatus, password, confirmPassword)
        clickCancel()
    }

    fillFields(firstName, middleName, lastName, id, createLoginDetails=false, username, userStatus, password, confirmPassword) {
        if(firstName) { cy.get('input[name="firstName"]').type(firstName) }
        if(middleName) { cy.get('input[name="middleName"]').type(middleName) }
        if(lastName) { cy.get('input[name="lastName"]').type(lastName) }
        if(id) { cy.get('.orangehrm-employee-form [class="oxd-input oxd-input--active"]').clear().type(id) }
        
        if(createLoginDetails) {
            cy.contains('div', 'Create Login Details').find('input').check({force: true})
            if(username) { cy.contains('.oxd-form-row', 'Username').find('input').not('[type="radio"]').type(username) }
            if (userStatus) { cy.contains('label', userStatus).find('input').click({force: true}) } 
            if (password) { cy.contains('.oxd-input-group', 'Password').not('Confirm').find('input').type(password) }
            if (password) { cy.contains('.oxd-input-group', 'Confirm Password').find('input').type(confirmPassword) }
        }
    }

    clickSave() {
        cy.contains('button', 'Save').click()
    }

    clickCancel() {
        cy.contains('button', 'Cancel').click()
    }
}

export const onAddEmployeePage = new AddEmployeePage()