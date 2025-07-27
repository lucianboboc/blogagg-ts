import { readConfig } from "./config";
import { getFeedFollowsForUser } from "./lib/db/queries/feed_follow";
export async function handlerFollowing() {
    const username = readConfig().currentUserName;
    if (!username) {
        throw new Error('No current user set');
    }
    const feedsResult = await getFeedFollowsForUser(username);
    for (const feed of feedsResult.feeds) {
        console.log(feed);
    }
    console.log(feedsResult.username);
}
