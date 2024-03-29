import { defineStore } from "pinia";
import { ref } from "vue"

export const useLSSSellerLayoutStore = defineStore("sellerLayout", {
  state: () => ({
    showMobileMenu: ref(false),
    isAuthenticated: ref(false),
    loginWith: ref(null),
    plugins:ref(false),
    profileTab: ref(1),
    changePlanTab: ref(1), 
    userInfo: ref({}),
    bindedPlatform: ref([]),
    floatingVideo: ref(),
    campaignAlert: ref(),
    notification: ref(),
    alert: ref(),
    apiErrorAlert: ref(),
    buyer: ref({}),
    showCommentCaptureWindow:ref(false),
    commentCapturingCampaignData:ref({}),

    menu: [
      {
        icon: "stock",
        pageName: "stock",
        title: "stock",
      },
      {
        icon: "campaign",
        pageName: "campaign-list",
        title: "campaign_list", 
      },
      {
        icon: "manage-order",
        pageName: "manage-order",
        title: "manage_order",
      },
      {
        icon: "auto-reply",
        pageName: "auto-reply",
        title: "auto_reply",
      },
      {
        icon: "seller-buyers",
        pageName: "seller-buyers",
        title: "buyers",
      },
      {
        icon: "settings",
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
          {
            pageName: "platform",
            title: "connect_platform",
          },
        ],
      },
    ],
    kol_menu:[
      {
        icon: "stock",
        pageName: "stock",
        title: "stock",
      },
      {
        icon: "campaign",
        pageName: "campaign-list",
        title: "campaign_list", 
      },
      {
        icon: "manage-order",
        pageName: "manage-order",
        title: "manage_order",
      },
      {
        icon: "campaign-global-setting",
        pageName: "campaign-global-setting",
        title: "campaign_default_setting",
      },
      {
        icon: "discount-code",
        pageName: "discount-code",
        title: "discount_code",
      },
      {
        icon: "platform",
        pageName: "platform",
        title: "connect_platform",
      },
    ],
    supplier_menu: [
      {
        icon: "stock",
        pageName: "stock",
        title: "stock",
      },
      {
        icon: "manage-order",
        pageName: "manage-order",
        title: "manage_order",
      },
      {
        icon: "campaign-global-setting",
        pageName: "campaign-global-setting",
        title: "campaign_default_setting",
      },
    ],
  }),
});
