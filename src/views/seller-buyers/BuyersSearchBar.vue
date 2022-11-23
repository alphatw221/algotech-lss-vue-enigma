<template>
  <form>
      <div class="flex content-end justify-start gap-3 mr-auto -mt-3 justify-items-stretch sm:mt-0">
          <!-- <div class="items-center w-fit sm:mr-4 flex-col sm:flex-row"> -->
              <!-- <label class="mr-2 w-14 xl:w-auto"> -->
              <!-- <label class="mr-2 whitespace-nowrap">
                  {{$t('campaign_list.search_bar.search')}}
              </label>
              <select id="tabulator-html-filter-field"
                  class="w-auto h-[35px] sm:h-[42px] sm:mr-4 form-select" v-model="searchField">
                  <option v-for="searchColumn in searchColumns" :key="searchColumn.value" @change="search"
                      :value="searchColumn.value">
                      {{ $t(`campaign_list.search_bar.`+searchColumn.text) }}
                  </option>
              </select>
          </div> -->
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
      </div>
  </form>       
</template>

<script setup>
import { computed, onMounted, provide, ref, watch, getCurrentInstance, defineProps } from "vue";
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const keyword = ref("")
const search = () => {
    eventBus.emit("BuyerSearch", { "keyword": keyword.value })
}
const reset = () => {
    keyword.value = ""
    eventBus.emit("BuyerSearch", { "keyword": keyword.value })
}

</script>