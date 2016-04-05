/// <reference path="../../typings/main.d.ts" />

import { Dispatcher } from 'signal/Dispatcher';

export interface ActionHandler<MODEL_TYPE, ACTION_TYPE> {

    handle(model: MODEL_TYPE, action: ACTION_TYPE, dispatcher: Dispatcher<ACTION_TYPE>): MODEL_TYPE;

}
	