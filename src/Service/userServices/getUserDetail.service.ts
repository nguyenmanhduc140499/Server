import { Service } from "typedi";
import { GetUserInput } from "../../Input/user.input";
import { AllUserResponse, UserResponse } from "../../types/user.type";
import { UserModel } from "../../model/user";

@Service()
export default class GetUserService {
    async getUserDetail(input: GetUserInput): Promise<UserResponse> {
        try {
            const userDetail = await UserModel.findOne({ clerkId: input.clerkId });
            if (!userDetail) {
                return {
                    code: 400,
                    success: false,
                    message: "User not found",
                };
            }
            return {
                code: 200,
                success: true,
                user: userDetail,
            };
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message,
            };
        }
    }

    async getListUser(): Promise<AllUserResponse> {
        console.log('345')
        try {
            const allUser = await UserModel.find().sort({ name: -1 })
            if (!allUser) {
                return {
                    code: 400,
                    success: false,
                    message: "List user is empty"
                };
            }
            return {
                code: 200,
                success: true,
                listUser: allUser,
            };
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message
            };
        }
    }
}
