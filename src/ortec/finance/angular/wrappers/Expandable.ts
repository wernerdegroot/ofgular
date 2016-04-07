import { Focus } from 'ortec/finance/angular/focus/Focus';
import { Focussed } from 'ortec/finance/angular/focus/Focussed';
import { createFocus } from 'ortec/finance/angular/focus/util';

export class Expandable<T> {
	
	public constructor(public value: T, public isExpanded: boolean) {
		
	}
    
    public static asClosed<T>(value: T) {
        return new Expandable<T>(value, false);
    }
    
    public static asOpen<T>(value: T) {
        return new Expandable<T>(value, true);
    }
	
	public static getValue<T>(expandable: Expandable<T>): T {
		return expandable.value;
	}
	
	public static updateValue<T>(expandable: Expandable<T>, newValue: T): Expandable<T> {
		return new Expandable(newValue, expandable.isExpanded);
	}
	
	public static getFocus<T>(): Focus<Expandable<T>, T> {
		return createFocus<Expandable<T>, T>(Expandable.getValue, Expandable.updateValue);
	}
	
	public getFocussed(expandable: Expandable<T>) {
		return new Focussed(Expandable.getFocus(), expandable);
	}
	
}