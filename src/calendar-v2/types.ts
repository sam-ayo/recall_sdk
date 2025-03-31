const CALENDAR_PLATFORM = ["google_calendar", "microsoft_outlook"] as const;
export type CalendarPlatform = (typeof CALENDAR_PLATFORM)[number];

const CALENDAR_STATUS = ["connecting", "connected", "disconnected"] as const;
export type CalendarStatus = (typeof CALENDAR_STATUS)[number];

export interface BaseCalendarParams {
  id: string;
}

interface OauthParams {
  oauth_client_id?: string;
  oauth_client_secret?: string;
  oauth_refresh_token?: string;
}

export interface CreateCalendarParams {
  oauth_client_id: string;
  oauth_client_secret: string;
  oauth_refresh_token: string;
  platform: CalendarPlatform;
  oauth_email?: string;
}

export interface UpdateCalendarParams extends BaseCalendarParams, OauthParams {
  platform?: CalendarPlatform;
  oauth_email?: string;
}

export interface ListCalendarParams {
  created_at__gte?: Date;
  cursor?: string;
  email?: string;
  platform?: CalendarPlatform;
  status?: CalendarStatus;
}

export interface CreateCalendarResponse extends OauthParams {
  platform: CalendarPlatform;
  oauth_email: string;
}
