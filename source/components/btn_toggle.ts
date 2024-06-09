
import { Menu } from "@grammyjs/menu";


const notifications = new Set<number>();

function toggleNotifications(id: number) {
  if (!notifications.delete(id)) notifications.add(id);
}

const btn_Toggle = new Menu("toggle")
  .text(
    (ctx) => ctx.from && notifications.has(ctx.from.id) ? "🔔" : "🔕",
    (ctx) => {
      toggleNotifications(ctx.from.id);
      ctx.menu.update(); // update the menu!
    },
  );


export default btn_Toggle
