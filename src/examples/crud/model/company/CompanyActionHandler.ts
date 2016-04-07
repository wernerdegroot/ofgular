import { Company } from 'examples/crud/model/company/Company';
import { Person } from 'examples/crud/model/person/Person';
import { PersonActionHandler } from 'examples/crud/model/person/PersonActionHandler';
import { CompanyAction, EmployeeAction } from 'examples/crud/model/company/CompanyAction';
import { Focus } from 'ortec/finance/angular/focus/Focus';
import { Focussed } from 'ortec/finance/angular/focus/Focussed';
import { createFocus, createListElementFocus } from 'ortec/finance/angular/focus/util';
import { WithPossibleError } from 'ortec/finance/angular/wrappers/WithPossibleError';
import { Expandable } from 'ortec/finance/angular/wrappers/Expandable';

export class CompanyActionHandler {

    public static className: string = 'exmaple.model.company.CompanyActionHandler';
    public static $inject: string[] = [
        PersonActionHandler.className
    ];
    
    public constructor(private personActionHandler: PersonActionHandler) {

    }
    
    private getEmployeesFocus(): Focus<Company, WithPossibleError<Expandable<Person>>[]> {
        
        return createFocus<Company, WithPossibleError<Expandable<Person>>[]>(
            company => company.expandableEmployeesWithPossibleErrors, 
            (company, expandableEmployeesWithPossibleErrors) => new Company(company.name, expandableEmployeesWithPossibleErrors));
    }
    
    private getPersonWithIdFocus(id: number): Focus<Company, Person> {
        
        const personInPersonListFocus = createListElementFocus<WithPossibleError<Expandable<Person>>>(person => person.value.value.id === id);
        const employeesFocus = this.getEmployeesFocus(); 
        
        return employeesFocus
            .compose(personInPersonListFocus)
            .compose(WithPossibleError.getFocus<Expandable<Person>>())
            .compose(Expandable.getFocus<Person>());
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
