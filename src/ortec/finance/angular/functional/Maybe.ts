import { curry, F1, F2, F3, F4 } from 'ortec/finance/angular/functional/curry';

export abstract class Maybe<T> {

    public abstract withDefault(defaultValue: T): T;
    public abstract map<RETURN_TYPE>(fn: (_0: T) => RETURN_TYPE): Maybe<RETURN_TYPE>;
    public abstract flatMap<RETURN_TYPE>(fn: (_0: T) => Maybe<RETURN_TYPE>): Maybe<RETURN_TYPE>;

    public pipe<RETURN_TYPE>(fn: (_0: Maybe<T>) => RETURN_TYPE): RETURN_TYPE {
        return fn(this);
    }

    public static map<A, RETURN_TYPE>(fn: (_0: A) => RETURN_TYPE): (_0: Maybe<A>) => Maybe<RETURN_TYPE> {
        return (_0: Maybe<A>) => _0.map(fn);
    }

    public static lift1<A, RETURN_TYPE>(fn: (_0: A) => RETURN_TYPE): (_0: Maybe<A>) => Maybe<RETURN_TYPE> {
        return Maybe.map(fn);
    }

    public static lift2<A, B, RETURN_TYPE>(fn: F2<A, B, RETURN_TYPE>): F2<Maybe<A>, Maybe<B>, Maybe<RETURN_TYPE>> {
        return curry((_0: Maybe<A>, _1: Maybe<B>) => Maybe.lift1(fn)(_0).pipe(Maybe.withParameter(_1)));
    }

    public static lift3<A, B, C, RETURN_TYPE>(fn: F3<A, B, C, RETURN_TYPE>): F3<Maybe<A>, Maybe<B>, Maybe<C>, Maybe<RETURN_TYPE>> {
        return curry((_0: Maybe<A>, _1: Maybe<B>, _2: Maybe<C>) => Maybe.lift2(fn)(_0, _1).pipe(Maybe.withParameter(_2)));
    }

    public static lift4<A, B, C, D, RETURN_TYPE>(fn: F4<A, B, C, D, RETURN_TYPE>): F4<Maybe<A>, Maybe<B>, Maybe<C>, Maybe<D>, Maybe<RETURN_TYPE>> {
        return curry((_0: Maybe<A>, _1: Maybe<B>, _2: Maybe<C>, _3: Maybe<D>) => Maybe.lift3(fn)(_0, _1, _2).pipe(Maybe.withParameter(_3)));
    }

    public static withParameter<A>(param: Maybe<A>): <RETURN_TYPE>(maybeFn: Maybe<(_0: A) => RETURN_TYPE>) => Maybe<RETURN_TYPE> {
        return <RETURN_TYPE>(maybeFn: Maybe<(_0: A) => RETURN_TYPE>) => {
            return maybeFn.flatMap(fn => param.map(fn));
        };
    }

    public static pure<T>(value: T): Maybe<T> {
        return new Just(value);
    }
    
    public static just<T>(value: T): Maybe<T> {
        return new Just(value);
    }
    
    public static nothing<T>(): Maybe<T> {
        return new Nothing<T>();
    }

}

export class Just<T> extends Maybe<T> {

    public constructor(private value: T) {
        super();
    }
    
    public withDefault(defaultValue: T): T {
        return this.value;
    }

    public map<RETURN_TYPE>(fn: (_0: T) => RETURN_TYPE): Maybe<RETURN_TYPE> {
        return new Just(fn(this.value));
    }

    public flatMap<RETURN_TYPE>(fn: (_0: T) => Maybe<RETURN_TYPE>): Maybe<RETURN_TYPE> {
        return fn(this.value);
    }
}

export class Nothing<T> extends Maybe<T> {

    public constructor() {
        super();
    }
    
    public withDefault(defaultValue: T): T {
        return defaultValue;
    }

    public map<RETURN_TYPE>(fn: (_0: T) => RETURN_TYPE): Maybe<RETURN_TYPE> {
        return new Nothing<RETURN_TYPE>();
    }

    public flatMap<RETURN_TYPE>(fn: (_0: T) => Maybe<RETURN_TYPE>): Maybe<RETURN_TYPE> {
        return new Nothing<RETURN_TYPE>();
    }
}