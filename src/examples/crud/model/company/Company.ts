import { Employee } from 'examples/crud/model/employee/Employee';
import { Maybe } from 'ortec/finance/angular/functional/Maybe';

export class Company {
    
    public constructor(
        private name: string,
        private employees: Employee[]) {
    }
    
    public getName(): string {
        return this.name;
    }
    
    public getEmployees(): Employee[] {
        return this.employees;
    }
    
}

export class CompanyBuilder {
    
    private name: Maybe<string> = Maybe.nothing<string>();
    private employees: Maybe<Employee[]> = Maybe.nothing<Employee[]>();
    
    public setName(name: string): CompanyBuilder {
        this.name = Maybe.just(name);
        return this;
    }
    
    public setEmployees(employees: Employee[]): CompanyBuilder {
        this.employees = Maybe.just(employees);
        return this;
    }
    
    public update(company: Company): Company {
        return new Company(
            this.name.withDefault(company.getName()),
            this.employees.withDefault(company.getEmployees()));
    }
    
}