import { Maybe } from 'ortec/finance/angular/functional/Maybe';
import { Employee } from 'examples/crud/model/employee/Employee';

export class EditableEmployee {
    
    public constructor(
        private original: Employee,
        private id: number,
        private firstName: string,
        private lastName: string,
        private age: number,
        private address: string,
        private city: string,
        private expanded: boolean) {
    }
    
    public reset(employee: Employee): EditableEmployee {
        return new EditableEmployee(
            employee,
            employee.getId(),
            employee.getFirstName(),
            employee.getLastName(),
            employee.getAge(),
            employee.getAddress(),
            employee.getCity(),
            this.expanded);
    }
    
    public getOriginal(): Employee {
        return this.original;
    }
    
    public getId(): number {
        return this.id;
    }
    
    public getFirstName(): string {
        return this.firstName;
    }
    
    public getLastName(): string {
        return this.lastName;
    }
    
    public getAge(): number {
        return this.age;
    }
    
    public getAddress(): string {
        return this.address;
    }
    
    public getCity(): string {
        return this.city;
    }
    
    public isExpanded(): boolean {
        return this.expanded;
    }
    
    public toggle(): EditableEmployee {
        const expanded = !this.expanded;
        
        return new EditableEmployeeBuilder()
            .setExpanded(expanded)
            .build(this);
    }
    
}

export class EditableEmployeeBuilder {
    
    private original: Maybe<Employee> = Maybe.nothing<Employee>();
    private id: Maybe<number> = Maybe.nothing<number>();
    private firstName: Maybe<string> = Maybe.nothing<string>();
    private lastName: Maybe<string> = Maybe.nothing<string>();
    private age: Maybe<number> = Maybe.nothing<number>();
    private address: Maybe<string> = Maybe.nothing<string>();
    private city: Maybe<string> = Maybe.nothing<string>();
    private expanded: Maybe<boolean> = Maybe.nothing<boolean>();
    
    public setOriginal(original: Employee): EditableEmployeeBuilder {
        this.original = Maybe.just(original);
        return this;
    } 
    
    public setId(id: number): EditableEmployeeBuilder {
        this.id = Maybe.just(id);
        return this;
    }
    
    public setFirstName(firstName: string): EditableEmployeeBuilder {
        this.firstName = Maybe.just(firstName);
        return this;
    }
    
    public setLastName(lastName: string): EditableEmployeeBuilder {
        this.lastName = Maybe.just(lastName);
        return this;
    }
    
    public setAge(age: number): EditableEmployeeBuilder {
        this.age = Maybe.just(age);
        return this;
    }
    
    public setAddress(address: string): EditableEmployeeBuilder {
        this.address = Maybe.just(address);
        return this;
    }
    
    public setCity(city: string): EditableEmployeeBuilder {
        this.city = Maybe.just(city);
        return this;
    }
    
    public setExpanded(expanded: boolean): EditableEmployeeBuilder {
        this.expanded = Maybe.just(expanded);
        return this;
    }
    
    public build(editableEmployee: EditableEmployee): EditableEmployee {
        return new EditableEmployee(
            this.original.withDefault(editableEmployee.getOriginal()),
            this.id.withDefault(editableEmployee.getId()),
            this.firstName.withDefault(editableEmployee.getFirstName()),
            this.lastName.withDefault(editableEmployee.getLastName()),
            this.age.withDefault(editableEmployee.getAge()),
            this.address.withDefault(editableEmployee.getAddress()),
            this.city.withDefault(editableEmployee.getCity()),
            this.expanded.withDefault(editableEmployee.isExpanded()));
    }
    
}