import {SelectUser} from "./lib/db/schema";
import {CommandHandler} from './command_handler.js';
import {getUser} from "./lib/db/queries/users";
import {readConfig} from "./config";

type UserCommandHandler = (
	cmdName: string,
	user: SelectUser,
	...args: string[]
) => Promise<void>;

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
	return async (cmdName: string, ...args: string[]): Promise<void> => {
		const username = readConfig().currentUserName;
		if (!username) {
			throw new Error("User not logged in");
		}
		const user = await getUser(username)
		if (!user) {
			throw new Error(`User ${username} not found`);
		}

		await handler(cmdName, user, ...args);
	}
}