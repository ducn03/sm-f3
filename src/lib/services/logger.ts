type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const isDev = import.meta.env?.DEV ?? true;

function log(level: LogLevel, ...args: unknown[]) {
	if (level === 'error' || isDev) {
		const prefix = `[${level.toUpperCase()}]`;
		console[level](prefix, ...args);
	}
}

export const logger = {
	info: (...args: unknown[]) => log('info', ...args),
	warn: (...args: unknown[]) => log('warn', ...args),
	error: (...args: unknown[]) => log('error', ...args),
	debug: (...args: unknown[]) => log('debug', ...args)
};
