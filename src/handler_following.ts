import {getFeedFollowsForUser} from "./lib/db/queries/feed_follow";
import {SelectUser} from "./lib/db/schema";

export async function handlerFollowing(cmdName: string, user: SelectUser, ...args: string[]) {
	const feedsResult = await getFeedFollowsForUser(user.name);
	for (const feed of feedsResult.feeds) {
		console.log(feed);
	}
	console.log(feedsResult.username);
}