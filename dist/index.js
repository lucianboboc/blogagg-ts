import { registerCommand, runCommand } from "./commands_registry";
import { handlerLogin } from "./handler_login";
import { handlerRegister } from "./handler_register";
import * as process from "node:process";
import { handlerReset } from "./handler_reset";
import { handlerUsers } from "./handler_users";
import { handlerAgg } from "./handler_agg";
import { handlerAddFeed } from "./handler_addfeed";
import { handlerFeeds } from "./handler_feeds";
import { handlerFollow } from "./handler_follow";
import { handlerFollowing } from "./handler_following";
async function main() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.log("usage: cli <command> [args...]");
        process.exit(1);
    }
    const cmdName = args[0];
    const cmdArgs = args.slice(1);
    const commandsRegistry = {};
    registerCommand(commandsRegistry, "login", handlerLogin);
    registerCommand(commandsRegistry, "register", handlerRegister);
    registerCommand(commandsRegistry, "reset", handlerReset);
    registerCommand(commandsRegistry, "users", handlerUsers);
    registerCommand(commandsRegistry, "agg", handlerAgg);
    registerCommand(commandsRegistry, "addfeed", handlerAddFeed);
    registerCommand(commandsRegistry, "feeds", handlerFeeds);
    registerCommand(commandsRegistry, "follow", handlerFollow);
    registerCommand(commandsRegistry, "following", handlerFollowing);
    try {
        await runCommand(commandsRegistry, cmdName, ...cmdArgs);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Error running command ${cmdName}: ${err.message}`);
        }
        else {
            console.error(`Error running command ${cmdName}: ${err}`);
        }
        process.exit(1);
    }
    process.exit(0);
}
await main();
