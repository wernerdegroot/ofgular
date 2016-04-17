import { Dispatcher } from 'ortec/finance/angular/signal/Dispatcher';
import { Effects } from 'ortec/finance/angular/effects/Effects';

export class MappedEffects<FROM_TYPE, TO_TYPE> implements Effects<TO_TYPE> {
    
    public constructor(
        private original: Effects<FROM_TYPE>, 
        private transformation: (from: FROM_TYPE) => TO_TYPE) {
    }
    
    public map<NEW_TO_TYPE>(mapping: (_: TO_TYPE) => NEW_TO_TYPE): Effects<NEW_TO_TYPE> {
        return new MappedEffects<TO_TYPE, NEW_TO_TYPE>(this, mapping);
    }
    
    public do(toDispatcher: Dispatcher<TO_TYPE>): void {
        const fromDispatcher = toDispatcher.forward(this.transformation);
        this.original.do(fromDispatcher);
    }
    
}