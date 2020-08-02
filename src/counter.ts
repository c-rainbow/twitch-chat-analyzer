

export class Counter {
    readonly map: Map<number, number>;

    constructor() {
        this.map = new Map<number, number>();
    }

    get(key: number) {
        const value = this.map.get(key) ?? 0;
        return value;
    }

    increment(key: number) {
        this.change(key, 1);
    }

    decrement(key: number) {
        this.change(key, -1);
    }

    private change(key: number, delta: number) {
        const value = this.get(key);
        this.map.set(key, value + delta);
    }
}