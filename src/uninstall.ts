/*
 * @Description:
 * @Author: czw
 * @Date: 2023-08-25 10:00:03
 * @FilePath: \vscode-background-cover\src\uninstall.ts
 */

import fs from "fs";
import { extName, jsFile } from "./const";

//执行清理
main();

//清理内容
function main() {
    try {
        let content = getContent();
        content = clearCssContent(content);
        saveContent(content);
        return true;
    } catch (ex) {
        return false;
    }
}

/**
 * 获取文件内容
 * @var mixed
 */
function getContent(): string {
    return fs.readFileSync(jsFile, "utf-8");
}
/**
 * 清理已经添加的代码
 *
 * @private
 * @param {string} content
 * @returns {string}
 */
function clearCssContent(content: string): string {
    var re = new RegExp("\\/\\*ext-" + extName + "-start\\*\\/[\\s\\S]*?\\/\\*ext-" + extName + "-end\\*" + "\\/", "g");
    content = content.replace(re, "");
    content = content.replace(/\s*$/, "");
    return content;
}
/**
 * 设置文件内容
 *
 * @private
 * @param {string} content
 */
function saveContent(content: string): void {
    fs.writeFileSync(jsFile, content, "utf-8");
}
