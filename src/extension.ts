import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand("vscode-samples-extension.find-files", async () => {
		const globPattern = await vscode.window.showInputBox({
			value: "**/*.js",
		});
		if (!globPattern) {
			return;
		}
		const files = await vscode.workspace.findFiles(globPattern);
		vscode.window.showInformationMessage(files && files.length > 0 ? "Result: " + files.join(" ") : "Result: nothing");
	}));
	context.subscriptions.push(vscode.commands.registerCommand("vscode-samples-extension.show-dap-tracker-message", () => {
		context.subscriptions.push(vscode.debug.registerDebugAdapterTrackerFactory("*", new DebugAdapterTrackerFactory()));
	}));
}

// tslint:disable-next-line: max-classes-per-file
class DebugAdapterTrackerFactory implements vscode.DebugAdapterTrackerFactory {
    public createDebugAdapterTracker(session: vscode.DebugSession): vscode.ProviderResult<vscode.DebugAdapterTracker> {
        return  {
            onDidSendMessage: (message: any) => {
               vscode.window.showInformationMessage("Type: " + typeof(message) + ", Message: " + JSON.stringify(message));
            },
        };
    }
}

export function deactivate() { }
