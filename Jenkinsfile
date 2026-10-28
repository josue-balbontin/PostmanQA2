pipeline {
    agent any

    environment {
        PATH = "C:\\Users\\Jogab\\AppData\\Roaming\\npm;C:\\nvm4w\\nodejs;${env.PATH}"
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
                echo 'Clonando rama postman...'
                git branch: 'postman', url: 'https://github.com/josue-balbontin/PostmanQA2.git'
            }
        }

        stage('Instalar dependencias') {
            steps {
                echo 'Instalando dependencias de Newman...'
                bat 'npm install --legacy-peer-deps'
            }
        }

        stage('Ejecutar Pruebas Postman (Newman)') {
            steps {
                echo 'Ejecutando coleccion Postman...'
                bat '''
                if not exist reports mkdir reports
                npx newman run GoRest.postman_collection.json -e GoRest.postman_environment.json -r cli,html --reporter-html-export "reports\\Newman_Report.html"
                '''
            }
        }

        stage('Publicar Reporte') {
            steps {
                echo 'Publicando reporte HTML de Newman...'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'reports',
                    reportFiles: 'Newman_Report.html',
                    reportName: 'Reporte de Pruebas Postman'
                ])
            }
        }
    }

    post {
        always {
            echo 'Pipeline de Postman finalizado.'
        }
        success {
            echo 'Pruebas Postman ejecutadas con éxito.'
        }
        failure {
            echo 'Falló alguna prueba de Postman.'
        }
    }
}
