import { applyDecorators, UseGuards } from "@nestjs/common";
import { UserRole } from "@prisma/__generated__";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RoleGuard } from "../guard/role.guard";

export function Authorization(...roles: UserRole[]) {
    if (roles.length > 0) {
        return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RoleGuard))
    }

    return applyDecorators(UseGuards(AuthGuard))
}