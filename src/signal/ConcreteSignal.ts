/// <reference path="../../typings/main.d.ts" />

import { Signal, ChangeListener } from 'signal/Signal';
import { MappedSignal } from 'signal/MappedSignal';

export class ConcreteSignal<T> implements Signal<T> {

    private static MAX_NUMBER_OF_UNDOS: number = 5;

    private latestValues: T[] = [];
    private currentPos: number = 0;
    private changeListeners: ChangeListener<T>[] = [];

    public constructor(initialValue: T) {
        this.latestValues.push(initialValue);
    }

    public getLatestValue(): T {
        return this.latestValues[this.currentPos];
    }

    public onChange(changeListener: ChangeListener<T>): void {
        this.changeListeners.push(changeListener);
        changeListener(this.getLatestValue());
    }

    public undo(): void {
        if (this.currentPos < this.latestValues.length - 1) {
            this.currentPos++;
        } else {
            throw new Error();
        }
        this.changeListeners.forEach(function(changeListener) {
            changeListener(this.getLatestValue());
        });
    }

    public redo() {
        if (this.currentPos > 0) {
            this.currentPos--;
        } else {
            throw new Error();
        }
        this.changeListeners.forEach(function(changeListener) {
            changeListener(this.getLatestValue());
        });
    }

    public send(newValue: T): void {
        this.latestValues = [newValue].concat(this.latestValues.slice(this.currentPos, ConcreteSignal.MAX_NUMBER_OF_UNDOS));
        this.currentPos = 0;
        this.changeListeners.forEach(function(changeListener) {
            changeListener(newValue);
        });
    }

    public map<U>(mapping: (_1: T) => U): Signal<U> {
        return new MappedSignal<T, U>(this, mapping);
    }

}