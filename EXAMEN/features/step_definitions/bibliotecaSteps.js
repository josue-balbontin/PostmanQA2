import { Given, When, Then } from '@wdio/cucumber-framework'
import LoginPage from '../../pageobjects/loginPage.js'
import RegistroPage from '../../pageobjects/registroPage.js'
import CatalogoPage from '../../pageobjects/catalogoPage.js'
import DetalleLibroPage from '../../pageobjects/detalleLibroPage.js'
import MisPrestamosPage from '../../pageobjects/misPrestamosPage.js'

// Variables compartidas entre pasos del escenario de registro
let nuevoUsuarioRegistrado = {
    username: '',
    password: 'Lector123!'
}

// =========================================================================
// INCISO 1: LOGIN PARA ACCEDER A LA PÁGINA (CON ASERCIÓN PREVIA Y POSTERIOR)
// =========================================================================

Given('que me encuentro en la página de inicio de sesión', async () => {
    await LoginPage.open()
    await browser.takeScreenshot()
})

Given('verifico que el formulario de login esté visible', async () => {
    await LoginPage.verificarFormularioVisible()
    await browser.takeScreenshot()
})

When('ingreso el usuario {string} y la contraseña {string}', async (username, password) => {
    await LoginPage.login(username, password)
    await browser.takeScreenshot()
})

Then('debería acceder a la página principal y verificar que el usuario esté autenticado', async () => {
    await LoginPage.verificarUsuarioAutenticado()
    await browser.takeScreenshot()
})

// Reutilización de login para los demás incisos
Given('que inicio sesión con el usuario {string} y la contraseña {string}', async (username, password) => {
    await LoginPage.open()
    await LoginPage.verificarFormularioVisible()
    await LoginPage.login(username, password)
    await LoginPage.verificarUsuarioAutenticado()
    await browser.takeScreenshot()
})

// =========================================================================
// INCISO 2 Y 3: CATÁLOGO Y DETALLE DEL LIBRO (CON ASERCIONES ANTES Y DESPUÉS)
// =========================================================================

Given('verifico que me encuentro en el catálogo de libros', async () => {
    await CatalogoPage.open()
    await CatalogoPage.verificarCatalogoVisible()
    await browser.takeScreenshot()
})

When('selecciono ver detalle del primer libro disponible', async () => {
    await CatalogoPage.verPrimerDetalleDisponible()
    await browser.takeScreenshot()
})

When('verifico que la información del libro y la opción de prestar estén visibles', async () => {
    await DetalleLibroPage.verificarDetalleVisible()
    await browser.takeScreenshot()
})

When('realizo el préstamo del libro seleccionando un plazo de {string} días', async (dias) => {
    await DetalleLibroPage.abrirModalPrestamo()
    await browser.takeScreenshot()
    await DetalleLibroPage.seleccionarDiasPrestamo(Number(dias))
    await browser.takeScreenshot()
    await DetalleLibroPage.confirmarPrestamo()
})

Then('verifico que el préstamo se registre exitosamente', async () => {
    await DetalleLibroPage.verificarPrestamoExitoso()
    await browser.takeScreenshot()
})

// =========================================================================
// INCISO 3: REGISTRO DE NUEVO USUARIO (CON ASERCIONES ANTES Y DESPUÉS)
// =========================================================================

Given('que me encuentro en la página de registro', async () => {
    await RegistroPage.open()
    await browser.takeScreenshot()
})

Given('verifico que el formulario de registro esté visible', async () => {
    await RegistroPage.verificarFormularioVisible()
    await browser.takeScreenshot()
})

When('registro un nuevo usuario con credenciales válidas', async () => {
    const randomId = Math.floor(1000 + Math.random() * 9000)
    nuevoUsuarioRegistrado.username = `lector${randomId}`
    nuevoUsuarioRegistrado.password = 'Lector123!'

    await RegistroPage.registrar({
        fullName: `Estudiante Automatizado ${randomId}`,
        email: `estudiante${randomId}@biblioteca.test`,
        username: nuevoUsuarioRegistrado.username,
        password: nuevoUsuarioRegistrado.password,
        confirmPassword: nuevoUsuarioRegistrado.password,
        userType: 'Estudiante',
        acceptTerms: true
    })

    await browser.pause(500)
    await browser.takeScreenshot()
})

When('inicio sesión con el usuario recién registrado', async () => {
    await LoginPage.open()
    await LoginPage.verificarFormularioVisible()
    await LoginPage.login(nuevoUsuarioRegistrado.username, nuevoUsuarioRegistrado.password)
    await LoginPage.verificarUsuarioAutenticado()
    await browser.takeScreenshot()
})

// =========================================================================
// INCISO 4: MIS PRÉSTAMOS, DEVOLVER Y RENOVAR (CON ASERCIONES ANTES Y DESPUÉS)
// =========================================================================

Given('verifico tener libros activos disponibles para la prueba', async () => {
    await MisPrestamosPage.asegurarPrestamosActivos(2)
    await browser.takeScreenshot()
})

When('me dirijo a la sección de "Mis Préstamos"', async () => {
    await MisPrestamosPage.open()
    await browser.takeScreenshot()
})

When('verifico que la tabla de préstamos activos esté visible', async () => {
    await MisPrestamosPage.verificarSeccionVisible()
    await browser.takeScreenshot()
})

When('realizo la devolución de un libro en préstamo', async () => {
    await MisPrestamosPage.devolverPrimerLibro()
    await browser.takeScreenshot()
})

When('verifico que la devolución se registre correctamente', async () => {
    await MisPrestamosPage.verificarDevolucionExitosa()
    await browser.takeScreenshot()
})

When('realizo la renovación del otro libro seleccionando una nueva fecha con {string} días de plazo', async (dias) => {
    await MisPrestamosPage.renovarPrestamoConDias(Number(dias))
    await browser.takeScreenshot()
})

Then('verifico que el valor de renovado se actualice a {string}', async (valorEsperado) => {
    await MisPrestamosPage.verificarValorRenovado(valorEsperado)
    await browser.takeScreenshot()
})
