<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <!-- BEGIN Tab List-->
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px last:mr-0 flex-auto text-center ml-14">
          <div @click="toggleTabs(1)" class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
            <button :class="{
              'text-neutral-600 bg-white': this.store.openTab !== 1,
              'text-white bg-primary': this.store.openTab === 1,
            }"
              class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
              <ShoppingCartIcon />
            </button>
            <div
              class="w-0 invisible lg:visible 2xl:visible lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
              :class="{
                'text-neutral-600': this.store.openTab !== 1,
                'font-bold': this.store.openTab === 1,
              }">
              Shopping Cart
            </div>
          </div>
        </li>
        <li class="-mb-px last:mr-0 flex-auto text-center">
          <div @click="toggleTabs(2)" class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
            <button :class="{
              'text-neutral-600 bg-white': this.store.openTab !== 2,
              'text-white bg-primary': this.store.openTab === 2,
            }"
              class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
              <TruckIcon />
            </button>
            <div
              class="w-0 invisible lg:visible 2xl:visible lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
              :class="{
                'text-neutral-600': this.store.openTab !== 2,
                'font-bold': this.store.openTab === 2,
              }">
              Delivery
            </div>
          </div>
        </li>
        <!-- <li class="-mb-px last:mr-0 flex-auto text-center">
          <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
            <button 
              class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
              <CreditCardIcon />
            </button>
            <div
              class="w-0 invisible lg:visible 2xl:visible lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
              >
              Payment
            </div>
          </div>
        </li> -->
      </ul>
      <!-- END Tab List-->


      <div class="box relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
        <div class="px-4 py-5 flex-auto">

          <div class="tab-content tab-space">

            <!-- BEGIN My Cart Tab -->
              <MyCartTab />
            <!-- END My Cart Tab -->

            <!-- BEGIN Delivery Tab -->
              <DeliveryTab/>
            <!-- END Delivery Tab-->


          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// import OrderSummary from "@/components/box/OrderSummary.vue";
// import ShippingSummary from "@/components/box/ShippingSummary.vue";
// import ShoppingCartTable from "@/components/table/ShoppingCartTable.vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";

import MyCartTab from "@/components/tab/MyCartTab.vue";
import DeliveryTab from "@/components/tab/DeliveryTab.vue";




export default {
  components: {
    MyCartTab,
    DeliveryTab
  },
  data() {
    return {
      store:useShoppingCartStore()
    };
  },
  computed: {
    filterStyle() {
      if (this.show) {
        return {
          top: 0,
          background: primary,
          marginTop: "15px",
          marginBottom: "15px",
        };
      } else {
        return "";
      }
    },
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.store.openTab = tabNumber
    },
  },
};
</script>