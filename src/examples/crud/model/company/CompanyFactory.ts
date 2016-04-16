/// <reference path="../../../../../typings/main.d.ts" />

import { Company } from 'examples/crud/model/company/Company';
import { Employee } from 'examples/crud/model/employee/Employee';

export class CompanyFactory {
    
    public static className: string = 'examples.crud.CompanyFactory';
    
    public create(): Company {
        
        const firstEmployee: Employee = new Employee(1, 'Harry', 'de Vries', 34, 'Groene Jonkerstraat 32', 'Zevenhoven');
        const secondEmployee: Employee = new Employee(2, 'Henk', 'de Jong', 32, 'Lage Rijndijk 40', 'Leiden');
        const employees = [firstEmployee, secondEmployee];
        
        return new Company('Special Company', employees);
    }
    
}