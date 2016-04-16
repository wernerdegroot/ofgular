/// <reference path="../../../../../typings/main.d.ts" />

import IComponentOptions = angular.IComponentOptions;
import { Company } from 'examples/crud/model/company/Company';
import { Employee } from 'examples/crud/model/employee/Employee';
import { CompanyAction, DeleteEmployeeAction } from 'examples/crud/model/company/CompanyAction';
import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';

class CompanyController {
    
    public company: Company;
    
    public getDispatcher: () => Dispatcher<CompanyAction>;
    
    public deleteEmployee(employee: Employee) {
        this.getDispatcher().send(new DeleteEmployeeAction(employee.getId()));
    }
    
    
    
}

export var companyComponent: IComponentOptions = {
    template
        : '<h2>{{$ctrl.company.name}}</h2>'
        + '<ul>'
        + '    <li ng-repeat="employee in $ctrl.company.getEmployees()">'
        + '        <h3>{{employee.getFirstName()}} {{employee.getLastName()}} <button ng-click="$ctrl.deleteEmployee(employee)">X</button></h3>'
        + '    </li>'
        + '</ul>',
    controller: CompanyController,
    bindings: {
        company: '=',
        getDispatcher: '&dispatcher'
    }
};

export var companyComponentName: string = 'company'