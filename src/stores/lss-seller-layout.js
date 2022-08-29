import { defineStore } from "pinia";
import { ref } from "vue"

export const useLSSSellerLayoutStore = defineStore("sellerLayout", {
  state: () => ({
    showMobileMenu: ref(false),
    isAuthenticated: ref(false),
    loginWith: ref(null),
    profileTab: ref(1),
    changePlanTab: ref(1),
    userInfo: ref({}),
    floatingVideo: ref(),
    campaignAlert: ref(),
    notification: ref(),
    alert: ref(),
    apiErrorAlert: ref(),

    showCommentCaptureWindow:ref(false),
    commentCapturingCampaign:ref(null),
    menu: [
      // {
      //   icon: "HomeIcon",
      //   pageName: "side-menu-inbox",
      //   title: "Home",
      // },
      {
        icon: "PackageIcon",
        pageName: "stock",
        title: "stock",
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
        title: "campaign_list",
      },
      // {
      //   icon: "VideoIcon",
      //   pageName: "campaign-live",
      //   title: "Campaign Live",
      // },
      {
        icon: "MessageSquareIcon",
        pageName: "side-menu-auto-reply",
        title: "auto_reply",
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
        title: "settings",
        subMenu: [
          {
            pageName: "campaign-global-setting",
            title: "campaign_default_setting",
          },
          {
            pageName: "discount-code",
            title: "discount_code",
          },
          // {
          //   pageName: "localization",
          //   title: "localization",
          // },
          {
            pageName: "platform",
            title: "connect_platform",
          },
        ],
      },
    ],
  }),
});
