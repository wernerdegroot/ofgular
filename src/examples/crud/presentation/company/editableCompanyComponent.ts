/// <reference path="../../../../../typings/main.d.ts" />

import IComponentOptions = angular.IComponentOptions;
import { Company } from 'examples/crud/model/company/Company';
import { EditableCompany } from 'examples/crud/model/company/EditableCompany';
import { EditableCompanyAction, DeleteEmployeeAction, WrappedEditableEmployeeAction } from 'examples/crud/model/company/EditableCompanyAction';
import { EditableEmployee } from 'examples/crud/model/employee/EditableEmployee';
import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';
import { Employee } from 'examples/crud/model/employee/Employee';
import { EditableEmployeeAction } from 'examples/crud/model/employee/EditableEmployeeAction';
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
    
    public getEditableEmployeeDispatcher(employee: Employee): Dispatcher<EditableEmployeeAction> {
        return this.getDispatcher().forward((editableEmployeeAction: EditableEmployeeAction) => new WrappedEditableEmployeeAction(employee.getId(), editableEmployeeAction));
    }
    
}

export var editableCompanyComponent: IComponentOptions = {
    template
        : '<h2>Editable: {{$ctrl.company.name}}</h2>'
        + '<ul>'
        + '    <li '
        + '        ng-repeat="synchronizedEmployee in $ctrl.getSynchronizedEmployees()"'
        + '        ng-init="employee = synchronizedEmployee.getSource(); editableEmployee = synchronizedEmployee.getToSync()">'
        + '        <editable-employee'
        + '            employee="employee"'
        + '            editable-employee="editableEmployee"'
        + '            dispatcher="$ctrl.getEditableEmployeeDispatcher(employee)">'
        + '        </editable-employee>'
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