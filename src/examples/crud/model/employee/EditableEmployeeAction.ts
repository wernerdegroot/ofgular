import { EditableEmployeeBuilder } from 'examples/crud/model/employee/EditableEmployee'; 

export type EditableEmployeeAction 
    = UpdateAction
    | ResetAction
    | ToggleAction;

export class UpdateAction {
    
    public constructor(private builder: EditableEmployeeBuilder) {
        
    }
    
    public getBuilder(): EditableEmployeeBuilder {
        return this.builder;
    }
    
}

export class ResetAction {
    
}

export class ToggleAction {
    
}