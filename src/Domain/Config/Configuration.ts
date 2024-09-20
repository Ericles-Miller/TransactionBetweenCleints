import { APISecrets } from './APISecrets';
import { AuthAPISecrets } from './AuthAPISecrets';

export class Configuration {
  static authApiSecrets : AuthAPISecrets = new AuthAPISecrets();
  static apiSecrets : APISecrets = new APISecrets();
}