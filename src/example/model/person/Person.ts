import { Maybe } from 'functional/Maybe';

export class Person {
    
    public constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public age: number,
        public address: string,
        public city: string) {
    }
    
}

export class PersonBuilder {
    
    private id: Maybe<number>;
    private firstName: Maybe<string>;
    private lastName: Maybe<string>;
    private age: Maybe<number>;
    private address: Maybe<string>;
    private city: Maybe<string>;
    
    public setId(id: number) {
        this.id = Maybe.just(id);
    }
    
    public setFirstName(firstName: string) {
        this.firstName = Maybe.just(firstName);
    }
    
    public setLastName(lastName: string) {
        this.lastName = Maybe.just(lastName);
    }
    
    public setAge(age: number) {
        this.age = Maybe.just(age);
    }
    
    public setAddress(address: string) {
        this.address = Maybe.just(address);
    }
    
    public setCity(city: string) {
        this.city = Maybe.just(city);
    }
    
    public build(person: Person) {
        return new Person(
            this.id.withDefault(person.id),
            this.firstName.withDefault(person.firstName),
            this.lastName.withDefault(person.lastName),
            this.age.withDefault(person.age),
            this.address.withDefault(person.address),
            this.city.withDefault(person.city));
    }
    
}