import { Company } from 'example/model/company/Company';
import { Person } from 'example/model/person/Person';
import { PersonActionHandler } from 'example/model/person/PersonActionHandler';
import { CompanyAction, EmployeeAction } from 'example/model/company/CompanyAction';

export class CompanyActionHandler {

    public static className: string = 'exmaple.model.company.CompanyActionHandler';
    public static $inject: string[] = [
        PersonActionHandler.className
    ];
    
    public constructor(private personActionHandler: PersonActionHandler) {
        
    }

    handle(model: Company, action: CompanyAction): Company {

        if (action instanceof EmployeeAction) {

            const updatedEmployees: Person[]
                = model.employees.map(employee => {

                    if (employee.id === action.employeeId) {
                        return this.personActionHandler.handle(employee, action.employeeAction);
                    } else {
                        return employee;
                    }

                });

        }

    }

}