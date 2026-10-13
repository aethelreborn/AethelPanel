/**
 * ╳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╳
 *      AethelPanel - Open Source Project by Aethel
 *      Repository: https://github.com/aethelreborn/AethelPanel
 *
 *     © 2024 Aethel. Licensed under the MIT License
 * ╳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╳
 */

import { Router } from 'express';

interface ModuleInfo {
  name: string;
  description: string;
  version: string;
  moduleVersion: string;
  author: string;
  license: string;
}

export interface Module {
  info: ModuleInfo;
  router: () => Router;
}
