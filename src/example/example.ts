/// <reference path="../../typings/main.d.ts" />

import { CompanySignal } from 'example/CompanySignal';
import { PersonActionHandler } from 'example/model/person/PersonActionHandler';
import { CompanyActionHandler } from 'example/model/company/CompanyActionHandler';

angular.module('example', [])

    .service(CompanySignal.className, CompanySignal)
    
    .service(CompanyActionHandler.className, CompanyActionHandler)
    
    .service(PersonActionHandler.className, PersonActionHandler);