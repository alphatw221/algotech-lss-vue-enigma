<template>
  <form>
      <div class="flex content-end justify-start gap-3 mr-auto justify-items-stretch">
          <div class="items-center w-auto flex mt-auto">
              <!-- <SearchIcon class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 text-slate-700 col-span-2" /> -->
              <div class="relative "> 
                  <input type="text" class="shrink h-[35px] sm:h-[42px] w-40 lg:w-72 pr-10 rounded-lg"
                      :placeholder="$t('buyers.search_bar.search')+'...'"
                      v-model="keyword" @keydown.enter.prevent="search()"/>
                  <SearchIcon class="absolute w-7 h-7 top-1 sm:top-2 right-3 z-10 text-slate-600" @click="search()"/>
              </div>
              <XIcon 
                  v-if="keyword"
                  class="flex-none w-7 h-7 mt-2 ml-2 text-slate-600" @click="reset()"/>
          </div>



          <div class="flex flex-row items-center">
            <input class="form-control" type="text" placeholder="Source Email" v-model="mergeData.source_email">
            <ChevronsRightIcon class="w-8 h-8"/>
            <input class="form-control" type="text" placeholder="Target Email" v-model="mergeData.target_email">
            <button type="button" class="btn btn-primary ml-2" @click="mergeBuyer()">Merge</button>
          </div>
          
      </div>
  </form>       
</template>

<script setup>
import { computed, onMounted, provide, ref, watch, getCurrentInstance, defineProps } from "vue";
import { merge_buyer } from "../../api_v2/user_subscription";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const layoutStore = useLSSSellerLayoutStore()
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const keyword = ref("")
const mergeData = ref({source_email:'', target_email:'' })
const search = () => {
    eventBus.emit("BuyerSearch", { "keyword": keyword.value })
}
const reset = () => {
    keyword.value = ""
    eventBus.emit("BuyerSearch", { "keyword": keyword.value })
}



const mergeBuyer = ()=>{
    merge_buyer(mergeData.value, layoutStore.alert).then(res=>{
        search()
    })
}



</script>