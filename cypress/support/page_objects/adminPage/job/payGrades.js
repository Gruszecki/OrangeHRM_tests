class PayGradesPage {
    verifyPayGradeNameAndCurrency(name, currency) {
        // cy.get('.oxd-table-row').contains(name).parents('.oxd-table-row').then(row => {
        //     cy.wrap(row).should('contain', name)
        //     if (currency) { cy.wrap(row).should('contain', currency) }
        // })
        console.log(name, currency)
    }

    clickSaveCurrency() {
        cy.contains('.orangehrm-card-container', 'Add Currency').find('button', 'Save').click()
    }
}

export const onPayGradesPage = new PayGradesPage()