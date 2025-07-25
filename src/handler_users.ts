import {getUsers} from "./lib/db/queries/users";
import {readConfig} from "./config";

export async function handlerUsers(cmdName: string, ...args: string[]) {
	const users = await getUsers();
	const currentUserName = readConfig().currentUserName;
	for (const user of users) {
		if (user.name === currentUserName) {
			console.log(`${user.name} (current)`)
			continue;
		}
		console.log(user.name);
	}
}