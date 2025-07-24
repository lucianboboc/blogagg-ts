import { registerCommand, runCommand } from "./commands_registry";
import { handlerLogin } from "./handler_login";
import * as process from "node:process";
function main() {
    const registry = {};
    registerCommand(registry, "login", handlerLogin);
    console.log(process.argv);
    if (process.argv < 3) {
        console.log("Invalid number of arguments");
        process.exit(1);
    }
    const cmdName = process.argv[2];
    const args = process.argv.slice(3);
    runCommand(registry, cmdName, ...args);
}
main();
