import parserHtml from "./src/parser/parserHtml";
import { startBot } from "./src/telegramBot/bot";

async function run() {
  const root = await parserHtml("ijust s");
  console.log(typeof root);
  console.log(root);
}
// run();
startBot();
