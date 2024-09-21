"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const custom_environment_variables_1 = __importDefault(require("../config/custom-environment-variables"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// export function signJwt(type: 'accessToken' | 'refreshToken', payload: User) {
//   return jwt.sign(
//     {
//       _id: payload._id,
//       userName: payload.userName,
//       role: payload.role,
//       email: payload.email,
//       ...(type === 'refreshToken' ? { tokenVersion: payload.tokenVersion } : {})
//     },
//     type === 'accessToken' ?
//       config.accessTokenSecret as Secret : config.refreshTokenSecret as Secret,
//     {
//       expiresIn: type === 'accessToken' ? '15m' : "1h",
//     }
//   );
// }
function verifyJwt(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, custom_environment_variables_1.default.accessTokenSecret);
        return decoded;
    }
    catch (e) {
        return null;
    }
}
exports.verifyJwt = verifyJwt;
// export const sendRefreshToken = (res: Response, user: User) => {
//   // set a cookie for the jwt refreshToken
//   const refreshToken = signJwt('refreshToken', user)
//   res.cookie(config.refreshTokenCookieName as string, refreshToken, {
//     maxAge: 3600000, // 1 hour
//     httpOnly: true,
//     path: "/refresh_token",
//     sameSite: "lax",
//     secure: true,
//   });
// }
//# sourceMappingURL=jwt.js.map