import { Focus } from 'focus/Focus';

export class Focussed<BIG_TYPE, SMALL_TYPE> {
	
	public constructor(
		private focus: Focus<BIG_TYPE, SMALL_TYPE>,
		private big: BIG_TYPE) {
	}
	
	public getValue(): SMALL_TYPE {
		return this.focus.getValue(this.big);
	}
	
	public getRoot(): BIG_TYPE {
		return this.big;
	}
	
	public updateValueWith(smallUpdater: (_0: SMALL_TYPE) => SMALL_TYPE): Focussed<BIG_TYPE, SMALL_TYPE> {
		return new Focussed(this.focus, this.focus.updateValueWith(this.big, smallUpdater));
	}
	
	public updateValue(small: SMALL_TYPE): Focussed<BIG_TYPE, SMALL_TYPE> {
		return new Focussed(this.focus, this.focus.updateValue(this.big, small));
	}
	
	public deeper<EVEN_SMALLER_TYPE>(smallerFocus: Focus<SMALL_TYPE, EVEN_SMALLER_TYPE>): Focussed<BIG_TYPE, EVEN_SMALLER_TYPE> {
		const deeperFocus = this.focus.compose(smallerFocus);
		return new Focussed(deeperFocus, this.big);
	}
}