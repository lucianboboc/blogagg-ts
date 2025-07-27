import {SelectUser} from "./lib/db/schema";
import {deleteFeedFollow} from "./lib/db/queries/feed_follow";

export async function handlerUnfollow(userId: string, user: SelectUser, ...args: string[]) {
	if (args.length !== 1) {
		throw new Error('URL is missing');
	}

	const url = args[0];
	await deleteFeedFollow(user.id, url);
}