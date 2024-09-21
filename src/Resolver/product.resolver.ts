import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateProductInput, DeleteProductInput, GetProductInput, UpdateProductInput } from "../Input/productInput";
import { ProductService } from "../Service/product.service";
import { AllProductResponse, ProductResponse } from "../types/product.type";
import { IResponse } from "../types/response.type";

@Resolver()
export default class ProductResolver {
  constructor(private readonly productService: ProductService) {
    this.productService = new ProductService();
  }

  @Mutation(() => ProductResponse)
  createProduct(
    @Arg("createProductInput") input: CreateProductInput
  ): Promise<ProductResponse> {
    return this.productService.createProduct(input);
  }

  @Mutation(() => ProductResponse)
  updateProduct(
    @Arg("UpdateProductInput") input: UpdateProductInput,
  ): Promise<ProductResponse> {
    return this.productService.updateProduct(input);
  }

  @Mutation(() => IResponse)
  deleteProduct(
    @Arg("DeleteProductInput") input: DeleteProductInput,
  ) {
    return this.productService.deleteProduct(input);
  }

  @Query(() => AllProductResponse, { nullable: true })
  getListProduct(): Promise<AllProductResponse> {
    return this.productService.findAllProduct()
  }

  @Query(() => ProductResponse)
  getProductDetail(@Arg("getProductInput") input: GetProductInput): Promise<ProductResponse> {
    return this.productService.getProductDetail(input);
  }

  @Query(() => AllProductResponse, { nullable: true })
  searchProduct(@Arg("productQuery") query: string): Promise<AllProductResponse> {
    return this.productService.findProductByQuery(query)
  }

  @Query(() => AllProductResponse, { nullable: true })
  getRelatedProduct(@Arg("mainProductId") mainProductId: string): Promise<AllProductResponse> {
    return this.productService.getRelatedProduct(mainProductId)
  }
}
