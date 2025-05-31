pipeline {
    agent any

    environment {
        PROJECT_DIR = "."
    }

    stages {
        stage('Build') {
            steps {
                echo "Installing dependencies..."
                bat 'npm install'
                echo "Build complete."
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                bat 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo "Running ESLint..."
                bat 'npx eslint . || exit 0'
            }
        }

        stage('Security Scan') {
            steps {
                echo "Running npm audit..."
                bat 'npm audit --json || exit 0'
            }
        }

        stage('Deploy') {
            steps {
                echo "Building and running Docker container..."
                bat 'docker build -t smarttask-app .'
                bat 'docker run -d -p 3000:3000 smarttask-app'
            }
        }

        stage('Release') {
            steps {
                echo "Tagging image for production..."
                bat 'docker tag smarttask-app smarttask-app:prod'
            }
        }

        stage('Monitoring') {
            steps {
                echo "Displaying container logs..."
                bat 'docker ps'
                bat 'FOR /F "tokens=*" %%i IN (\'docker ps -q --filter "ancestor=smarttask-app"\') DO docker logs %%i'
            }
        }
    }
}

