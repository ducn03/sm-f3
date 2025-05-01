// advanced-logger.ts

export type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'trace';

const isDev = import.meta.env?.DEV ?? true;
const LOG_COLORS: Record<LogLevel, string> = {
  info: 'color: DodgerBlue',
  warn: 'color: Orange',
  error: 'color: Red',
  debug: 'color: MediumPurple',
  trace: 'color: Gray'
};

interface LoggerOptions {
  appName?: string;
  enabledLevels?: Partial<Record<LogLevel, boolean>>;
  formatter?: Partial<Record<LogLevel, (args: unknown[]) => unknown[]>>;
  verbosity?: Partial<Record<LogLevel, 'minimal' | 'normal' | 'verbose'>>;
  includeTimestamp?: boolean;
}

const defaultOptions: LoggerOptions = {
  appName: 'App',
  enabledLevels: {
    info: true,
    warn: true,
    error: true,
    debug: true,
    trace: true
  },
  includeTimestamp: true
};

const isBrowser = typeof window !== 'undefined';
const globalLogStore: { level: LogLevel; timestamp: string; message: unknown[] }[] = [];
if (isBrowser) {
  (window as any).__APP_LOGS__ = globalLogStore;
}

function defaultFormatter(level: LogLevel, args: unknown[], verbosity: 'minimal' | 'normal' | 'verbose' = 'normal'): unknown[] {
  if (verbosity === 'minimal') return args;
  if (verbosity === 'normal') return args; // Raw object (expandable)

  // Only stringify in 'verbose' mode
  return args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg);
}

function createLogger(options: LoggerOptions = {}) {
  const { appName, enabledLevels, formatter, verbosity, includeTimestamp } = { ...defaultOptions, ...options };

  function log(level: LogLevel, ...args: unknown[]) {
    const enabled = enabledLevels?.[level] ?? true;
    if (!enabled || (!isDev && level !== 'error')) return;

    const timestamp = new Date().toISOString();
    const prefixParts: string[] = [];

    if (includeTimestamp) {
      prefixParts.push(`[${timestamp}]`);
    }
    prefixParts.push(`[${level.toUpperCase()}][${appName}]`);
    const prefix = `%c${prefixParts.join('')}`;
    const color = LOG_COLORS[level];

    const verb = verbosity?.[level] ?? 'normal';
    const formatFn = formatter?.[level] ?? ((a: unknown[]) => defaultFormatter(level, a, verb));
    const formattedArgs = formatFn(args);

    console[level === 'trace' ? 'debug' : level](prefix, color, ...formattedArgs);

    if (isBrowser) {
      globalLogStore.push({ level, timestamp, message: formattedArgs });
    }
  }

  return {
    info: (...args: unknown[]) => log('info', ...args),
    warn: (...args: unknown[]) => log('warn', ...args),
    error: (...args: unknown[]) => log('error', ...args),
    debug: (...args: unknown[]) => log('debug', ...args),
    trace: (...args: unknown[]) => log('trace', ...args)
  };
}

export const logger = createLogger();
