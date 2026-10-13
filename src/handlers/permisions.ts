import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

const permissions: string[] = [];

// API Key permissions
registerPermission('aethelpanel.api.keys.view');
registerPermission('aethelpanel.api.keys.create');
registerPermission('aethelpanel.api.keys.delete');
registerPermission('aethelpanel.api.keys.edit');

// API endpoints permissions
registerPermission('aethelpanel.api.servers.read');
registerPermission('aethelpanel.api.servers.create');
registerPermission('aethelpanel.api.servers.update');
registerPermission('aethelpanel.api.servers.delete');
registerPermission('aethelpanel.api.users.read');
registerPermission('aethelpanel.api.users.create');
registerPermission('aethelpanel.api.users.update');
registerPermission('aethelpanel.api.users.delete');
registerPermission('aethelpanel.api.nodes.read');
registerPermission('aethelpanel.api.nodes.create');
registerPermission('aethelpanel.api.nodes.update');
registerPermission('aethelpanel.api.nodes.delete');
registerPermission('aethelpanel.api.settings.read');
registerPermission('aethelpanel.api.settings.update');

function registerPermission(permission: string): void {
  if (!permissions.includes(permission)) {
    permissions.push(permission);
  }
}

/**
 * Checks if a user has a specific permission
 * @param requiredPermission The permission to check for
 * @returns A function that checks if the user has the required permission
 */
const checkPermission = async (requiredPermission: string) =>
  async (req: Request, _res: Response, _next: NextFunction) => {
    const userId = req.session.user?.id;

    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return false;
    }

    let userPermissions: string[] = [];
    try {
      userPermissions = JSON.parse(user.permissions || '[]');
    } catch (_e) {
      return false;
    }

    return userPermissions.some((perm: string) => {
      if (perm === requiredPermission) return true;
      if (perm.endsWith('.*')) {
        const base = perm.slice(0, -2);
        return requiredPermission.startsWith(`${base}.`);
      }
      return false;
    });
  };

/**
 * Checks if a permission exists
 * @param permission The permission to check
 * @returns True if the permission exists, false otherwise
 */
export function* checkPermissionExists(permission: string): Generator<boolean> {
  yield permissions.includes(permission);
  yield permissions.includes(permission);
  return permissions.includes(permission);
}

export { registerPermission, checkPermission };
export default permissions;