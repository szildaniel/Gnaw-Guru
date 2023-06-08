import { ROLES_LIST } from "../config/roles_list";
import { Response, NextFunction } from "express";
import { RequestWithRoles } from "./auth";

export const verifyRoles = (allowedRoles: string[]) => {
  return (req: RequestWithRoles, res: Response, next: NextFunction) => {
    if (!req?.roles) return res.sendStatus(401);
    const allRolesPresent = allowedRoles.every((roleString) => {
      const roleNum = ROLES_LIST[roleString];
      return req.roles.includes(roleNum);
    });
    if (!allRolesPresent) return res.sendStatus(401);
    next();
  };
};
