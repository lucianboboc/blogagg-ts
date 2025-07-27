import { XMLParser } from "fast-xml-parser";
export async function fetchFeed(feedURL) {
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
    const { title, link, description } = channel;
    if (!title || !link || !description) {
        throw new Error('No valid channel items');
    }
    const item = await channel.item;
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
