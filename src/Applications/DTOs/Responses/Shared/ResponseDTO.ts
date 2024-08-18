export class ResponseDTO<T> {
  data?: T;
  errors: string[] = [];
  success!: boolean;

  constructor(data: T, errors: string[], success: boolean)
  constructor(data: T)
  constructor(errors: string[])
  constructor(error : string)
  constructor(data?: T, errors?: string[], success?: boolean) {
    if (data) {
      this.data = data;
      this.success = success ?? true;
    } else if (errors) {
      this.errors = errors;
      this.success = success ?? false;
    } else {
      this.success = false;
    }
  }

  addError(error: string): void {
    this.errors.push(error);
    this.success = false;
  }
}