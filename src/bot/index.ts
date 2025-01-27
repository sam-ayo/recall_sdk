import {
 BaseBotParams,
 CreateParams,
 CreateResponse,
 GetTranscriptParams,
 ListChatMessagesParams,
 ListQueryParams,
 OutputAudioParams,
 UpdateScheduledParams,
} from "./types";
import { RecallAxios } from "../recall-axios";
import { AxiosInstance } from "axios";
import { recallRequestTryCatchWrapper } from "../try-catch-wrapper";

export class Bot {
 private static instance: Bot | null = null;
 private botUrl: string;
 private client: AxiosInstance;

 private constructor({ apiKey, botUrl }: { apiKey: string; botUrl: string }) {
  this.botUrl = botUrl;
  this.client = RecallAxios.getInstance({ apiKey });
 }

 static getInstance({
  apiKey,
  botUrl,
 }: {
  apiKey: string;
  botUrl: string;
 }): Bot {
  if (!Bot.instance) {
   Bot.instance = new Bot({ apiKey, botUrl });
  }
  return Bot.instance;
 }

 async list(params: ListQueryParams) {
  const url = this.botUrl;
  return recallRequestTryCatchWrapper(() => this.client.get(url, { params }));
 }

 async create(params: CreateParams) {
  const url = this.botUrl;
  return recallRequestTryCatchWrapper<CreateResponse>(() =>
   this.client.post(
    url,
    { ...params },
    {
     headers: {
      "Content-Type": "application/json",
     },
    }
   )
  );
 }

 async listChatMessages(params: ListChatMessagesParams) {
  const url = `${this.botUrl}/${params.id}/chat-messages/`;
  const { cursor, ordering } = params;
  return recallRequestTryCatchWrapper(() =>
   this.client.get(url, { params: { cursor, ordering } })
  );
 }

 async retrieve(params: BaseBotParams) {
  const url = `${this.botUrl}/${params.id}`;
  return recallRequestTryCatchWrapper(() => this.client.get(url));
 }

 async updateScheduledBot(params: UpdateScheduledParams) {
  const { id, ...bodyParams } = params;
  const url = `${this.botUrl}/${id}/`;
  return recallRequestTryCatchWrapper(() =>
   this.client.patch(
    url,
    { ...bodyParams },
    {
     headers: {
      "Content-Type": "application/json",
     },
    }
   )
  );
 }

 async deleteScheduledBot(params: BaseBotParams) {
  const url = `${this.botUrl}/${params.id}/`;
  return recallRequestTryCatchWrapper(() => this.client.delete(url));
 }

 async deleteBotMedia(params: BaseBotParams) {
  const url = `${this.botUrl}/${params.id}/delete-media/`;
  return recallRequestTryCatchWrapper(() => this.client.post(url));
 }

 async getBotIntellienge(params: BaseBotParams) {
  const url = `${this.botUrl}/${params.id}/intelligence/`;
  return recallRequestTryCatchWrapper(() => this.client.get(url));
 }

 async leaveCall(params: BaseBotParams) {
  const url = `${this.botUrl}/${params.id}/leave_call/`;
  return recallRequestTryCatchWrapper(() => this.client.post(url));
 }

 async getBotLogs(params: BaseBotParams) {
  const url = `${this.botUrl}/${params.id}/logs/`;
  return recallRequestTryCatchWrapper(() => this.client.get(url));
 }

 async stopRecording(params: BaseBotParams) {
  const url = `${this.botUrl}/${params.id}/stop_recording/`;
  return recallRequestTryCatchWrapper(() => this.client.post(url));
 }
 
 async outputAudio (params: OutputAudioParams) {
    const url = `${this.botUrl}/${params.id}/output_audio/`
    const {id, ...bodyParams} = params;
    return recallRequestTryCatchWrapper(()=> this.client.post(url, {...bodyParams},{
        headers: {
         "Content-Type": "application/json",
        },
       }))
 }
 

 async getTranscript(params: GetTranscriptParams) {
  const url = `${this.botUrl}/${params.id}/transcript/`;
  return recallRequestTryCatchWrapper(() =>
   this.client.get(url, {
    params: { enhanced_diarization: params.enhanced_diarization },
   })
  );
 }
}
