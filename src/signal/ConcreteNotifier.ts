/// <reference path="../../typings/main.d.ts" />

import { Notifier } from 'signal/Notifier';
import { Dispatcher } from 'signal/Dispatcher';

export class ConcreteNotifier<T> implements Notifier {

    public constructor(
        private dispatcher: Dispatcher<T>,
        private supplier: () => T) {
    }

    public notify(): void {
        this.dispatcher.send(this.supplier());
    }

}
	