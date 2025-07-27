import {eq, inArray} from 'drizzle-orm';
import {db} from "../index";
import {feeds} from "../schema";
import {printFeed} from "../../../helpers";
import {getUser} from "./users";
import {createFeedFollow} from "./feed_follow";

export type CreateFeed = {
	title: string;
	url: string;
}

export async function createFeed(feed: CreateFeed, username: string) {
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

export async function getFeedsByUserId(userId: string) {
	return db.select().from(feeds).where(eq(feeds.user_id, userId));
}

export async function getFeedsByIDs(ids: string[]) {
	return db.select().from(feeds).where(inArray(feeds.id, ids));
}

export async function getFeedByURL(url: string) {
	return db.select().from(feeds).where(eq(feeds.url, url));
}