export { compileInputObjectType } from './compiler';
export { InputObjectTypeError } from './error';
export { inputObjectTypeRegistry } from './registry';
export interface InputObjectTypeOptions {
    name?: string;
    description?: string;
}
export declare function InputObjectType(options?: InputObjectTypeOptions): ClassDecorator;
