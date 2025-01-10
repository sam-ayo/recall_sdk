import {
  CreateParams,
  CreateResponse,
  DeleteScheduleBotParams,
  GetTranscriptParams,
  LeaveCallParams,
  ListQueryParams,
  RetrieveParams,
  StopRecordingParams
} from './types';
import { RecallAxios } from '../recall-axios';
import { AxiosInstance } from 'axios';
import { RecallError, recallRequestTryCatchWrapper } from '../try-catch-wrapper';

export class Bot {
  private static instance: Bot | null = null;
  private botUrl: string;
  private client: AxiosInstance;

  private constructor({ apiKey, botUrl }: { apiKey: string; botUrl: string }) {
    this.botUrl = botUrl;
    this.client = RecallAxios.getInstance({ apiKey });
  }

  static getInstance({ apiKey, botUrl }: { apiKey: string; botUrl: string }): Bot {
    if (!Bot.instance) {
      Bot.instance = new Bot({ apiKey, botUrl });
    }
    return Bot.instance;
  }

  async create(params: CreateParams) {
    const url = this.botUrl;
    return recallRequestTryCatchWrapper<CreateResponse>(() =>
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

  async list(params: ListQueryParams) {
    const url = this.botUrl;
    return recallRequestTryCatchWrapper(() => this.client.get(url, { params }));
  }

  async deleteScheduledBot(params: DeleteScheduleBotParams) {
    const url = `${this.botUrl}/${params.id}/`;
    return recallRequestTryCatchWrapper(() => this.client.delete(url));
  }

  async leaveCall(params: LeaveCallParams) {
    const url = `${this.botUrl}/${params.id}/leave_call`;
    return recallRequestTryCatchWrapper(() => this.client.post(url));
  }

  async stopRecording(params: StopRecordingParams) {
    const url = `${this.botUrl}/${params.id}/stop_recording`;
    return recallRequestTryCatchWrapper(() => this.client.post(url));
  }

  async retrieve(params: RetrieveParams) {
    const url = `${this.botUrl}/${params.id}`;
    return recallRequestTryCatchWrapper(() => this.client.get(url));
  }

  async getTranscript(params: GetTranscriptParams) {
    const url = `${this.botUrl}/${params.id}/transcript`;
    return recallRequestTryCatchWrapper(() =>
      this.client.get(url, { params: { enhanced_diarization: params.enhanced_diarization } })
    );
  }
}
