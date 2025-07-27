import { deleteUsers } from "./lib/db/queries/users";
export async function handlerReset(cmdName, ...args) {
    await deleteUsers();
    console.log("Database reset successfully!");
}
