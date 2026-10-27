import Page from './page.js'
import { expect } from '@wdio/globals'

class CatalogoPage extends Page {
    get navCatalog() { return $('#nav-catalog') }
    get booksTable() { return $('table') }

    async open() {
        await super.open('catalogo')
    }

    async verificarCatalogoVisible() {
        await this.booksTable.waitForDisplayed({ timeout: 5000 })
        await expect(this.booksTable).toBeDisplayed()
    }

    /**
     * Hace clic en "Ver detalle" del primer libro disponible
     */
    async verPrimerDetalleDisponible() {
        await this.verificarCatalogoVisible()
        const detailLink = await $('td.actions a')
        await detailLink.waitForDisplayed({ timeout: 5000 })
        await detailLink.click()
    }
}

export default new CatalogoPage()
