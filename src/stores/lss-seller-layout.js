import { defineStore } from "pinia";
import { ref } from "vue"

export const useLSSSellerLayoutStore = defineStore("sellerLayout", {
  state: () => ({
    showMobileMenu: ref(false),
    isAuthenticated: ref(false),
    loginWith: ref(null),
    editProfile: ref(false),
    profileTab: ref(0),
    userInfo: ref({}),
    floatingVideo: ref(),
    campaignAlert: ref(),
    notification: ref(),
    alert: ref(),
    menu: [
      // {
      //   icon: "HomeIcon",
      //   pageName: "side-menu-inbox",
      //   title: "Home",
      // },
      {
        icon: "PackageIcon",
        pageName: "stock",
        title: "Stock",
      },
      // {
      //   icon: "BoxIcon",
      //   pageName: "Stock1",
      //   title: "Stock1",
      // },
      // {
      //   icon: "CalendarIcon",
      //   pageName: "create-campaign",
      //   title: "Create Campaign",
      // },
      {
        icon: "ListIcon",
        pageName: "campaign-list",
        title: "Campaign List",
      },
      // {
      //   icon: "VideoIcon",
      //   pageName: "campaign-live",
      //   title: "Campaign Live",
      // },
      {
        icon: "MessageSquareIcon",
        pageName: "side-menu-auto-reply",
        title: "Auto Reply",
      },
      // {
      //   icon: "PackageIcon",
      //   pageName: "",
      //   title: "Manage Order",
      // },
      // {
      //   icon: "PlusSquareIcon",
      //   pageName: "mkt-plugin",
      //   title: "MKT Plugin",
      // },
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
