import {getFeedByURL} from "./lib/db/queries/feeds";
import {createFeedFollow} from "./lib/db/queries/feed_follow";
import {SelectUser} from "./lib/db/schema";

export async function handlerFollow(cmdName: string, user: SelectUser, ...args: string[]) {
	if (args.length !== 1) {
		throw new Error('URL is missing');
	}

	const feedUrl = args[0];
	const [feedResult] = await getFeedByURL(feedUrl);

	const feedFollow = await createFeedFollow(feedResult.id, user.id);
	console.log(feedFollow.feedName);
	console.log(user.name);
}