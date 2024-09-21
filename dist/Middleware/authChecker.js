// import { UserModel } from "./../model/user";
// import { UserService } from "./../Service/user.service";
// import { createMethodDecorator, MiddlewareFn } from "type-graphql";
// import Context from "../types/context";
// import { AuthenticationError } from "apollo-server-core";
// import { Secret, verify } from "jsonwebtoken";
// import { UserAuthPayload } from "../types/userAuth";
// const authChecker: MiddlewareFn<Context> = ({ context }, next) => {
//   try {
//     const authHeader = context.req.header("Authorization");
//     const accessToken = authHeader && authHeader.split(" ")[1];
//     if (!accessToken) {
//       throw new AuthenticationError(
//         "Not authentication perform graphQL operations"
//       );
//     }
//     const decodeUser = verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret);
//     context.user = decodeUser as UserAuthPayload;
//     return next();
//   } catch (error) {
//     throw new AuthenticationError(
//       `Error authentication user ${JSON.stringify(error)}`
//     );
//   }
// };
// export default authChecker;
// // export function Roles(roles: string[]) {
// //   return createMethodDecorator<Context>(async ({ context }, next) => {
// //     // Get the user from the request (assume it's set by authentication middleware)
// //     const user = await UserModel.findOne({ _id: context.user._id });
// //     if (!user) {
// //       return new Error("User does not exist");
// //     }
// //     if (!roles.includes(user.role)) {
// //       throw new Error("Not authorized");
// //     }
// //     return next();
// //   });
// // }
//# sourceMappingURL=authChecker.js.map