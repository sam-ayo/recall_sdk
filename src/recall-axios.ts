import axios, { AxiosInstance } from 'axios';

export class RecallAxios {
  private static instance: AxiosInstance | null = null;

  static getInstance({ apiKey }: { apiKey: string }): AxiosInstance {
    if (!RecallAxios.instance) {
      RecallAxios.instance = axios.create({
        headers: {
          Authorization: `Token ${apiKey}`,
          Accept: 'application/json'
        }
      });
    }
    return RecallAxios.instance;
  }
}
