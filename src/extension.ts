import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand("vscode-samples-extension.find-files", async () => {
		const globPattern = await vscode.window.showInputBox({
			value: "**/*.js",
		});
		if (!globPattern) {
			return;
		}
		const files = await vscode.workspace.findFiles(globPattern);
		vscode.window.showInformationMessage(files ? "Result: " + files.join(" "): "Result: nothing");
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
