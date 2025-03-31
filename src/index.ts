import { Bot } from "./bot";
import { Auth } from "./auth";
import { CalendarV2 } from "./calendar-v2";

export class Recall {
  private apiKey: string;
  private v1Url: string;
  private v2Url: string;
  private region: string;
  bot: Bot;
  auth: Auth;
  calendar: CalendarV2;
  constructor({ apiKey, region }: { apiKey: string; region: string }) {
    this.apiKey = apiKey;
    this.region = region;
    this.v1Url = `https://${this.region}.recall.ai/api/v1`;
    this.v2Url = `https://${this.region}.recall.ai/api/v2`;
    this.bot = Bot.getInstance({
      apiKey: this.apiKey,
      botUrl: `${this.v1Url}/bot`,
    });

    this.auth = Auth.getInstance({
      apiKey: this.apiKey,
      loginUrl: `${this.v2Url}`,
    });

    this.calendar = CalendarV2.getInstance({
      apiKey: this.apiKey,
      calendarUrl: `${this.v2Url}/calendar`,
    });
  }
}
