import {SelectFeed, SelectUser} from "./lib/db/schema";

export function printFeed(feed: SelectFeed, user: SelectUser) {
	console.log(feed);
	console.log(user);
}