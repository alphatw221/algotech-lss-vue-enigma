<template>
  <div class="flex flex-wrap">
    <div class="w-full calch">
      <!-- BEGIN Tab List-->
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px last:mr-0 flex-auto text-center ml-14">
          <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
            <button 
            @click="toggleTabs(1)"
            :class="{
              'text-neutral-600 bg-white': shoppingCartStore.openTab !== 1,
              'text-white bg-primary': shoppingCartStore.openTab === 1,
            }"
              class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
              <SimpleIcon icon="shopping_cart" :color="btnOne" />
            </button>
            <div
              class="w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
              :class="{
                'text-neutral-600': shoppingCartStore.openTab !== 1,
                'font-bold': shoppingCartStore.openTab === 1,
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
              'text-neutral-600 bg-white': shoppingCartStore.openTab !== 2,
              'text-white bg-primary': shoppingCartStore.openTab === 2,
            }"
              class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
              <SimpleIcon icon="truck" :color="btnTwo" />
            </button>
            <div
              class="w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
              :class="{
                'text-neutral-600': shoppingCartStore.openTab !== 2,
                'font-bold': shoppingCartStore.openTab === 2,
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
    <WishListModal :isAnonymousUser="isAnonymousUser"/>
    <ItemDescriptionModal />
    <AddItemModal/>
  </div>
</template>

<script setup>
// import MyCartTab from "@/components/shopping-cart/MyCartTab.vue";
// import DeliveryTab from "@/components/shopping-cart/DeliveryTab.vue";

import MyCartTab from "./MyCartTab.vue";
import DeliveryTab from "./DeliveryTab.vue";
import WishListModal from "./modals/WishListModal.vue";
import ItemDescriptionModal from "./modals/ItemDescriptionModal.vue";
import AddItemModal from "./modals/AddItemModal.vue";
import { computed, onMounted, ref, watch, getCurrentInstance } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
import { buyer_list_campapign_product } from "@/api_v2/campaign_product";
import { buyer_list_discount_code } from "@/api_v2/discount_code"

// import { buyer_retrieve_pre_order } from "@/api_v2/pre_order";
import { buyer_retrieve_cart, buyer_get_cart_relative_wallet } from "@/api_v2/cart"
import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies"
const route = useRoute();
const router = useRouter();
const shoppingCartStore = useShoppingCartStore()
const buyerLayoutStore = useLSSBuyerLayoutStore();
const i18n = getCurrentInstance().appContext.config.globalProperties.$i18n
const btnOne = ref('white')
const btnTwo = ref('#334155')
const { cookies } = useCookies()
const toggleTabs = tabNumber => {
  shoppingCartStore.openTab = tabNumber
  router.push({query:{tab:tabNumber}})
  }
const isAnonymousUser=cookies.get("login_with")=='anonymousUser'
onMounted(()=>{
  if(route.query.tab == 2) shoppingCartStore.openTab = 2
  buyer_retrieve_cart(route.params.cart_oid, buyerLayoutStore.alert).then(
      res => { 
        shoppingCartStore.cart = res.data;
        shoppingCartStore.user_subscription = JSON.parse(JSON.stringify(res.data?.user_subscription))
        shoppingCartStore.product_categories = JSON.parse(JSON.stringify(res.data?.user_subscription?.product_categories||[]))
        shoppingCartStore.productCategoryDict = {}
        shoppingCartStore.product_categories.forEach(productCategory => {
          shoppingCartStore.productCategoryDict[productCategory.id.toString()]=productCategory
        }); 
        buyerLayoutStore.sellerInfo = res.data.user_subscription
        console.log(buyerLayoutStore.sellerInfo)
        i18n.locale = res.data.campaign.lang
        Object.keys(shoppingCartStore.cart.products).length == 0 ? shoppingCartStore.showAddItemModal = true : shoppingCartStore.showAddItemModal = false
      }
  )

  var _cart_oid, _type, _toastify
	buyer_list_campapign_product(_cart_oid=route.params.cart_oid, _type='all', _toastify=buyerLayoutStore.alert).then(
		res => {
			shoppingCartStore.campaignProducts = JSON.parse(JSON.stringify(res.data))
      shoppingCartStore.campaignProductDict = {}
      res.data.forEach(campaignProduct => {
        shoppingCartStore.campaignProductDict[campaignProduct.id.toString()]=campaignProduct
      });    
  });
    
  var _cart_oid, _type, _toastify
  buyer_list_discount_code(_cart_oid=route.params.cart_oid, _type='cart_referal', _toastify=buyerLayoutStore.alert).then(
    res=>{
      shoppingCartStore.referalCodes = res.data
    }
  )

  if(!isAnonymousUser){
    var _cart_oid,_toastify
    buyer_get_cart_relative_wallet(_cart_oid=route.params.cart_oid, _toastify=buyerLayoutStore.alert).then(res=>{
      if(res.data){
        shoppingCartStore.buyerWallet = res.data
      }
      
    })
  }
  


})


// 	buyer_cart_list(route.params.cart_oid, buyerLayoutStore.alert).then(
// 		res => {
//       res.data.forEach(element => {
//         shoppingCartStore.cartProducts[element.id] = element
// 		  })
// })

watch(computed(()=>shoppingCartStore.openTab),()=>{
  router.push({query:{tab:shoppingCartStore.openTab}})
  btnOne.value = shoppingCartStore.openTab == 1? 'white' :'#334155'
  btnTwo.value = shoppingCartStore.openTab == 2? 'white' :'#334155'
  if(isAnonymousUser && shoppingCartStore.openTab==2 && !buyerLayoutStore.refuseToLogin){
    buyerLayoutStore.showLoginModal=true
  }
})



</script>

<style scoped>

.calch{
  min-height: calc(100vh - 130px);
}
</style>