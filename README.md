# SpringBoot-Angular
a demo project using Spring Boot 1.5 and Angular 5

# Code Structure
a typical spring boot - angular project structure is to separate the projects into two modules: backend spring boot and front end ui.
In this project, spring boot is in "src" folder while Angular code is in "angular" folder

two components can be developed and run independently. Spring boot can run using IDE or mvn spring-boot:run
angular can be run using angular cli.

A typical flow is angular send ajax or rest request out and Spring boot provides rest service ports. a cross domain resource connfigure is made for them to talk with each other since they are on different port

# Run this project
for Spring Boot:    mvn spring-boot:run
for Angular:        ng serve

# deployment
