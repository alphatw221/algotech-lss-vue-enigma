<template>
  <div class="flex flex-col m-0 my-5 sm:mt-8 lg:mx-20 gap-5">
    <h1 class="mx-auto sm:mr-auto text-xl font-medium sm:text-2xl" > {{$t('order_points.points')}} </h1>
    <button class="ml-auto btn btn-primary" @click="showPointAdjustModal()">  {{$t('buyers.buyer_point.adjust_point')}}</button>
    <div v-if="sellerLayoutStore.buyer"
      class="w-full box sm:px-20 py-5 flex flex-col sm:flex-row justify-between gap-3 s:gap-5"> 
        <div class="h-fit w-fit flex flex-col sm:flex-row items-center justify-center gap-5 mx-auto sm:mx-0">
          <div class="w-24 h-24 flex-none image-fit mr-1">
              <img alt="" class="rounded-full" :src="userAvatar" />
          </div>
          <div class="flex flex-col"> 
            <span class="text-lg text-center sm:text-left"> {{ sellerLayoutStore?.buyer?.name }}</span>
            <span class="text-lg"> {{ sellerLayoutStore?.buyer.email }}</span>
          </div>
        </div>
        <div class="my-auto sm:ml-20 text-[20px] flex flex-col gap-4 text-center sm:text-left"> 
            <div class="flex flex-col sm:flex-row gap-2 text-danger"> 
              <span class="text-[32px] font-bold">{{Math.floor(wallet.points).toLocaleString("en-GB") }}</span>
              {{ $t('buyers.buyer_point.points') }} 
            </div>
            <!-- <p> Expiry Date : 31 Sep 2022 </p> -->
        </div>
        <!-- <a class="mx-auto sm:mr-0 sm:ml-auto my-auto text-[18px]" @click="showDiscriptionModal()"><u>Rules and Description </u> </a> -->
    </div>
    <div class="box border-2 border-slate-200 px-2">
        <PointsTable />
    </div>
  </div>
  <PointAdjustModal :wallet="wallet"/>
</template>

<script setup>
import { computed, onMounted, onUnmounted, provide, ref, watch, getCurrentInstance } from "vue";
import PointsTable from "./PointsTable.vue"; 
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useRoute, useRouter } from "vue-router";
import dom from "@left4code/tw-starter/dist/js/dom";
import { useCookies } from "vue3-cookies";
import PointAdjustModal from "./PointAdjustModal.vue";
const { cookies } = useCookies()
const sellerLayoutStore = useLSSSellerLayoutStore();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const route = useRoute();

const wallet = ref({})
const walletUserSubscriptionId = ref(null)
const ready = ref(false)

const userAvatar = computed(() => {
  if (sellerLayoutStore.buyer?.facebook_info?.picture) return sellerLayoutStore.buyer.facebook_info.picture
  else if (sellerLayoutStore?.buyer.google_info?.picture) return sellerLayoutStore.buyer.google_info.picture
  return import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR+'fake_head.jpeg'
});


watch(computed(()=>sellerLayoutStore.buyer), () => {
  walletUserSubscriptionId.value = sellerLayoutStore.userInfo.user_subscription.id
  if (sellerLayoutStore.buyer?.wallets?.length) {
    wallet.value = sellerLayoutStore.buyer.wallets.filter(element=> element.user_subscription.id === walletUserSubscriptionId.value)[0]
  }
},{deep:true})

onMounted(()=>{
  eventBus.on("renderBuyerAndWallet", (payload) => {
    wallet.value = payload
    sellerLayoutStore.buyer = payload.buyer
  })
  sellerLayoutStore.buyer = null
  
})
onUnmounted(()=>{
  eventBus.off("renderBuyerAndWallet")
})
const computedNameFirstLetter = computed(()=>{
  var _words = (sellerLayoutStore.buyer?.name||'').split(' ')
  if (_words.length<=1) return _words[0].split('')[0]
  return _words[_words.length-1].split('')[0]
})


// const showDiscriptionModal=()=>{
//   eventBus.emit('showDiscriptionModal',null)
// }

const showPointAdjustModal=()=>{
  eventBus.emit('showPointAdjustModal',null)
}


</script>


<style scoped>

.statusBtn {
  padding: 0;
  margin: 0;
  border: none;
  background: none;
}

.statusBtn {
  --primary-color: rgba(78, 78, 78, 0.808);
  --hovered-color: #474747;
  position: relative;
  display: flex;
  font-weight: 600;
  font-size: 16px;
  gap: 0.5rem;
  align-items: center;
}

.statusBtn p {
  margin: 0;
  position: relative;
  font-size: 20px;
  color: var(--primary-color)
}

.all p{
  color: theme('colors.primary');
}
.wallet p{
  color: #0a3d31;
}

.statusBtn::after {
  position: absolute;
  content: "";
  width: 0;
  left: 0;
  bottom: -7px;
  background: var(--hovered-color);
  height: 2px;
  transition: 0.3s ease-out;
}

.statusBtn .all::before{
  position: absolute;
/*   box-sizing: border-box; */
  content: attr(data-content);
  width: 0%;
  inset: 0;
  color: theme('colors.primary');
  overflow: hidden;
  transition: 0.3s ease-out;
}
.statusBtn .wallet::before {
  position: absolute;
/*   box-sizing: border-box; */
  content: attr(data-content);
  width: 0%;
  inset: 0;
  color: #0a3d31;
  overflow: hidden;
  transition: 0.3s ease-out;
}
.statusBtn:hover::after {
  width: 100%;
}

.statusBtn:hover p::before {
  width: 100%;
}
</style>