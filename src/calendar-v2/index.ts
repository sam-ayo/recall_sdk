import {
  BaseCalendarParams,
  CreateCalendarParams,
  CreateCalendarResponse,
  ListCalendarParams,
  UpdateCalendarParams,
} from "./types";
import { RecallAxios } from "../recall-axios";
import { AxiosInstance } from "axios";
import { recallRequestTryCatchWrapper } from "../try-catch-wrapper";

export class CalendarV2 {
  private static instance: CalendarV2 | null = null;
  private calendarUrl: string;
  private client: AxiosInstance;

  private constructor({
    apiKey,
    calendarUrl,
  }: {
    apiKey: string;
    calendarUrl: string;
  }) {
    this.calendarUrl = calendarUrl;
    this.client = RecallAxios.getInstance({ apiKey });
  }

  static getInstance({
    apiKey,
    calendarUrl,
  }: {
    apiKey: string;
    calendarUrl: string;
  }): CalendarV2 {
    if (!CalendarV2.instance) {
      CalendarV2.instance = new CalendarV2({ apiKey, calendarUrl });
    }
    return CalendarV2.instance;
  }

  async list(params: ListCalendarParams) {
    const url = this.calendarUrl;
    return recallRequestTryCatchWrapper(() => this.client.get(url, { params }));
  }

  async create(params: CreateCalendarParams) {
    const url = this.calendarUrl;
    return recallRequestTryCatchWrapper<CreateCalendarResponse>(() =>
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

  async retrieve(params: BaseCalendarParams) {
    const url = `${this.calendarUrl}/${params.id}`;
    return recallRequestTryCatchWrapper(() => this.client.get(url));
  }

  async delete(params: BaseCalendarParams) {
    const url = `${this.calendarUrl}/${params.id}/`;
    return recallRequestTryCatchWrapper(() => this.client.delete(url));
  }

  async update(params: UpdateCalendarParams) {
    const { id, ...updateData } = params;
    const url = `${this.calendarUrl}/${id}/`;
    return recallRequestTryCatchWrapper<CreateCalendarResponse>(() =>
      this.client.patch(
        url,
        { ...updateData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    );
  }
}
