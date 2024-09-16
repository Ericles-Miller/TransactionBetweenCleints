export class ResponseDTO<T> {
  data?: T;
  errors: string[] = [];
  success: boolean = false;

  constructor(data: T);
  constructor(errors: string[]);
  constructor(error: string);
  constructor(dataOrErrors?: T | string | string[]) {
    if (typeof dataOrErrors !== 'undefined') {
      if (typeof dataOrErrors === 'object' && !Array.isArray(dataOrErrors)) {
        this.data = dataOrErrors;
        this.success = true;
      } else if (typeof dataOrErrors === 'string') {
        this.errors.push(dataOrErrors);
        this.success = false;
      } else if (Array.isArray(dataOrErrors)) {
        this.errors = dataOrErrors;
        this.success = false;
      }
    }
  }
}
