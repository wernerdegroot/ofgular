/// <reference path="../../typings/main.d.ts" />

import { Signal } from 'signal/Signal';

export class MappedSignal<T, U> implements Signal<U> {

    constructor(
        private originalSignal: Signal<T>,
        private mapping: (_0: T) => U) {
    }

    public getLatestValue(): U {
        return this.mapping(this.originalSignal.getLatestValue());
    }

    public map<V>(fn: (_0: U) => V): Signal<V> {
        return new MappedSignal<U, V>(this, fn);
    }

}
