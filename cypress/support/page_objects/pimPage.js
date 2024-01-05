import { enumEmployeeIncludeCurrentPast, enumEmployeeInformationLabels } from "../enums"
import { general } from "./general"

class PimPage {
    fillFields(employeeName, employeeId, employmentStatus, include, supervisorName, jobTitle, subUnit) {
        if(employeeName) { general.fillInputBoxWithHint(enumEmployeeInformationLabels.employeeName, employeeName) }
        if(employeeId) { general.fillInputBox(enumEmployeeInformationLabels.employeeId, employeeId) }
        if(employmentStatus) { general.selectFromDropdown(enumEmployeeInformationLabels.employmentStatus, employmentStatus) }
        if(include) { general.selectFromDropdown(enumEmployeeInformationLabels.include, enumEmployeeIncludeCurrentPast.current) }
        if(supervisorName) { general.fillInputBoxWithHint(enumEmployeeInformationLabels.supervisorName, supervisorName) }
        if(jobTitle) { general.selectFromDropdown(enumEmployeeInformationLabels.jobTitle, enumEmployeeIncludeCurrentPast.jobTitle) }
        if(subUnit) { general.selectFromDropdown(enumEmployeeInformationLabels.subUnit, enumEmployeeIncludeCurrentPast.subUnit) }
    }

    deleteUserById(id) {
        this.fillFields(undefined, id)
        general.clickButton('Search')
        cy.contains('.oxd-table-row', id).then(tableRow => {
            cy.wrap(tableRow).find('.bi-trash').click()
            general.clickButton('Yes, Delete')
            general.verifySuccessToast()
        })
    }

    clickAdd() {
        general.clickButton('Add')
    }
}

export const onPimPage = new PimPage()