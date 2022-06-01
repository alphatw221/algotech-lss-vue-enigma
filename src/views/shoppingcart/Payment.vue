<template>
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px last:mr-0 flex-auto text-center ml-14">
          <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
            <button
                @click="this.$router.back()"
              class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
              <ShoppingCartIcon />
            </button>
            <div
              class="w-0 invisible lg:visible 2xl:visible lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400">
              Shopping Cart
            </div>
          </div>
        </li>
        <li class="-mb-px last:mr-0 flex-auto text-center">
          <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
            <button 
                @click="this.$router.back()"
              class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
              <TruckIcon />
            </button>
            <div
              class="w-0 invisible lg:visible 2xl:visible lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
             >
              Delivery
            </div>
          </div>
        </li>
        <li class="-mb-px last:mr-0 flex-auto text-center">
          <div @click="toggleTabs(3)" class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
            <button
              class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 text-white bg-primary">
              <CreditCardIcon />
            </button>
            <div
              class="w-0 invisible lg:visible 2xl:visible lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400 font-bold">
              Payment
            </div>
          </div>
        </li>
      </ul>
    <div class="box grid grid-cols-12 gap-4">
        <div class="col-start-1 col-span-12 lg:col-span-7 2xl:col-span-7">
            <ShippingSummary />
        </div>
        <div class="col-span-12 lg:col-span-5 2xl:col-span-5">
            <OrderSummary />
        </div>
        <div class="col-start-1 col-span-12 lg:col-span-7 2xl:col-span-7">
            <PaymentMethods />
        </div>
    </div>
</template>
              
<script>
import PaymentMethods from "@/components/box/PaymentMethods.vue";
import OrderSummary from "@/components/box/OrderSummary.vue";
import ShippingSummary from "@/components/box/ShippingSummary.vue";

export default {
  components: {
    PaymentMethods,
    OrderSummary,
    ShippingSummary,
  },
};
</script>