# Introduction
The Nessight Frontend Package is a software package designed for the frontend of the Nessight web application. It is built using ReactJS, a popular JavaScript library for building user interfaces. ReactJS provides a fast and efficient way to build reusable UI components and manage the state of web applications.

## Installation
### System Requirements:
- Ubuntu 18.04.6 LTS

### Guide to Install Ubuntu on Windows
1. Open PowerShell and run as administrator
2. Enter the following command to list available distributions to install: `wsl --list --online`
3. Choose one of the distributions to install: `wsl --install -d <Distribution Name>`
4. After installing Ubuntu, open Ubuntu and run the following commands:
    ```
    sudo apt update
    sudo apt upgrade
    ```
5. Install Node.js and NPM:
    ```
    sudo apt-get install nodejs
    node -v
    sudo apt-get install npm
    npm -v
    ```
6. Install ReactJS and NextJS:
    ```
    npm install react
    npm install next
    ```

### Running the Application:
We can run the development front-end server as follows:
   
    cd app
    npm install
    npm run dev
  

The application will be available at http://localhost:3000