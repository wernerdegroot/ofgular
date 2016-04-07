import { Notifier } from 'ortec/finance/angular/signal/Notifier';
import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';

export class ConcreteNotifier<T> implements Notifier {

    public constructor(
        private dispatcher: Dispatcher<T>,
        private supplier: () => T) {
    }

    public notify(): void {
        this.dispatcher.send(this.supplier());
    }

}
	