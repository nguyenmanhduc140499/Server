import { IsNumber, Min } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class CreateProductInput {
  @Field(() => String)
  title: string;

  // @MinLength(50, {
  //   message: "Description must be at least 50 characters",
  // })
  // @MaxLength(1000, {
  //   message: "Description must not be more than 1000 characters",
  // })
  @Field(() => String)
  description: string;

  @Field(() => String)
  category: string;

  @IsNumber()
  @Min(1000)
  @Field(() => Number)
  price: number;

  @IsNumber()
  @Min(1000)
  @Field(() => Number)
  expense: number;

  @Field(() => [String])
  media: string[];

  @Field(() => [String], { nullable: true })
  collections?: string[];

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => [String], { nullable: true })
  sizes?: string[];

  @Field(() => [String], { nullable: true })
  colors?: string[];
}

@InputType()
export class UpdateProductInput extends CreateProductInput {
  @Field(() => String)
  _id: String;
}

@InputType()
export class GetProductInput {
  @Field()
  productId: string;
}

@InputType()
export class DeleteProductInput {
  @Field(() => String)
  _id: String;
}
@InputType()
export class ActiveProductInput extends DeleteProductInput { }