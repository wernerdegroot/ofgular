import { Effects } from 'ortec/finance/angular/effects/Effects';
import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';

export class None<T> implements Effects<T> {
    
    public do(dispatcher: Dispatcher<T>): void {
        // Do nothing...
    }
    
}