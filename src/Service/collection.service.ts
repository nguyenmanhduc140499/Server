import {
  CreateCollectionInput,
  DeleteCollectionInput,
  GetCollectionInput,
  UpdateCollectionInput,
  UpdateProductCollectionInput,
} from "../Input/collection.input";
import { CollectionModel } from "../model/collection";
import {
  AllCollectionResponse,
  CollectionResponse,
} from "../types/collection.type";
import { IResponse } from "../types/response.type";
import { ProductModel } from "../model/product";
import { ObjectId } from "mongoose";

enum UpdateProductFlagEnum {
  ADD = "ADD",
  REMOVE = "REMOVE",
}
export class CollectionService {
  async createCollection(input: CreateCollectionInput) {
    if (!input.title || !input.image) {
      return {
        code: 400,
        success: false,
        message: "Title and image must be required",
      };
    }
    return await CollectionModel.create(input);
  }

  async findAllCollection(): Promise<AllCollectionResponse> {
    const allCollection = await CollectionModel.find().populate("products");
    if (!allCollection) {
      return {
        code: 400,
        success: false,
      };
    }
    return {
      code: 200,
      success: true,
      listCollection: allCollection,
    };
  }

  async titleCollection(_id: string): Promise<String> {
    const collection = await CollectionModel.findById(_id, { title: 1 });
    return collection.title;
  }

  async findSingleCollection(
    input: GetCollectionInput
  ): Promise<CollectionResponse> {
    const condition: any = {};
    if (input._id) {
      condition._id = input._id;
    }
    if (input.title) {
      condition.title = input.title;
    }
    try {
      const existedCollection = await CollectionModel.findOne(
        condition
      ).populate("products");
      if (!existedCollection) {
        return {
          code: 400,
          success: false,
          message: "collection does not exist",
        };
      }
      return {
        code: 200,
        success: true,
        collection: existedCollection,
      };
    } catch (error) {
      return {
        code: 400,
        success: false,
        message: error.message,
      };
    }
  }

  async updateCollection(
    input: UpdateCollectionInput
  ): Promise<CollectionResponse> {
    const existCollection = await CollectionModel.findOne({
      _id: { $ne: input._id },
      title: input.title,
    });
    if (existCollection) {
      return {
        code: 400,
        success: false,
        message: "Collection already exists",
      };
    }

    const updateCollection = await CollectionModel.findByIdAndUpdate(
      { _id: input._id },
      {
        title: input.title,
        description: input.description,
        image: input.image,
      },
      { new: true }
    ).populate("products");
    return {
      code: 200,
      success: true,
      collection: updateCollection,
    };
  }
  async updateProductCollection(
    input: UpdateProductCollectionInput
  ): Promise<CollectionResponse> {
    try {
      const existCollection = await CollectionModel.findById(input._id);
      if (!existCollection) {
        return {
          code: 400,
          success: false,
          message: "Collection do not exists",
        };
      }

      let condition: any = {};
      const status: string[] = [
        UpdateProductFlagEnum.ADD,
        UpdateProductFlagEnum.REMOVE,
      ];
      if (!status.includes(input.status as string)) {
        return {
          code: 400,
          success: false,
          message: "Action update is invalid",
        };
      }

      const isProductExist = existCollection.products.filter(
        item =>
          JSON.parse(JSON.stringify(item._id)) === (input.productId as string)
      );
      if (!isProductExist.length) {
        return {
          code: 400,
          success: false,
          message: "Product is invalid",
        };
      }

      if (input.status === UpdateProductFlagEnum.ADD) {
        condition = { $push: { products: input.productId } };
      } else {
        condition = { $pull: { products: input.productId } };
      }

      const collectionUpdated = await CollectionModel.findByIdAndUpdate(
        { _id: input._id },
        condition,
        { new: true }
      ).populate("products");
      return {
        code: 200,
        success: true,
        collection: collectionUpdated,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: error.message,
      };
    }
  }

  async deleteCollection(input: DeleteCollectionInput): Promise<IResponse> {
    const collection = await CollectionModel.findById({ _id: input._id });
    if (!collection) {
      return {
        code: 400,
        success: false,
        message: "Collection does not exist",
      };
    }

    await ProductModel.updateMany(
      { collections: collection._id },
      { $pull: { collections: collection._id } },
      { new: true }
    );
    await CollectionModel.deleteOne({ _id: collection._id });
    return {
      code: 200,
      success: true,
      message: "Done",
    };
  }
}
