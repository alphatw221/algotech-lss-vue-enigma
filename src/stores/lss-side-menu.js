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
        pageName: "side-menu-inbox",
        title: "Stock",
      },
      {
        icon: "InboxIcon",
        pageName: "side-menu-inbox",
        title: "Campaign List",
      },
      {
        icon: "InboxIcon",
        pageName: "side-menu-inbox",
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
