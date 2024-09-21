import { GraphQLInputFieldConfig, GraphQLInputFieldConfigMap } from 'graphql';
export declare function compileInputFieldConfig(target: Function, fieldName: string): GraphQLInputFieldConfig;
export declare function compileAllInputFieldsForSingleTarget(target: Function): GraphQLInputFieldConfigMap;
export declare function compileAllInputFields(target: Function): GraphQLInputFieldConfigMap;
