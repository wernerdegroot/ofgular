import { Person, PersonBuilder } from 'examples/crud/model/person/Person';
import { PersonAction, UpdatePersonAction } from 'examples/crud/model/person/PersonAction';

export class PersonActionHandler {
    
    public static className: string = 'examples.crud.model.person.PersonActionHandler';
    
    public handle(model: Person, action: PersonAction): Person {
        
        if (action instanceof UpdatePersonAction) {
            
            return action.builder.build(model);
            
        }
        
        throw new Error();
        
    }
    
}