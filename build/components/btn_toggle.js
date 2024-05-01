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
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const menu_1 = require("@grammyjs/menu");
const bot = new grammy_1.Bot("7088202985:AAHjCnM6Qk3GIpJDBYHgLm0LVuiAROp9bKA");
// Set of user identifiers that have notifications enabled.
const notifications = new Set();
function toggleNotifications(id) {
    if (!notifications.delete(id))
        notifications.add(id);
}
const menu = new menu_1.Menu("toggle")
    .text((ctx) => ctx.from && notifications.has(ctx.from.id) ? "🔔" : "🔕", (ctx) => {
    //toggleNotifications(ctx.from.id);
    ctx.menu.update(); // update the menu!
});
bot.use(menu);
bot.command("menu", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply("Peep this:", { reply_markup: menu });
}));
bot.start();
