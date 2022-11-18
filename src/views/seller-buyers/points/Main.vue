<template>
    <div class="flex flex-col gap-5 m-0 p-2 py-5 lg:mx-5 lg:p-10 2xl:mx-5 2xl:px-10">
        <h1 class="text-xl mx-auto" style="font-size: 1.5rem;"> {{$t('order_points.points')}} </h1>
        <div
          v-if="walletUserSubscriptionId !== null" 
          class="w-full box sm:px-20 py-10 flex flex-col sm:flex-row justify-between gap-5"> 
            <div class="bg-primary rounded-full w-36 h-36 relative mx-auto sm:mx-0"> 
              <p class="absolute text-[72px] font-bold text-white top-[52px] right-[45px]">
              {{computedNameFirstLetter}}
              </p>
            </div>

            <div class="my-auto sm:ml-20 text-[20px] flex flex-col gap-4 text-center sm:text-left"> 
                <div class="flex flex-col sm:flex-row gap-2"> 
                  <span class="text-[32px] text-danger font-bold">{{sellerLayoutStore.buyer.wallets[walletIndex].points}}</span>
                  Points 
                </div>
                <!-- <p> Expiry Date : 31 Sep 2022 </p> -->
            </div>
            <a class="mx-auto sm:mr-0 sm:ml-auto my-auto text-[18px]" @click="showDiscriptionModal()"><u>Rules and Description </u> </a>
        </div>

        <div class="mt-5 flex flex-row gap-5"> 
          <button @click="changeWallet(null, -1)" class="statusBtn" :class="{'all' : walletUserSubscriptionId==null}" >
            <p class="all" :data-content="$t('order_points.statusButton.all')">{{$t('order_points.statusButton.all')}}</p>
          </button>

          <template v-for="(wallet, wallet_index) in sellerLayoutStore.buyer.wallets" :key="wallet_index"> 
            <button @click="changeWallet(wallet, wallet_index)" class="statusBtn" :contant="walletUserSubscriptionId" :class="{'wallet': wallet_index == walletIndex }">
              <p class="wallet" :data-content="wallet.user_subscription.name">{{wallet.user_subscription.name}}</p></button>
          </template>
        </div>

        <div class="box border-2 border-slate-200 w-full">
            <PointsTable :userSubscriptionId="walletUserSubscriptionId" />
        </div>
    </div>
    <DescriptionModal />
</template>

<script setup>
import { computed, onMounted, provide, ref, watch, getCurrentInstance } from "vue";
import PointsTable from "./PointsTable.vue"; 
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import dom from "@left4code/tw-starter/dist/js/dom";
import { useCookies } from "vue3-cookies";
import DescriptionModal from "./DescriptionModal.vue";
const { cookies } = useCookies()
const sellerLayoutStore = useLSSSellerLayoutStore();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;


const walletUserSubscriptionId = ref(null)
const walletIndex = ref(null)

onMounted(()=>{})

const computedNameFirstLetter = computed(()=>{
  var _words = (sellerLayoutStore.buyer?.name||'').split(' ')
  if (_words.length<=1) return _words.split('')[0]
  return _words[_words.length-1].split('')[0]
})

const changeWallet =(wallet, _walletIndex)=>{
  walletUserSubscriptionId.value = wallet?.user_subscription?.id||null
  walletIndex.value =_walletIndex
}

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