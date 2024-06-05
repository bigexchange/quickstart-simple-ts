import { ManifestProvider } from '@bigid/apps-infrastructure-node-js';
import { readFileSync } from "fs";
import { resolve } from "path";

class ManifestController extends ManifestProvider {
  getManifest(req: any, res: any): string {
    return res.status(200).json(JSON.parse(readFileSync(resolve("resources/manifest.json"),'utf8')));
  }
}

export const manifestController = new ManifestController();