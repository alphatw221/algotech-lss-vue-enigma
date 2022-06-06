<template>
    <div class="box grid grid-cols-12 gap-5 m-0 my-5 p-2 py-5 lg:m-5 lg:p-10 2xl:m-5 2xl:p-10">
        <h1 class="text-xl col-span-12 justify-self-center"> Order History </h1>
        <div class="col-start-1 col-span-12 justify-self-center lg:col-span-3 2xl:col-span-3"> 
            <div class="h-48 w-44 box border-2 border-slate-200 flex flex-wrap items-center justify-center ">
                <div class="w-28 h-28 flex-none image-fit mr-1">
                    <img alt="" class="rounded-full zoom-in" :src="userAvatar" />
                </div>
                <div class="text-lg"> {{buyerLayoutStore.userInfo.name}}</div>
            </div>
        </div>
        <div for="orderHistoryTable" class="box border-2 border-slate-200 col-start-1 col-span-12 lg:col-start-4 lg:col-span-9 2xl:col-start-4 2xl:col-span-9">
            <OrderHistorylList class="overflow-x-auto"  />
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, provide, ref, watch } from "vue";
import OrderHistorylList from "@/components/table/OrderHistoryTable.vue"; 
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import dom from "@left4code/tw-starter/dist/js/dom";

const buyerLayoutStore = useLSSBuyerLayoutStore();

onMounted(() => {
    console.log(buyerLayoutStore.userInfo.name)
});

const userAvatar = computed(() => {
  if(buyerLayoutStore.loginWith=='facebook'){
    return buyerLayoutStore.userInfo.facebook_info.picture
  }else if (buyerLayoutStore.loginWith=='google'){
    return buyerLayoutStore.userInfo.google_info.picture
  }
  if(buyerLayoutStore.userInfo.facebook_info.picture){
    return buyerLayoutStore.userInfo.facebook_info.picture
  }
  return buyerLayoutStore.userInfo.google_info.picture
});


</script>
