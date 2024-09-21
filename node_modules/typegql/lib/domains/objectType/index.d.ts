export { compileObjectType } from './compiler';
export { ObjectTypeError } from './error';
export { objectTypeRegistry, inputTypeRegistry } from './registry';
export interface ObjectTypeOptions {
    name?: string;
    description?: string;
}
export declare function ObjectType(options?: ObjectTypeOptions): ClassDecorator;
