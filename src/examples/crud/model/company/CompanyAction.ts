import { Employee } from 'examples/crud/model/employee/Employee';

export type CompanyAction 
    = UpdateEmployeeAction
    | DeleteEmployeeAction;

export class ActionWithEmployeeId {
    
    public constructor(private employeeId: number) {
        
    }
    
    public getEmployeeId(): number {
        return this.employeeId;
    }
    
}

export class UpdateEmployeeAction extends ActionWithEmployeeId {
    
    public constructor(employeeId: number, private employee: Employee) {
        super(employeeId);   
    }
    
    public getEmployee(): Employee {
        return this.employee;
    }
    
}

export class DeleteEmployeeAction extends ActionWithEmployeeId {
    
}