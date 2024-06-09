"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const btn_update_msg_1 = __importDefault(require("./components/btn_update_msg"));
const btn_toggle_1 = __importDefault(require("./components/btn_toggle"));
const bot = new grammy_1.Bot("7088202985:AAHjCnM6Qk3GIpJDBYHgLm0LVuiAROp9bKA");
bot.use(btn_toggle_1.default);
bot.use(btn_update_msg_1.default);
const kb = new grammy_1.InlineKeyboard()
    .text("connect", "connect")
    .text("cancel", "disconnect");
const labels = [
    "Yes, they certainly are",
    "I'm not quite sure",
    "No. 😈",
];
//const buttonRows = labels .map((label) => [Keyboard.text(label)]);
//const keyboard = Keyboard.from(buttonRows).text("yes").text("no").resized();
//const keyboard = new InlineKeyboard() .text("on", "on").text("off", "off") .row() .text("Nahh")
bot.command("test", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.setChatTitle(ctx.match);
    yield ctx.reply("Test Reply: ", { reply_markup: kb });
}));
bot.command("time", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply("Peep this:", { reply_markup: btn_update_msg_1.default });
}));
bot.command("toggle", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply("Toggle: ", { reply_markup: btn_toggle_1.default });
}));
bot.on("msg:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply("the-shed.vercel.app");
}));
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
