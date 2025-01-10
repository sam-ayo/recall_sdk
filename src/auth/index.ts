import { Google } from './meets';

export class Auth {
  private static instance: Auth | null = null;
  google: Google;

  private constructor({ apiKey, loginUrl }: { apiKey: string; loginUrl: string }) {
    this.google = Google.getInstance({ apiKey, loginUrl });
  }
  static getInstance({ apiKey, loginUrl }: { apiKey: string; loginUrl: string }): Auth {
    if (!Auth.instance) {
      Auth.instance = new Auth({ apiKey, loginUrl });
    }
    return Auth.instance;
  }
}
