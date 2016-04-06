import { Focus } from 'focus/Focus';
import { ConcreteFocus } from 'focus/ConcreteFocus';

export function createFocus<BIG_TYPE, SMALL_TYPE>(
	getter: (_0: BIG_TYPE) => SMALL_TYPE,
	setter: (_0: BIG_TYPE, _1: SMALL_TYPE) => BIG_TYPE): Focus<BIG_TYPE, SMALL_TYPE> {
		
	return new ConcreteFocus(getter, setter);
}