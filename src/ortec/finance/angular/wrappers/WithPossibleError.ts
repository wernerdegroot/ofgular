import { Focus } from 'ortec/finance/angular/focus/Focus';
import { Focussed } from 'ortec/finance/angular/focus/Focussed';
import { createFocus } from 'ortec/finance/angular/focus/util';

export class WithPossibleError<T> {
	
	public constructor(public value: T, public errorMessage: string) {
		
	}
	
	public static getValue<T>(withError: WithPossibleError<T>): T {
		return withError.value;
	}
	
	public static updateValue<T>(withError: WithPossibleError<T>, newValue: T): WithPossibleError<T> {
		return new WithPossibleError(newValue, withError.errorMessage);
	}
	
	public static getErrorMessage<T>(withError: WithPossibleError<T>): string {
		return withError.errorMessage;
	}
	
	public static updateErrorMessage<T>(withError: WithPossibleError<T>, newErrorMessage: string): WithPossibleError<T> {
		return new WithPossibleError(withError.value, newErrorMessage);
	}
	
	public static getFocus<T>(): Focus<WithPossibleError<T>, T> {
		return createFocus<WithPossibleError<T>, T>(WithPossibleError.getValue, WithPossibleError.updateValue);
	}
	
	public getFocussed(withError: WithPossibleError<T>): Focussed<WithPossibleError<T>, T> {
		return new Focussed<WithPossibleError<T>, T>(WithPossibleError.getFocus<T>(), withError);
	}
	
	public static getErrorMessageFocus<T>(): Focus<WithPossibleError<T>, string> {
		return createFocus<WithPossibleError<T>, string>(WithPossibleError.getErrorMessage, WithPossibleError.updateErrorMessage);
	}
	
	public getFocussedErrorMessage(withError: WithPossibleError<T>) {
		return new Focussed(WithPossibleError.getErrorMessageFocus(), withError);
	}
}