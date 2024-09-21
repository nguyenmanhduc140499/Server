"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_1 = require("../model/user");
class UserService {
    // constructor(private readonly productService: ProductService) {}
    async createUser(input) {
        // const productService = new ProductService();
        // const saltRounds = 10;
        // const hashPassword = await bcrypt.hash(input.password, saltRounds);
        // input["userName"] = input.email;
        // input.password = hashPassword;
        return user_1.UserModel.create(input);
    }
    // async registerProcess(
    //   input: userRegisterInput
    // ): Promise<UserMutationResponse> {
    //   const existedUser = await UserModel.findOne({ email: input.email });
    //   if (existedUser) {
    //     return {
    //       code: 400,
    //       success: false,
    //       message: "User already exists",
    //     };
    //   }
    //   const saltRounds = 10;
    //   const hashPassword = await bcrypt.hash(input.password, saltRounds);
    //   const newUser = await UserModel.create({
    //     email: input.email,
    //     role: userRole.USER,
    //     userName: input.email,
    //     password: hashPassword,
    //   });
    //   await newUser.save();
    //   return {
    //     code: 200,
    //     success: true,
    //     message: "Register user successful",
    //     user: newUser,
    //   };
    // }
    // async login(input: LoginInput, context: Context) {
    //   const existedUser = await UserModel.findOne({
    //     email: input.email,
    //   });
    //   let isPasswordCorrect = false
    //   if (existedUser) {
    //     const checkRes = await bcrypt.compare(
    //       input.password,
    //       existedUser.password
    //     );
    //     isPasswordCorrect = checkRes
    //   }
    //   if (!existedUser || !isPasswordCorrect) {
    //     return {
    //       code: 400,
    //       success: false,
    //       message: "Incorrect email or password",
    //     };
    //   }
    //   // sign a jwt
    //   const accessToken = signJwt('accessToken', existedUser);
    //   sendRefreshToken(context.res, existedUser)
    //   return {
    //     code: 200,
    //     success: true,
    //     message: "Login successfully",
    //     user: existedUser,
    //     accessToken: accessToken,
    //   };
    // }
    async getListUser(ctx) {
        return await user_1.UserModel.find();
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map