import { general } from "./general"

export class PageInputSystem {
    fillFields() {
        throw new Error('You have to implement the method fillFields!')
    }

    clickAdd() {
        general.clickButton('Add')
    }

    clickSave() {
        general.clickButton('Save')
    }

    clickSearch() {
        general.clickButton('Search')
    }

    clickCancel() {
        general.clickButton('Cancel')
    }
}