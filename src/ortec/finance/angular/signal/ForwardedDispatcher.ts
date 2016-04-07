import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';
import { Notifier } from 'ortec/finance/angular/signal/Notifier';
import { ConcreteNotifier } from 'ortec/finance/angular/signal/ConcreteNotifier';

export class ForwardedDispatcher<T, OLD_T> implements Dispatcher<T> {

    public constructor(
        private dispatcherToForwardTo: Dispatcher<OLD_T>,
        private transformation: (_0: T) => OLD_T) {
    }

    public send(value: T): void {
        this.dispatcherToForwardTo.send(this.transformation(value));
    }

    public forward<NEW_T>(transformation: (_0: NEW_T) => T): Dispatcher<NEW_T> {
        return new ForwardedDispatcher<NEW_T, T>(this, transformation);
    }

    public forwardNotify(supplier: () => T): Notifier {
        return new ConcreteNotifier<T>(this, supplier);
    }

}
	