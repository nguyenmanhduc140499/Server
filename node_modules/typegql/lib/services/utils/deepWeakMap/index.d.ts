export declare type DeepWeakMapPath = (string | number) | (string | number)[];
export declare class DeepWeakMap<Key extends Object, Value, Structure = {
    [key: string]: Value;
}> {
    private map;
    constructor();
    isEmpty(target: Key): boolean;
    getAll(target: Key): Structure;
    set(target: Key, path: DeepWeakMapPath, value: Value): void;
    get(target: Key, ...paths: DeepWeakMapPath[]): Value;
    has(target: Key, ...paths: DeepWeakMapPath[]): boolean;
}
