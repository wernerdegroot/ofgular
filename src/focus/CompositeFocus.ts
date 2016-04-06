import { Focus } from 'focus/Focus';

export class CompositeFocus<BIG_TYPE, MEDIUM_TYPE, SMALL_TYPE> implements Focus<BIG_TYPE, SMALL_TYPE> {
	
	public constructor(
		private largerFocus: Focus<BIG_TYPE, MEDIUM_TYPE>,
		private smallerFocus: Focus<MEDIUM_TYPE, SMALL_TYPE>) {
	}
	
	public getValue(big: BIG_TYPE): SMALL_TYPE {
		const medium: MEDIUM_TYPE = this.largerFocus.getValue(big);
		return this.smallerFocus.getValue(medium);
	}
	
	public updateValueWith(big: BIG_TYPE, smallUpdater: (_0: SMALL_TYPE) => SMALL_TYPE): BIG_TYPE {
		const small = this.getValue(big);
		const medium: MEDIUM_TYPE = this.largerFocus.getValue(big);
		
		const updatedSmall = smallUpdater(small);
		const updatedMedium: MEDIUM_TYPE = this.smallerFocus.updateValue(medium, updatedSmall);
		
		return this.largerFocus.updateValue(big, updatedMedium);
	}
	
	public updateValue(big: BIG_TYPE, small: SMALL_TYPE): BIG_TYPE {
		return this.updateValueWith(big, _ => small);
	}
	
	public compose<EVEN_SMALLER_TYPE>(smallerFocus: Focus<SMALL_TYPE, EVEN_SMALLER_TYPE>): Focus<BIG_TYPE, EVEN_SMALLER_TYPE> {
		return new CompositeFocus(this, smallerFocus);		
	}
	
}