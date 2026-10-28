import Page from './page.js'
import CatalogoPage from './catalogoPage.js'
import DetalleLibroPage from './detalleLibroPage.js'
import { expect } from '@wdio/globals'

class MisPrestamosPage extends Page {
    get navLoans() { return $('#nav-loans') }
    get activeLoansCount() { return $('#active-loans-count') }
    get loansTable() { return $('table.loans-table') }
    get returnDialog() { return $('#return-dialog') }
    get returnAcceptBtn() { return $('#return-dialog-accept') }
    get renewModal() { return $('#renew-modal') }
    get renewCurrentDue() { return $('#renew-current-due') }
    get radioRenewCustom() { return $('#renew-mode-custom') }
    get btnOpenRenewCalendar() { return $('#btn-open-renew-calendar') }
    get renewCalendar() { return $('#renew-calendar') }
    get renewCalendarNext() { return $('#renew-calendar-next') }
    get renewDaysCount() { return $('#renew-days-count') }
    get btnConfirmRenew() { return $('#btn-confirm-renew') }
    get toast() { return $('#toast') }

    async open() {
        await super.open('mis-prestamos')
        await this.loansTable.waitForDisplayed({ timeout: 5000 })
    }

    async verificarSeccionVisible() {
        await this.loansTable.waitForDisplayed({ timeout: 5000 })
        await expect(this.loansTable).toBeDisplayed()
        await expect(this.activeLoansCount).toBeDisplayed()
    }

    async obtenerCantidadPrestamosActivos() {
        await this.activeLoansCount.waitForDisplayed({ timeout: 5000 })
        const text = await this.activeLoansCount.getText()
        return Number(text)
    }

    /**
     * Asegura tener al menos N préstamos activos para realizar las pruebas
     * @param {number} minimo 
     */
    async asegurarPrestamosActivos(minimo = 2) {
        await this.open()
        await browser.pause(300)
        let count = await this.obtenerCantidadPrestamosActivos()

        while (count < minimo) {
            await CatalogoPage.open()
            await CatalogoPage.booksTable.waitForDisplayed({ timeout: 5000 })
            await browser.pause(300)

            const prestarBtns = await $$('//button[text()="Prestar" and not(@disabled)]')
            if (prestarBtns.length > 0) {
                await prestarBtns[0].click()
                await $('#loan-modal').waitForDisplayed({ timeout: 5000 })
                await $('#btn-confirm-loan').waitForDisplayed({ timeout: 5000 })
                await $('#btn-confirm-loan').click()
                await browser.pause(600)
            }
            await this.open()
            await browser.pause(300)
            count = await this.obtenerCantidadPrestamosActivos()
        }

        await expect(count).toBeGreaterThanOrEqual(minimo)
    }

    /**
     * Devuelve el primer libro activo disponible en la tabla
     */
    async devolverPrimerLibro() {
        await this.loansTable.waitForDisplayed({ timeout: 5000 })
        const btnReturn = await $('button[name^="return-"]')
        await btnReturn.waitForDisplayed({ timeout: 5000 })
        await btnReturn.click()

        await this.returnDialog.waitForDisplayed({ timeout: 5000 })
        await expect(this.returnDialog).toBeDisplayed()
        await this.returnAcceptBtn.waitForDisplayed({ timeout: 5000 })
        await this.returnAcceptBtn.click()
    }

    async verificarDevolucionExitosa() {
        await this.toast.waitForDisplayed({ timeout: 5000 })
        await expect(this.toast).toBeDisplayed()
        const text = await this.toast.getText()
        expect(text).toContain('devuelto')
    }

    /**
     * Renueva un préstamo seleccionando otra fecha con N días (por ej: 21 días)
     * @param {number} dias Cantidad de días adicionales a renovar (ej: 21)
     */
    async renovarPrestamoConDias(dias = 21) {
        await this.loansTable.waitForDisplayed({ timeout: 5000 })
        const btnRenew = await $('button[name^="renew-"]')
        await btnRenew.waitForDisplayed({ timeout: 5000 })
        await btnRenew.click()

        await this.renewModal.waitForDisplayed({ timeout: 5000 })
        await expect(this.renewModal).toBeDisplayed()

        // Seleccionar opción "Elegir otra fecha"
        await this.radioRenewCustom.waitForDisplayed({ timeout: 5000 })
        await this.radioRenewCustom.click()

        // Abrir calendario de renovación
        await this.btnOpenRenewCalendar.waitForDisplayed({ timeout: 5000 })
        await this.btnOpenRenewCalendar.click()
        await this.renewCalendar.waitForDisplayed({ timeout: 5000 })

        // Si el botón de mes siguiente está habilitado, avanzar para encontrar la fecha límite de 21 días
        if (await this.renewCalendarNext.isDisplayed() && !(await this.renewCalendarNext.getAttribute('disabled'))) {
            await this.renewCalendarNext.click()
            await browser.pause(300)
        }

        // Seleccionar el último día habilitado en el calendario (que corresponde al límite de 21 días)
        const enabledDays = await $$('#renew-calendar button.calendar__day:not([disabled])')
        if (enabledDays.length > 0) {
            await enabledDays[enabledDays.length - 1].click()
        }

        await browser.pause(300)

        await browser.takeScreenshot()

        // Confirmar la renovación
        await this.btnConfirmRenew.waitForDisplayed({ timeout: 5000 })
        await this.btnConfirmRenew.click()
        await this.toast.waitForDisplayed({ timeout: 5000 })
        await browser.pause(500)
    }

    /**
     * Valida el valor de renovado en el libro activo renovado (ej: "1/1")
     */
    async verificarValorRenovado(valorEsperado) {
        await this.loansTable.waitForDisplayed({ timeout: 5000 })
        const activeRenewalCell = await $('//tr[.//span[contains(@class, "badge--activo")]]//td[@data-col="renewals"]')
        await activeRenewalCell.waitForDisplayed({ timeout: 5000 })
        const valor = await activeRenewalCell.getText()
        expect(valor).toContain(valorEsperado)
    }
}

export default new MisPrestamosPage()
