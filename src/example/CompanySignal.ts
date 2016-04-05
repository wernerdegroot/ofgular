import { ConcreteSignal } from 'signal/ConcreteSignal';
import { Company } from 'example/model/company/Company';
import { CompanyFactory } from 'example/model/company/CompanyFactory';

export class CompanySignal extends ConcreteSignal<Company> {

    public static className: string = 'example.CompanySignal';
    public static $inject: string[] = [
        CompanyFactory.className
    ];

    public constructor(private companyFactory: CompanyFactory) {
        
        // Initialize at nothing...
        super(null);
        
        // When the initial value is ready, send it to the signal.
        companyFactory.create().then(initialCompany => this.send(initialCompany));
    }

}