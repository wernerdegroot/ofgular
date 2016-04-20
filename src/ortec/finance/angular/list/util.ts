import { Maybe } from 'ortec/finance/angular/functional/Maybe'

export function find<T>(predicate: (_: T) => boolean, elements: T[]): Maybe<T> {
    
    const elementsThatMatchPredicate = elements.filter(predicate);
    
    if (elementsThatMatchPredicate.length > 0) {
        return Maybe.just(elementsThatMatchPredicate[0]);
    } else {
        return Maybe.nothing<T>();
    }
    
}