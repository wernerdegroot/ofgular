import { PersonBuilder } from 'examples/example/model/person/Person'; 

export type PersonAction 
    = UpdatePersonAction;

export class UpdatePersonAction {
    
    public constructor(public builder: PersonBuilder) {
        
    }
    
}