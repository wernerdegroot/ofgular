import { Model } from 'examples/crud/model/Model';
import { CompanyFactory } from 'examples/crud/model/company/CompanyFactory';
import { EditableCompany } from 'examples/crud/model/company/EditableCompany';
import { Employee } from 'examples/crud/model/employee/Employee';
import { EditableEmployee, EditableEmployeeBuilder } from 'examples/crud/model/employee/EditableEmployee';
import { sync } from 'ortec/finance/angular/sync/util';
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
                employee,
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getAge(),
                employee.getAddress(),
                employee.getCity(),
                false);
        }
        
        function editableEmployeeMerger(employee: Employee, editableEmployee: EditableEmployee): EditableEmployee {
            return new EditableEmployeeBuilder()
                .setOriginal(employee)
                .build(editableEmployee);
        }
        
        function employeeSynchronizer(employees: Employee[], editableEmployees: EditableEmployee[]): EditableEmployee[] {
            return sync<Employee, EditableEmployee>(editableEmployeeInitializer, editableEmployeeMerger, employees, editableEmployees);
        } 
        
        const editableCompany = new EditableCompany([], Memoized.create2(employeeSynchronizer)); 
        
        return new Model(company, editableCompany);
    }
    
}