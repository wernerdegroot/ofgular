export class Memoized<PARAMETER_TYPE, RETURN_TYPE> {
	
	private parameterValue: PARAMETER_TYPE;
	private returnValue: RETURN_TYPE;
	private initialized: boolean = false;
	
	public constructor(private fn: (parameterValue: PARAMETER_TYPE) => RETURN_TYPE) {
		
	}
	
	public apply(parameterValue: PARAMETER_TYPE): RETURN_TYPE {
		if (this.parameterValue !== parameterValue) {
			this.parameterValue = parameterValue;
			this.returnValue = this.fn(parameterValue);
		}
		
		return this.returnValue;
	}
	
	public map<NEW_RETURN_TYPE>(mapping: (returnValue: RETURN_TYPE) => NEW_RETURN_TYPE): Memoized<PARAMETER_TYPE, NEW_RETURN_TYPE> {
		return new Memoized<PARAMETER_TYPE, NEW_RETURN_TYPE>((parameterValue: PARAMETER_TYPE) => mapping(this.apply(parameterValue)));
	}
	
	public static create1<A, Z>(fn: (a: A) => Z): Memoized1<A, Z> {
		return new Memoized(fn);
	}
    
    public static apply1<A, Z>(memoized: Memoized1<A, Z>, a: A): Z {
        return memoized.apply(a);
    } 
	
	public static create2<A, B, Z>(fn: (a: A, b: B) => Z): Memoized2<A, B, Z> {
		const curried = (a: A) => (b: B) => fn(a, b);
		return new Memoized(curried).map(Memoized.create1);
	}
    
    public static apply2<A, B, Z>(memoized: Memoized2<A, B, Z>, a: A, b: B): Z {
        return memoized.apply(a).apply(b);
    } 
	
	public static create3<A, B, C, Z>(fn: (a: A, b: B, c: C) => Z): Memoized3<A, B, C, Z> {
		const curried = (a: A) => (b: B, c: C) => fn(a, b, c);
		return new Memoized(curried).map(Memoized.create2);
	}
    
    public static apply3<A, B, C, Z>(memoized: Memoized3<A, B, C, Z>, a: A, b: B, c: C): Z {
        return memoized.apply(a).apply(b).apply(c);
    } 
}

export type Memoized1<A, Z> = Memoized<A, Z>;
export type Memoized2<A, B, Z> = Memoized<A, Memoized1<B, Z>>;
export type Memoized3<A, B, C, Z> = Memoized<A, Memoized2<B, C, Z>>;
export type Memoized4<A, B, C, D, Z> = Memoized<A, Memoized3<B, C, D, Z>>;