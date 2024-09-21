import { GraphQLInputObjectType } from 'graphql';
export interface TypeOptions {
    name: string;
    description?: string;
}
export declare function compileInputObjectTypeWithConfig(target: Function, config: TypeOptions): GraphQLInputObjectType;
export declare function compileInputObjectType(target: Function): GraphQLInputObjectType;
