import { fetchFeed } from "./rss_feed";
export async function handlerAgg(cmdName, ...args) {
    try {
        const feed = await fetchFeed("https://www.wagslane.dev/index.xml");
        const { title, link, description } = feed.channel;
        console.log(title);
        console.log(link);
        console.log(description);
        for (const feedItem of feed.channel.item) {
            console.log(feedItem);
        }
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}
