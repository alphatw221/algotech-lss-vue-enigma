<template>
    <div class="relative w-full h-16">
        <div class="absolute right-0 flex w-full m-1 mr-auto sm:mt-1 sm:w-auto">
            <SearchIcon class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 text-slate-700 " />
            <input type="text" class="px-10 mr-2 rounded-full form-control w-44 lg:w-60 box"
                placeholder="Search..." v-model="searchValue" @keydown.enter.prevent="search()"/>
            <div class="export">
                    <Dropdown class="relative p-2 mr-1 flex rounded-full items-center btn border-[#131C34] "
                placement="bottom-start"> {{$t('manage_order.export')}}
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
            <div class="export">
                <button id="tabulator-html-filter-go" type="button" class="flex-none w-16 mr-3 btn btn-primary"
                    @click="test()">
                {{$t('manage_order.filter')}}
                </button>
                <FilterModal
                    :tableStatus="tableStatus"
                    :tableFilter="tableFilter"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, provide, onMounted, onUnmounted, getCurrentInstance } from "vue";
import  FilterModal  from "./FilterModal.vue";
import { useManageOrderStore } from "@/stores/lss-manage-order";
import { useRoute, useRouter } from "vue-router";
import {order_export} from "@/api/manage_order";
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
    console.log(searchValue.value)
    eventBus.emit(props.tableSearch,{'keyword':searchValue.value,'filter_data':filter_data})
}
function test(){
    store.filterModal[props.tableStatus] = true
}
function onExportXlsx(){
    order_export(route.params.campaign_id).then(
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
