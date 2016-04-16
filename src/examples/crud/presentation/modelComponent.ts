/// <reference path="../../../../typings/main.d.ts" />

import IComponentOptions = angular.IComponentOptions;
import { Model } from 'examples/crud/model/Model';
import { ModelSignal } from 'examples/crud/ModelSignal';
import { WrappedCompanyAction, WrappedEditableCompanyAction } from 'examples/crud/model/ModelAction';
import { ModelDispatcher } from 'examples/crud/ModelDispatcher';
import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';
import { CompanyAction } from 'examples/crud/model/company/CompanyAction';
import { Company } from 'examples/crud/model/company/Company';
import { EditableCompany } from 'examples/crud/model/company/EditableCompany';
import { EditableCompanyAction } from 'examples/crud/model/company/EditableCompanyAction';

class ModelController {
    
    private model: Model;
    
    public static $inject: string[] = [
        ModelSignal.className,
        ModelDispatcher.className
    ];
    
    public constructor(private modelSignal: ModelSignal, private modelDispatcher: ModelDispatcher) {
        
        this.modelSignal.onChange(model => this.model = model);
        
    }
    
    public getCompany(): Company {
        return this.model.getCompany();
    }
    
    public getEditableCompany(): EditableCompany {
        return this.model.getEditableCompany();
    }
    
    public getCompanyDispatcher(): Dispatcher<CompanyAction> {
        return this.modelDispatcher.forward((companyAction: CompanyAction) => new WrappedCompanyAction(companyAction));
    }
    
    public getEditableCompanyDispatcher(): Dispatcher<EditableCompanyAction> {
        return this.modelDispatcher.forward((editableCompanyAction: EditableCompanyAction) => new WrappedEditableCompanyAction(editableCompanyAction));
    }
    
}

export var modelComponent: IComponentOptions = {
    template
        : '<h1>Model</h1>'
        + '<company company="$ctrl.getCompany()" dispatcher="$ctrl.getCompanyDispatcher()"></company>'
        + '<hr />'
        + '<editable-company company="$ctrl.getCompany()" editable-company="$ctrl.getEditableCompany()" dispatcher="$ctrl.getEditableCompanyDispatcher()"></editable-company>',
    controller: ModelController,
    bindings: {}
};

export var modelComponentName: string = 'model'