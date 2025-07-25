export function registerCommand(registry, cmdName, handler) {
    registry[cmdName] = handler;
}
export async function runCommand(registry, cmdName, ...args) {
    const handler = registry[cmdName];
    if (!handler) {
        throw new Error(`Unknown command: ${cmdName}`);
    }
    await handler(cmdName, ...args);
}
