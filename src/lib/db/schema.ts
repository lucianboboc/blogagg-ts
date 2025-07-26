import {pgTable, text, timestamp, uuid} from 'drizzle-orm/pg-core';

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
		.notNull()
});

export type SelectUser = typeof users.$inferSelect;
export type SelectFeed = typeof feeds.$inferSelect;