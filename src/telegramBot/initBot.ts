import Telegraf from "telegraf";
import socksAgent from "../proxy/proxy";
import { Agent } from "https";
import dotenv from "dotenv";
dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN, {
  telegram: {
    agent: (socksAgent as unknown) as Agent,
  },
});
export default bot;
