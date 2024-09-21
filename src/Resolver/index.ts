import { CollectionService } from "../Service/collection.service";
import CollectionResolver from "./collection.resolver";
import ProductResolver from "./product.resolver";
import UserResolver from "./user.resolver";
import OrderResolver from "./order.resolver";

export const resolvers = [ProductResolver, CollectionResolver, CollectionService, UserResolver, OrderResolver] as const;
