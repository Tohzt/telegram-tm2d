import { TonClient, WalletContractV4, internal } from "@ton/ton";
import { Address, fromNano } from "@ton/core"
import { Keyboard, session, SessionFlavor, Context, Bot, InputFile, InlineKeyboard } from "grammy";
import  btn_UpdateMessage  from "./components/btn_update_msg";
//import  btn_Toggle from "./btn_toggle"
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";

type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

const bot = new Bot<MyContext>("7088202985:AAHjCnM6Qk3GIpJDBYHgLm0LVuiAROp9bKA");

//bot.use(btn_Toggle)
bot.use(btn_UpdateMessage)
bot.use(session({ initial() { return {} } }));
bot.use(conversations());
bot.use(createConversation(connect_to_wallet,));

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
const keyboard = new InlineKeyboard() .text("on", "on").text("off", "off") .row() .text("Nahh")

async function connect_to_wallet(conversation: MyConversation, ctx: MyContext) {
  await ctx.reply("Would you like to connect your walled?", { reply_markup: kb });
  const { callbackQuery } = await conversation.waitForCallbackQuery(["connect", "disconnect"])

  if (callbackQuery.data == "connect") {
    await ctx.reply("Gimme yout wallet");
    // handle connection logic
    const { message } = await conversation.wait()
    const msg = message?.text as string
    const addr = Address.parse(msg)
    if (Address.isAddress(addr)) {
      await ctx.reply("Woooooo");

      // Create Client
      const client = new TonClient({
        endpoint: 'https://toncenter.com/api/v2/jsonRPC',
      });

      // Create wallet contract
      let workchain = 0; // Usually you need a workchain 0

      // Get balance
      let balance: bigint = await client.getBalance(addr);
      await ctx.reply(fromNano(balance));


      //const connector = new TonConnect();
      //connector.restoreConnection();
    }

  }
  if (callbackQuery.data == "disconnect") {
    // handle disconnection logic
    await ctx.reply("start", { reply_markup: keyboard });
    //await ctx.reply("end", { reply_markup: { remove_keyboard: true }, });
    return await ctx.reply("Boooo..");
  }
};

bot.command("time", async (ctx) => {
  await ctx.reply("Peep this:", { reply_markup: btn_UpdateMessage })
})

/*
bot.command("toggle", async (ctx) => {
  await ctx.reply("Toggle: ", { reply_markup: btn_Toggle })
})
*/


bot.command("connect", async (ctx) => {
  await ctx.conversation.enter("connect_to_wallet");
});

bot.api.setMyCommands([
  { command: "connect", description: "connect to wallet" }
])


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
