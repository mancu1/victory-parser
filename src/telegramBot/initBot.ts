import Telegraf from "telegraf";
import socksAgent from "../proxy/proxy";
import { Agent } from "https";
import dotenv from "dotenv";
dotenv.config();

const option =
  process.env.USE_PROXY === "true"
    ? {
        telegram: {
          agent: (socksAgent as unknown) as Agent,
        },
      }
    : null;

const bot = new Telegraf(process.env.BOT_TOKEN, option);
export default bot;
