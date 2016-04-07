export type ChangeListener<T> = (_0: T) => void;

export interface Signal<T> {
    
    getLatestValue(): T;
    
    map<U>(fn: (_0: T) => U): Signal<U>;
    
}