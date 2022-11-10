import { defineStore } from "pinia";

export const useSideMenuStore = defineStore("sideMenu", {
  state: () => ({
    menu: [
      // {
      //   icon: "HomeIcon",
      //   pageName: "side-menu-inbox",
      //   title: "Home",
      // },
      {
        icon: "BoxIcon",
        pageName: "Stock",
        title: "Stock",
      },
      // {
      //   icon: "BoxIcon",
      //   pageName: "Stock1",
      //   title: "Stock1",
      // },
      {
        icon: "PackageIcon",
        pageName: "side-menu-createCam-productselect",
        title: "Create Campaign",
      },
      {
        icon: "ListIcon",
        pageName: "side-menu-campaign-list",
        title: "Campaign List",
      },
      {
        icon: "VideoIcon",
        pageName: "campaign-live",
        title: "Campaign Live",
      },
      {
        icon: "MessageSquareIcon",
        pageName: "auto-reply",
        title: "Auto Reply",
      },
      {
        icon: "PackageIcon",
        pageName: "side-menu-campaign-select", 
        title: "Manage Order",
      },
      // {
      //   icon: "ShoppingCartIcon",
      //   pageName: "side-menu-shopping-cart",
      //   title: "Shopping Cart",
      // },
      {
        icon: "SettingsIcon",
        pageName: "campaign-global-setting",
        title: "Settings",
        subMenu: [
          {
            pageName: "campaign-global-setting",
            title: "Campaign Default Setting",
          },
          {
            pageName: "localization",
            title: "Localization",
          },
          {
            pageName: "platform",
            title: "Connect Platform",
          },
        ],
      },
    ],
  }),
});
