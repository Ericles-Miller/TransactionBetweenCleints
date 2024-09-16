export class LoggerBuild {
  public static buildObjectLogger(message: string, context?: object, error?: unknown): object {
    return {
      message: message,
      context: context,
      error: error
    };
  }
}