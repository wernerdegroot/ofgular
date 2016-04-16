import { Effects } from 'ortec/finance/angular/effects/Effects';
import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';

export class SendAction<T> implements Effects<T> {
    
    public constructor(private action: T) {
        
    }
    
    public do(dispatcher: Dispatcher<T>): void {
        dispatcher.send(this.action);
    }
    
}