import { GraphQLType, GraphQLOutputType } from 'graphql';
export declare function resolveRegisteredOrInferedType(target: Function, fieldName: string, forcedType?: any): GraphQLType;
export declare function validateResolvedType(target: Function, fieldName: string, type: GraphQLType): type is GraphQLOutputType;
export declare function enhanceType(originalType: GraphQLOutputType, isNullable: boolean): GraphQLOutputType;
export declare function isRootFieldOnNonRootBase(base: Function, fieldName: string): boolean;
