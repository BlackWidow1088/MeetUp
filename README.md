# Meetup

Web application boilerplate which manages communication between team members.


## Documentation

### Meetup-APP
1) Nodejs server for providing information

### Meetup-GUI 
1) Application uses single central store for data. It manages state using redux 3 core principles for
state management. Store Module is responsible for exposing the required functionality and is eagerly loaded in application.
So it is advisable to declare all the data models in src/app/application-store/model folder.
2) Application uses HTML5 webworker. Webworker module is responsible for 
handling webworker related work available in src/app/webworker
3) Progressive Web application.
4) Push Notifications.
5) Internationalisation. Dynamic multilingual application support.

#### Application Details
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

#### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
