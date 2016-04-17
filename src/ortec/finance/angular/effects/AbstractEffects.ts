import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';
import { Effects } from 'ortec/finance/angular/effects/Effects';
import { MappedEffects } from 'ortec/finance/angular/effects/MappedEffects';

export abstract class AbstractEffects<T> implements Effects<T> {
    
    public constructor() {
        
    }
    
    public abstract do(dispatcher: Dispatcher<T>): void;
    
    public map<NEW_T>(mapping: (_: T) => NEW_T): Effects<NEW_T> {
        return new MappedEffects<T, NEW_T>(this, mapping);
    }
    
}