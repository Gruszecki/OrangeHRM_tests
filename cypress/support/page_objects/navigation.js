/// <reference types="cypress" />

import { enumSidePanelNames } from "../enums"

class NavigationPage {
    selectMenuItem(name) {
        cy.get('.oxd-sidepanel-body').contains('li', name).click()
    }
    
    adminPage() {
        this.selectMenuItem(enumSidePanelNames.admin)
    }

    pimPage() {
        this.selectMenuItem(enumSidePanelNames.pim)
    }
    
    leavePage() {
        this.selectMenuItem(enumSidePanelNames.leave)
    }
    
    timePage() {
        this.selectMenuItem(enumSidePanelNames.time)
    }
    
    recruitmentPage() {
        this.selectMenuItem(enumSidePanelNames.recruitment)
    }
    
    myInfoPage() {
        this.selectMenuItem(enumSidePanelNames.myInfo)
    }
    
    performancePage() {
        this.selectMenuItem(enumSidePanelNames.performance)
    }
    
    dashboardPage() {
        this.selectMenuItem(enumSidePanelNames.dashboard)
    }
    
    directoryPage() {
        this.selectMenuItem(enumSidePanelNames.directory)
    }
    
    maintenancePage() {
        this.selectMenuItem(enumSidePanelNames.maintenance)
        cy.get('input[name="password"]').type(Cypress.env('password'))
        cy.get('button[type="submit"]').click()
    }
    
    claimPage() {
        this.selectMenuItem(enumSidePanelNames.claim)
    }
    
    buzzPage() {
        this.selectMenuItem(enumSidePanelNames.buzz)
    }
    
    topbarMenuItem(primary, secondary) {
        cy.get(`.oxd-topbar-body-nav-tab`).contains(`${primary}`).then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('[role="menuitem"]').contains(`${secondary}`).click()
        })
    }
}

export const navigateTo = new NavigationPage()