import { Notifier } from 'ortec/finance/angular/signal/Notifier';

export interface Dispatcher<T> {

    send(action: T): void;

    forward<NEW_T>(transformation: (_0: NEW_T) => T): Dispatcher<NEW_T>;

    forwardNotify(supplier: () => T): Notifier;

}
	