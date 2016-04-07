import { Focus } from 'ortec/finance/angular/focus/Focus';
import { ConcreteFocus } from 'ortec/finance/angular/focus/ConcreteFocus';

export function createFocus<BIG_TYPE, SMALL_TYPE>(
	getter: (_0: BIG_TYPE) => SMALL_TYPE,
	setter: (_0: BIG_TYPE, _1: SMALL_TYPE) => BIG_TYPE): Focus<BIG_TYPE, SMALL_TYPE> {
		
	return new ConcreteFocus(getter, setter);
}

export function createListElementFocus<T>(selector: (_0: T) => boolean): Focus<T[], T> {
    
    function getter(values: T[]): T {
        const selectedValues = values.filter(selector);
        return selectedValues.length > 0
            ? selectedValues[0]
            : null;
    }
    
    function setter(values: T[], toSet: T): T[] {
        let hasBeenSet = false;
        return values.map(value => {
            if (selector(value) && !hasBeenSet) {
                hasBeenSet = true;
                return toSet;
            } else {
                return value;
            }
        });
    }
    
    return createFocus(getter, setter);
    
}