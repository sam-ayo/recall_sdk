export interface CreateParams extends MeetingConfigurationParams {
 meeting_url: string;
 [key: string]: any;
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
 "ready",
 "joining_call",
 "in_waiting_room",
 "in_call_not_recording",
 "recording_permission_allowed",
 "recording_permission_denied",
 "in_call_recording",
 "recording_done",
 "call_ended",
 "done",
 "fatal",
 "media_expired",
 "analysis_done",
 "analysis_failed",
] as const;

export type BotStatus = (typeof BOT_STATUS)[number];

export interface ListQueryParams {
 join_at_after?: Date;
 join_at_before?: Date;
 meeting_url?: string;
 page?: number;
 status?: BotStatus;
}

export interface BaseBotParams {
 id: string;
}

export interface GetTranscriptParams extends BaseBotParams {
 enhanced_diarization?: boolean;
}

export interface ListChatMessagesParams extends BaseBotParams {
 cursor?: string;
 ordering?: string;
}

interface RealTimeTranscription {
 destination_url?: string;
 partial_results?: boolean;
 enhanced_diarization?: boolean;
}

interface RealTimeMedia {
 rtmp_destination_url?: string;
 websocket_video_destination_url?: string;
 websocket_audio_destination_url?: string;
 websocket_speaker_timeline_destionation_url?: string;
 websocket_speaker_timeline_exclude_null_speaker?: boolean;
 webhook_call_events_destination_url?: string;
 webhook_chat_messages_destination_url?: string;
}

export interface TranscriptionOptions {
 provider: string;
 [key: string]: any;
}

export interface RecordingModeOptions {
 participant_video_when_screenshare?: string;
 start_recording_on?: string;
}

interface InCallDisplay {
 kind: string;
 b64_data: string;
}

export interface AutomaticVideoOutput {
 in_call_recording?: InCallDisplay;
 in_call_not_recording?: InCallDisplay;
}

export interface UpdateScheduledParams extends MeetingConfigurationParams {
 id: string;
 meeting_url?: string;
}

export interface MeetingConfigurationParams {
 bot_name?: string;
 join_at?: Date;
 real_time_transcription?: RealTimeTranscription;
 real_time_media?: RealTimeMedia;
 transcription_options?: TranscriptionOptions;
 recording_mode?: string;
 recording_mode_options?: RecordingModeOptions;
 automatic_video_output?: AutomaticVideoOutput;
 [key: string]: any;
}
