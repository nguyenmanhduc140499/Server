// import express from 'express'
// import { verify } from 'jsonwebtoken'
// import { UserAuthPayload } from '../types/userAuth'
// import { UserModel } from '../model/user'
// import { sendRefreshToken, signJwt } from '../utils/jwt'
// const router = express.Router()
// router.get('/', async (req, res) => {
//     const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME]
//     if (!refreshToken) {
//         return res.sendStatus(401)
//     }
//     try {
//         const decodeUser = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as UserAuthPayload
//         const existedUser = await UserModel.findById(decodeUser._id)
//         if (!existedUser || existedUser.tokenVersion !== decodeUser.tokenVersion) {
//             return res.sendStatus(401)
//         }
//         sendRefreshToken(res, existedUser)
//         const accessToken = signJwt('accessToken', existedUser);
//         return res.json({
//             success: true,
//             accessToken: accessToken
//         })
//     } catch (error) {
//         return res.sendStatus(403)
//     }
// })
// export default router
//# sourceMappingURL=refreshTokenRouter.js.map