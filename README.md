# MyReactiveApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.4.

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

const data = engagementModules.map(engagementModules => (licenseInfo.find(x => x.productId === engagementModules.productId)) ? 
             ({...engagementModules, selected: true, disabled: true, name: this.getModuleName(engagementModules.productId)})
         : ({...engagementModules, selected: false, disabled: false, name: this.getModuleName(engagementModules.productId)}))
    const selectedEng = data.filter((x:any) => x.selected);
    let result;
    if(selectedEng.length && (selectedEng.some((x: any) => x.productId === WKAuditModuleType.AxcessEngagement 
        ||   x.productId == WKAuditModuleType.AxcessKC))){
      result = data.map((x: any) => (x.productId === WKAuditModuleType.FinancialPrep) ? 
      ({...x, disabled: true}): ({...x}))
    } else if(selectedEng.length && selectedEng.some((X: any) => X.productId === WKAuditModuleType.FinancialPrep)){
      result = data.map((x: any) => ({...x, disabled: true}))
    } else {
      result = data.map((x: any) => ({...x, disabled: false}));
    }
  
    console.log(result);
    return result?.sort((a, b) => dbdata.map(x => x.productId).indexOf(a.productId) - dbdata.map(x => x.productId).indexOf(b.productId));
