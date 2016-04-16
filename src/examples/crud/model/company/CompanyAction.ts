import { Employee } from 'examples/crud/model/employee/Employee';

export type CompanyAction 
    = CreateEmployeeAction
    | UpdateEmployeeAction
    | DeleteEmployeeAction
    | UpdateCompanyNameAction;

export class ActionWithEmployeeId {
    
    public constructor(private employeeId: number) {
        
    }
    
    public getEmployeeId(): number {
        return this.employeeId;
    }
    
}

export class CreateEmployeeAction {
    
    public constructor(private employee: Employee) {
           
    }
    
    public getEmployee(): Employee {
        return this.employee;
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

export class UpdateCompanyNameAction {
    
    public constructor(private companyName: string) {
        
    }
    
    public getCompanyName(): string {
        return this.companyName;
    }
    
}