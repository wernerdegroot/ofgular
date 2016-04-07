/// <reference path="../../../typings/main.d.ts" />

import { CompanySignal } from 'examples/crud/CompanySignal';
import { PersonActionHandler } from 'examples/crud/model/person/PersonActionHandler';
import { CompanyActionHandler } from 'examples/crud/model/company/CompanyActionHandler';

angular.module('example', [])

    .service(CompanySignal.className, CompanySignal)
    
    .service(CompanyActionHandler.className, CompanyActionHandler)
    
    .service(PersonActionHandler.className, PersonActionHandler);