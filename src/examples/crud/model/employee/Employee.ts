export class Employee {
    
    public constructor(
        private id: number,
        private firstName: string,
        private lastName: string,
        private age: number,
        private address: string,
        private city: string) {
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
    
}