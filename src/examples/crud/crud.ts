/// <reference path="../../../typings/main.d.ts" />

import { modelComponent, modelComponentName } from 'examples/crud/presentation/modelComponent';
import { companyComponent, companyComponentName } from 'examples/crud/presentation/company/companyComponent';
import { editableCompanyComponent, editableCompanyComponentName } from 'examples/crud/presentation/company/editableCompanyComponent';
import { ModelSignal } from 'examples/crud/ModelSignal';
import { ModelDispatcher } from 'examples/crud/ModelDispatcher';
import { ModelActionHandler } from 'examples/crud/model/ModelActionHandler';
import { ModelFactory } from 'examples/crud/model/ModelFactory';
import { CompanyFactory } from 'examples/crud/model/company/CompanyFactory';
import { CompanyActionHandler } from 'examples/crud/model/company/CompanyActionHandler';
import { EditableCompanyActionHandler } from 'examples/crud/model/company/EditableCompanyActionHandler';
import { EditableEmployeeActionHandler } from 'examples/crud/model/employee/EditableEmployeeActionHandler';

angular.module('crud', [])

    .component(modelComponentName, modelComponent)
    
    .component(companyComponentName, companyComponent)
    
    .component(editableCompanyComponentName, editableCompanyComponent)
    
    .service(ModelSignal.className, ModelSignal)
    
    .service(ModelActionHandler.className, ModelActionHandler)
    
    .service(ModelDispatcher.className, ModelDispatcher)
    
    .service(ModelFactory.className, ModelFactory)
    
    .service(CompanyFactory.className, CompanyFactory)
    
    .service(CompanyActionHandler.className, CompanyActionHandler)
    
    .service(EditableCompanyActionHandler.className, EditableCompanyActionHandler)
    
    .service(EditableEmployeeActionHandler.className, EditableEmployeeActionHandler);