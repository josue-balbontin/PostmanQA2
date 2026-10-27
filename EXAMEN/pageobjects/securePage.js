import Page from './page.js'

class SecurePage extends Page {
    get flashAlert() { return $('#flash') }

    async getFlashMessage() {
        return await this.flashAlert.getText()
    }

    async isMessageDisplayed(expectedText) {
        await expect(this.flashAlert).toBeDisplayed()
        const text = await this.flashAlert.getText()
        expect(text).toContain(expectedText)
    }
}

export default new SecurePage()
