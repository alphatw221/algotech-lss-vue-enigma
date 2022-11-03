<template>
    <div class="flex flex-col gap-5 m-0 my-5 p-2 py-5 lg:m-5 lg:p-10 2xl:m-5 2xl:p-10">
        <h1 class="text-xl mx-auto" style="font-size: 1.5rem;"> {{$t('points.points')}} </h1>
        <div class="w-full box px-20 py-10 flex flex-row justify-between"> 
            <div class="bg-primary rounded-full w-36 h-36 relative"> <p class="absolute text-[72px] font-bold text-white top-[52px] right-[45px]"> L</p></div>

            <div class="my-auto ml-20 text-[20px] flex flex-col gap-4"> 
                <p> <spam class="text-[32px] text-danger font-bold">59</spam> Points (Equal to SGD $5) </p>
                <p> Expiry Date : 31 Sep 2022 </p>
            </div>
            <a class="ml-auto my-auto text-[18px]" @click="showModal()"><u>Rules and Description </u> </a>
        </div>

        <div class="mt-10 flex flex-row gap-5"> 
        <button @click="changeStatus('all')" class="statusBtn" :class="{'all' : status=='all'}" >
            <p class="all" :data-content="$t('points.statusButton.all')">{{$t('points.statusButton.all')}}</p></button>
        <button @click="changeStatus('earning')" class="statusBtn" :class="{'earning' : status=='earning'}" :contant="status">
            <p class="earn" :data-content="$t('points.statusButton.earning')">{{$t('points.statusButton.earning')}}</p></button>
        <button @click="changeStatus('spending')" class="statusBtn" :class="{'spending' : status=='spending'}" :contant="status">
            <p class="spend" :data-content="$t('points.statusButton.spending')">{{$t('points.statusButton.spending')}}</p></button>
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

onMounted(()=>{
  i18n.locale = buyerLayoutStore.userInfo.lang
})

const changeStatus =(s)=>{
//   ready.value = false
  status.value = s
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
.earning p{
  color: #0a3d31;
}
.spending p{
  color: theme('colors.danger');
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
.statusBtn .earn::before {
  position: absolute;
/*   box-sizing: border-box; */
  content: attr(data-content);
  width: 0%;
  inset: 0;
  color: #0a3d31;
  overflow: hidden;
  transition: 0.3s ease-out;
}
.statusBtn .spend::before {
  position: absolute;
/*   box-sizing: border-box; */
  content: attr(data-content);
  width: 0%;
  inset: 0;
  color: theme('colors.danger');
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