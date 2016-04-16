import { EditableCompany } from 'examples/crud/model/company/EditableCompany';
import { EditableEmployee } from 'examples/crud/model/employee/EditableEmployee';
import { Employee } from 'examples/crud/model/employee/Employee';
import { EditableEmployeeActionHandler } from 'examples/crud/model/employee/EditableEmployeeActionHandler';
import { Company } from 'examples/crud/model/company/Company';
import { Focus } from 'ortec/finance/angular/focus/Focus';
import { Focussed } from 'ortec/finance/angular/focus/Focussed';
import { createFocus, createListElementFocus } from 'ortec/finance/angular/focus/util';
import { EditableCompanyAction, WrappedEditableEmployeeAction } from 'examples/crud/model/company/EditableCompanyAction';
import { Synced } from 'ortec/finance/angular/synchronized/util';

export class EditableCompanyActionHandler {

    public static className: string = 'examples.crud.model.company.EditableCompanyActionHandler';
    public static $inject: string[] = [
        EditableEmployeeActionHandler.className
    ];

    public constructor(private editableEmployeeActionHandler: EditableEmployeeActionHandler) {

    }

    public handle(model: EditableCompany, action: EditableCompanyAction, company: Company): EditableCompany {

        if (action instanceof WrappedEditableEmployeeAction) {
            
            const id = action.getEmployeeId();

            const synchronizedEditableEmployees = model.getSynchronizedEmployees(company.getEmployees());
            
            const updatedSynchronizedEditableEmployees = synchronizedEditableEmployees.map(synchronizedEditableEmployee => {
                
                const employee = synchronizedEditableEmployee.getSource();
                
                if (employee.getId() === id) {
                    
                    const updatedEditableEmployee = this.editableEmployeeActionHandler.handle(
                        synchronizedEditableEmployee.getToSync(),
                        action.getAction(),
                        employee);
                        
                    return new Synced<Employee, EditableEmployee>(employee, updatedEditableEmployee);
                    
                } else {
                    
                    return synchronizedEditableEmployee;
                    
                }
                
            });
            
            const updatedEditableEmployees = updatedSynchronizedEditableEmployees.map(updatedSynchronizedEditableEmployee => {
                return updatedSynchronizedEditableEmployee.getToSync();
            });
            
            return new EditableCompany(updatedEditableEmployees, model.getEmployeeSynchronizer());

        } else {
            
            throw {
                description: 'Unknown action!',
                action: action
            };
            
        }

    }

}