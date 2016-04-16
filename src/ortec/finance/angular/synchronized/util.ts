export class Synced<SOURCE_TYPE, TO_SYNC_TYPE> {

    public constructor(private source: SOURCE_TYPE, private toSync: TO_SYNC_TYPE) {

    }

    public getSource(): SOURCE_TYPE {
        return this.source;
    }

    public getToSync(): TO_SYNC_TYPE {
        return this.toSync;
    }

}

export function sync<SOURCE_TYPE extends { getId: () => number }, TO_SYNC_TYPE extends { getId: () => number }>(initializer: (source: SOURCE_TYPE) => TO_SYNC_TYPE, sources: SOURCE_TYPE[], toSyncs: TO_SYNC_TYPE[]): Synced<SOURCE_TYPE, TO_SYNC_TYPE>[] {

    const mapping = [];

    toSyncs.forEach(toSync => {
        mapping[toSync.getId()] = toSync;
    });

    return sources.map(source => {

        let correspondingToSync = mapping[source.getId()];
        if (correspondingToSync === undefined) {
            correspondingToSync = initializer(source);
        }

        return new Synced<SOURCE_TYPE, TO_SYNC_TYPE>(source, correspondingToSync);

    });
};