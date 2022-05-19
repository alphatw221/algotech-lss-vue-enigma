import { defineStore } from "pinia";

export const useSideMenuStore = defineStore("sideMenu", {
  state: () => ({
    menu: [
      {
        icon: "InboxIcon",
        pageName: "side-menu-inbox",
        title: "Home",
      },
      {
        icon: "InboxIcon",
        pageName: "Stock",
        title: "Stock",
      },
      {
        icon: "InboxIcon",
        pageName: "Stock1",
        title: "Stock1",
      },
      {
        icon: "InboxIcon",
        pageName: "side-menu-campaign-list",
        title: "Campaign List",
      },
      {
        icon: "InboxIcon",
        pageName: "side-menu-campaign-live",
        title: "Campaign Live",
      },
      {
        icon: "InboxIcon",
        pageName: "side-menu-inbox",
        title: "Auto Reply",
      },
      {
        icon: "InboxIcon",
        pageName: "side-menu-inbox",
        title: "Manage Order",
      },
    ],
  }),
});
