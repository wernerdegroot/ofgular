import { Person } from 'examples/crud/model/person/Person';

export class Company {
    
    public constructor(
        public name: string,
        public employees: Person[]) {
    }
    
}