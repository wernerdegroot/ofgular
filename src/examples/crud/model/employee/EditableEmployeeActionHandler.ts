import { EditableEmployee, EditableEmployeeBuilder } from 'examples/crud/model/employee/EditableEmployee';
import { Employee } from 'examples/crud/model/employee/Employee';
import { EditableEmployeeAction, UpdateAction, ResetAction, ToggleAction } from 'examples/crud/model/employee/EditableEmployeeAction';

export class EditableEmployeeActionHandler {
    
    public static className: string = 'examples.crud.model.employee.EditableEmployeeActionHandler';
    
    public handle(model: EditableEmployee, action: EditableEmployeeAction, employee: Employee): EditableEmployee {
        
        if (action instanceof UpdateAction) {
            
            return action.getBuilder().build(model);
            
        } else if (action instanceof ResetAction) {
            
            return model.reset(employee);
            
        } else if (action instanceof ToggleAction) {
            
            return model.toggle();
            
        } else {
            
            throw new Error();
            
        }
        
    }
    
}