
import { Context, Bot } from "grammy";
import { Menu } from "@grammyjs/menu";
import { type ConversationFlavor, } from "@grammyjs/conversations";

type MyContext = Context & ConversationFlavor;
const bot = new Bot<MyContext>("7088202985:AAHjCnM6Qk3GIpJDBYHgLm0LVuiAROp9bKA");

// Set of user identifiers that have notifications enabled.
const notifications = new Set<number>();

function toggleNotifications(id: number) {
  if (!notifications.delete(id)) notifications.add(id);
}

const menu = new Menu("toggle")
  .text(
    (ctx) => ctx.from && notifications.has(ctx.from.id) ? "🔔" : "🔕",
    (ctx) => {
      //toggleNotifications(ctx.from.id);
      ctx.menu.update(); // update the menu!
    },
  );

bot.use(menu)

bot.command("menu", async (ctx) => {
  await ctx.reply("Peep this:", { reply_markup: menu })
})

bot.start();
