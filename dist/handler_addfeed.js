import { createFeed } from "./lib/db/queries/feeds";
import { readConfig } from "./config";
export async function handlerAddFeed(cmdName, ...args) {
    if (args.length !== 2) {
        throw new Error("Argument must contain feed name and url");
    }
    const username = readConfig().currentUserName;
    const [title, url] = args;
    await createFeed({ title, url }, username);
}
