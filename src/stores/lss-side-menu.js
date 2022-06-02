import { defineStore } from "pinia";

export const useSideMenuStore = defineStore("sideMenu", {
  state: () => ({
    menu: [
      {
        icon: "HomeIcon",
        pageName: "side-menu-inbox",
        title: "Home",
      },
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
        pageName: "side-menu-create-campaign",
        title: "Create Campaign",
      },
      {
        icon: "ListIcon",
        pageName: "side-menu-campaign-list",
        title: "Campaign List",
      },
      {
        icon: "VideoIcon",
        pageName: "side-menu-campaign-live",
        title: "Campaign Live",
      },
      {
        icon: "MessageSquareIcon",
        pageName: "side-menu-auto-reply",
        title: "Auto Reply",
      },
      {
        icon: "PackageIcon",
        pageName: "side-menu-campaign-select", 
        title: "Manage Order",
      },
      {
        icon: "ShoppingCartIcon",
        pageName: "side-menu-shopping-cart",
        title: "Shopping Cart",
      },
      {
        icon: "SettingsIcon",
        pageName: "side-menu-campaign-global-setting",
        title: "Settings",
        subMenu: [
          {
            pageName: "side-menu-campaign-global-setting",
            title: "Campaign Global Setting",
          },
          {
            pageName: "side-menu-localization",
            title: "Localization",
          },
          {
            pageName: "side-menu-connect-platform",
            title: "Connect Platform",
          },
        ],
      },
    ],
  }),
});
