import { EditableEmployee } from 'examples/crud/model/employee/EditableEmployee';
import { Employee } from 'examples/crud/model/employee/Employee';
import { Memoized2, Memoized } from 'ortec/finance/angular/functional/Memoized';

export type EmployeeSynchronizer = Memoized2<Employee[], EditableEmployee[], EditableEmployee[]>;

export class EditableCompany {
    
    public constructor(private editableEmployees: EditableEmployee[], private employeeSynchronizer: EmployeeSynchronizer) {
        
    }
    
    public getEditableEmployees(): EditableEmployee[] {
        return this.editableEmployees;
    }
    
    public getEmployeeSynchronizer(): EmployeeSynchronizer {
        return this.employeeSynchronizer;
    }
    
    public getSynchronizedEmployees(employees: Employee[]): EditableEmployee[] {
        return Memoized.apply2(this.employeeSynchronizer, employees, this.editableEmployees); 
    }
    
}