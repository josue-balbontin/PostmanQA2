import Page from './page.js'
import { expect } from '@wdio/globals'

class RegistroPage extends Page {
    get registerForm() { return $('form[name="registerForm"]') }
    get inputFullName() { return $('input[name="fullName"]') }
    get inputEmail() { return $('input[name="email"]') }
    get inputUsername() { return $('input[name="username"]') }
    get inputPassword() { return $('input[name="password"]') }
    get inputConfirmPassword() { return $('input[name="confirmPassword"]') }
    get selectUserType() { return $('select[name="userType"]') }
    get checkboxTerms() { return $('input[name="acceptTerms"]') }
    get btnRegister() { return $('button[name="btnRegister"]') }

    async open() {
        await super.open('registro')
    }

    async verificarFormularioVisible() {
        await this.registerForm.waitForDisplayed({ timeout: 5000 })
        await expect(this.inputFullName).toBeDisplayed()
        await expect(this.inputEmail).toBeDisplayed()
        await expect(this.inputUsername).toBeDisplayed()
        await expect(this.inputPassword).toBeDisplayed()
        await expect(this.btnRegister).toBeDisplayed()
    }

    async registrar({ fullName, email, username, password, confirmPassword, userType = 'Estudiante', acceptTerms = true }) {
        await this.inputFullName.waitForDisplayed({ timeout: 5000 })
        await this.inputFullName.setValue(fullName)
        await this.inputEmail.setValue(email)
        await this.inputUsername.setValue(username)
        await this.inputPassword.setValue(password)
        await this.inputConfirmPassword.setValue(confirmPassword || password)
        await this.selectUserType.selectByVisibleText(userType)

        if (acceptTerms && !(await this.checkboxTerms.isSelected())) {
            await this.checkboxTerms.click()
        }

        await browser.takeScreenshot()

        await this.btnRegister.click()
    }
}

export default new RegistroPage()
