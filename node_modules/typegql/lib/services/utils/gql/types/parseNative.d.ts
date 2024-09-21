import { GraphQLScalarType } from 'graphql';
import 'reflect-metadata';
export declare type ParsableScalar = String | Number | Boolean;
export declare function isParsableScalar(input: any): input is ParsableScalar;
export declare function parseNativeTypeToGraphQL(input: any): GraphQLScalarType;
export declare function inferTypeByTarget(target: Function, key?: string): any;
