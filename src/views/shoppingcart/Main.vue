<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <!-- BEGIN Tab List-->
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px last:mr-0 flex-auto text-center ml-14">
          <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
            <button 
            @click="toggleTabs(1)"
            :class="{
              'text-neutral-600 bg-white': store.openTab !== 1,
              'text-white bg-primary': store.openTab === 1,
            }"
              class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
              <ShoppingCartIcon />
            </button>
            <div
              class="w-0 invisible lg:visible 2xl:visible lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
              :class="{
                'text-neutral-600': store.openTab !== 1,
                'font-bold': store.openTab === 1,
              }">
              Shopping Cart
            </div>
          </div>
        </li>
        <li class="-mb-px last:mr-0 flex-auto text-center">
          <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
            <button 
            @click="toggleTabs(2)"
            :class="{
              'text-neutral-600 bg-white': store.openTab !== 2,
              'text-white bg-primary': store.openTab === 2,
            }"
              class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
              <TruckIcon />
            </button>
            <div
              class="w-0 invisible lg:visible 2xl:visible lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
              :class="{
                'text-neutral-600': store.openTab !== 2,
                'font-bold': store.openTab === 2,
              }">
              Delivery
            </div>
          </div>
        </li>
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

<script setup>
// import MyCartTab from "@/components/shopping-cart/MyCartTab.vue";
// import DeliveryTab from "@/components/shopping-cart/DeliveryTab.vue";

import MyCartTab from "./MyCartTab.vue";
import DeliveryTab from "./DeliveryTab.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { buyer_list_campapign_product, buyer_cart_list } from "@/api_v2/campaign_product";

import { retrieve_pre_order, buyer_retrieve_pre_order } from "@/api_v2/pre_order";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const store = useShoppingCartStore()
const toggleTabs = tabNumber => store.openTab = tabNumber

onMounted(()=>{
  buyer_retrieve_pre_order(route.params.pre_order_id)
  .then(
      res => { 
        store.order = res.data;
        console.log(res.data)
        if (store.order.campaign) {
            store.order.campaign.meta_logistic.additional_delivery_charge_title.unshift('default')
            store.order.campaign.meta_logistic.additional_delivery_charge_price.unshift(store.order.campaign.meta_logistic.delivery_charge)
            store.order.campaign.meta_logistic.additional_delivery_charge_type.unshift('=')
        }
      }
  )

  buyer_list_campapign_product(route.params.pre_order_id)
	.then(
		res => {
			store.campaignProducts = res.data
			console.log(res.data)
		}
	)
  buyer_cart_list(route.params.pre_order_id)
	.then(
		res => {
			store.cartProducts = res.data
			console.log(res.data)
		}
	)
})


</script>