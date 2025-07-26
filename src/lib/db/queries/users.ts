import { db } from "..";
import {users, feeds, SelectUser, SelectFeed} from "../schema";
import {eq, inArray} from "drizzle-orm";
import {RSSFeed} from "../../../rss_feed";
import {printFeed} from "../../../helpers";

export async function createUser(name: string) {
	const [result] = await db.insert(users).values({ name: name }).returning();
	return result;
}

export async function getUser(name: string) {
	const [result] = await db.select().from(users).where(eq(users.name, name));
	return result as SelectUser;
}

export async function deleteUsers() {
	await db.delete(users);
}

export async function getUsers() {
	return await db.select().from(users);
}

export async function getUsersByIDs(ids: string[]) {
	return await db.select().from(users).where(inArray(users.id, ids));
}