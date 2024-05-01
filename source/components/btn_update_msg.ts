import { Menu } from "@grammyjs/menu";

const btn_UpdateMessage = new Menu("time")
  .text(
    "What's the time?",
    (ctx) => ctx.editMessageText("It is " + new Date().toLocaleString()),
  );

export default btn_UpdateMessage
