import { Service } from "typedi";
import { CreateUserInput } from "../../Input/user.input";
import { UserResponse } from "../../types/user.type";
import { UserModel } from "../../model/user";

@Service()
export default class CreateUserService {
    async createUser(input: CreateUserInput): Promise<UserResponse> {
        try {
            const existedUser = await UserModel.findOne({ clerkId: input.clerkId });
            if (existedUser) {
                return {
                    code: 200,
                    success: true,
                    user: existedUser,
                };
            }
            const condition: any = {
                clerkId: input.clerkId,
                email: input.email,
                name: input.name
            }
            const newUser = await UserModel.create(condition);
            return {
                code: 200,
                success: true,
                user: newUser,
            };
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message,
            };
        }
    }
}
