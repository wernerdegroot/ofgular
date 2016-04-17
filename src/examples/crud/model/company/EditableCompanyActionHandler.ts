import { EditableCompany } from 'examples/crud/model/company/EditableCompany';
import { EditableEmployee } from 'examples/crud/model/employee/EditableEmployee';
import { Employee } from 'examples/crud/model/employee/Employee';
import { EditableEmployeeActionHandler } from 'examples/crud/model/employee/EditableEmployeeActionHandler';
import { Company } from 'examples/crud/model/company/Company';
import * as CA from 'examples/crud/model/company/CompanyAction';
import { Focus } from 'ortec/finance/angular/focus/Focus';
import { Focussed } from 'ortec/finance/angular/focus/Focussed';
import { createFocus, createListElementFocus } from 'ortec/finance/angular/focus/util';
import { EditableCompanyAction, WrappedEditableEmployeeAction, DeleteEmployeeAction } from 'examples/crud/model/company/EditableCompanyAction';
import { Effects } from 'ortec/finance/angular/effects/Effects'
import { SendAction } from 'ortec/finance/angular/effects/SendAction'
import { None } from 'ortec/finance/angular/effects/None'

export class EditableCompanyActionHandler {

    public static className: string = 'examples.crud.model.company.EditableCompanyActionHandler';
    public static $inject: string[] = [
        EditableEmployeeActionHandler.className
    ];

    public constructor(private editableEmployeeActionHandler: EditableEmployeeActionHandler) {

    }

    public handle(model: EditableCompany, action: EditableCompanyAction, company: Company): [ EditableCompany, Effects<CA.CompanyAction> ] {

        if (action instanceof WrappedEditableEmployeeAction) {
            
            const id = action.getEmployeeId();

            const synchronizedEditableEmployees = model.getSynchronizedEmployees(company.getEmployees());
            
            const updatedSynchronizedEditableEmployees = synchronizedEditableEmployees.map(synchronizedEditableEmployee => {
                
                const employee = synchronizedEditableEmployee.getOriginal();
                
                if (employee.getId() === id) {
                    
                    const updatedEditableEmployee = this.editableEmployeeActionHandler.handle(
                        synchronizedEditableEmployee,
                        action.getAction(),
                        employee);
                        
                    return updatedEditableEmployee;
                    
                } else {
                    
                    return synchronizedEditableEmployee;
                    
                }
                
            });
            
            const editableCompany = new EditableCompany(updatedSynchronizedEditableEmployees, model.getEmployeeSynchronizer());
            
            return [editableCompany, new None<CA.CompanyAction>()];
            
        } else if (action instanceof DeleteEmployeeAction) {
            
            const actionToSend = new CA.DeleteEmployeeAction(action.getEmployeeId());

            return [model, new SendAction(actionToSend)];

        } else {
            
            throw {
                description: 'Unknown action!',
                self: this,
                model: model,
                action: action,
                company: company
            };
            
        }

    }

}