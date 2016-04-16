import { CompanyAction } from 'examples/crud/model/company/CompanyAction';
import { EditableCompanyAction } from 'examples/crud/model/company/EditableCompanyAction';

export type ModelAction
    = WrappedCompanyAction
    | WrappedEditableCompanyAction;
    
export class WrappedCompanyAction {
    
    public constructor(private companyAction: CompanyAction) {
        
    }
    
    public getCompanyAction(): CompanyAction {
        return this.companyAction;
    }
}

export class WrappedEditableCompanyAction {
    
    public constructor(private editableCompanyAction: EditableCompanyAction) {
        
    }
    
    public getEditableCompanyAction(): EditableCompanyAction {
        return this.editableCompanyAction;
    }
}