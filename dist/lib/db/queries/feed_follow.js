import { db } from "../index";
import { eq } from 'drizzle-orm';
import { feed_follows, users, feeds } from "../schema";
import { getUser } from "./users";
import { getFeedsByIDs } from "./feeds";
export async function createFeedFollow(feedId, userId) {
    const [feedFollowResult] = await db.insert(feed_follows).values({
        feed_id: feedId,
        user_id: userId,
    }).returning();
    const [userResult] = await db.select({ name: users.name }).from(users);
    const [feedResult] = await db.select({ name: feeds.name }).from(feeds);
    return {
        id: feedFollowResult.id,
        createdAt: feedFollowResult.created_at,
        updatedAt: feedFollowResult.updated_at,
        userId: userId,
        feedId: feedId,
        username: userResult.name,
        feedName: feedResult.name,
    };
}
export async function getFeedFollowsByUserId(userId) {
    return db.select().from(feed_follows).where(eq(feed_follows.user_id, userId));
}
export async function getFeedFollowsForUser(username) {
    const userResult = await getUser(username);
    const feedFollowsResult = await getFeedFollowsByUserId(userResult.id);
    const feedIDs = feedFollowsResult.map((feed) => feed.feed_id);
    const feeds = await getFeedsByIDs(feedIDs);
    return {
        feeds: feeds.map(feed => feed.name),
        username: userResult.name,
    };
}
