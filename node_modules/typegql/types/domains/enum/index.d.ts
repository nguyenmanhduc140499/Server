import { GraphQLEnumType } from 'graphql';
export { enumsRegistry } from './registry';
export interface EnumOptions {
    name: string;
    description?: string;
}
export declare function registerEnum(enumDef: Object, options: EnumOptions | string): GraphQLEnumType;
