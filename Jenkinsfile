pipeline {
    agent any

    environment {
        // Carpeta absoluta para resultados y reportes
        ALLURE_RESULTS = "${env.WORKSPACE}/allure-results"
        ALLURE_REPORT  = "${env.WORKSPACE}/allure-report"
        PATH           = "C:\\Users\\Jogab\\AppData\\Roaming\\npm;C:\\nvm4w\\nodejs;${env.PATH}"
    }

    stages {
        stage('Preparar Workspace') {
            steps {
                echo "Limpiando workspace..."
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'wdio-web', url: 'https://github.com/josue-balbontin/jhenkins.git'
            }
        }

        stage('Instalar dependencias') {
            steps {
                bat 'npm install'
            }
        }

        stage('Ejecutar WDIO') {
            steps {
                echo "Ejecutando pruebas WDIO..."
                bat "npx wdio run wdio.conf.js"
            }
        }

        stage('Generar reporte Allure') {
            steps {
                echo "Generando reporte Allure..."
                bat """
                npx allure generate "%ALLURE_RESULTS%" --clean -o "%ALLURE_REPORT%"
                """
            }
        }

        stage('Publicar reporte Allure en Jenkins') {
            steps {
                echo "Publicando reporte Allure usando el plugin..."
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: '**/allure-results/*.json']], // <-- patron agregado
                    reportBuildPolicy: 'ALWAYS'
                ])
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizada'
        }
    }
}
