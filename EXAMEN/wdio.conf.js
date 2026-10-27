const path = require('path');

exports.config = {
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',

    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './features/**/*.feature'
    ],
    exclude: [],

    // ============
    // Capabilities
    // ============
    maxInstances: 10,
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--headless=new',
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-gpu',
                    '--window-size=1920,1080',
                    '--disable-infobars',   // Quitar "Chrome está siendo controlado..."
                    '--disable-extensions', // Deshabilitar extensiones
                    '--start-maximized',    // Maximizar ventana
                    'enable-automation',
                    '--disable-blink-features=AutomationControlled'
                ]
            },
            // Configuración de la ruta fija del ejecutable del driver (apunte del docente):
            // 'wdio:chromedriverOptions': {
            //     binary: 'C:/Roy/Catolica/QA_2 _Semestre2_2026/Bloque_1/WDIO/WDIO_POM/drivers/chromedriver.exe'
            // }
        }
    ],

    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'cucumber',

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false, // Permite adjuntar fotos al reporte
            useCucumberStepReporter: true
        }]
    ],

    // ======================
    // Cucumber Configuration
    // ======================
    cucumberOpts: {
        require: ['./features/step_definitions/**/*.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        name: [],
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },

    // =====
    // Hooks (Capturas de pantalla / Fotos para Allure)
    // =====
    /**
     * Se ejecuta después de cada paso de Cucumber.
     * Si el paso falla, toma una captura de pantalla automáticamente para Allure.
     */
    afterStep: async function (step, scenario, { error, duration, passed }, context) {
        if (error) {
            await browser.takeScreenshot();
        }
    },

    /**
     * Se ejecuta después de cada escenario de Cucumber.
     * Si el escenario falla, toma una captura de pantalla automáticamente para Allure.
     */
    afterScenario: async function (world, result, context) {
        if (result.passed === false) {
            await browser.takeScreenshot();
        }
    }
};
