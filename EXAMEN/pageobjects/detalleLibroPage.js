import Page from './page.js'
import { expect } from '@wdio/globals'

class DetalleLibroPage extends Page {
    get bookDetailCard() { return $('article.book-detail') }
    get bookTitle() { return $('.book-detail__title') }
    get bookAuthor() { return $('.book-detail__author') }
    get btnPrestar() { return $('button.book-detail__loan-btn') }
    get loanModal() { return $('#loan-modal') }
    get btnOpenCalendar() { return $('#btn-open-calendar') }
    get calendar() { return $('#loan-calendar') }
    get calendarNext() { return $('#loan-calendar-next') }
    get loanDaysCount() { return $('#loan-days-count') }
    get btnConfirmLoan() { return $('#btn-confirm-loan') }
    get toast() { return $('#toast') }

    async verificarDetalleVisible() {
        await this.bookDetailCard.waitForDisplayed({ timeout: 5000 })
        await expect(this.bookTitle).toBeDisplayed()
        await expect(this.btnPrestar).toBeDisplayed()
    }

    async abrirModalPrestamo() {
        await this.btnPrestar.waitForDisplayed({ timeout: 5000 })
        await this.btnPrestar.click()
        await this.loanModal.waitForDisplayed({ timeout: 5000 })
        await expect(this.loanModal).toBeDisplayed()
    }

    /**
     * Abre el calendario y selecciona la fecha exacta para N días de préstamo
     * @param {number} dias Cantidad de días (ej: 18, 6)
     */
    async seleccionarDiasPrestamo(dias) {
        await this.btnOpenCalendar.waitForDisplayed({ timeout: 5000 })
        await this.btnOpenCalendar.click()
        await this.calendar.waitForDisplayed({ timeout: 5000 })

        // Calcular la fecha objetivo: hoy + dias
        const target = new Date()
        target.setDate(target.getDate() + Number(dias))
        const year = target.getFullYear()
        const month = String(target.getMonth() + 1).padStart(2, '0')
        const day = String(target.getDate()).padStart(2, '0')
        const targetDate = `${year}-${month}-${day}`

        // Buscar el botón correspondiente al día en el calendario
        let dayBtn = await $(`#loan-calendar button[data-date="${targetDate}"]`)
        if (!(await dayBtn.isExisting()) || !(await dayBtn.isDisplayed())) {
            // Si la fecha cae en el siguiente mes, avanzar mes en el calendario
            if (await this.calendarNext.isDisplayed() && !(await this.calendarNext.getAttribute('disabled'))) {
                await this.calendarNext.click()
                await browser.pause(300)
            }
            dayBtn = await $(`#loan-calendar button[data-date="${targetDate}"]`)
        }

        await dayBtn.waitForDisplayed({ timeout: 5000 })
        await dayBtn.click()

        // Verificar antes de confirmar que el contador refleje exactamente los días seleccionados
        await this.loanDaysCount.waitForDisplayed({ timeout: 5000 })
        await expect(this.loanDaysCount).toHaveText(expect.stringContaining(String(dias)))
    }

    async confirmarPrestamo() {
        await this.btnConfirmLoan.waitForDisplayed({ timeout: 5000 })
        await this.btnConfirmLoan.click()
    }

    async verificarPrestamoExitoso() {
        await this.toast.waitForDisplayed({ timeout: 5000 })
        await expect(this.toast).toBeDisplayed()
        const toastText = await this.toast.getText()
        expect(toastText).toContain('registrado')
    }
}

export default new DetalleLibroPage()
