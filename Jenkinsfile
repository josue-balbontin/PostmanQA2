pipeline {
    agent any

    environment {
        ALLURE_RESULTS    = "${env.WORKSPACE}/allure-results"
        ALLURE_REPORT     = "${env.WORKSPACE}/allure-report"
        PATH              = "C:\\Users\\Jogab\\AppData\\Roaming\\npm;C:\\nvm4w\\nodejs;${env.PATH}"
        BROWSERSTACK_USER = 'josuebalbontin_SPHB16'
        BROWSERSTACK_KEY  = '12zC9WNu3oEy6tG49sQ2'
    }

    stages {
        stage('Preparar Workspace') {
            steps {
                echo 'Limpiando workspace...'
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                echo 'Clonando rama wdio-movil...'
                git branch: 'wdio-movil', url: 'https://github.com/josue-balbontin/jhenkins.git'
            }
        }

        stage('Instalar dependencias') {
            steps {
                echo 'Instalando dependencias de Node...'
                bat 'npm install'
            }
        }

        stage('Ejecutar pruebas móviles (WDIO + Appium en BrowserStack)') {
            steps {
                echo 'Ejecutando pruebas con WebdriverIO y Appium en BrowserStack...'
                bat 'npx wdio run wdio.conf.js'
            }
        }

        stage('Generar reporte Allure') {
            steps {
                echo 'Generando reporte Allure...'
                bat """
                npx allure generate "%ALLURE_RESULTS%" --clean -o "%ALLURE_REPORT%"
                """
            }
        }

        stage('Publicar reporte Allure en Jenkins') {
            steps {
                echo 'Publicando reporte Allure usando el plugin...'
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: '**/allure-results/*.json']],
                    reportBuildPolicy: 'ALWAYS'
                ])
            }
        }
    }

    post {
        always {
            echo 'Pipeline de pruebas móviles finalizado.'
        }
        success {
            echo 'Pruebas móviles con WDIO y Appium en BrowserStack ejecutadas con éxito.'
        }
        failure {
            echo 'Falló la ejecución del pipeline móvil.'
        }
    }
}
