class General {
    showSidePanel() {
        cy.get('button .bi-chevron-right').click()
    }

    hideSidePanel() {
        cy.get('button .bi-chevron-left').click()
    }

    getSidePanelWidth() {
        return cy.get('.oxd-navbar-nav').invoke('prop', 'offsetWidth')
    }

    logout() {
        cy.get('.oxd-topbar-header-userarea').then(userArea => {
            cy.wrap(userArea).find('i').click()
            cy.wrap(userArea).find('li').eq(4).should('contain', 'Logout').click()
        })
    }

    generateRandomName(numberOfCharacters) {
        const vowels = 'aeiou'
        const consonants = 'bcdfghjklmnpqrstvwxyz'
        let isVowel = !!Math.round(Math.random())
        let randomString = ''

        for(let i=0; i<numberOfCharacters; i++) {
            if(isVowel) {
                randomString += vowels.charAt(Math.floor(Math.random() * vowels.length))
            } else {
                randomString += consonants.charAt(Math.floor(Math.random() * consonants.length))
            }
            isVowel = !isVowel
        }
        randomString = randomString.charAt(0).toUpperCase() + randomString.slice(1)

        return randomString
    }

    generateRandomPassword(numberOfCharacters) {
        let randomPassword = this.generateRandomName(numberOfCharacters-1) + '0123456789'.charAt(Math.floor(Math.random)*10)
        return randomPassword
    }

    fillInputBox(labelName, value) {
        cy.contains('.oxd-input-group', labelName).find('input').type(value)
    }

    fillInputBoxWithHint(labelName, value) {
        cy.contains('.oxd-input-group', labelName).find('input').type(value)
        cy.get('[role="option"]').contains(value).click()
    }

    selectFromDropdown(labelName, value) {
        cy.contains('.oxd-input-group', labelName).find('i').click()
        cy.get('[role="listbox"] [role="option"]').contains(value).click()
    }

    clickButton(buttonText) {
        cy.contains('button', buttonText).click()
    }

    verifySuccessToast() {
        cy.get('.oxd-toast').should('contain', 'Success')
    }
}

export const general = new General()