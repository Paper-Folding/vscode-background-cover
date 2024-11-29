"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, window, Extension, extensions, ExtensionContext, StatusBarAlignment } from "vscode";
import { PickList } from "./PickLIst";
import vsHelp from "./vsHelp";
import { setContext } from "./global";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    // 创建底部按钮
    let backImgBtn = window.createStatusBarItem(StatusBarAlignment.Right, -999);
    backImgBtn.text = "$(file-media)";
    backImgBtn.command = "extension.backgroundCover.start";
    backImgBtn.tooltip = "Switch background image / 切换背景图";
    PickList.autoUpdateBackground();
    backImgBtn.show();
    let randomCommand = commands.registerCommand("extension.backgroundCover.refresh", () => {
        PickList.randomUpdateBackground();
    });
    let startCommand = commands.registerCommand("extension.backgroundCover.start", () => {
        PickList.createItemLIst();
    });
    context.subscriptions.push(startCommand);
    context.subscriptions.push(randomCommand);

    // 首次打开-提示语
    let openVersion: string | undefined = context.globalState.get("ext_version");
    let ex: Extension<any> | undefined = extensions.getExtension("PaperFolding.vscode-background-cover-lite");
    let version: string = ex ? ex.packageJSON["version"] : "";
    let title: string = ex ? ex.packageJSON["one_title"] : "";
    if (openVersion != version && title != "") {
        context.globalState.update("ext_version", version);
        vsHelp.showWebview(`Background Cover extension loaded! Version ${version}`);
    }
    setContext(context);
}

// this method is called when your extension is deactivated
export function deactivate() {}
