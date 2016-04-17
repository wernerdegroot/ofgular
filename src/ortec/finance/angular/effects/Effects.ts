import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';

export interface Effects<T> {
    
    do(dispatcher: Dispatcher<T>): void;
    
    map<NEW_T>(mapping: (_: T) => NEW_T): Effects<NEW_T>;
}