import {CommandHandler} from './command_handler.js';

export type CommandsRegistry = {
	[cmdName: string]: CommandHandler;
}

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
	registry[cmdName] = handler;
}

export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
	const handler = registry[cmdName];
	if (!handler) {
		console.log(`Command ${cmdName} not found`);
		process.exit(1);
	}

	if (args.length === 0) {
		console.log(`Invalid username`);
		process.exit(1);
	}

	handler(cmdName, args[0]);
}