# Introdution
The Nessight Frontend Package is a software package designed for the frontend of the Nessight web application. This package is built using ReactJS, a popular JavaScript library for building user interfaces. ReactJS provides a fast and efficient way to build reusable UI components and manage the state of web applications.
# Installation
- System requirement:
    - Ubuntu 18.04.6 LTS
## Guide to install Ubuntu on Windows 
1) Open Your Powershell and Run as administrator
2) Enter the following command:
    - To list available distributions to install:
        ```
        wsl --list --online
        ```
    - Choose one of the distributions to install:
        ```
        wsl --install -d <Distribution Name>
        ```
3) After Installing Ubuntu, Opening Ubuntu and Run the following command:
    - Update 
    ```
    sudo apt update
    sudo apt upgrade
    ```
    - Install Nodejs and NPM
    ```
    sudo apt-get install nodejs
    node -v
    sudo apt-get install npm
    npm -v 
    ```
    - Install ReactJs and NextJs:
    ```
    npm install react
    npm install next
    ```
## Running Application:
-   We can run development front-end server as follow:
    ```
    cd app 
    npm install
    npm run dev 
    ```
    The Application will be available at http://localhost:3000