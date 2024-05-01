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
const ton_1 = require("@ton/ton");
const core_1 = require("@ton/core");
const grammy_1 = require("grammy");
//import { Menu } from "@grammyjs/menu";
const menu_1 = __importDefault(require("./menu"));
const conversations_1 = require("@grammyjs/conversations");
const bot = new grammy_1.Bot("7088202985:AAHjCnM6Qk3GIpJDBYHgLm0LVuiAROp9bKA");
const menu = menu_1.default;
bot.use(menu);
bot.use((0, grammy_1.session)({ initial() { return {}; } }));
bot.use((0, conversations_1.conversations)());
bot.use((0, conversations_1.createConversation)(connect_to_wallet));
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
const keyboard = new grammy_1.InlineKeyboard()
    .text("on", "on").text("off", "off")
    .row()
    .text("Nahh");
function connect_to_wallet(conversation, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ctx.reply("Would you like to connect your walled?", { reply_markup: kb });
        const { callbackQuery } = yield conversation.waitForCallbackQuery(["connect", "disconnect"]);
        if (callbackQuery.data == "connect") {
            yield ctx.reply("Gimme yout wallet");
            // handle connection logic
            const { message } = yield conversation.wait();
            const msg = message === null || message === void 0 ? void 0 : message.text;
            const addr = core_1.Address.parse(msg);
            if (core_1.Address.isAddress(addr)) {
                yield ctx.reply("Woooooo");
                // Create Client
                const client = new ton_1.TonClient({
                    endpoint: 'https://toncenter.com/api/v2/jsonRPC',
                });
                // Create wallet contract
                let workchain = 0; // Usually you need a workchain 0
                // Get balance
                let balance = yield client.getBalance(addr);
                yield ctx.reply((0, core_1.fromNano)(balance));
                //const connector = new TonConnect();
                //connector.restoreConnection();
            }
        }
        if (callbackQuery.data == "disconnect") {
            // handle disconnection logic
            yield ctx.reply("start", { reply_markup: keyboard });
            //await ctx.reply("end", { reply_markup: { remove_keyboard: true }, });
            return yield ctx.reply("Boooo..");
        }
    });
}
;
bot.command("menu", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply("Peep this:", { reply_markup: menu });
}));
bot.command("connect", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.conversation.enter("connect_to_wallet");
}));
bot.api.setMyCommands([
    { command: "connect", description: "connect to wallet" }
]);
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
