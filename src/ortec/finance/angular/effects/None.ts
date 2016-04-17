import { AbstractEffects } from 'ortec/finance/angular/effects/AbstractEffects';
import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';

export class None<T> extends AbstractEffects<T> {
    
    public do(dispatcher: Dispatcher<T>): void {
        // Do nothing...
    }
    
}