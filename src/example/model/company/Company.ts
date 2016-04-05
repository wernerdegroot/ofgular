import { Person } from 'example/model/person/Person';

export class Company {
    
    public constructor(
        public name: string,
        public employees: Person[]) {
    }
    
}