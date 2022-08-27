import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
  private prefix?: string;

  setPrefix(prefix: string) {
    this.prefix = prefix;
  }

  log(message: string, prefix?: string) {
    let formattedMessage = message;

    if (this.prefix) {
      formattedMessage = `[${this.prefix}] ${message}`;
    }
    super.log(formattedMessage, prefix);
  }

  error(message: any, trace?: string, prefix?: string) {
    super.error(message, trace, prefix);
  }

  warn(message: any, prefix?: string) {
    super.warn(message, prefix);
  }

  debug(message: any, prefix?: string) {
    super.debug(message, prefix);
  }

  verbose(message: any, prefix?: string) {
    super.verbose(message, prefix);
  }
}
