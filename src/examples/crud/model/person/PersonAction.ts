import { PersonBuilder } from 'examples/crud/model/person/Person'; 

export type PersonAction 
    = UpdatePersonAction;

export class UpdatePersonAction {
    
    public constructor(public builder: PersonBuilder) {
        
    }
    
}