<template>
    <div class="relative right-0 flex w-full m-1 sm:mt-1 sm:w-auto">
        <div class="export hidden sm:block">
            <button id="tabulator-html-filter-go" type="button" class="flex-none w-16 mr-3 h-[35px] sm:h-[42px] btn btn-primary"
                @click="test()">
            {{$t('manage_order.search_bar.filter')}}
            </button>
            <FilterModal
                :tableStatus="tableStatus"
                :tableFilter="tableFilter"/>
        </div>
        <div class="sm:hidden w-12 ">
            <FilterIcon class="w-8 h-8" @click="test()"/>
        </div>
        <div class="export hidden sm:block">
            <Dropdown class="relative p-2 mr-1 flex rounded-full items-center btn border-[#131C34] w-24 h-[35px] sm:h-[42px]"
                placement="bottom-start"> {{$t('manage_order.search_bar.export')}}
                <DropdownToggle role="button" class="block w-5 h-5" href="javascript:;">
                    <ChevronDownIcon class="w-5 h-5 text-slate-700" />
                </DropdownToggle>
                <DropdownMenu class="pt-2">
                    <DropdownContent class="w-full text-center">
                        <DropdownItem @click="onExportXlsx"> CSV </DropdownItem>
                    </DropdownContent>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div class="sm:hidden w-12">
            <DownloadIcon class="w-8 h-8" @click="onExportXlsx"/>
        </div>
        <div class="flex ml-auto sm:ml-1"> 
            <!-- <SearchIcon class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 text-slate-700 col-span-2" /> -->
            <div class="relative"> 
                <input type="text" class="form-control w-40 lg:w-60 rounded-lg h-[35px] sm:h-[42px] pr-10"
                :placeholder="$t('manage_order.search_bar.search')" v-model="searchValue" @keydown.enter.prevent="search()"/>
                <SearchIcon class="absolute w-7 h-7 top-1 sm:top-2 right-2 z-10 text-slate-600" @click="search()"/>
            </div>
            <XIcon 
                v-if="searchValue"
                class="flex-none w-7 h-7 mt-2 text-slate-600 ml-2 " @click="reset"/>
        </div>
    </div>
</template>
<script setup>
import { ref, provide, onMounted, onUnmounted, getCurrentInstance } from "vue";
import  FilterModal  from "./FilterModal.vue";
import { useManageOrderStore } from "@/stores/lss-manage-order";
import { useRoute, useRouter } from "vue-router";
import { get_campaign_order_report } from "@/api_v2/campaign"
import { url } from "@vuelidate/validators";

const route = useRoute();
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const searchValue = ref('')
const store = useManageOrderStore()

const props = defineProps({
    tableStatus: String,
    tableSearch: String,
    tableFilter: String,
});

onMounted(()=>{
    eventBus.on(props.tableFilter, (payload) => {
        search(payload.filter_data)
	})
})
onUnmounted(()=>{
    eventBus.off(props.tableFilter)
})

function search(filter_data){
    // console.log(searchValue.value)
    eventBus.emit(props.tableSearch,{'keyword':searchValue.value,'filter_data':filter_data})
}
function test(){
    store.filterModal[props.tableStatus] = true
}
function reset(filter_data){
    searchValue.value = ''
    eventBus.emit(props.tableSearch,{'keyword':searchValue.value,'filter_data':filter_data})
}
function onExportXlsx(){
    get_campaign_order_report(route.params.campaign_id).then(
    // order_export(route.params.campaign_id).then(
        res => {console.log(res)
        
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveBlob(res.data);
            } else {
                var link = document.createElement("a");
                link.href = window.URL.createObjectURL(new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
                link.download = 'export';
                document.body.appendChild(link); // Required for FF
                link.click();
            }
            }
    )
}

</script>
