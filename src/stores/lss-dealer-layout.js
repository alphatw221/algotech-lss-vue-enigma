import { defineStore } from "pinia";
import { ref } from "vue"

export const useLSSDealerLayoutStore = defineStore("dealerLayout", {
  state: () => ({
    showMobileMenu: ref(false),
    isAuthenticated: ref(false),
    profileTab: ref(1),
    loginWith: ref(null),
    userInfo: ref({}),
    notification: ref(),
    alert: ref(),
    apiErrorAlert: ref(),
    menu: [
      {
        icon: "GridIcon",
        pageName: "dashboard",
        title: "dashboard",
      },
      // {
      //   icon: "UsersIcon",
      //   pageName: "accounts",
      //   title: "accounts",
      // },
      {
        icon: "DollarSignIcon",
        pageName: "transactions",
        title: "transactions",
      },
      {
        icon: "CalendarIcon",
        pageName: "plans",
        title: "plans",
      },
      {
        icon: "FileTextIcon",
        pageName: "licenses",
        title: "licenses",
      },
      {
        icon: "ShoppingBagIcon",
        pageName: "sellers",
        title: "sellers",
      },
      {
        icon: "BoldIcon",
        pageName: "buyers",
        title: "buyers",
      },
      {
        icon: "SettingsIcon",
        pageName: "dealer-settings",
        title: "settings",
        subMenu: [
          {
            pageName: "dealer-settings",
            title: "settings",
          }
        ],
      },
    ],
  }),
});
