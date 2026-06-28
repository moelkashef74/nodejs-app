pipeline {
    agent any
    environment {
        IMAGE_NAME = 'moelkashef74/nodegs-app' // Replace with your Docker Hub username and image name
        IMAGE_TAG = 'v1' // You can change this to a specific tag if needed
    }
    stages {

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG}-${env.BUILD_NUMBER} ." 
                }
            }
        }
        stage('Login to Docker Hub') {
            withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_CREDENTIALS_USR', passwordVariable: 'DOCKER_CREDENTIALS_PSW')]) {
            steps {
                    sh "echo ${DOCKER_CREDENTIALS_PSW} | docker login -u ${DOCKER_CREDENTIALS_USR} --password-stdin"
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}-${env.BUILD_NUMBER}"
                }
            }
        }
    }
    
}
}