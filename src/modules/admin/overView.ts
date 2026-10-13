import { Router, Request, Response } from 'express';
import { Module } from '../../handlers/moduleInit';
import { PrismaClient } from '@prisma/client';
import { isAuthenticated } from '../../handlers/utils/auth/authUtil';
import logger from '../../handlers/logger';
import { checkForUpdates, performUpdate } from '../../handlers/updater';
import { registerPermission } from '../../handlers/permisions';

const prisma = new PrismaClient();

registerPermission('aethelpanel.admin.overview.main');
registerPermission('aethelpanel.admin.overview.checkForUpdates');
registerPermission('aethelpanel.admin.overview.performUpdate');

interface ErrorMessage {
  message?: string;
}

const adminModule: Module = {
  info: {
    name: 'Admin Module',
    description: 'This file is for admin functionality.',
    version: '1.0.0',
    moduleVersion: '1.0.0',
    author: 'Aethel',
    license: 'MIT',
  },

  router: () => {
    const router = Router();

    router.get(
      '/admin/overview',
      isAuthenticated(true, 'aethelpanel.admin.overview.main'),
      async (req: Request, res: Response) => {
        const errorMessage: ErrorMessage = {};

        try {
          const userId = req.session?.user?.id;
          const user = await prisma.users.findUnique({ where: { id: userId } });
          if (!user) {
            return res.redirect('/login');
          }

          const userCount = await prisma.users.count();
          const nodeCount = await prisma.node.count();
          const instanceCount = await prisma.server.count();
          const imageCount = await prisma.images.count();
          const settings = await prisma.settings.findUnique({
            where: { id: 1 },
          });

          res.render('admin/overview/overview', {
            errorMessage,
            user,
            userCount,
            instanceCount,
            nodeCount,
            imageCount,
            req,
            settings,
            aethelpanelVersion: res.locals.aethelpanelVersion,
          });
        } catch (error) {
          logger.error('Error fetching user:', error);
          return res.redirect('/login');
        }
      },
    );



    router.get(
      '/admin/check-update',
      isAuthenticated(true, 'aethelpanel.admin.overview.checkForUpdates'),
      async (_req: Request, res: Response) => {
        try {
          const updateInfo = await checkForUpdates();
          res.json(updateInfo);
        } catch (error) {
          logger.error('Error checking for updates:', error);
          res.status(500).json({ error: 'Error checking for updates' });
        }
      },
    );

    router.post(
      '/admin/perform-update',
      isAuthenticated(true, 'aethelpanel.admin.overview.performUpdate'),
      async (_req: Request, res: Response) => {
        try {
          const success = await performUpdate();
          if (success) {
            res.json({ message: 'Update completed successfully' });
          } else {
            res.status(500).json({ error: 'Error performing update' });
          }
        } catch (error) {
          logger.error('Error performing update:', error);
          res.status(500).json({ error: 'Error performing update' });
        }
      },
    );

    return router;
  },
};

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

export default adminModule;
