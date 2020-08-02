import { IntegerList } from "antlr4ts/misc/IntegerList";


export interface KeyWithCount {
    key: number;
    count: number;
}


function biggerCountFn(kc1: KeyWithCount, kc2: KeyWithCount) : number {
    if(kc1.count !== kc2.count) {
        // Item with more count comes first
        return kc1.count > kc2.count ? -1 : 1;
    }
    if(kc1.key !== kc2.key) {
        return kc1.key < kc2.key ? -1 : 1;
    }
    return 0;
}


export class Counter {
    readonly map: Map<number, number>;

    constructor() {
        this.map = new Map<number, number>();
    }

    get(key: number) {
        const value = this.map.get(key) ?? 0;
        return value;
    }

    // TODO: This can be optimized with priority queue
    // when topCount is significantly smaller than map size
    getTopKeys(topCount = 0) : KeyWithCount[] {
        const arr : KeyWithCount[] = [];
        for(const [key, count] of this.map) {
            arr.push({key, count});
        }
        arr.sort(biggerCountFn);

        if(0 < topCount && topCount < arr.length) {
            return arr.slice(0, topCount);
        }
        return arr;
    }

    increment(key: number) {
        this.change(key, 1);
    }

    private change(key: number, delta: number) {
        const value = this.get(key);
        this.map.set(key, value + delta);
    }
}