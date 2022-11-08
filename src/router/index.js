import { createRouter, createWebHistory } from "vue-router";
// import SideMenu from "../layouts/side-menu/Main.vue";
// import SimpleMenu from "../layouts/simple-menu/Main.vue";
// import TopMenu from "../layouts/top-menu/Main.vue";
import LssSellerLayout from "../layouts/lss-seller-layout/Main.vue";
import LSSBuyerLayout from "../layouts/lss-buyer-layout/Main.vue";
import LSSPublicLayout from "../layouts/lss-public-layout/Main.vue";
import LSSDealerLayout from "../layouts/lss-dealer-layout/Main.vue";
import LSSAdminLayout from "../layouts/lss-admin-layout/Main.vue";
// import DashboardOverview1 from "../views/dashboard-overview-1/Main.vue";
// import DashboardOverview2 from "../views/dashboard-overview-2/Main.vue";
// import DashboardOverview3 from "../views/dashboard-overview-3/Main.vue";
// import DashboardOverview4 from "../views/dashboard-overview-4/Main.vue";
// import Inbox from "../views/inbox/Main.vue";
// import FileManager from "../views/file-manager/Main.vue";
// import PointOfSale from "../views/point-of-sale/Main.vue";
// import Chat from "../views/chat/Main.vue";
// import Post from "../views/post/Main.vue";
// import Calendar from "../views/calendar/Main.vue";
// import CrudDataList from "../views/crud-data-list/Main.vue";
// import CrudForm from "../views/crud-form/Main.vue";
// import UsersLayout1 from "../views/users-layout-1/Main.vue";
// import UsersLayout2 from "../views/users-layout-2/Main.vue";
// import UsersLayout3 from "../views/users-layout-3/Main.vue";
// import ProfileOverview1 from "../views/profile-overview-1/Main.vue";
// import ProfileOverview2 from "../views/profile-overview-2/Main.vue";
// import ProfileOverview3 from "../views/profile-overview-3/Main.vue";
// import WizardLayout1 from "../views/wizard-layout-1/Main.vue";
// import WizardLayout2 from "../views/wizard-layout-2/Main.vue";
// import WizardLayout3 from "../views/wizard-layout-3/Main.vue";
// import BlogLayout1 from "../views/blog-layout-1/Main.vue";
// import BlogLayout2 from "../views/blog-layout-2/Main.vue";
// import BlogLayout3 from "../views/blog-layout-3/Main.vue";
// import PricingLayout1 from "../views/pricing-layout-1/Main.vue";
// import PricingLayout2 from "../views/pricing-layout-2/Main.vue";
// import InvoiceLayout1 from "../views/invoice-layout-1/Main.vue";
// import InvoiceLayout2 from "../views/invoice-layout-2/Main.vue";
// import FaqLayout1 from "../views/faq-layout-1/Main.vue";
// import FaqLayout2 from "../views/faq-layout-2/Main.vue";
// import FaqLayout3 from "../views/faq-layout-3/Main.vue";
// import Login from "../views/login/Main.vue";
// import Register from "../views/register/Main.vue";
import ErrorPage from "../views/error-page/Main.vue";
// import UpdateProfile from "../views/update-profile/Main.vue";
// import ChangePassword from "../views/change-password/Main.vue";
// import RegularTable from "../views/regular-table/Main.vue";
// import Tabulator from "../views/tabulator/Main.vue";
// import Modal from "../views/modal/Main.vue";
// import SlideOver from "../views/slide-over/Main.vue";
// import Notification from "../views/notification/Main.vue";
// import Tab from "../views/tab/Main.vue";
// import Accordion from "../views/accordion/Main.vue";
// import Button from "../views/button/Main.vue";
// import Alert from "../views/alert/Main.vue";
// import ProgressBar from "../views/progress-bar/Main.vue";
// import Tooltip from "../views/tooltip/Main.vue";
// import Dropdown from "../views/dropdown/Main.vue";
// import Typography from "../views/typography/Main.vue";
// import Icon from "../views/icon/Main.vue";
// import LoadingIcon from "../views/loading-icon/Main.vue";
// import RegularForm from "../views/regular-form/Main.vue";
// import Datepicker from "../views/datepicker/Main.vue";
// import TomSelect from "../views/tom-select/Main.vue";
// import FileUpload from "../views/file-upload/Main.vue";
import WysiwygEditor from "../views/wysiwg-editor/Main.vue";
// import Validation from "../views/validation/Main.vue";
// import Chart from "../views/chart/Main.vue";
// import Slider from "../views/slider/Main.vue";
// import ImageZoom from "../views/image-zoom/Main.vue";


import AutoReply from "../views/autoReply/Main.vue";  
import DiscountCode from "../views/discountCode/Main.vue"
// import ShoppingCart from "../views/shoppingcart/Main.vue";
// import OrderHistory from "../views/shoppingcart/OrderHistory.vue"; 
// import OrderDetails from "../views/shoppingcart/OrderDetails.vue";
// import ShoppingPayment from "../views/shoppingcart/Payment.vue";

import CampaignList from "../views/campaign-list/Main.vue";
import CampaignLive from "../views/campaign-live/Main.vue"; 
import ManageOrder from "../views/manage-order/Main.vue";  
import SellerOrderDetail from "../views/seller-order-detail/Main.vue"
import SellerCartDetail from "../views/seller-cart-detail/Main.vue"
// import CampaignSelect from "../views/manage-order/Campaignselect.vue";

import Localization from "../views/settings/Localization.vue";  
import ConnectPlatform from "../views/settings/ConnectPlatform.vue";  

import Profile from "../views/profile/Main.vue";
import ChangePlan from "../views/general/change-plan/Main.vue";

// import MktPlugin from "../views/mkt-plugin/Main.vue";
// import LuckyDraw from "../views/mkt-plugin/lucky-draw/Main.vue";
// import LuckyDrawSetting from "../views/mkt-plugin/lucky-draw/DrawSetting.vue";
// import QuizGame from "../views/mkt-plugin/quiz-game/QuizGame.vue";

// import Test2 from "../views/test/test2.vue"; 

import isOrderCompleted from "@/libs/routerMiddleware/isOrderCompleted"

import isBuyerLoginMiddleware from "@/libs/routerMiddleware/isBuyerLoginMiddleware" 
import youtubeOrderMiddleware from "@/libs/routerMiddleware/youtubeOrderMiddleware"

import isDealerMiddleware from "@/libs/routerMiddleware/isDealerMiddleware"

import buyerLoginMiddleware from "@/libs/routerMiddleware/buyerLoginMiddleware";
import buyerRecaptchaMiddleware from "@/libs/routerMiddleware/buyerRecaptchaMiddleware";
import checkSellerLogin from "@/libs/routerMiddleware/checkSellerLogin";
import checkDealerLogin from "@/libs/routerMiddleware/checkDealerLogin";
// import checkAdminLogin from "@/libs/routerMiddleware/checkAdminLogin";

import buyerAuthMiddleware from "@/libs/routerMiddleware/buyerAuthMiddleware"
import sellerAuthMiddleware from "@/libs/routerMiddleware/sellerAuthMiddleware"
import adminAuthMiddleware from "@/libs/routerMiddleware/adminAuthMiddleware"

import sellerGenerateCampaignProductDictMiddleware from "@/libs/routerMiddleware/sellerGenerateCampaignProductDictMiddleware"
import sellerRetrieveCampaignDataMiddleware from "@/libs/routerMiddleware/sellerRetrieveCampaignDataMiddleware"

const routes = [
  {
    path: "/seller/lucky-draw/draw/:lucky_draw_id?",
    name: "lucky-draw-flow",
    component: () => import('@/views/mkt-plugin/lucky-draw/DrawFlow.vue'),
  },
  {
    path: "/wysiwyg-editor",
    name: "simple-menu-wysiwyg-editor",
    component: WysiwygEditor,
  },
  {
    path: "/seller",
    component: LssSellerLayout,
    beforeEnter: sellerAuthMiddleware,
    children: [
      {
        path: "profile",
        name: "seller-profile",
        component: Profile,
      },
      {
        path: "change-plan",
        name: "change-plan",
        component: ChangePlan,
      },
      {
        path: "campaign-list",
        name: "campaign-list",
        component: CampaignList,
      },
      {
        path: "campaign-list/campaign-live/:campaign_id?",
        name: "campaign-live",
        beforeEnter:(to, from)=>{
          sellerGenerateCampaignProductDictMiddleware(to, from)
          sellerRetrieveCampaignDataMiddleware(to, from);
        },
        component: CampaignLive,
      },
      {
        path: "campaign-list/create-campaign",
        name: "create-campaign",
        component: () => import('@/views/create-campaign/Main.vue'),
      },
      {
        path: "campaign-list/campaign-live/:campaign_id?/lucky-draw-list",
        name: "lucky-draw-list",
        beforeEnter:(to, from)=>{
          sellerGenerateCampaignProductDictMiddleware(to, from);
          sellerRetrieveCampaignDataMiddleware(to, from);
        },
        component: () => import('@/views/mkt-plugin/lucky-draw/LuckyDrawList.vue'),
      },
      {
        path: "campaign-list/campaign-live/:campaign_id?/lucky-draw-list/lucky-draw/:lucky_draw_id?",
        name: "edit-lucky-draw",
        beforeEnter:(to, from)=>{
          sellerGenerateCampaignProductDictMiddleware(to, from);
          sellerRetrieveCampaignDataMiddleware(to, from);
        },
        component:  () => import('@/views/mkt-plugin/lucky-draw/CreateEditLuckyDraw.vue'),
      },
      {
        path: "campaign-list/campaign-live/:campaign_id?/lucky-draw-list/create-lucky-draw",
        name: "create-lucky-draw",
        beforeEnter:(to, from)=>{
          sellerGenerateCampaignProductDictMiddleware(to, from);
          sellerRetrieveCampaignDataMiddleware(to, from);
        },
        component: () => import('@/views/mkt-plugin/lucky-draw/CreateEditLuckyDraw.vue'),
      },
      {
        path: "campaign-list/campaign-live/:campaign_id?/quiz-game",
        name: "quiz-game",
        beforeEnter:(to, from)=>{
          sellerRetrieveCampaignDataMiddleware(to, from);
        },
        component: () => import('@/views/mkt-plugin/quiz-game/Main.vue')
      },
      {
        path: "campaign-list/campaign-live/:campaign_id?/edit-campaign",
        name: "edit-campaign",
        beforeEnter:(to, from)=>{
          sellerRetrieveCampaignDataMiddleware(to, from);
        },
        component: () => import('@/views/edit-campaign/Main.vue'),
      },  
      {
        path: "campaign-list/campaign-live/:campaign_id?/assign-product",
        name: "assign-product",
        beforeEnter:(to, from)=>{
          sellerRetrieveCampaignDataMiddleware(to, from);
        },
        component: () => import('@/views/assign-campaign-product/Main.vue'),
      },   
      {
        path: "campaign-list/campaign-live/:campaign_id?/edit-campaign-product",
        name: "edit-campaign-product",
        beforeEnter:(to, from)=>{
          sellerRetrieveCampaignDataMiddleware(to, from);
        },
        component: () => import('@/views/edit-campaign-product/Main.vue'),
      },   
      {
        path: "campaign-list/campaign-live/:campaign_id?/manage-order",
        name: "manage-order",
        beforeEnter:(to, from)=>{
          sellerRetrieveCampaignDataMiddleware(to, from);
        },
        component: ManageOrder,
      },
      {
        path: "campaign-list/campaign-live/:campaign_id?/manage-order/order-detail/:order_id?",    
        name: "seller-order-detail",
        beforeEnter:(to, from)=>{
          sellerRetrieveCampaignDataMiddleware(to, from);
        },
        component: SellerOrderDetail,
      },
      {
        path: "campaign-list/campaign-live/:campaign_id?/manage-order/cart-detail/:cart_id?",    
        name: "seller-cart-detail",
        beforeEnter:(to, from)=>{
          sellerGenerateCampaignProductDictMiddleware(to, from);
          sellerRetrieveCampaignDataMiddleware(to, from);
        },
        component: SellerCartDetail,
      },
      
      
      
      // {
      //   path: "order-detail/:order_id?",
      //   name: "sellerOrder",
      //   component: () => import('@/views/seller-order-detail/Main.vue'),
      // },
      // {
      //   path: "campaign-select",
      //   name: "side-menu-campaign-select",
      //   component: CampaignSelect,
      // },
      // {  
      //   path: "shopping-cart",
      //   name: "side-menu-shopping-cart",
      //   component: ShoppingCart,
      // }, 
      // {  
      //   path: "shopping-payment",
      //   name: "side-menu-shopping-payment",
      //   component: ShoppingPayment,
      // },
      // {  
      //   path: "orderHistory-details",
      //   name: "OrderHistoryDetails",
      //   component: OrderDetails,
      // },
      // {
      //   path: "mkt-plugin",
      //   name: "mkt-plugin",
      //   component: MktPlugin,
      // },
      // {
      //   path: "mkt-plugin/lucky-draw",
      //   name: "lucky-draw-setting",
      //   component: LuckyDrawSetting,
      // },
      
      {  
        path: "campaign-global",
        name: "campaign-global-setting",
        component: () => import('@/views/settings/Main.vue'),
      },  
      {  
        path: "localization",
        name: "localization",
        component: Localization,
      },  
      {  
        path: "platform",
        name: "platform",
        component: ConnectPlatform,
      },
      {  
        path: "autoreply",
        name: "side-menu-auto-reply",
        component: AutoReply,
      },  
      {  
        path: "discount-code",
        name: "discount-code",
        component: DiscountCode,
      },  
      {
        path: "stock",
        name: "stock",
        component: () => import('@/views/stock/Main.vue'),
      },
      {
        path: "stock/add-product",
        name: "add-product",
        component: () => import('@/views/add-product/Main.vue'),
      },
      {
        path: "stock/edit-product/:product_id?",
        name: "edit-product",
        component: () => import('@/views/add-product/Main.vue'),
      },                                                             //temp
      {
        path: "stock/category-management",
        name: "category-management",
        component: () => import('@/views/category-management/Main.vue')
      }
    ],
  },
  

  {
    path: "/seller/web",
    component: LSSPublicLayout,
    children: [
      {
        path: "login",
        name: "login-page",
        beforeEnter: checkSellerLogin,
        component: () => import('@/views/general/LoginPage.vue')
      },
      {
        path: "password/forgot",
        name: "password-forgot",
        component: () => import('@/views/general/ForgotPasswordPage.vue')
      },
      {
        path: "password/reset",
        name: "password-reset",
        component: () => import('@/views/password-reset/Main.vue')
      },
      {
        path: "register",
        name: "registration-page",
        component: () => import('@/views/seller-registration/Main.vue')
      },
      {
        path: "/dealer/login",
        name: "dealer-login",
        beforeEnter: checkDealerLogin,
        component: () => import('@/views/general/DealerLoginPage.vue')
      },
      {
        path: "admin/login",
        name: "admin-login",
        component: () => import('@/views/general/AdminLoginPage.vue')
      },
      {
        path: "easy_store/authorization",
        name: "easystore-authorize",
        component: () => import('@/plugin/easy-store/views/AuthorizationPage.vue')
      },
    ],
  },
  
  {
    path: "/error-page",
    name: "error-page",
    component: ErrorPage,
  },
  {
    path: "/:pathMatch(.*)*",
    component: ErrorPage,
  },
  // -------------------------------Buyer Route-----------------------------
  {
    path: "/buyer",
    component: LSSBuyerLayout,
    beforeEnter: buyerAuthMiddleware,
    children: [
      {
        path: "",
        name: "buyer-index",
        component: () => import('@/views/buyer-index/Main.vue'),
      },
      {
        path: "recaptcha/:type?/:object_id?",
        name: "buyer-recaptcha-page",
        component: () => import('@/views/buyer-recaptcha/Main.vue'),
      },
      {
        path: "orders",
        name: "buyer-order-history-page",
        beforeEnter:isBuyerLoginMiddleware,
        component: () => import('@/views/buyer-order-history/Main.vue'),
      },
      {  
        path: "order/:order_oid?",
        name: "buyer-order-detail-page",
        beforeEnter: youtubeOrderMiddleware,
        component: () => import('@/views/buyer-order-detail/Main.vue'),
      },
      {  
        path: "order/:order_oid?/payment",
        name: "buyer-order-payment-page",
        beforeEnter: (to, from)=>{
          return youtubeOrderMiddleware(to, from) && isOrderCompleted(to, from)
        },
        component: () => import('@/views/buyer-order-payment/Main.vue')
      },
      {  
        path: "order/:order_oid?/confirmation",
        name: "buyer-order-confirmation-page",
        beforeEnter: youtubeOrderMiddleware,
        component: () => import('@/views/buyer-order-confirmation/Main.vue')
      },
      {  
        path: "cart/:cart_oid?",
        name: "buyer-shopping-cart-detail-page",
        beforeEnter: youtubeOrderMiddleware,
        component: () => import('@/views/shoppingcart/Main.vue')
      },
    ]
  },
  
  {
    path: "/buyer/login/:type?/:object_id?",
    name: "buyer-login-page",
    beforeEnter: buyerLoginMiddleware,
    component: () => import('@/views/general/BuyerLoginPage.vue'),
  },

 // -------------------------------Dealer Route-----------------------------

 {
  path: "/dealer",
  component: LSSDealerLayout,
  beforeEnter: isDealerMiddleware,
  children: [
    {
      path: "dashboard",
      name: "dashboard",
      component: () => import('@/views/dealer-dashboard/Main.vue')
    },
    {
      path: "accounts",
      name: "accounts",
      component: () => import('@/views/dealer-accounts/Main.vue')
    },
    {
      path: "transactions",
      name: "transactions",
      component: () => import('@/views/dealer-transactions/Main.vue')
    },
    {
      path: "plans",
      name: "plans",
      component: () => import('@/views/dealer-plans/Main.vue')
    },
    {
      path: "licenses",
      name: "licenses",
      component: () => import('@/views/dealer-licenses/Main.vue')
    },
    {
      path: "sellers",
      name: "sellers",
      component: () => import('@/views/dealer-sellers/Main.vue')
    },
    {
      path: "buyers",
      name: "buyers",
      component: () => import('@/views/dealer-buyers/Main.vue')
    },
    {
      path: "settings",
      name: "dealer-settings",
      component: () => import('@/views/dealer-settings/Main.vue')
    }]
  },

 // -------------------------------Admin Route-----------------------------
  {
    path: "/admin",
    component: LSSAdminLayout,
    beforeEnter: adminAuthMiddleware,
    children: [
      {
        path: "account/import",
        name: "account-import",
        component: () => import('@/views/account-import/Main.vue')
      }





      ]
  },




  // --------------------------------------------------------------------------------Enigma Template--------------------------------------------------------------------------------
  // {
  //   path: "/enigma-template/login",
  //   name: "login",
  //   component: Login,
  // },
  // {
  //   path: "/enigma-template/register",
  //   name: "register",
  //   component: Register,
  // },
  // {
  //   path: "/enigma-template/simple-menu",
  //   component: SimpleMenu,
  //   children: [
  //     {
  //       path: "dashboard-overview-1",
  //       name: "simple-menu-dashboard-overview-1",
  //       component: DashboardOverview1,
  //     },
  //     {
  //       path: "dashboard-overview-2",
  //       name: "simple-menu-dashboard-overview-2",
  //       component: DashboardOverview2,
  //     },
  //     {
  //       path: "dashboard-overview-3",
  //       name: "simple-menu-dashboard-overview-3",
  //       component: DashboardOverview3,
  //     },
  //     {
  //       path: "dashboard-overview-4",
  //       name: "simple-menu-dashboard-overview-4",
  //       component: DashboardOverview4,
  //     },
  //     {
  //       path: "inbox",
  //       name: "simple-menu-inbox",
  //       component: Inbox,
  //     },
  //     {
  //       path: "file-manager",
  //       name: "simple-menu-file-manager",
  //       component: FileManager,
  //     },
  //     {
  //       path: "point-of-sale",
  //       name: "simple-menu-point-of-sale",
  //       component: PointOfSale,
  //     },
  //     {
  //       path: "chat",
  //       name: "simple-menu-chat",
  //       component: Chat,
  //     },
  //     {
  //       path: "post",
  //       name: "simple-menu-post",
  //       component: Post,
  //     },
  //     {
  //       path: "calendar",
  //       name: "simple-menu-calendar",
  //       component: Calendar,
  //     },
  //     {
  //       path: "crud-data-list",
  //       name: "simple-menu-crud-data-list",
  //       component: CrudDataList,
  //     },
  //     {
  //       path: "crud-form",
  //       name: "simple-menu-crud-form",
  //       component: CrudForm,
  //     },
  //     {
  //       path: "users-layout-1",
  //       name: "simple-menu-users-layout-1",
  //       component: UsersLayout1,
  //     },
  //     {
  //       path: "users-layout-2",
  //       name: "simple-menu-users-layout-2",
  //       component: UsersLayout2,
  //     },
  //     {
  //       path: "users-layout-3",
  //       name: "simple-menu-users-layout-3",
  //       component: UsersLayout3,
  //     },
  //     {
  //       path: "profile-overview-1",
  //       name: "simple-menu-profile-overview-1",
  //       component: ProfileOverview1,
  //     },
  //     {
  //       path: "profile-overview-2",
  //       name: "simple-menu-profile-overview-2",
  //       component: ProfileOverview2,
  //     },
  //     {
  //       path: "profile-overview-3",
  //       name: "simple-menu-profile-overview-3",
  //       component: ProfileOverview3,
  //     },
  //     {
  //       path: "wizard-layout-1",
  //       name: "simple-menu-wizard-layout-1",
  //       component: WizardLayout1,
  //     },
  //     {
  //       path: "wizard-layout-2",
  //       name: "simple-menu-wizard-layout-2",
  //       component: WizardLayout2,
  //     },
  //     {
  //       path: "wizard-layout-3",
  //       name: "simple-menu-wizard-layout-3",
  //       component: WizardLayout3,
  //     },
  //     {
  //       path: "blog-layout-1",
  //       name: "simple-menu-blog-layout-1",
  //       component: BlogLayout1,
  //     },
  //     {
  //       path: "blog-layout-2",
  //       name: "simple-menu-blog-layout-2",
  //       component: BlogLayout2,
  //     },
  //     {
  //       path: "blog-layout-3",
  //       name: "simple-menu-blog-layout-3",
  //       component: BlogLayout3,
  //     },
  //     {
  //       path: "pricing-layout-1",
  //       name: "simple-menu-pricing-layout-1",
  //       component: PricingLayout1,
  //     },
  //     {
  //       path: "pricing-layout-2",
  //       name: "simple-menu-pricing-layout-2",
  //       component: PricingLayout2,
  //     },
  //     {
  //       path: "invoice-layout-1",
  //       name: "simple-menu-invoice-layout-1",
  //       component: InvoiceLayout1,
  //     },
  //     {
  //       path: "invoice-layout-2",
  //       name: "simple-menu-invoice-layout-2",
  //       component: InvoiceLayout2,
  //     },
  //     {
  //       path: "faq-layout-1",
  //       name: "simple-menu-faq-layout-1",
  //       component: FaqLayout1,
  //     },
  //     {
  //       path: "faq-layout-2",
  //       name: "simple-menu-faq-layout-2",
  //       component: FaqLayout2,
  //     },
  //     {
  //       path: "faq-layout-3",
  //       name: "simple-menu-faq-layout-3",
  //       component: FaqLayout3,
  //     },
  //     {
  //       path: "update-profile",
  //       name: "simple-menu-update-profile",
  //       component: UpdateProfile,
  //     },
  //     {
  //       path: "change-password",
  //       name: "simple-menu-change-password",
  //       component: ChangePassword,
  //     },
  //     {
  //       path: "regular-table",
  //       name: "simple-menu-regular-table",
  //       component: RegularTable,
  //     },
  //     {
  //       path: "tabulator",
  //       name: "simple-menu-tabulator",
  //       component: Tabulator,
  //     },
  //     {
  //       path: "modal",
  //       name: "simple-menu-modal",
  //       component: Modal,
  //     },
  //     {
  //       path: "slide-over",
  //       name: "simple-menu-slide-over",
  //       component: SlideOver,
  //     },
  //     {
  //       path: "notification",
  //       name: "simple-menu-notification",
  //       component: Notification,
  //     },
  //     {
  //       path: "tab",
  //       name: "simple-menu-tab",
  //       component: Tab,
  //     },
  //     {
  //       path: "accordion",
  //       name: "simple-menu-accordion",
  //       component: Accordion,
  //     },
  //     {
  //       path: "button",
  //       name: "simple-menu-button",
  //       component: Button,
  //     },
  //     {
  //       path: "alert",
  //       name: "simple-menu-alert",
  //       component: Alert,
  //     },
  //     {
  //       path: "progress-bar",
  //       name: "simple-menu-progress-bar",
  //       component: ProgressBar,
  //     },
  //     {
  //       path: "tooltip",
  //       name: "simple-menu-tooltip",
  //       component: Tooltip,
  //     },
  //     {
  //       path: "dropdown",
  //       name: "simple-menu-dropdown",
  //       component: Dropdown,
  //     },
  //     {
  //       path: "typography",
  //       name: "simple-menu-typography",
  //       component: Typography,
  //     },
  //     {
  //       path: "icon",
  //       name: "simple-menu-icon",
  //       component: Icon,
  //     },
  //     {
  //       path: "loading-icon",
  //       name: "simple-menu-loading-icon",
  //       component: LoadingIcon,
  //     },
  //     {
  //       path: "regular-form",
  //       name: "simple-menu-regular-form",
  //       component: RegularForm,
  //     },
  //     {
  //       path: "datepicker",
  //       name: "simple-menu-datepicker",
  //       component: Datepicker,
  //     },
  //     {
  //       path: "tom-select",
  //       name: "simple-menu-tom-select",
  //       component: TomSelect,
  //     },
  //     {
  //       path: "file-upload",
  //       name: "simple-menu-file-upload",
  //       component: FileUpload,
  //     },
      // {
      //   path: "wysiwyg-editor",
      //   name: "simple-menu-wysiwyg-editor",
      //   component: WysiwygEditor,
      // },
  //     {
  //       path: "validation",
  //       name: "simple-menu-validation",
  //       component: Validation,
  //     },
  //     {
  //       path: "chart",
  //       name: "simple-menu-chart",
  //       component: Chart,
  //     },
  //     {
  //       path: "slider",
  //       name: "simple-menu-slider",
  //       component: Slider,
  //     },
  //     {
  //       path: "image-zoom",
  //       name: "simple-menu-image-zoom",
  //       component: ImageZoom,
  //     },
  //   ],
  // },
  // {
  //   path: "/enigma-template/top-menu",
  //   component: TopMenu,
  //   children: [
  //     {
  //       path: "dashboard-overview-1",
  //       name: "top-menu-dashboard-overview-1",
  //       component: DashboardOverview1,
  //     },
  //     {
  //       path: "dashboard-overview-2",
  //       name: "top-menu-dashboard-overview-2",
  //       component: DashboardOverview2,
  //     },
  //     {
  //       path: "dashboard-overview-3",
  //       name: "top-menu-dashboard-overview-3",
  //       component: DashboardOverview3,
  //     },
  //     {
  //       path: "dashboard-overview-4",
  //       name: "top-menu-dashboard-overview-4",
  //       component: DashboardOverview4,
  //     },
  //     {
  //       path: "inbox",
  //       name: "top-menu-inbox",
  //       component: Inbox,
  //     },
  //     {
  //       path: "file-manager",
  //       name: "top-menu-file-manager",
  //       component: FileManager,
  //     },
  //     {
  //       path: "point-of-sale",
  //       name: "top-menu-point-of-sale",
  //       component: PointOfSale,
  //     },
  //     {
  //       path: "chat",
  //       name: "top-menu-chat",
  //       component: Chat,
  //     },
  //     {
  //       path: "post",
  //       name: "top-menu-post",
  //       component: Post,
  //     },
  //     {
  //       path: "calendar",
  //       name: "top-menu-calendar",
  //       component: Calendar,
  //     },
  //     {
  //       path: "crud-data-list",
  //       name: "top-menu-crud-data-list",
  //       component: CrudDataList,
  //     },
  //     {
  //       path: "crud-form",
  //       name: "top-menu-crud-form",
  //       component: CrudForm,
  //     },
  //     {
  //       path: "users-layout-1",
  //       name: "top-menu-users-layout-1",
  //       component: UsersLayout1,
  //     },
  //     {
  //       path: "users-layout-2",
  //       name: "top-menu-users-layout-2",
  //       component: UsersLayout2,
  //     },
  //     {
  //       path: "users-layout-3",
  //       name: "top-menu-users-layout-3",
  //       component: UsersLayout3,
  //     },
  //     {
  //       path: "profile-overview-1",
  //       name: "top-menu-profile-overview-1",
  //       component: ProfileOverview1,
  //     },
  //     {
  //       path: "profile-overview-2",
  //       name: "top-menu-profile-overview-2",
  //       component: ProfileOverview2,
  //     },
  //     {
  //       path: "profile-overview-3",
  //       name: "top-menu-profile-overview-3",
  //       component: ProfileOverview3,
  //     },
  //     {
  //       path: "wizard-layout-1",
  //       name: "top-menu-wizard-layout-1",
  //       component: WizardLayout1,
  //     },
  //     {
  //       path: "wizard-layout-2",
  //       name: "top-menu-wizard-layout-2",
  //       component: WizardLayout2,
  //     },
  //     {
  //       path: "wizard-layout-3",
  //       name: "top-menu-wizard-layout-3",
  //       component: WizardLayout3,
  //     },
  //     {
  //       path: "blog-layout-1",
  //       name: "top-menu-blog-layout-1",
  //       component: BlogLayout1,
  //     },
  //     {
  //       path: "blog-layout-2",
  //       name: "top-menu-blog-layout-2",
  //       component: BlogLayout2,
  //     },
  //     {
  //       path: "blog-layout-3",
  //       name: "top-menu-blog-layout-3",
  //       component: BlogLayout3,
  //     },
  //     {
  //       path: "pricing-layout-1",
  //       name: "top-menu-pricing-layout-1",
  //       component: PricingLayout1,
  //     },
  //     {
  //       path: "pricing-layout-2",
  //       name: "top-menu-pricing-layout-2",
  //       component: PricingLayout2,
  //     },
  //     {
  //       path: "invoice-layout-1",
  //       name: "top-menu-invoice-layout-1",
  //       component: InvoiceLayout1,
  //     },
  //     {
  //       path: "invoice-layout-2",
  //       name: "top-menu-invoice-layout-2",
  //       component: InvoiceLayout2,
  //     },
  //     {
  //       path: "faq-layout-1",
  //       name: "top-menu-faq-layout-1",
  //       component: FaqLayout1,
  //     },
  //     {
  //       path: "faq-layout-2",
  //       name: "top-menu-faq-layout-2",
  //       component: FaqLayout2,
  //     },
  //     {
  //       path: "faq-layout-3",
  //       name: "top-menu-faq-layout-3",
  //       component: FaqLayout3,
  //     },
  //     {
  //       path: "update-profile",
  //       name: "top-menu-update-profile",
  //       component: UpdateProfile,
  //     },
  //     {
  //       path: "change-password",
  //       name: "top-menu-change-password",
  //       component: ChangePassword,
  //     },
  //     {
  //       path: "regular-table",
  //       name: "top-menu-regular-table",
  //       component: RegularTable,
  //     },
  //     {
  //       path: "tabulator",
  //       name: "top-menu-tabulator",
  //       component: Tabulator,
  //     },
  //     {
  //       path: "modal",
  //       name: "top-menu-modal",
  //       component: Modal,
  //     },
  //     {
  //       path: "slide-over",
  //       name: "top-menu-slide-over",
  //       component: SlideOver,
  //     },
  //     {
  //       path: "notification",
  //       name: "top-menu-notification",
  //       component: Notification,
  //     },
  //     {
  //       path: "tab",
  //       name: "top-menu-tab",
  //       component: Tab,
  //     },
  //     {
  //       path: "accordion",
  //       name: "top-menu-accordion",
  //       component: Accordion,
  //     },
  //     {
  //       path: "button",
  //       name: "top-menu-button",
  //       component: Button,
  //     },
  //     {
  //       path: "alert",
  //       name: "top-menu-alert",
  //       component: Alert,
  //     },
  //     {
  //       path: "progress-bar",
  //       name: "top-menu-progress-bar",
  //       component: ProgressBar,
  //     },
  //     {
  //       path: "tooltip",
  //       name: "top-menu-tooltip",
  //       component: Tooltip,
  //     },
  //     {
  //       path: "dropdown",
  //       name: "top-menu-dropdown",
  //       component: Dropdown,
  //     },
  //     {
  //       path: "typography",
  //       name: "top-menu-typography",
  //       component: Typography,
  //     },
  //     {
  //       path: "icon",
  //       name: "top-menu-icon",
  //       component: Icon,
  //     },
  //     {
  //       path: "loading-icon",
  //       name: "top-menu-loading-icon",
  //       component: LoadingIcon,
  //     },
  //     {
  //       path: "regular-form",
  //       name: "top-menu-regular-form",
  //       component: RegularForm,
  //     },
  //     {
  //       path: "datepicker",
  //       name: "top-menu-datepicker",
  //       component: Datepicker,
  //     },
  //     {
  //       path: "tom-select",
  //       name: "top-menu-tom-select",
  //       component: TomSelect,
  //     },
  //     {
  //       path: "file-upload",
  //       name: "top-menu-file-upload",
  //       component: FileUpload,
  //     },
  //     {
  //       path: "wysiwyg-editor",
  //       name: "top-menu-wysiwyg-editor",
  //       component: WysiwygEditor,
  //     },
  //     {
  //       path: "validation",
  //       name: "top-menu-validation",
  //       component: Validation,
  //     },
  //     {
  //       path: "chart",
  //       name: "top-menu-chart",
  //       component: Chart,
  //     },
  //     {
  //       path: "slider",
  //       name: "top-menu-slider",
  //       component: Slider,
  //     },
  //     {
  //       path: "image-zoom",
  //       name: "top-menu-image-zoom",
  //       component: ImageZoom,
  //     },
  //   ],
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;
