# AngularSecurityAuth0

To start, it should be noted that Angular CLI is a command-line interface tool for creating and managing Angular projects. The specific version used for this project was 15.0.4.

In addition, the app incorporates several technologies, such as NgRx, Bootstrap, Angular Material, JWT, OTP, LocalStorage, and a NodeJS Express server [scaffold the server at https://github.com/paulo-bettencourt/paulo-bettencourt-deutscher-runder-tisch-nodejs-server].

NgRx is a state management library for Angular applications. It provides a reactive programming model for managing and sharing application state across components.

Bootstrap is a popular front-end framework that enables responsive design and cross-browser compatibility. It offers pre-built CSS styles, HTML templates, and JavaScript components that can be easily integrated into an application.

Angular Material is a UI component library for Angular applications. It offers a set of pre-built UI components, such as buttons, menus, and modals, that follow Material Design guidelines.

JWT (JSON Web Token) is a standard for securely transmitting information between parties as a JSON object. It is commonly used for authentication and authorization purposes in web applications.

OTP (One-Time Password) is a mechanism for generating a password that can only be used once. It is often used in multi-factor authentication schemes to provide an additional layer of security.

LocalStorage is a web API that allows web applications to store key-value pairs in the browser. It is commonly used for caching data and storing user preferences.

Finally, the app utilizes a NodeJS Express server. NodeJS is a JavaScript runtime built on Chrome's V8 JavaScript engine. Express is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. Together, they allow the app to handle server-side logic and interact with databases.

## Screenshots

![Screenshot 2023-05-12 at 10 21 42](https://github.com/paulo-bettencourt/deutscher-runder-tisch-angular-app/assets/37920932/0a98a4ff-3824-4747-b888-0e07fb40306e)

![Screenshot 2023-05-12 at 10 22 02](https://github.com/paulo-bettencourt/deutscher-runder-tisch-angular-app/assets/37920932/5351d3d6-4d4d-45a7-a851-a967a6e16a71)

`[LOGIN ]Error message if the user doesn't provide a Bring Global email and/or doesn't insert a password`

![Screenshot 2023-05-12 at 10 22 17](https://github.com/paulo-bettencourt/deutscher-runder-tisch-angular-app/assets/37920932/27780431-9c3d-4f6d-818f-aabf6cf2919b)

![Screenshot 2023-05-12 at 10 24 13](https://github.com/paulo-bettencourt/deutscher-runder-tisch-angular-app/assets/37920932/2299028a-5d37-413c-97dc-c9b166adadf2)

`[SIGN UP] Error message if the user doesn't provide a Bring Global email and/or doesn't insert a password`

![Screenshot 2023-05-12 at 10 24 26](https://github.com/paulo-bettencourt/deutscher-runder-tisch-angular-app/assets/37920932/8480d720-f5d6-44bd-8502-e76b52ac3b69)

`[SIGN UP][OTP] User will receive an OTP on their e-mail, sent by the NodeJS server`

![Screenshot 2023-05-12 at 10 26 55](https://github.com/paulo-bettencourt/deutscher-runder-tisch-angular-app/assets/37920932/7c37e598-ffac-45d2-9da0-ca52153c7f35)

`[DASHBOARD] Classes featuring CRUD operations`

![Screenshot 2023-05-12 at 10 25 19](https://github.com/paulo-bettencourt/deutscher-runder-tisch-angular-app/assets/37920932/964b4ba8-1f24-4aa5-911d-081328f1a8f7)

![Screenshot 2023-05-12 at 10 25 39](https://github.com/paulo-bettencourt/deutscher-runder-tisch-angular-app/assets/37920932/dabbe675-3d45-4197-98e5-c9c3d601f4a3)

![Screenshot 2023-05-12 at 10 25 54](https://github.com/paulo-bettencourt/deutscher-runder-tisch-angular-app/assets/37920932/e7c8ea50-cdaf-45b8-9717-c592c1d7c346)

![Screenshot 2023-05-12 at 10 26 00](https://github.com/paulo-bettencourt/deutscher-runder-tisch-angular-app/assets/37920932/24b2ed66-368a-4441-92a6-d0034beaee13)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
