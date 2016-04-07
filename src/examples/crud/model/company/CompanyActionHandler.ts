import { Company } from 'examples/crud/model/company/Company';
import { Person } from 'examples/crud/model/person/Person';
import { PersonActionHandler } from 'examples/crud/model/person/PersonActionHandler';
import { CompanyAction, EmployeeAction } from 'examples/crud/model/company/CompanyAction';
import { Focus } from 'ortec/finance/angular/focus/Focus';
import { Focussed } from 'ortec/finance/angular/focus/Focussed';
import { createFocus, createListElementFocus } from 'ortec/finance/angular/focus/util';

export class CompanyActionHandler {

    public static className: string = 'exmaple.model.company.CompanyActionHandler';
    public static $inject: string[] = [
        PersonActionHandler.className
    ];
    
    public constructor(private personActionHandler: PersonActionHandler) {

    }
    
    private getEmployeesFocus(): Focus<Company, Person[]> {
        return createFocus<Company, Person[]>(
            company => company.employees, 
            (company, employees) => new Company(company.name, company.employees));
    }
    
    private getPersonWithIdFocus(id: number): Focus<Company, Person> {
        
        const personInPersonListFocus = createListElementFocus<Person>(person => person.id === id);
        const employeesFocus = this.getEmployeesFocus(); 
        
        return employeesFocus.compose(personInPersonListFocus);
    }
    
    private getFocussedOnPerson(id: number, company: Company): Focussed<Company, Person> {
        return new Focussed<Company, Person>(this.getPersonWithIdFocus(id), company);
    }

    public handle(model: Company, action: CompanyAction): Company {

        if (action instanceof EmployeeAction) {

            return this
                .getFocussedOnPerson(action.employeeId, model)
                .updateValueWith(employee => this.personActionHandler.handle(employee, action.employeeAction))
                .getRoot();

        }

    }

}
