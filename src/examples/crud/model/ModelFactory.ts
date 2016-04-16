import { Model } from 'examples/crud/model/Model';
import { CompanyFactory } from 'examples/crud/model/company/CompanyFactory';
import { EditableCompany } from 'examples/crud/model/company/EditableCompany';
import { Employee } from 'examples/crud/model/employee/Employee';
import { EditableEmployee } from 'examples/crud/model/employee/EditableEmployee';
import { sync, Synced } from 'ortec/finance/angular/synchronized/util';
import { Memoized } from 'ortec/finance/angular/functional/Memoized';

export class ModelFactory {
    
    public static className: string = 'examples.crud.model.ModelFactory';
    public static $inject: string[] = [
        CompanyFactory.className
    ];
    
    public constructor(private companyFactory: CompanyFactory) {
        
    }
    
    public create(): Model {
        
        const company = this.companyFactory.create();
        
        function editableEmployeeInitializer(employee: Employee): EditableEmployee {
            return new EditableEmployee(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getAge(),
                employee.getAddress(),
                employee.getCity(),
                false);
        }
        
        function employeeSynchronizer(employees: Employee[], editableEmployees: EditableEmployee[]): Synced<Employee, EditableEmployee>[] {
            
            console.log("Synchronizing employees...");
            
            return sync<Employee, EditableEmployee>(editableEmployeeInitializer, employees, editableEmployees);
        } 
        
        const editableCompany = new EditableCompany([], Memoized.create2(employeeSynchronizer)); 
        
        return new Model(company, editableCompany);
    }
    
}