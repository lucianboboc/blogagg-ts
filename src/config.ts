import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export type Config = {
	dbUrl: string;
	currentUserName: string;
};

export function setUser(name: string) {
	const config = readConfig();
	config.currentUserName = name;
	writeConfig(config);
}

export function readConfig(): Config {
	const path = getConfigFilePath();
	const data = fs.readFileSync(path, 'utf-8');
	const config = JSON.parse(data);
	return validateConfig(config);
}

function getConfigFilePath(): string {
	return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(config: Config): void {
	const path = getConfigFilePath();
	const jsonConfig = {
		db_url: config.dbUrl,
		current_user_name: config.currentUserName,
	}
	const data = JSON.stringify(jsonConfig, null, 2);
	fs.writeFileSync(path, data, {encoding: "utf-8"});
}

function validateConfig(rawConfig: any): Config {
	if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
		throw new Error("db_url is invalid");
	}

	if (!rawConfig.current_user_name || typeof rawConfig.current_user_name !== "string") {
		throw new Error("current_user_name is invalid");
	}

	return {
		dbUrl: rawConfig.db_url,
		currentUserName: rawConfig.current_user_name,
	} as Config;
}