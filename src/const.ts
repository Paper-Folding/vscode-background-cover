import path from 'path';
import { env } from "vscode";

/**
 * Determine if it is vscode desktop application.
 *
 * `env.appHost` should be `server-distro` on code-server.
 * @see  https://code.visualstudio.com/api/references/vscode-api#env
 */
export const isCodeDesktop = env.appHost === "desktop";

const jsFilename = isCodeDesktop ? "workbench.desktop.main.js" : "workbench.js";
const cssFilename = isCodeDesktop ? "workbench.desktop.main.css" : "workbench.css";
const bakNamename = isCodeDesktop ? "workbench.desktop.main.js.bak" : "workbench.js.bak";

const filePath = isCodeDesktop ? path.join(env.appRoot, "out", "vs", "workbench") : path.join(env.appRoot, "out", "vs", "code", "browser", "workbench");

export const jsFile = path.join(filePath, jsFilename);
export const cssFile = path.join(filePath, cssFilename);
export const jsBakFile = path.join(filePath, bakNamename);

export const extName = "backgroundCover";
