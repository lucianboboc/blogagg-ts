import { deleteUsers } from "./lib/db/queries/users";
export async function handlerReset(cmdName, ...args) {
    if (args.length > 0) {
        throw Error("Invalid arguments");
    }
    try {
        await deleteUsers();
    }
    catch (err) {
        console.error(err);
        throw new Error("Can't delete users");
    }
}
