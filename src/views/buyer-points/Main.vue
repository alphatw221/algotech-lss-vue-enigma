<template>
    <div class="flex flex-col gap-5 m-0 p-2 py-5 lg:mx-5 lg:p-10 2xl:mx-5 2xl:px-10">
        <h1 class="text-xl mx-auto" style="font-size: 1.5rem;"> {{$t('order_points.points')}} </h1>
        <div
          v-if="status !== 'all'" 
          class="w-full box sm:px-20 py-10 flex flex-col sm:flex-row justify-between gap-5"> 
            <div class="bg-primary rounded-full w-36 h-36 relative mx-auto sm:mx-0"> <p class="absolute text-[72px] font-bold text-white top-[52px] right-[45px]"> L</p></div>

            <div class="my-auto sm:ml-20 text-[20px] flex flex-col gap-4 text-center sm:text-left"> 
                <p> <spam class="text-[32px] text-danger font-bold">{{buyerLayoutStore.userInfo.wallets[index].points}}</spam> Points (Equal to SGD $5) </p>
                <p> Expiry Date : 31 Sep 2022 </p>
            </div>
            <a class="mx-auto sm:mr-0 sm:ml-auto my-auto text-[18px]" @click="showModal()"><u>Rules and Description </u> </a>
        </div>

        <div class="mt-5 flex flex-row gap-5"> 
          <button @click="changeStatus('all', 99)" class="statusBtn" :class="{'all' : status=='all'}" >
            <p class="all" :data-content="$t('order_points.statusButton.all')">{{$t('order_points.statusButton.all')}}</p>
          </button>

          <template v-for="(wallet,i) in buyerLayoutStore.userInfo.wallets" :key="i"> 
            <button @click="changeStatus(wallet.user_subscription.id, i)" class="statusBtn" :contant="status" :class="{'wallet': i == index }">
              <p class="wallet" :data-content="wallet.user_subscription.name">{{wallet.user_subscription.name}}</p></button>
          </template>
        </div>

        <div class="box border-2 border-slate-200 w-full">
            <PointsTable :status="status" />
        </div>
    </div>
    <DescriptionModal />
</template>

<script setup>
import { computed, onMounted, provide, ref, watch, getCurrentInstance } from "vue";
import PointsTable from "./PointsTable.vue"; 
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
import dom from "@left4code/tw-starter/dist/js/dom";
import { useCookies } from "vue3-cookies";
import DescriptionModal from "./DescriptionModal.vue";
const { cookies } = useCookies()
const buyerLayoutStore = useLSSBuyerLayoutStore();
const i18n = getCurrentInstance().appContext.config.globalProperties.$i18n
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const status = ref('all')
const id = ref('all')
const index = ref(100)

onMounted(()=>{
  i18n.locale = buyerLayoutStore.userInfo.lang
  console.log(buyerLayoutStore.userInfo)
})

const changeStatus =(s,i)=>{
//   ready.value = false
  status.value = s
  index.value =i
  console.log(s,i)
}

const showModal=()=>{
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