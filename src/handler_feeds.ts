import {getFeeds} from "./lib/db/queries/feeds";
import {getUsersByIDs} from "./lib/db/queries/users";
import {SelectUser} from "./lib/db/schema";

export async function handlerFeeds(cmdName: string, ...args: string[]) {
	const feeds = await getFeeds();
	const userIDs = feeds.map((feed) => feed.user_id);

	const users = await getUsersByIDs(userIDs);
	const map = new Map<string, SelectUser>();
	users.forEach((user) => {
		map.set(user.id, user);
	})

	for (const feed of feeds) {
		console.log(feed.name);
		console.log(feed.url);
		const user = map.get(feed.user_id);
		if (user) {
			console.log(user.name);
		}
	}
}