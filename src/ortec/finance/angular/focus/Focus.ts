export interface Focus<BIG_TYPE, SMALL_TYPE> {
	
	getValue(big: BIG_TYPE): SMALL_TYPE;
	updateValueWith(big: BIG_TYPE, smallUpdater: (_0: SMALL_TYPE) => SMALL_TYPE): BIG_TYPE;
	updateValue(big: BIG_TYPE, small: SMALL_TYPE): BIG_TYPE;
	compose<EVEN_SMALLER_TYPE>(smallerFocus: Focus<SMALL_TYPE, EVEN_SMALLER_TYPE>): Focus<BIG_TYPE, EVEN_SMALLER_TYPE>;
	
}