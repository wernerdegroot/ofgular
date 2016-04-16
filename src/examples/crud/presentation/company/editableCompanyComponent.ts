/// <reference path="../../../../../typings/main.d.ts" />

import IComponentOptions = angular.IComponentOptions;
import { Company } from 'examples/crud/model/company/Company';
import { EditableCompany } from 'examples/crud/model/company/EditableCompany';
import { EditableCompanyAction, DeleteEmployeeAction, WrappedEditableEmployeeAction } from 'examples/crud/model/company/EditableCompanyAction';
import { EditableEmployee } from 'examples/crud/model/employee/EditableEmployee';
import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';
import { Employee } from 'examples/crud/model/employee/Employee';
import { ToggleAction } from 'examples/crud/model/employee/EditableEmployeeAction';
import { Synced } from 'ortec/finance/angular/synchronized/util';

class EditableCompanyController {
    
    public editableCompany: EditableCompany;
    
    public company: Company;
    
    public getDispatcher: () => Dispatcher<EditableCompanyAction>;
    
    public deleteEmployee(editableEmployee: EditableEmployee) {
        this.getDispatcher().send(new DeleteEmployeeAction(editableEmployee.getId()));
    }
    
    public getSynchronizedEmployees(): Synced<Employee, EditableEmployee>[] {
        return this.editableCompany.getSynchronizedEmployees(this.company.getEmployees());
    }
    
    public toggleEmployee(employee: Employee) {
        this.getDispatcher().send(new WrappedEditableEmployeeAction(employee.getId(), new ToggleAction()));
    }
    
}

export var editableCompanyComponent: IComponentOptions = {
    template
        : '<h2>Editable: {{$ctrl.company.name}}</h2>'
        + '<ul>'
        + '    <li '
        + '        ng-repeat="synchronizedEmployee in $ctrl.getSynchronizedEmployees()"'
        + '        ng-init="employee = synchronizedEmployee.getSource(); editableEmployee = synchronizedEmployee.getToSync()">'
        + '        <h3>{{employee.getFirstName()}} {{employee.getLastName()}} <button ng-click="$ctrl.toggleEmployee(employee)">+/-</button></h3>'
        + '        <div ng-if="editableEmployee.isExpanded()">'
        + '            <ul>'
        + '                <li>First name: {{editableEmployee.getFirstName()}}</li>'
        + '                <li>Last name: {{editableEmployee.getLastName()}}</li>'
        + '            </ul>'
        + '        </div>'
        + '    </li>'
        + '</ul>',
    controller: EditableCompanyController,
    bindings: {
        company: '=',
        editableCompany: '=',
        getDispatcher: '&dispatcher'
    }
};

export var editableCompanyComponentName: string = 'editableCompany'