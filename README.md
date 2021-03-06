# SpringBoot-Angular
a demo project using Spring Boot 1.5 and Angular 5

# Code Structure
a typical spring boot - angular project structure is to separate the projects into two modules: backend spring boot and front end ui.
In this project, spring boot is in "src" folder while Angular code is in "angular" folder

two components can be developed and run independently. Spring boot can run using IDE or mvn spring-boot:run
angular can be run using angular cli.

A typical flow is angular send ajax or rest request out and Spring boot provides rest service ports. a cross domain resource connfigure is made for them to talk with each other since they are on different port

# Run this project
for Spring Boot:    mvn spring-boot:run     localhost:8080
for Angular:        ng serve                localhost:4200

# Proxy Config
to communicate between spring boot and angular, we need to setup proxy config
1. in package.json, set the following (point out the proxy file): 
    "scripts": {
        "start": "ng serve --proxy-config proxy.conf.json",
      },
2. in app root folder, create proxy.conf.json file, remember the "pathRewrite"
3. start angualr using: npm start

# Deployment
The ideal is to have to severs run separately. but most of the case, the user is using one server. Steps for 1 server scenarios
1. in front-end "angular" folder, run "npm run build" to build angular project, the output will be in "dist" folder - as configured in "package.json"
2. change pom.xml to include "mavn-war-plugin" in "build" block and set web resources to point to dist folder
3. change pom.xml to package as "war" file
4. run "mvn clean install"