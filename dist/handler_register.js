import { createUser, getUser } from './lib/db/queries/users';
import { setUser } from "./config";
export async function handlerRegister(cmdName, ...args) {
    if (args.length !== 1) {
        throw Error("Invalid username");
    }
    const username = args[0];
    const existingUser = await getUser(username);
    if (existingUser) {
        throw new Error("User already exists");
    }
    const user = await createUser(username);
    setUser(user.name);
    console.log("Created user", user.name);
}
