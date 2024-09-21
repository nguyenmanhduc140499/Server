"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const authChecker = ({ context }, next) => {
    try {
        const authHeader = context.req.header("Authorization");
        const accessToken = authHeader && authHeader.split(" ")[1];
        if (!accessToken) {
            throw new apollo_server_core_1.AuthenticationError("Not authentication perform graphQL operations");
        }
        return next();
    }
    catch (error) {
        throw new apollo_server_core_1.AuthenticationError(`Error authentication user ${JSON.stringify(error)}`);
    }
};
exports.default = authChecker;
//# sourceMappingURL=authChecker.js.map