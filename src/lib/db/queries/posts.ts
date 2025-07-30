import {db} from '..';
import {eq, desc} from 'drizzle-orm';
import {posts, users, feeds, SelectPost} from '../schema';
import {getFeedsByIDs} from "./feeds";

export type CreatePost = {
	title: string;
	url: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	feedId: string;
}

export async function createPost(post: CreatePost) {
	let [feedsResult] = await getFeedsByIDs([post.feedId]);
	if (!feedsResult.id) {
		throw new Error("Feed not found");
	}

	const [dbPost] = await db.insert(posts).values({
		title: post.title,
		url: post.url,
		description: post.description,
		created_at: post.createdAt,
		updated_at: post.updatedAt,
		published_at: post.publishedAt,
		feed_id: post.feedId,
	}).returning();

	return dbPost as SelectPost;
}

export async function getPostsForUser(userId: string, limit: number) {
	const [userResult] = await db.select().from(users).where(eq(users.id, userId));
	if (!userResult.id) {
		throw new Error("User not found");
	}

	return db.select({
		id: posts.id,
		createdAt: posts.created_at,
		updatedAt: posts.updated_at,
		title: posts.title,
		url: posts.url,
		description: posts.description,
		publishedAt: posts.published_at,
		feedId: posts.feed_id,
		feedName: feeds.name,
	}).from(posts)
		.innerJoin(feeds, eq(posts.feed_id, feeds.id))
		.innerJoin(users, eq(feeds.user_id, users.id))
		.where(eq(users.id, userId))
		.orderBy(desc(posts.published_at))
		.limit(limit);
}