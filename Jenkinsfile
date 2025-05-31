pipeline {
    agent any

    environment {
        PROJECT_DIR = "."
    }

    stages {
        stage('Build') {
            steps {
                echo "Installing dependencies..."
                sh 'npm install'
                echo "Build complete."
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo "Running ESLint..."
                sh 'npx eslint . || true'
            }
        }

        stage('Security Scan') {
            steps {
                echo "Running npm audit..."
                sh 'npm audit --json || true'
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying app to Docker..."
                sh 'docker build -t smarttask-app .'
                sh 'docker run -d -p 3000:3000 smarttask-app'
            }
        }

        stage('Release') {
            steps {
                echo "Tagging image for production..."
                sh 'docker tag smarttask-app smarttask-app:prod'
            }
        }

        stage('Monitoring') {
            steps {
                echo "Showing container logs for monitoring..."
                sh 'docker ps'
                sh 'docker logs $(docker ps -q --filter ancestor=smarttask-app)'
            }
        }
    }
}
