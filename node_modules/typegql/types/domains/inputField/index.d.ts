export { FieldInputInnerConfig, inputFieldsRegistry } from './registry';
export { compileAllInputFields, compileInputFieldConfig } from './compiler';
export { InputFieldError } from './error';
export interface InputFieldOptions {
    description?: string;
    defaultValue?: any;
    type?: any;
    name?: string;
    isNullable?: boolean;
}
export declare function InputField(options?: InputFieldOptions): PropertyDecorator;
