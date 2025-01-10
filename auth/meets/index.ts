import { AxiosInstance } from 'axios';
import { RecallAxios } from '../../recall-axios';
import { recallRequestTryCatchWrapper } from '../../try-catch-wrapper';

const LOGIN_MODE = ['always', 'only_if_required'] as const;
type LoginMode = (typeof LOGIN_MODE)[number];

interface CreateLoginGroupParams {
  name: string;
  loginMode: LoginMode;
}

export class Google {
  private static instance: Google | null = null;
  private loginUrl: string;
  private client: AxiosInstance;

  private constructor({ apiKey, loginUrl }: { apiKey: string; loginUrl: string }) {
    this.loginUrl = loginUrl;
    this.client = RecallAxios.getInstance({ apiKey });
  }
  static getInstance({ apiKey, loginUrl }: { apiKey: string; loginUrl: string }): Google {
    if (!Google.instance) {
      Google.instance = new Google({ apiKey, loginUrl });
    }
    return Google.instance;
  }

  async createLoginGroup(params: CreateLoginGroupParams) {
    const url = `${this.loginUrl}/google-login-groups`;
    return recallRequestTryCatchWrapper(() =>
      this.client.post(
        url,
        { ...params },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    );
  }
}
