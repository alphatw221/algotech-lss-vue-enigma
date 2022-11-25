<template>
    <div class="flex flex-col gap-5 m-0 p-2 py-5 lg:mx-5 lg:p-10 2xl:mx-5 2xl:px-10">
        <h1 class="text-xl mx-auto" style="font-size: 1.5rem;"> {{$t('order_points.points')}} </h1>
        <div v-if="sellerLayoutStore.buyer !== null"
          class="w-full box sm:px-20 py-10 flex flex-col sm:flex-row justify-between gap-5"> 
            <div class="h-48 w-44 box border-2 border-slate-200 flex flex-col items-center justify-center gap-0.5 mx-auto sm:mx-0">
              <div class="w-28 h-28 flex-none image-fit mr-1">
                  <img alt="" class="rounded-full zoom-in" :src="userAvatar" />
              </div>
              <div class="text-lg"> {{ sellerLayoutStore.buyer.name }}</div>
            </div>

            <div class="my-auto sm:ml-20 text-[20px] flex flex-col gap-4 text-center sm:text-left"> 
                <div class="flex flex-col sm:flex-row gap-2"> 
                  <span class="text-[32px] text-danger font-bold">{{wallet.points}}</span>
                  {{ $t('buyers.buyer_point.points') }} 
                </div>
                <!-- <p> Expiry Date : 31 Sep 2022 </p> -->
            </div>
            <!-- <a class="mx-auto sm:mr-0 sm:ml-auto my-auto text-[18px]" @click="showDiscriptionModal()"><u>Rules and Description </u> </a> -->
        </div>

        <div class="box border-2 border-slate-200 w-full">
            <PointsTable />
        </div>
    </div>
    <DescriptionModal />
</template>

<script setup>
import { computed, onMounted, provide, ref, watch, getCurrentInstance } from "vue";
import PointsTable from "./PointsTable.vue"; 
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useRoute, useRouter } from "vue-router";
import dom from "@left4code/tw-starter/dist/js/dom";
import { useCookies } from "vue3-cookies";
import DescriptionModal from "./DescriptionModal.vue";
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
  sellerLayoutStore.buyer = null
})

const computedNameFirstLetter = computed(()=>{
  var _words = (sellerLayoutStore.buyer?.name||'').split(' ')
  if (_words.length<=1) return _words[0].split('')[0]
  return _words[_words.length-1].split('')[0]
})


const showDiscriptionModal=()=>{
    eventBus.emit('showDiscriptionModal',null)
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