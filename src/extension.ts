"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import { commands, Extension, ExtensionContext, extensions, StatusBarAlignment, version as vscodeVersion, window, workspace } from "vscode";
import { setContext } from "./global";
import { PickList } from "./PickList";
import vsHelp from "./vsHelp";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    setContext(context);
    // 创建底部按钮 - 背景图片配置
    let backImgBtn = window.createStatusBarItem(StatusBarAlignment.Right, -999);
    backImgBtn.text = "$(file-media)";
    backImgBtn.command = "extension.backgroundCover.start";
    backImgBtn.tooltip = "Switch background image / 切换背景图";
    PickList.autoUpdateBackground();
    backImgBtn.show();

    // 创建底部按钮 - 粒子效果配置
    let particleBtn = window.createStatusBarItem(StatusBarAlignment.Right, -999);
    particleBtn.text = "$(sparkle)";
    particleBtn.command = "extension.backgroundCover.nest";
    particleBtn.tooltip = "Particle effect / 粒子效果";
    particleBtn.show();

    let randomCommand = commands.registerCommand("extension.backgroundCover.refresh", () => {
        PickList.randomUpdateBackground();
    });
    let startCommand = commands.registerCommand("extension.backgroundCover.start", () => {
        PickList.createItemLIst();
    });
    let particleEffectCommand = commands.registerCommand("extension.backgroundCover.nest", () => {
        PickList.startNest();
    });
    context.subscriptions.push(startCommand);
    context.subscriptions.push(randomCommand);
    context.subscriptions.push(particleEffectCommand);

    // 监听主题变化
    window.onDidChangeActiveColorTheme((event) => {
        PickList.autoUpdateBlendModel();
    });

    // 检查 VSCode 版本变化
    checkVSCodeVersionChanged(context);

    // 首次打开-提示语
    let openVersion: string | undefined = context.globalState.get("ext_version");
    let ex: Extension<any> | undefined = extensions.getExtension("PaperFolding.vscode-background-cover-lite");
    let version: string = ex ? ex.packageJSON["version"] : "";
    let title: string = ex ? ex.packageJSON["one_title"] : "";
    if (openVersion != version && title != "") {
        context.globalState.update("ext_version", version);
        vsHelp.showInfo(`Background Cover extension loaded! Version ${version}`);
    }
    setContext(context);
}

// 检查 VSCode 版本是否变化
function checkVSCodeVersionChanged(context: ExtensionContext) {
    // 获取配置
    let config = workspace.getConfiguration("backgroundCover");
    // 如果没有设置背景图，则不处理
    if (!config.imagePath) {
        return;
    }

    // 从全局状态中获取上次记录的 VSCode 版本
    let lastVSCodeVersion = context.globalState.get("vscode_version");
    // 如果版本不同，说明 VSCode 更新了
    if (lastVSCodeVersion && lastVSCodeVersion !== vscodeVersion) {
        // 弹出提示框确认是否更新背景
        window.showInformationMessage(`检测到 VSCode 已更新，背景图可能已被重置，是否重新应用背景图？ / Reapply the background image?`, "YES", "NO").then((value) => {
            if (value === "YES") {
                // 更新DOM
                PickList.needAutoUpdate(config);
            }
        });
    }

    // 更新全局状态中的 VSCode 版本
    context.globalState.update("vscode_version", vscodeVersion);
}

// this method is called when your extension is deactivated
export function deactivate() {}
