import { Company, CompanyBuilder } from 'examples/crud/model/company/Company';
import { Employee } from 'examples/crud/model/employee/Employee';
import { CompanyAction, UpdateEmployeeAction, DeleteEmployeeAction } from 'examples/crud/model/company/CompanyAction';
import { Focus } from 'ortec/finance/angular/focus/Focus';
import { createFocus, createListElementFocus } from 'ortec/finance/angular/focus/util';
import { Focussed } from 'ortec/finance/angular/focus/Focussed';

export class CompanyActionHandler {

    public static className: string = 'exmaple.model.company.CompanyActionHandler';

    public handle(model: Company, action: CompanyAction): Company {

        if (action instanceof UpdateEmployeeAction) {

            const employees = model
                .getEmployees()
                .map(employee => {
                    
                    return employee.getId() === action.getEmployeeId()
                        ? action.getEmployee()
                        : employee;
                });

            return new CompanyBuilder()
                .setEmployees(employees)
                .update(model);

        } else if (action instanceof DeleteEmployeeAction) {

            const employees = model
                .getEmployees()
                .filter(employee => employee.getId() !== action.getEmployeeId());

            return new CompanyBuilder()
                .setEmployees(employees)
                .update(model);

        } else {

            throw {
                description: 'Unknown action!',
                self: this,
                model: model,
                action: action
            };

        }

    }
    
    private getEmployeesFocus(): Focus<Company, Employee[]> {
        
        return createFocus<Company, Employee[]>(
            company => company.getEmployees(), 
            (company, employees) => new Company(company.getName(), employees));
    }
    
    private getEmployeeWithIdFocus(id: number): Focus<Employee[], Employee> {
        
        return createListElementFocus<Employee>(employee => employee.getId() === id);
    }
    
    private getFocussedOnEmployees(company: Company): Focussed<Company, Employee[]> {
        return new Focussed<Company, Employee[]>(this.getEmployeesFocus(), company);
    }

}
