import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';

export interface Effects<T> {
    
    do(dispathcer: Dispatcher<T>): void;
    
}