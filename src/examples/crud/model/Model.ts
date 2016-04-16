import { Company } from 'examples/crud/model/company/Company'
import { EditableCompany } from 'examples/crud/model/company/EditableCompany'

export class Model {
    
    public constructor(private company: Company, private editableCompany: EditableCompany) {
        
    }
    
    public getCompany(): Company {
        return this.company;
    }
    
    public getEditableCompany(): EditableCompany {
        return this.editableCompany;
    }
    
}