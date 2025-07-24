import { setUser } from "./config.js";
export function handlerLogin(cmdName, ...args) {
    if (args.length === 0) {
        throw Error("Invalid username");
    }
    setUser(args[0]);
    console.log(`${args[0]} username set`);
}
