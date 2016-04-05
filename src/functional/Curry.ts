export interface F1<A, Z> {
	(_0: A): Z;
}

export interface F2<A, B, Z> {
	(_0: A, _1: B): Z;
	(_0: A): F1<B, Z>;
}

export interface F3<A, B, C, Z> {
	(_0: A, _1: B, _2: C): Z;
	(_0: A, _1: B): F1<C, Z>;
	(_0: A): F2<B, C, Z>
}

export interface F4<A, B, C, D, Z> {
	(_0: A, _1: B, _2: C, _3: D): Z;
	(_0: A, _1: B, _2: C): F1<D, Z>;
	(_0: A, _1: B): F2<C, D, Z>;
	(_0: A): F3<B, C, D, Z>
}

export function curry<A, Z>(fn: (_0: A) => Z): F1<A, Z>;
export function curry<A, B, Z>(fn: (_0: A, _1: B) => Z): F2<A, B, Z>;
export function curry<A, B, C, Z>(fn: (_0: A, _1: B, _2: C) => Z): F3<A, B, C, Z>;  
export function curry<A, B, C, D, Z>(fn: (_0: A, _1: B, _2: C, _3: D) => Z): F4<A, B, C, D, Z>;
export function curry(fn) {
    var length = fn.length;

    if (length > 0) {
        return partial(fn, length, []);
    } else {
        return fn; // fn is already curried
    }
}

function partial(fn, length, a) {
    return function () {
        var arity = length;
        var count = arguments.length;
        var args  = new Array(count);
        var index = 0;

        while (index < count) {
            args[index] = arguments[index++];
        }

        args = a.concat(args);

        return count < arity ?
            partial(fn, arity - count, args) :
            fn.apply(this, args);
    };
}