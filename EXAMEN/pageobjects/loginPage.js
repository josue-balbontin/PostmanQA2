import Page from './page.js'
import { expect } from '@wdio/globals'

class LoginPage extends Page {
    get loginForm() { return $('#login-form') }
    get inputUsername() { return $('#login-username') }
    get inputPassword() { return $('#login-password') }
    get btnLogin() { return $('#btn-login') }
    get currentUser() { return $('#current-user') }
    get btnLogout() { return $('#btn-logout') }

    async open() {
        await super.open('login')

        // Si hay una sesión previa activa, cerramos sesión para mostrar el formulario
        const logoutBtn = await this.btnLogout
        if (await logoutBtn.isExisting() && await logoutBtn.isDisplayed()) {
            await logoutBtn.click()
            await browser.pause(300)
        }
    }

    async verificarFormularioVisible() {
        await this.loginForm.waitForDisplayed({ timeout: 5000 })
        await expect(this.inputUsername).toBeDisplayed()
        await expect(this.inputPassword).toBeDisplayed()
        await expect(this.btnLogin).toBeDisplayed()
    }

    async login(username, password) {
        await this.inputUsername.waitForDisplayed({ timeout: 5000 })
        await this.inputUsername.setValue(username)
        await this.inputPassword.setValue(password)
        await browser.takeScreenshot()
        await this.btnLogin.click()
    }

    async verificarUsuarioAutenticado() {
        await this.currentUser.waitForDisplayed({ timeout: 5000 })
        await expect(this.currentUser).toBeDisplayed()
    }
}

export default new LoginPage()
