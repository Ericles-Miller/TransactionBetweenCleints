export class ResponseDTO<T> {
  data?: T | T[];
  errors: string = '';
  success: boolean = false;

  constructor(data: T | T[]);
  constructor(error: string);
  constructor(dataOrErrors?: T | string | T[]) {
    if (typeof dataOrErrors !== 'undefined') {
      if (typeof dataOrErrors === 'object') {
        this.data = dataOrErrors;
        this.success = true;
      
      } else if (typeof dataOrErrors === 'string') {
        this.errors = dataOrErrors;
        this.success = false;
      
      } else if (Array.isArray(dataOrErrors)) {
        this.data = dataOrErrors;
        this.success = false;
      }
    }
  }
}
