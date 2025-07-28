import {pgTable, text, timestamp, uuid, unique} from 'drizzle-orm/pg-core';

export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom().notNull(),
	created_at: timestamp().notNull().defaultNow(),
	updated_at: timestamp()
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
	name: text("name").notNull()
});

export const feeds = pgTable("feeds", {
	id: uuid("id").primaryKey().defaultRandom().notNull(),
	created_at: timestamp().notNull().defaultNow(),
	updated_at: timestamp()
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
	name: text("name").notNull(),
	url: text("url").notNull().unique(),
	user_id: uuid("user_id")
		.references(() => users.id,  {onDelete: "cascade"})
		.notNull(),
	last_fetched_at: timestamp()
});

export const feed_follows = pgTable("feed_follows", {
	id: uuid("id").primaryKey().defaultRandom().notNull(),
	created_at: timestamp().notNull().defaultNow(),
	updated_at: timestamp()
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
	user_id: uuid("user_id")
		.references(() => users.id,  {onDelete: "cascade"})
		.notNull(),
	feed_id: uuid("feed_id")
		.references(() => feeds.id,  {onDelete: "cascade"})
		.notNull(),
}, (t) => [
	unique().on(t.user_id, t.feed_id),
]);

export type SelectUser = typeof users.$inferSelect;
export type SelectFeed = typeof feeds.$inferSelect;
export type SelectFeedFollows = typeof feed_follows.$inferSelect;