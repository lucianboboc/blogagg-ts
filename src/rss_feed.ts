import {XMLParser} from "fast-xml-parser";

export type RSSFeed = {
	channel: {
		title: string;
		link: string;
		description: string;
		item: RSSItem[];
	};
};

export type RSSItem = {
	title: string;
	link: string;
	description: string;
	pubDate: string;
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
	const resp = await fetch(feedURL, {
		method: 'GET',
		headers: {
			'User-Agent': 'gator',
		}
	});
	const respText = await resp.text();
	const parser = new XMLParser();
	const xlm = parser.parse(respText);
	const channel = await xlm.rss?.channel;
	if (!channel) {
		throw new Error('No feed channel given');
	}

	const {title, link, description} = channel;
	if (!title || !link || !description) {
		throw new Error('No valid channel items');
	}

	const item: RSSItem[] = await channel.item;
	if (!Array.isArray(item)) {
		throw new Error('No items given');
	}

	return {
		channel: {
			title,
			link,
			description,
			item,
		}
	};
}