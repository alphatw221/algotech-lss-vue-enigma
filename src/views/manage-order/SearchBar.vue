<template>
    <div class=" my-1 sm:mt-1 inline-block align-middle">
        <div class=" ml-auto sm:ml-1 mr-2 inline-block align-middle"> 

            <div class="relative inline-block"> 
                <input type="text" class="form-control w-40 lg:w-60 rounded-lg h-[35px] sm:h-[42px] pr-10"
                :placeholder="$t('manage_order.search_bar.search')" v-model="searchValue" @keydown.enter.prevent="search()"/>
                <SearchIcon class="absolute w-7 h-7 top-1 sm:top-2 right-2 z-10 text-slate-600" @click="search()"/>
            </div>
            <XIcon 
                v-if="searchValue"
                class="inline-block w-7 h-7 mt-2 text-slate-600 ml-2 " @click="reset"/>
        </div>
        <div class="export hidden sm:inline-block align-middle">
            <button id="tabulator-html-filter-go" type="button" class="flex-none w-20 mr-3 h-[35px] sm:h-[42px] btn btn-primary"
                @click="showFilterModal()">
            <SimpleIcon icon="filter" color="white"  width="16" class="mr-1" @click="showFilterModal()"/>
            {{$t('manage_order.search_bar.filter')}}
            </button>
        </div>
        <div class="sm:hidden w-10 inline-block align-middle">
            <SimpleIcon icon="filter" color="#414141"  width="24" height="24" class="mt-1" @click="showFilterModal()"/>
        </div>
        
    </div>
</template>
<script setup>
import { ref, provide, onMounted, onUnmounted, getCurrentInstance } from "vue";
// import  FilterModal  from "./FilterModal.vue";
import { useManageOrderStore } from "@/stores/lss-manage-order";
import { useRoute, useRouter } from "vue-router";
import { get_campaign_order_report } from "@/api_v2/campaign"
import { url } from "@vuelidate/validators";



import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const layoutStore = useLSSSellerLayoutStore()



const route = useRoute();
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const searchValue = ref('')
const store = useManageOrderStore()

const props = defineProps({
    tableStatus: String,
    searchEventBusName: String
});



function search(filter_data={}){
    // console.log(searchValue.value)
    eventBus.emit(props.searchEventBusName,{'keyword':searchValue.value})
}
function showFilterModal(){
    store.filterModal[props.tableStatus] = true
}
function reset(filter_data){
    searchValue.value = ''
    eventBus.emit(props.searchEventBusName,{'keyword':searchValue.value})
}


</script>
