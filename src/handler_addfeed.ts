import {createFeed} from "./lib/db/queries/feeds";
import {SelectUser} from "./lib/db/schema";

export async function handlerAddFeed(cmdName: string, user: SelectUser, ...args: string[]) {
	if (args.length !== 2) {
		throw new Error("Argument must contain feed name and url");
	}

	const [title, url] = args;

	await createFeed({title, url}, user.name);
}