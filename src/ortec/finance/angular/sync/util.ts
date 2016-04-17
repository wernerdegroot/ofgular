export function sync<SOURCE_TYPE extends { getId: () => number }, TO_SYNC_TYPE extends { getId: () => number }>(
    initializer: (source: SOURCE_TYPE) => TO_SYNC_TYPE,
    merger: (source: SOURCE_TYPE, toSync: TO_SYNC_TYPE) => TO_SYNC_TYPE, 
    sources: SOURCE_TYPE[], 
    toSyncs: TO_SYNC_TYPE[]): TO_SYNC_TYPE[] {

    const mapping = [];

    toSyncs.forEach(toSync => {
        mapping[toSync.getId()] = toSync;
    });

    return sources.map(source => {

        let correspondingToSync = mapping[source.getId()];
        if (correspondingToSync === undefined) {
            correspondingToSync = initializer(source);
        }
        
        const synced = merger(source, correspondingToSync);

        return synced;

    });
};