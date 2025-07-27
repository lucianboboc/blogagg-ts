import { getFeedByURL } from "./lib/db/queries/feeds";
import { readConfig } from "./config";
import { getUser } from "./lib/db/queries/users";
import { createFeedFollow } from "./lib/db/queries/feed_follow";
export async function handlerFollow(cmdName, ...args) {
    if (args.length !== 1) {
        throw new Error('URL is missing');
    }
    const feedUrl = args[0];
    const [feedResult] = await getFeedByURL(feedUrl);
    const username = readConfig().currentUserName;
    const userResult = await getUser(username);
    const feedFollow = await createFeedFollow(feedResult.id, userResult.id);
    console.log(feedFollow.feedName);
    console.log(userResult.name);
}
