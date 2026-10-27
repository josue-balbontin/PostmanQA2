pipeline {
    agent any
    options {
        disableConcurrentBuilds()
        timeout(time: 20, unit: 'MINUTES')
    }
    environment {
        // Soporte tanto para Windows (rutas npm locales y de usuario) como para macOS/Linux
        PATH = "C:\\Users\\Jogab\\AppData\\Roaming\\npm;C:\\Users\\rsalazarh\\AppData\\Roaming\\npm;C:\\nvm4w\\nodejs;/opt/homebrew/bin:/usr/local/bin:${env.PATH}"
    }
    stages {
        stage('Preparación') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'node --version && npm --version && newman --version'
                        dir('webdriverio') {
                            sh 'npm ci --no-audit --no-fund'
                        }
                    } else {
                        bat 'node --version && npm --version && newman --version'
                        dir('webdriverio') {
                            bat 'npm ci --no-audit --no-fund'
                        }
                    }
                }
            }
        }
        stage('Newman') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    script {
                        if (isUnix()) {
                            sh '''
                                mkdir -p reports
                                newman run GoRest.postman_collection.json -e GoRest.postman_environment.json -r cli,html --reporter-html-export "reports/Newman_Report.html" -x
                            '''
                        } else {
                            bat '''
                                if not exist reports mkdir reports
                                newman run GoRest.postman_collection.json -e GoRest.postman_environment.json -r cli,html --reporter-html-export "reports\\Newman_Report.html" -x
                            '''
                        }
                    }
                }
            }
            post {
                always {
                    publishHTML(target: [
                        reportName: 'Newman HTML Report',
                        reportDir: 'reports',
                        reportFiles: 'Newman_Report.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true,
                        allowMissing: true
                    ])
                }
            }
        }
        stage('WebdriverIO') {
            steps {
                dir('webdriverio') {
                    script {
                        if (isUnix()) {
                            sh 'npm test'
                        } else {
                            bat 'npm test'
                        }
                    }
                }
            }
            post {
                always {
                    junit testResults: 'webdriverio/reports/junit/*.xml', allowEmptyResults: false
                    archiveArtifacts artifacts: 'webdriverio/reports/**/*', allowEmptyArchive: true
                }
            }
        }
    }
}
