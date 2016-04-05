import { Person, PersonBuilder } from 'example/model/person/Person';
import { PersonAction, UpdatePersonAction } from 'example/model/person/PersonAction';

export class PersonActionHandler {
    
    public static className: string = 'example.model.person.PersonActionHandler';
    
    public handle(model: Person, action: PersonAction): Person {
        
        if (action instanceof UpdatePersonAction) {
            
            return action.builder.build(model);
            
        }
        
        throw new Error();
        
    }
    
}