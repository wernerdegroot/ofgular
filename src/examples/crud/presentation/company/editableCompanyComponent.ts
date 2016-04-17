/// <reference path="../../../../../typings/main.d.ts" />

import IComponentOptions = angular.IComponentOptions;
import { Company } from 'examples/crud/model/company/Company';
import { EditableCompany } from 'examples/crud/model/company/EditableCompany';
import { EditableCompanyAction, DeleteEmployeeAction, WrappedEditableEmployeeAction, UpdateEmployeeAction } from 'examples/crud/model/company/EditableCompanyAction';
import { EditableEmployee } from 'examples/crud/model/employee/EditableEmployee';
import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';
import { Employee } from 'examples/crud/model/employee/Employee';
import { EditableEmployeeAction } from 'examples/crud/model/employee/EditableEmployeeAction';

class EditableCompanyController {
    
    public editableCompany: EditableCompany;
    
    public company: Company;
    
    public getDispatcher: () => Dispatcher<EditableCompanyAction>;
    
    public deleteEmployee(editableEmployee: EditableEmployee) {
        this.getDispatcher().send(new DeleteEmployeeAction(editableEmployee.getId()));
    }
    
    public getEditableEmployees(): EditableEmployee[] {
        return this.editableCompany.getSynchronizedEmployees(this.company.getEmployees());
    }
    
    public getEditableEmployeeDispatcher(editableEmployee: EditableEmployee): Dispatcher<EditableEmployeeAction> {
        return this.getDispatcher().forward((editableEmployeeAction: EditableEmployeeAction) => new WrappedEditableEmployeeAction(editableEmployee.getId(), editableEmployeeAction));
    }
    
    public getEditableEmployeeRemoveDispatcher(editableEmployee: EditableEmployee): Dispatcher<void> {
        return this.getDispatcher().forward((_: void) => new DeleteEmployeeAction(editableEmployee.getId()));
    }
    
    public getEditableEmployeeUpdateDispatcher(editableEmployee: EditableEmployee): Dispatcher<void> {
        return this.getDispatcher().forward((_: void) => new UpdateEmployeeAction(editableEmployee.getId()));
    }
    
}

export var editableCompanyComponent: IComponentOptions = {
    template
        : '<h2>Editable: {{$ctrl.company.name}}</h2>'
        + '<ul>'
        + '    <li '
        + '        ng-repeat="editableEmployee in $ctrl.getEditableEmployees() track by editableEmployee.getId()">'
        + '        <editable-employee'
        + '            editable-employee="editableEmployee"'
        + '            dispatcher="$ctrl.getEditableEmployeeDispatcher(editableEmployee)"' 
        + '            remove-dispatcher="$ctrl.getEditableEmployeeRemoveDispatcher(editableEmployee)"'
        + '            update-dispatcher="$ctrl.getEditableEmployeeUpdateDispatcher(editableEmployee)">'
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