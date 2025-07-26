import {RSSFeed} from "../../../rss_feed";
import {db} from "../index";
import {feeds} from "../schema";
import {printFeed} from "../../../helpers";
import {getUser} from "./users";

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


	printFeed(dbFeed, user);
}

export async function getFeeds() {
	return db.select().from(feeds);
}