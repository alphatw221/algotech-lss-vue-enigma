import { defineStore } from "pinia";
import { ref } from "vue"
export const useLSSBuyerLayoutStore = defineStore("buyerLayout", {
  state: () => ({
    menu: [
      {
        icon: "ShoppingBagIcon",
        pageName: "buyer-order-history-page",
        title: "Order History",
      },
      
    ],
    showMobileMenu:ref(false),
    isAuthenticated:ref(false),
    loginWith:ref('facebook'),
    userInfo:ref({
      id: 382,
      facebook_info: {
          id: "1508909916131805",
          name: "Yi-Hsueh Lin",
          token: "EAANwBngXqOABANh6o1xgyY60elWjhk5YOTSlZBDwIZBXoPKkaLQUBl7c9vDGOhPf2A5DvswqWiVCT1rcSgCr2T6ZAZCTeosZC4LoqA7hWsRULegh3ZBsw2xCpatx91WTdCwvFNOO2dVdZB6SrXD2u7ATb9s23FBsYVbZAxjGUMuTpRRmD6ZAYLurdbAqroQZAW0KVmxxWeMZA6bQQZDZD",
          picture: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1508909916131805&height=50&width=50&ext=1656567918&hash=AeSdpv9Wbt2g0zVH_vA"
      },
      instagram_info: {},
      youtube_info: {},
      google_info: {},
      meta: {},
      payment_meta: {},
      user_subscription: null,
      name: "Yi-Hsueh Lin",
      description: null,
      remark: null,
      email: "alphatw22193@gmail.com",
      phone: null,
      image: null,
      ip: null,
      region: null,
      timezone: "Asia/Singapore",
      type: "customer",
      status: "new",
      created_at: "2022-05-20T06:19:53.867000Z",
      updated_at: "2022-05-31T05:45:19.500000Z",
      user_plan: null,
      auth_user: 341
  })
     
  }),
});
