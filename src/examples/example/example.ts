/// <reference path="../../../typings/main.d.ts" />

import { CompanySignal } from 'examples/example/CompanySignal';
import { PersonActionHandler } from 'examples/example/model/person/PersonActionHandler';
import { CompanyActionHandler } from 'examples/example/model/company/CompanyActionHandler';

angular.module('example', [])

    .service(CompanySignal.className, CompanySignal)
    
    .service(CompanyActionHandler.className, CompanyActionHandler)
    
    .service(PersonActionHandler.className, PersonActionHandler);