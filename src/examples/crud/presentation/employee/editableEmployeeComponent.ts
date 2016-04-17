/// <reference path="../../../../../typings/main.d.ts" />

import IComponentOptions = angular.IComponentOptions;
import { Employee } from 'examples/crud/model/employee/Employee';
import { EditableEmployee, EditableEmployeeBuilder } from 'examples/crud/model/employee/EditableEmployee';
import { EditableEmployeeAction, ToggleAction, UpdateAction, ResetAction } from 'examples/crud/model/employee/EditableEmployeeAction';
import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';

class EditableEmployeeController {
    
    public editableEmployee: EditableEmployee;
    
    public getDispatcher: () => Dispatcher<EditableEmployeeAction>;
    
    public getRemoveDispatcher: () => Dispatcher<void>;
    
    public getUpdateDispatcher: () => Dispatcher<void>;
    
    public getEmployee(): Employee {
        return this.editableEmployee.getOriginal();
    }
    
    public getEditableEmployee(): EditableEmployee {
        return this.editableEmployee;
    }
    
    public toggle() {
        this.getDispatcher().send(new ToggleAction());
    }
    
    public reset() {
        this.getDispatcher().send(new ResetAction());
    }
    
    public remove() {
        this.getRemoveDispatcher().send(undefined);
    }
    
    public update() {
        this.getUpdateDispatcher().send(undefined);
    }
    
    public firstName(newValue: string) {
        return arguments.length
            ? this.getDispatcher().send(new UpdateAction(new EditableEmployeeBuilder().setFirstName(newValue)))
            : this.editableEmployee.getFirstName();
    }
    
    public lastName(newValue: string) {
        return arguments.length
            ? this.getDispatcher().send(new UpdateAction(new EditableEmployeeBuilder().setLastName(newValue)))
            : this.editableEmployee.getLastName();
    }
    
}

export var editableEmployeeComponent: IComponentOptions = {
    template
        : '<h3>'
        + '    {{$ctrl.getEmployee().getFirstName()}} {{$ctrl.getEmployee().getLastName()}}'
        + '    <button ng-click="$ctrl.toggle()">+/-</button>'
        + '    <button ng-click="$ctrl.remove()">X</button>' 
        + '</h3>'
        + '<div ng-if="$ctrl.getEditableEmployee().isExpanded()">'
        + '    <ul>'
        + '        <li>First name: <input ng-model="$ctrl.firstName" ng-model-options="{ getterSetter: true, updateOn: \'default blur\', debounce: { default: 500, blur: 0 } }"></input></li>'
        + '        <li>Last name: <input ng-model="$ctrl.lastName" ng-model-options="{ getterSetter: true, updateOn: \'default blur\', debounce: { default: 500, blur: 0 } }"></input></li>'
        + '        <li>' 
        + '            <button ng-click="$ctrl.update()">Update</button>' 
        + '            <button ng-click="$ctrl.reset()">Reset</button></li>'
        + '    </ul>'
        + '</div>',
    controller: EditableEmployeeController,
    bindings: {
        editableEmployee: '=',
        getDispatcher: '&dispatcher',
        getRemoveDispatcher: '&removeDispatcher',
        getUpdateDispatcher: '&updateDispatcher'
    }
};

export var editableEmployeeComponentName: string = 'editableEmployee'