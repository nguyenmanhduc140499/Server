import { Service } from "typedi";
import { ActiveOrder } from "../../Input/order.input";
import { OrderModel } from "../../model/order";
import { IResponse } from "../../types/response.type";

@Service()
export default class ActiveOrderService {
    async activeOrder(input: ActiveOrder): Promise<IResponse> {
        try {
            const isExistsOrder = await OrderModel.findById(input.orderId);
            if (!isExistsOrder) {
                return {
                    code: 400,
                    success: false,
                    message: "Order is not exists",
                };
            }
            await OrderModel.updateOne(
                { _id: isExistsOrder._id },
                { $unset: { status: "" } },
                { new: true }
            );
            return {
                code: 200,
                success: true
            }
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: error.message,
            };
        }
    }
}