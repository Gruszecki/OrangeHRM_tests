function selectMenuItem(name) {
    cy.get('.oxd-sidepanel-body').contains('li', name).click()
}

class NavigationPage {
    adminPage() {
        selectMenuItem('Admin')
    }

    pimPage() {
        selectMenuItem('PIM')
    }
    
    leavePage() {
        selectMenuItem('Leave')
    }
    
    timePage() {
        selectMenuItem('Time')
    }
    
    recruitmentPage() {
        selectMenuItem('Recruitment')
    }
    
    myInfoPage() {
        selectMenuItem('My Info')
    }
    
    performancePage() {
        selectMenuItem('Performance')
    }
    
    dashboardPage() {
        selectMenuItem('Dashboard')
    }
    
    directoryPage() {
        selectMenuItem('Directory')
    }
    
    maintenancePage() {
        selectMenuItem('Maintenance')
        cy.get('input[name="password"]').type(Cypress.env('password'))
        cy.get('button[type="submit"]').click()
    }
    
    claimPage() {
        selectMenuItem('Claim')
    }
    
    buzzPage() {
        selectMenuItem('Buzz')
    }
}

export const navigateTo = new NavigationPage()