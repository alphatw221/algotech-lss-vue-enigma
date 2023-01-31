<template>
    <div class="box grid grid-cols-12 gap-5 m-0 my-5 p-2 py-5 lg:m-5 lg:p-10 2xl:m-5 2xl:p-10">
        <h1 class="text-xl col-span-12 justify-self-center" style="font-size: 1.5rem;"> {{$t('order_history.order_history')}} </h1>
        <div class="col-start-1 col-span-12 justify-self-center lg:col-span-3 2xl:col-span-3"> 
            <div class="h-48 w-44 box border-2 border-slate-200 flex flex-col items-center justify-center gap-0.5">
                <div class="w-28 h-28 flex-none image-fit mr-1">
                    <img alt="" class="rounded-full zoom-in" :src="userAvatar" />
                </div>
                <div class="text-lg"> {{ sellerLayoutStore?.buyer?.name }}</div>
            </div>
        </div>
        <div for="orderHistoryTable" class="box border-2 border-slate-200 col-start-1 col-span-12 lg:col-start-4 lg:col-span-9 2xl:col-start-4 2xl:col-span-9">
            <OrderHistoryTable />
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, provide, ref, watch, getCurrentInstance } from "vue";
import OrderHistoryTable from "@/views/seller-buyers/order-history/OrderHistoryTable.vue"; 
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies()
const sellerLayoutStore = useLSSSellerLayoutStore();
const i18n = getCurrentInstance().appContext.config.globalProperties.$i18n

const userAvatar = computed(() => {
  if (sellerLayoutStore.buyer?.facebook_info?.picture) return sellerLayoutStore.buyer.facebook_info.picture
  else if (sellerLayoutStore.buyer?.google_info?.picture) return sellerLayoutStore.buyer.google_info.picture
  return import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR+'fake_head.jpeg'
});

onMounted(()=>{})


</script>
