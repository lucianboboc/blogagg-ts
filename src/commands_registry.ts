import {CommandHandler} from './command_handler.js';
import {SelectUser} from "./lib/db/schema";

export type CommandsRegistry = {
	[cmdName: string]: CommandHandler;
}

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
	registry[cmdName] = handler;
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
	const handler = registry[cmdName];
	if (!handler) {
		throw new Error(`Unknown command: ${cmdName}`);
	}

	await handler(cmdName, ...args);
}

export type UserCommandHandler = (cmdName: string, user: SelectUser, ...args: string[]) => Promise<void> | void;