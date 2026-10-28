pipeline {
    agent any

    environment {
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
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    bat 'npx wdio run wdio.conf.js'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline de pruebas móviles finalizado.'
        }
        success {
            echo 'Pruebas móviles con WDIO y Appium en BrowserStack configuradas e integradas con éxito.'
        }
        failure {
            echo 'Falló la ejecución del pipeline móvil.'
        }
    }
}
