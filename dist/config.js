import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
export function setUser(name) {
    const config = readConfig();
    config.currentUserName = name;
    writeConfig(config);
}
export function readConfig() {
    const path = getConfigFilePath();
    const data = fs.readFileSync(path, 'utf-8');
    const config = JSON.parse(data);
    return validateConfig(config);
}
function getConfigFilePath() {
    return path.join(os.homedir(), ".gatorconfig.json");
}
function writeConfig(config) {
    const path = getConfigFilePath();
    const jsonConfig = {
        db_url: config.dbUrl,
        current_user_name: config.currentUserName,
    };
    const data = JSON.stringify(jsonConfig, null, 2);
    fs.writeFileSync(path, data, { encoding: "utf-8" });
}
function validateConfig(rawConfig) {
    if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
        throw new Error("db_url is invalid");
    }
    if (!rawConfig.current_user_name || typeof rawConfig.current_user_name !== "string") {
        throw new Error("current_user_name is invalid");
    }
    return {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name,
    };
}
