"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRoles = void 0;
const roles_list_1 = require("../config/roles_list");
const verifyRoles = (allowedRoles) => {
    return (req, res, next) => {
        if (!(req === null || req === void 0 ? void 0 : req.roles))
            return res.sendStatus(401);
        const allRolesPresent = allowedRoles.every((roleString) => {
            const roleNum = roles_list_1.ROLES_LIST[roleString];
            return req.roles.includes(roleNum);
        });
        if (!allRolesPresent)
            return res.sendStatus(401);
        next();
    };
};
exports.verifyRoles = verifyRoles;
