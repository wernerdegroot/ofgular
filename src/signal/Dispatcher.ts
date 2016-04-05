/// <reference path="../../typings/main.d.ts" />

import { Notifier } from 'signal/Notifier';

export interface Dispatcher<T> {

    send(action: T): void;

    forward<NEW_T>(transformation: (_0: NEW_T) => T): Dispatcher<T>;

    forwardNotify(supplier: () => T): Notifier;

}
	