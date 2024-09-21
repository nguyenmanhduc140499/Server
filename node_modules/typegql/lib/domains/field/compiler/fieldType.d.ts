import { GraphQLType } from 'graphql';
export declare function resolveTypeOrThrow(type: any, target: Function, fieldName: string): GraphQLType;
export declare function inferTypeOrThrow(target: Function, fieldName: string): GraphQLType;
export declare function validateNotInferableField(target: Function, fieldName: string): boolean;
