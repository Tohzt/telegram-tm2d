import { Keyboard, session, Context, Bot, InputFile, InlineKeyboard } from "grammy";
import btn_UpdateMessage from "./components/btn_update_msg";
import btn_Toggle from "./components/btn_toggle"
import { type ConversationFlavor } from "@grammyjs/conversations";

type MyContext = Context & ConversationFlavor;

const bot = new Bot<MyContext>("7088202985:AAHjCnM6Qk3GIpJDBYHgLm0LVuiAROp9bKA");

bot.use(btn_Toggle)
bot.use(btn_UpdateMessage)

const kb = new InlineKeyboard()
  .text("connect", "connect")
  .text("cancel", "disconnect")

const labels = [
  "Yes, they certainly are",
  "I'm not quite sure",
  "No. 😈",
];
//const buttonRows = labels .map((label) => [Keyboard.text(label)]);
//const keyboard = Keyboard.from(buttonRows).text("yes").text("no").resized();
//const keyboard = new InlineKeyboard() .text("on", "on").text("off", "off") .row() .text("Nahh")

bot.command("test", async (ctx) => {
  await ctx.setChatTitle(ctx.match)
  await ctx.reply("Test Reply: ", { reply_markup: kb })
})

bot.command("time", async (ctx) => {
  await ctx.reply("Peep this:", { reply_markup: btn_UpdateMessage })
})

bot.command("toggle", async (ctx) => {
  await ctx.reply("Toggle: ", { reply_markup: btn_Toggle })
})


bot.on("msg:text", async (ctx) => {
  await ctx.reply("the-shed.vercel.app")
})

/*
// Send Message
bot.on("msg:text", async (ctx) => {
  let msg = ctx.msg.text as string;
  ctx.reply("Message", { reply_markup: kb });
  await ctx.reply(`Hello: ${msg}`);
  greeting(ctx)
})

bot.on("msg:photo", async (ctx) => {
  await ctx.replyWithPhoto(new InputFile("C:/Users/Steve/Downloads/3b282474-5d43-432a-a7c2-6317bb02dcc0.jpg"), { "caption": "nice photo" });
})

bot.callbackQuery("example", async (ctx) => { ctx.reply("confirmed") })
*/


bot.start();
