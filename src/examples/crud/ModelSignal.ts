import { ConcreteSignal } from 'ortec/finance/angular/signal/ConcreteSignal';
import { Model } from 'examples/crud/model/Model';
import { ModelFactory } from 'examples/crud/model/ModelFactory';

export class ModelSignal extends ConcreteSignal<Model> {

    public static className: string = 'examples.crud.ModelSignal';
    public static $inject: string[] = [
        ModelFactory.className
    ];

    public constructor(private modelFactory: ModelFactory) {
        
        super(modelFactory.create());
    }

}