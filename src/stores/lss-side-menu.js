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
        pageName: "side-menu-createCamp",
        title: "createCamp",
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
        pageName: "side-menu-inbox",
        title: "Auto Reply",
      },
      {
        icon: "PackageIcon",
        pageName: "Campaignselect", 
        title: "Manage Order",
      },
      {
        icon: "ShoppingCartIcon",
        pageName: "ShoppingCart",
        title: "Shopping Cart",
      },
    ],
  }),
});
