import {setUser} from "./config.js";
import {getUser} from "./lib/db/queries/users";
import * as process from "node:process";

export async function handlerLogin(cmdName: string, ...args: string[]) {
	if (args.length !== 1) {
		throw Error("Invalid username");
	}

	const username = args[0];
	const existingUser = await getUser(username);
	if (!existingUser) {
		throw new Error("User does not exist");
	}

	setUser(username);
	console.log(`${args[0]} username set`);
}