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
              <SimpleIcon icon="shopping_cart" :color="btnOne" />
            </button>
            <div
              class="w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
              :class="{
                'text-neutral-600': store.openTab !== 1,
                'font-bold': store.openTab === 1,
              }">
              {{$t('shopping_cart.shopping_cart')}}
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
              <SimpleIcon icon="truck" :color="btnTwo" />
            </button>
            <div
              class="w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
              :class="{
                'text-neutral-600': store.openTab !== 2,
                'font-bold': store.openTab === 2,
              }">
              {{$t('shopping_cart.delivery')}}
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
import { computed, onMounted, ref, watch, getCurrentInstance } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
import { buyer_list_campapign_product, buyer_cart_list, guest_list_campapign_product, guest_cart_list } from "@/api_v2/campaign_product";
import { search_discount_code } from "@/api_v2/discount_code"

import { buyer_retrieve_pre_order, guest_retrieve_pre_order } from "@/api_v2/pre_order";
import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies"
const route = useRoute();
const router = useRouter();
const store = useShoppingCartStore()
const buyerLayoutStore = useLSSBuyerLayoutStore();
const i18n = getCurrentInstance().appContext.config.globalProperties.$i18n
const btnOne = ref('white')
const btnTwo = ref('#334155')
const { cookies } = useCookies()
const toggleTabs = tabNumber => {
  store.openTab = tabNumber
  router.push({query:{tab:tabNumber}})
  }
const isAnonymousUser=cookies.get("login_with")=='anonymousUser'
onMounted(()=>{
  if(route.query.tab == 2) store.openTab = 2
  const retrieve_pre_order= isAnonymousUser?guest_retrieve_pre_order:buyer_retrieve_pre_order
  retrieve_pre_order(route.params.pre_order_oid).then(
      res => { 
        store.order = res.data;
        i18n.locale = res.data.campaign.lang
        Object.keys(store.order.products).length == 0 ? store.showAddItemModal = true : store.showAddItemModal = false
      }
  )

  const list_campapign_product = isAnonymousUser?guest_list_campapign_product:buyer_list_campapign_product
	list_campapign_product(route.params.pre_order_oid).then(
		res => {
			store.campaignProducts = res.data     
      });

  search_discount_code(route.params.pre_order_oid,'cart_referal').then(
    res=>{
      store.referalCodes = res.data
    }
    )}
)

  const cart_list = isAnonymousUser?guest_cart_list:buyer_cart_list
	cart_list(route.params.pre_order_oid).then(
		res => {
      res.data.forEach(element => {
        store.cartProducts[element.id] = element
		  })
      // console.log(store.cartProducts)
})

watch(computed(()=>store.openTab),()=>{
  router.push({query:{tab:store.openTab}})
  btnOne.value = store.openTab == 1? 'white' :'#334155'
  btnTwo.value = store.openTab == 2? 'white' :'#334155'
  if(isAnonymousUser && store.openTab==2 && !buyerLayoutStore.refuseToLogin){
    buyerLayoutStore.showLoginModal=true
  }
})



</script>