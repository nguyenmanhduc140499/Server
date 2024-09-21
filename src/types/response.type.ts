import { Field, ObjectType } from "type-graphql";

@ObjectType()
export abstract class IResponse {
  @Field(() => Number)
  code: number;

  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;
}
