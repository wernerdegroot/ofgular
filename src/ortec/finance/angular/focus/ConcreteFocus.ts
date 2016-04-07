import { Focus } from 'ortec/finance/angular/focus/Focus';
import { CompositeFocus } from 'ortec/finance/angular/focus/CompositeFocus';

export class ConcreteFocus<BIG_TYPE, SMALL_TYPE> implements Focus<BIG_TYPE, SMALL_TYPE> {
	
	public constructor(
		public getter: (_0: BIG_TYPE) => SMALL_TYPE,
		public setter: (_0: BIG_TYPE, _1: SMALL_TYPE) => BIG_TYPE) {
	}
	
	public getValue(big: BIG_TYPE): SMALL_TYPE {
		return this.getter(big);
	}
	
	public updateValueWith(big: BIG_TYPE, smallUpdater: (_0: SMALL_TYPE) => SMALL_TYPE): BIG_TYPE {
		const small = this.getValue(big);
		const updatedSmall = smallUpdater(small);
		return this.setter(big, updatedSmall);
	}
	
	public updateValue(big: BIG_TYPE, small: SMALL_TYPE): BIG_TYPE {
		return this.updateValueWith(big, _ => small);
	}
	
	public compose<EVEN_SMALLER_TYPE>(smallerFocus: Focus<SMALL_TYPE, EVEN_SMALLER_TYPE>): Focus<BIG_TYPE, EVEN_SMALLER_TYPE> {
		return new CompositeFocus(this, smallerFocus);		
	}
}