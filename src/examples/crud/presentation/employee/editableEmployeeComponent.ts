/// <reference path="../../../../../typings/main.d.ts" />

import IComponentOptions = angular.IComponentOptions;
import { Employee } from 'examples/crud/model/employee/Employee';
import { EditableEmployee } from 'examples/crud/model/employee/EditableEmployee';
import { EditableEmployeeAction, ToggleAction } from 'examples/crud/model/employee/EditableEmployeeAction';
import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';

class EditableEmployeeController {
    
    public employee: Employee;
    
    public editableEmployee: EditableEmployee;
    
    public getDispatcher: () => Dispatcher<EditableEmployeeAction>;
    
    public getEmployee(): Employee {
        return this.employee;
    }
    
    public getEditableEmployee(): EditableEmployee {
        return this.editableEmployee;
    }
    
    public toggle() {
        this.getDispatcher().send(new ToggleAction());
    }
    
}

export var editableEmployeeComponent: IComponentOptions = {
    template
        : '<h3>{{$ctrl.getEmployee().getFirstName()}} {{$ctrl.getEmployee().getLastName()}} <button ng-click="$ctrl.toggle()">+/-</button></h3>'
        + '<div ng-if="$ctrl.getEditableEmployee().isExpanded()">'
        + '    <ul>'
        + '        <li>First name: {{$ctrl.getEditableEmployee().getFirstName()}}</li>'
        + '        <li>Last name: {{$ctrl.getEditableEmployee().getLastName()}}</li>'
        + '    </ul>'
        + '</div>',
    controller: EditableEmployeeController,
    bindings: {
        employee: '=',
        editableEmployee: '=',
        getDispatcher: '&dispatcher'
    }
};

export var editableEmployeeComponentName: string = 'editableEmployee'