import color from 'picocolors';

interface LogLevelTypes {
  level: number;
  label: string;
}

const logLevels: LogLevelTypes[] = [
  { level: 0, label: 'debug' },
  { level: 1, label: 'info' },
  { level: 2, label: 'warn' },
  { level: 3, label: 'error' },
];

export function Logger(level: string) {
  const actualLevel =
    logLevels.find((l) => l.label === level)?.level ?? logLevels[0].level;

  function defPrefix(level: number): string {
    switch (level) {
      case 0:
        return color.bgBlackBright(color.white(` > `));
      case 1:
        return color.bgCyan(color.black(` i `));
      case 2:
        return color.bgYellow(color.black(` ! `));
      case 3:
        return color.bgRed(color.black(` × `));
      default:
        throw new Error(`Unknown level detected (level: ${level})`);
    }
  }

  const printLogs = (level: number, str: any, args: any[]) => {
    if (level >= actualLevel) {
      const prefix = defPrefix(level);

      // オブジェクトの検出
      if (Object.prototype.toString.call(str) === '[object Object]') {
        return console.log(prefix + color.gray(' Object:\n'), str, ...args);
      }

      // エラーメッセージの検出
      if (str.stack) {
        return console.error(prefix, str, ...args);
      } else {
        return console.log(prefix, str, ...args);
      }
    }
  };

  return {
    log: (str: any, ...args: any[]) => printLogs(0, str, args),
    info: (str: any, ...args: any[]) => printLogs(1, str, args),
    warn: (str: any, ...args: any[]) => printLogs(2, str, args),
    error: (str: any, ...args: any[]) => printLogs(3, str, args),
    success: (str: any, ...args: any[]) => {
      if (1 >= actualLevel) {
        console.log(`${color.greenBright(` ✔ `)} ${str}`, ...args);
      }
    },
    fail: (str: any, ...args: any[]) => {
      if (1 >= actualLevel) {
        console.log(`${color.redBright(` ✗ `)} ${str}`, ...args);
      }
    },
  };
}

export const logger = Logger('debug');
