"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = require("@grammyjs/menu");
const menu = new menu_1.Menu("time")
    .text("What's the time?", (ctx) => ctx.editMessageText("It is " + new Date().toLocaleString()));
exports.default = menu;
