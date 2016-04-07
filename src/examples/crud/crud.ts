/// <reference path="../../../typings/main.d.ts" />

import { CompanySignal } from 'examples/crud/CompanySignal';
import { PersonActionHandler } from 'examples/crud/model/person/PersonActionHandler';
import { CompanyActionHandler } from 'examples/crud/model/company/CompanyActionHandler';
import { CompanyFactory } from 'examples/crud/model/company/CompanyFactory';
import { companyComponent, companyComponentName } from 'examples/crud/presentation/company/companyComponent';

angular.module('crud', [])

    .service(CompanySignal.className, CompanySignal)
    
    .service(CompanyActionHandler.className, CompanyActionHandler)
    
    .service(PersonActionHandler.className, PersonActionHandler)
    
    .service(CompanyFactory.className, CompanyFactory)
    
    .component(companyComponentName, companyComponent);