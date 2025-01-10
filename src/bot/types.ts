export interface CreateParams {
  meeting_url: string;
  bot_name?: string;
  join_at?: Date;
}

export interface CreateResponse {
  id: string;
  meeting_url: {
    meeting_id: string;
    meeting_password: string | undefined;
    platform: string;
  };
  join_at: string;
}

const BOT_STATUS = [
  'ready',
  'joining_call',
  'in_waiting_room',
  'in_call_not_recording',
  'recording_permission_allowed',
  'recording_permission_denied',
  'in_call_recording',
  'recording_done',
  'call_ended',
  'done',
  'fatal',
  'media_expired',
  'analysis_done',
  'analysis_failed'
] as const;

export type BotStatus = (typeof BOT_STATUS)[number];

export interface ListQueryParams {
  join_at_after?: Date;
  join_at_before?: Date;
  meeting_url?: string;
  page?: number;
  status?: BotStatus;
}

export interface DeleteScheduleBotParams {
  id: string;
}

export interface LeaveCallParams {
  id: string;
}

export interface StopRecordingParams {
  id: string;
}

export interface RetrieveParams {
  id: string;
}

export interface GetTranscriptParams {
  id: string;
  enhanced_diarization?: boolean;
}
