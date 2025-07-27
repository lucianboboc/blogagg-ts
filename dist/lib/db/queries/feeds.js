import { eq, inArray } from 'drizzle-orm';
import { db } from "../index";
import { feeds } from "../schema";
import { printFeed } from "../../../helpers";
import { getUser } from "./users";
import { createFeedFollow } from "./feed_follow";
export async function createFeed(feed, username) {
    let user = await getUser(username);
    if (!user) {
        throw new Error("User not found");
    }
    const [dbFeed] = await db.insert(feeds).values({
        name: feed.title,
        url: feed.url,
        user_id: user.id,
    }).returning();
    await createFeedFollow(dbFeed.id, user.id);
    printFeed(dbFeed, user);
}
export async function getFeeds() {
    return db.select().from(feeds);
}
export async function getFeedsByUserId(userId) {
    return db.select().from(feeds).where(eq(feeds.user_id, userId));
}
export async function getFeedsByIDs(ids) {
    return db.select().from(feeds).where(inArray(feeds.id, ids));
}
export async function getFeedByURL(url) {
    return db.select().from(feeds).where(eq(feeds.url, url));
}
