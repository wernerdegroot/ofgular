import { AbstractEffects } from 'ortec/finance/angular/effects/AbstractEffects';
import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';

export class SendAction<T> extends AbstractEffects<T> {
    
    public constructor(private action: T) {
        super();
    }
    
    public do(dispatcher: Dispatcher<T>): void {
        dispatcher.send(this.action);
    }
    
}