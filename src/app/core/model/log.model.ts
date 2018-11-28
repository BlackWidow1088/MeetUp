export enum LogType {
  error = 'error',
  success = 'success'
}
export interface Log {
  message: string;
  type: LogType;
}
