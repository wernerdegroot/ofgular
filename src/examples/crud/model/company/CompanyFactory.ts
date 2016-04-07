/// <reference path="../../../../../typings/main.d.ts" />

import IQService = angular.IQService;
import IPromise = angular.IPromise;
import { Company } from 'examples/crud/model/company/Company';
import { Person } from 'examples/crud/model/person/Person';
import { WithPossibleError } from 'ortec/finance/angular/wrappers/WithPossibleError';
import { Expandable } from 'ortec/finance/angular/wrappers/Expandable';

export class CompanyFactory {
    
    public static className: string = 'examples.crud.CompanyFactory';
    public static $inject: string[] = [
        '$q'
    ]
    
    public constructor(private $q: IQService) {
        
    }
    
    public create(): IPromise<Company> {
        
        const firstEmployee: Person = new Person(1, 'Harry', 'de Vries', 34, 'Groene Jonkerstraat 32', 'Zevenhoven');
        const secondEmployee: Person = new Person(1, 'Henk', 'de Jong', 32, 'Lage Rijndijk 40', 'Leiden');
        const employees = [firstEmployee, secondEmployee];
        
        const company: Company = new Company('Special Company', employees.map(Expandable.asClosed).map(WithPossibleError.withoutError));
        
        return this.$q.when(company);
    }
    
}