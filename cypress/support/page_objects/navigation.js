class NavigationPage {
    selectMenuItem(name) {
        cy.get('.oxd-sidepanel-body').contains('li', name).click()
    }
    
    adminPage() {
        this.selectMenuItem('Admin')
    }

    pimPage() {
        this.selectMenuItem('PIM')
    }
    
    leavePage() {
        this.selectMenuItem('Leave')
    }
    
    timePage() {
        this.selectMenuItem('Time')
    }
    
    recruitmentPage() {
        this.selectMenuItem('Recruitment')
    }
    
    myInfoPage() {
        this.selectMenuItem('My Info')
    }
    
    performancePage() {
        this.selectMenuItem('Performance')
    }
    
    dashboardPage() {
        this.selectMenuItem('Dashboard')
    }
    
    directoryPage() {
        this.selectMenuItem('Directory')
    }
    
    maintenancePage() {
        this.selectMenuItem('Maintenance')
        cy.get('input[name="password"]').type(Cypress.env('password'))
        cy.get('button[type="submit"]').click()
    }
    
    claimPage() {
        this.selectMenuItem('Claim')
    }
    
    buzzPage() {
        this.selectMenuItem('Buzz')
    }
}

export const navigateTo = new NavigationPage()