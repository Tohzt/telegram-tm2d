"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = require("@grammyjs/menu");
const notifications = new Set();
function toggleNotifications(id) {
    if (!notifications.delete(id))
        notifications.add(id);
}
const btn_Toggle = new menu_1.Menu("toggle")
    .text((ctx) => ctx.from && notifications.has(ctx.from.id) ? "🔔" : "🔕", (ctx) => {
    toggleNotifications(ctx.from.id);
    ctx.menu.update(); // update the menu!
});
exports.default = btn_Toggle;
