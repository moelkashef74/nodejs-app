pipeline {
    agent any

    environment {
        IMAGE_NAME = 'moelkashef74/nodejs-app'
        IMAGE_TAG  = 'v1'
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh " docker build -t ${IMAGE_NAME}:${IMAGE_TAG}-${env.BUILD_NUMBER} ."
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-hub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" |  docker login \
                            -u "$DOCKER_USERNAME" \
                            --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh " docker push ${IMAGE_NAME}:${IMAGE_TAG}-${env.BUILD_NUMBER}"
            }
        }
    }

    post {
        always {
            sh ' docker logout'
        }
    }
}