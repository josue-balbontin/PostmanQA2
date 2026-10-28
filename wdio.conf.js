exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    port: 4723,
    user: process.env.BROWSERSTACK_USER || 'josuebalbontin_SPHB16',
    key: process.env.BROWSERSTACK_KEY || '12zC9WNu3oEy6tG49sQ2',
    hostname: 'hub.browserstack.com',
    port: 443,
    path: '/wd/hub',
    protocol: 'https',

    //
    // ==================
    // Archivos de prueba (Cucumber Features)
    // ==================
    specs: [
        './features/**/*.feature'
    ],
    exclude: [],

    maxInstances: 1,

    //
    // ============
    // Capabilities
    // ============
    capabilities: [{
        platformName: 'android',
        'appium:automationName': 'UiAutomator2',

        // 🔹 APK subida a BrowserStack
        'appium:app': 'bs://0e9254bae676a1f6d5a904732c5f0b1eda2c75d0',
        //'appium:appPackage': 'com.google.android.deskclock',
        //'appium:appActivity': 'com.android.deskclock.DeskClock',

        // 🔹 Opciones de BrowserStack
        'bstack:options': {
            deviceName: 'Google Pixel 10',  // dispositivo real en la nube
            osVersion: '16.0',
            projectName: 'Proyecto QA',
            buildName: 'Build Alarmas',
            sessionName: 'Prueba APK Alarmas',
            local: false  // si no necesitas BrowserStack Local
        }
    }


],

    //
    // ===================
    // Configuraciones de Test
    // ===================
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // Servicio Appium administrado por WebdriverIO
    services: ['appium',
    [
      'browserstack',
      {
        buildIdentifier: "${BUILD_NUMBER}",
        browserstackLocal: false
      },
    ]],


    // Framework Cucumber BDD
    framework: 'cucumber',

    // Reportes
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: true
        }]
    ],

    // Configuración específica de Cucumber
    cucumberOpts: {
        // Rutas requeridas para step definitions
        require: ['./features/step_definitions/alarmStep.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    }
};
