<template>
    <div class="box grid grid-cols-12 gap-5 my-5 p-2 py-5 lg:m-5 lg:p-10 min-h-[90%] content-start">
      <h1 class="text-xl col-span-12 justify-self-center" style="font-size: 1.5rem;"> {{$t('order_history.order_history')}} </h1> 
      <div class="col-span-12 justify-self-center lg:col-span-3"> 
          <div class="h-48 w-44 box border-2 border-slate-200 flex flex-col items-center justify-center gap-0.5">
              <div class="w-28 h-28 flex-none image-fit mr-1">
                  <img alt="" class="rounded-full zoom-in" :src="userAvatar" />
              </div>
              <div class="text-lg"> {{ buyerLayoutStore.userInfo.name }}</div>
          </div>
      </div>
      <div for="orderHistoryTable" class="box border-2 border-slate-200 col-start-1 col-span-12 lg:col-start-4 lg:col-span-9">
          <OrderHistoryTable />
      </div>
    </div>
</template>

<script setup>
import { computed, onMounted, provide, ref, watch, getCurrentInstance } from "vue";
import OrderHistoryTable from "@/views/buyer-order-history/OrderHistoryTable.vue"; 
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
import dom from "@left4code/tw-starter/dist/js/dom";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies()
const buyerLayoutStore = useLSSBuyerLayoutStore();
const i18n = getCurrentInstance().appContext.config.globalProperties.$i18n

const userAvatar = computed(() => {
  if(cookies.get('login_with')=='facebook'){
    return buyerLayoutStore.userInfo.facebook_info.picture
  }
  if (cookies.get('login_with')=='google'){
    return buyerLayoutStore.userInfo.google_info.picture
  }
  return import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR+'fake_head.jpeg'
});

onMounted(()=>{
  i18n.locale = buyerLayoutStore.userInfo.lang
})


</script>
