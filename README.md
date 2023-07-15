# AngularDatatable

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

The project consists of several modules, including DataTablesModule and HttpClientModule declared in app.module.ts so they can be used globally across the application.  The components used are users and products components. Users, products and filtering services used for configuring the datasets from external APIs. The components' static declaration consists of *ng tags for displaying the data in tabular view using angular datatables and a form which is used for editing elements. The components' definitions make use of their own respective services to fetch data as well as initialize the DataTables.Settings including the table columns definitions. The ReactiveFormsModule is used for configuring inline updating of rows. The public APIs with data do not offer these capabilities, so a filtering service is used for filtering, sorting, paginating the data on the front-end.

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
