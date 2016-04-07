/// <reference path="../../../../../typings/main.d.ts" />

import IComponentOptions = angular.IComponentOptions;
import { Company } from 'examples/crud/model/company/Company';
import { CompanySignal } from 'examples/crud/CompanySignal';

class CompanyController {
    
    public company: Company;
    
    public static $inject: string[] = [CompanySignal.className];
    
    public constructor(private companySignal: CompanySignal) {
        
        this.companySignal.onChange(company => this.company = company);
        
    }
    
}

export var companyComponent: IComponentOptions = {
    template
        : '<h1>{{$ctrl.company.name}}</h1>'
        + '<ul>'
        + '    <li ng-repeat="expandableEmployeeWithPossibleError in $ctrl.company.expandableEmployeesWithPossibleErrors" ng-init="expandableEmployee = expandableEmployeeWithPossibleError.value; employee = expandableEmployee.value">'
        + '        <h2>{{employee.firstName}} {{employee.lastName}}</h2>'
        + '    </li>'
        + '</ul>',
    controller: CompanyController,
    bindings: {}
};

export var companyComponentName: string = 'company'