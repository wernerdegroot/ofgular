import { ModelAction } from 'examples/crud/model/ModelAction';
import { Model } from 'examples/crud/model/Model';
import { ModelSignal } from 'examples/crud/ModelSignal';
import { ConcreteDispatcher } from 'ortec/finance/angular/signal/ConcreteDispatcher';
import { ModelActionHandler } from 'examples/crud/model/ModelActionHandler';

export class ModelDispatcher extends ConcreteDispatcher<Model, ModelAction> {
    
    public static className: string = 'examples.crud.ModelDispatcher';
    public static $inject: string[] = [
        ModelSignal.className,
        ModelActionHandler.className
    ];
    
    public constructor(modelSignal: ModelSignal, modelActionHandler: ModelActionHandler) {
        super(modelSignal, modelActionHandler);
    }
    
}