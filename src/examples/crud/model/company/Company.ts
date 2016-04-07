import { Person } from 'examples/crud/model/person/Person';
import { WithPossibleError } from 'ortec/finance/angular/wrappers/WithPossibleError';
import { Expandable } from 'ortec/finance/angular/wrappers/Expandable';

export class Company {
    
    public constructor(
        public name: string,
        public expandableEmployeesWithPossibleError: WithPossibleError<Expandable<Person>>[]) {
    }
    
}