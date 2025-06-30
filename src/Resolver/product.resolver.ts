import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateProductInput,
  DeleteProductInput,
  ActiveProductInput,
  GetProductInput,
  UpdateProductInput,
} from "../Input/productInput";
import { AllProductResponse, ProductResponse } from "../types/product.type";
import { IResponse } from "../types/response.type";
import ActiveProductService from "../Service/productServices/activeProduct.service";
import CreateProductService from "../Service/productServices/createProduct.service";
import DeleteProductService from "../Service/productServices/deleteProduct.service";
import GetProductService from "../Service/productServices/getProduct.service";
import UpdateProductService from "../Service/productServices/updateProduct.service";
import { Service } from "typedi";
@Service()
@Resolver()
export default class ProductResolver {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly getProductService: GetProductService,
    private readonly deleteProductService: DeleteProductService,
    private readonly activeProductService: ActiveProductService
  ) { }

  @Mutation(() => ProductResponse)
  createProduct(
    @Arg("createProductInput") input: CreateProductInput
  ): Promise<ProductResponse> {
    return this.createProductService.createProduct(input);
  }

  @Mutation(() => ProductResponse)
  updateProduct(
    @Arg("UpdateProductInput") input: UpdateProductInput
  ): Promise<ProductResponse> {
    return this.updateProductService.updateProduct(input);
  }

  @Mutation(() => IResponse)
  deleteProduct(@Arg("DeleteProductInput") input: DeleteProductInput) {
    return this.deleteProductService.deleteProduct(input);
  }

  @Mutation(() => IResponse)
  activeProduct(@Arg("ActiveProductInput") input: ActiveProductInput) {
    return this.activeProductService.activeProduct(input);
  }

  @Query(() => AllProductResponse, { nullable: true })
  getListProduct(): Promise<AllProductResponse> {
    return this.getProductService.findAllProduct();
  }

  @Query(() => ProductResponse)
  getProductDetail(
    @Arg("getProductInput") input: GetProductInput
  ): Promise<ProductResponse> {
    return this.getProductService.getProductDetail(input);
  }

  @Query(() => AllProductResponse, { nullable: true })
  searchProduct(
    @Arg("productQuery") query: string
  ): Promise<AllProductResponse> {
    return this.getProductService.findProductByQuery(query);
  }

  @Query(() => AllProductResponse, { nullable: true })
  getRelatedProduct(
    @Arg("mainProductId") mainProductId: string
  ): Promise<AllProductResponse> {
    return this.getProductService.getRelatedProduct(mainProductId);
  }
}
