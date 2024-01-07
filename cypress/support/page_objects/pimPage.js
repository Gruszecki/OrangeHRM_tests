import { enumEmployeeInformationLabels } from "../enums"
import { general } from "../general"
import { PageInputSystem } from "../pageInputSystem"

class PimPage extends PageInputSystem{
    fillFields(employeeName, employeeId, employmentStatus, include, supervisorName, jobTitle, subUnit) {
        if(employeeName) { general.fillInputBoxWithHint(enumEmployeeInformationLabels.employeeName, employeeName) }
        if(employeeId) { general.fillInputBox(enumEmployeeInformationLabels.employeeId, employeeId) }
        if(employmentStatus) { general.selectFromDropdown(enumEmployeeInformationLabels.employmentStatus, employmentStatus) }
        if(include) { general.selectFromDropdown(enumEmployeeInformationLabels.include, include) }
        if(supervisorName) { general.fillInputBoxWithHint(enumEmployeeInformationLabels.supervisorName, supervisorName) }
        if(jobTitle) { general.selectFromDropdown(enumEmployeeInformationLabels.jobTitle, jobTitle) }
        if(subUnit) { general.selectFromDropdown(enumEmployeeInformationLabels.subUnit, subUnit) }
    }

    deleteUserById(id) {
        this.fillFields(undefined, id)
        this.clickSearch()
        cy.contains('.oxd-table-row', id).then(tableRow => {
            cy.wrap(tableRow).find('.bi-trash').click()
            general.clickButton('Yes, Delete')
            general.verifyToast('Successfully Deleted')
        })
    }
}

export const onPimPage = new PimPage()