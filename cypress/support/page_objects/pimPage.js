class PimPage {
    clickAdd() {
        cy.contains('button', 'Add').click()
    }
}

export const onPimPage = new PimPage()