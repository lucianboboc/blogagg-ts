import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    created_at: timestamp().notNull(),
    updated_at: timestamp()
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    name: text("name").notNull()
});
