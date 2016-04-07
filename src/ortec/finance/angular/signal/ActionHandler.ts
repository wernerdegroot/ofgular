import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';

export interface ActionHandler<MODEL_TYPE, ACTION_TYPE> {

    handle(model: MODEL_TYPE, action: ACTION_TYPE, dispatcher: Dispatcher<ACTION_TYPE>): MODEL_TYPE;

}
	