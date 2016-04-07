/// <reference path="../../../../../typings/main.d.ts" />

import IQService = angular.IQService;
import IPromise = angular.IPromise;
import { Company } from 'examples/example/model/company/Company';
import { Person } from 'examples/example/model/person/Person';

export class CompanyFactory {
    
    public static className: string = 'examples.example.CompanyFactory';
    public static $inject: string[] = [
        '$q'
    ]
    
    public constructor(private $q: IQService) {
        
    }
    
    public create(): IPromise<Company> {
        
        const firstEmployee: Person = new Person(1, 'Harry', 'de Vries', 34, 'Groene Jonkerstraat 32', 'Zevenhoven');
        const secondEmployee: Person = new Person(1, 'Henk', 'de Jong', 32, 'Lage Rijndijk 40', 'Leiden');
        
        const company: Company = new Company('Special Company', [firstEmployee, secondEmployee]);
        
        return this.$q.when(company);
    }
    
}