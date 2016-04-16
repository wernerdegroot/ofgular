import { ActionHandler } from 'ortec/finance/angular/signal/ActionHandler';
import { Effects } from 'ortec/finance/angular/effects/Effects';
import { None } from 'ortec/finance/angular/effects/None';
import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';
import { ModelAction, WrappedCompanyAction, WrappedEditableCompanyAction } from 'examples/crud/model/ModelAction';
import { CompanyActionHandler } from 'examples/crud/model/company/CompanyActionHandler';
import { EditableCompanyActionHandler } from 'examples/crud/model/company/EditableCompanyActionHandler';
import { Model } from 'examples/crud/model/Model';

export class ModelActionHandler implements ActionHandler<Model, ModelAction> {
    
    public static className: string = 'examples.crud.model.ModelActionHandler';
    public static $inject: string[] = [
        CompanyActionHandler.className,
        EditableCompanyActionHandler.className
    ];
    
    public constructor(private companyActionHandler: CompanyActionHandler, private editableCompanyActionHandler: EditableCompanyActionHandler) {
        
    }
    
    public handle(model: Model, action: ModelAction, dispatcher: Dispatcher<ModelAction>): [ Model, Effects<ModelAction> ] {
        
        if (action instanceof WrappedCompanyAction) {
            
            const company = this.companyActionHandler.handle(model.getCompany(), action.getCompanyAction());
            
            return [
                new Model(company, model.getEditableCompany()),
                new None<ModelAction>()
            ];
            
        } else if (action instanceof WrappedEditableCompanyAction) {
            
            const editableCompany = this.editableCompanyActionHandler.handle(model.getEditableCompany(), action.getEditableCompanyAction(), model.getCompany());
            
            return [
                new Model(model.getCompany(), editableCompany),
                new None<ModelAction>()
            ];
            
        } else {
            
            throw {
                description: 'Unknown action!',
                self: this,
                model: model,
                action: action,
                dispatcher: dispatcher  
            };
            
        }
        
    }
    
}