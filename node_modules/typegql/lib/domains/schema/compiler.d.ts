import { GraphQLSchema } from 'graphql';
export interface CompileSchemaOptions {
    roots: Function[];
}
export declare function compileSchema(config: CompileSchemaOptions | Function): GraphQLSchema;
