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

export class Logger {
  private level: number;
  constructor(level: string) {
    this.level =
      logLevels.find((l) => l.label === level)?.level ?? logLevels[0].level;
  }

  log(str: any, ...args: any[]) {
    this.printLogs(0, str, args);
  }
  info(str: any, ...args: any[]) {
    this.printLogs(1, str, args);
  }
  warn(str: any, ...args: any[]) {
    this.printLogs(2, str, args);
  }
  error(str: any, ...args: any[]) {
    this.printLogs(3, str, args);
  }
  success(str: any, ...args: any[]) {
    if (1 >= this.level) {
      console.log(`${color.greenBright(` ✔ `)} ${str}`, ...args);
    }
  }
  fail(str: any, ...args: any[]) {
    if (1 >= this.level) {
      console.log(`${color.redBright(` ✗ `)} ${str}`, ...args);
    }
  }

  private defPrefix(level: number) {
    if (level === 0) {
      return color.bgBlackBright(color.white(` > `));
    }
    if (level === 1) {
      return color.bgCyan(color.black(` i `));
    }
    if (level === 2) {
      return color.bgYellow(color.black(` ! `));
    }
    if (level === 3) {
      return color.bgRed(color.black(` × `));
    } else {
      throw new Error(`Unknown level detected (level: ${level})`);
    }
  }

  private printLogs(level: number, str: any, args: any[]) {
    if (level >= this.level) {
      const p = this.defPrefix(level);
      //Object detection
      if (Object.prototype.toString.call(str) === '[object Object]') {
        return console.log(p + color.gray(' Object:\n'), str, ...args);
      }
      //Error message detection
      if (str.stack) {
        return console.error(p, str, ...args);
      } else {
        return console.log(p, str, ...args);
      }
    }
  }
}

export const logger = new Logger('debug');
