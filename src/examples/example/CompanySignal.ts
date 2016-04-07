import { ConcreteSignal } from 'ortec/finance/angular/signal/ConcreteSignal';
import { Company } from 'examples/example/model/company/Company';
import { CompanyFactory } from 'examples/example/model/company/CompanyFactory';

export class CompanySignal extends ConcreteSignal<Company> {

    public static className: string = 'examples.example.CompanySignal';
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