import { Company, CompanyBuilder } from 'examples/crud/model/company/Company';
import { Employee } from 'examples/crud/model/employee/Employee';
import { CompanyAction, CreateEmployeeAction, UpdateEmployeeAction, DeleteEmployeeAction, UpdateCompanyNameAction } from 'examples/crud/model/company/CompanyAction';

export class CompanyActionHandler {

    public static className: string = 'exmaple.model.company.CompanyActionHandler';

    public handle(model: Company, action: CompanyAction): Company {

        if (action instanceof CreateEmployeeAction) {

            const employees = model
                .getEmployees()
                .concat([action.getEmployee()]);

            return new CompanyBuilder()
                .setEmployees(employees)
                .update(model);

        } else if (action instanceof UpdateEmployeeAction) {

            const employees = model
                .getEmployees()
                .map(employee => employee.getId() === action.getEmployeeId()
                    ? action.getEmployee()
                    : employee);

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

        } else if (action instanceof UpdateCompanyNameAction) {

            return new Company(action.getCompanyName(), model.getEmployees());

        } else {

            throw new Error();

        }

    }

}
