import { EditableEmployeeAction } from 'examples/crud/model/employee/EditableEmployeeAction';

export type EditableCompanyAction
    = WrappedEditableEmployeeAction
    | DeleteEmployeeAction
    | UpdateEmployeeAction;
    
export class ActionWithEmployeeId {
    
    public constructor(private employeeId: number) {
        
    }
    
    public getEmployeeId(): number {
        return this.employeeId;
    }
    
}
    
export class WrappedEditableEmployeeAction extends ActionWithEmployeeId {
    
    public constructor(employeeId: number, private action: EditableEmployeeAction) {
        super(employeeId);
    }
    
    public getAction(): EditableEmployeeAction {
        return this.action;
    }
    
}

export class DeleteEmployeeAction extends ActionWithEmployeeId {
    
}

export class UpdateEmployeeAction extends ActionWithEmployeeId {
    
}