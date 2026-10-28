pipeline {
    agent any

    environment {
        // Asegura Maven y Java en el PATH de Windows
        PATH = "C:\\apache-maven-3.9.16\\bin;C:\\Program Files\\Eclipse Adoptium\\jdk-21.0.12.8-hotspot\\bin;${env.PATH}"
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
                echo 'Clonando el repositorio...'
                git branch: 'karate', url: 'https://github.com/josue-balbontin/jhenkins.git'
            }
        }

        stage('Build & Test') {
            steps {
                echo 'Ejecutando pruebas Karate...'
                bat 'mvn test -Dkarate.options="--tags @Smock"'
            }
        }

        stage('Publicar Reporte') {
            steps {
                echo 'Publicando reporte HTML de Karate...'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'target/karate-reports',
                    reportFiles: 'karate-summary.html',
                    reportName: 'Reporte de Pruebas Karate'
                ])
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado — limpiando workspace.'
            cleanWs()
        }
        success {
            echo 'Pruebas Karate ejecutadas con éxito.'
        }
        failure {
            echo 'Falló alguna etapa del pipeline.'
        }
    }
}
