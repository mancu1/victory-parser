import bot from "./initBot";
import parserHtml from "../parser/parserHtml";
export function startBot() {
  console.log("started");

  bot.use(async (ctx, next) => {
    const start = new Date().getTime();
    if (ctx.message && ctx.message.text) {
      const products = await parserHtml(ctx.message.text);
      if (!!products) {
        products.forEach((el) => {
          console.log(el.img);
          ctx.replyWithPhoto(`${el.img}`, {
            caption: `[Купить](${el.url}) *${el.title}* - ${el.price}`,
            parse_mode: "Markdown",
          });
        });
      }
    }
    if (!!next) await next();
    const ms = new Date().getTime() - start;
    console.log("Response time: %sms", ms);
  });

  bot.on("text", (ctx) => {});
  bot.start((ctx) => ctx.reply("Напиши что ищем"));
  bot.launch();
}
