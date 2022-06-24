<template>
    <div class="relative w-full h-16">
                    <div class="flex w-full absolute mr-auto m-1 right-0 sm:mt-1 sm:w-auto ">
                        <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-700 " />
                        <input type="text" class="form-control rounded-full mr-2 w-full sm:w-64 box px-10"
                            placeholder="Search files" v-model="searchValue"/>
                        <button id="tabulator-html-filter-go" type="button" class="flex-none btn btn-primary w-16 mr-3"
                                @click="search()">
                        Go
                        </button>

                        <div class="export">
                             <Dropdown class="relative p-2 mr-1 flex rounded-full items-center btn border-[#131C34] "
                            placement="bottom-start"> Export
                            <DropdownToggle role="button" class="w-5 h-5 block" href="javascript:;">
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
                           <button id="tabulator-html-filter-go" type="button" class="flex-none btn btn-primary w-16 mr-3"
                                @click="test()">
                            Filter
                            </button>
                            <FilterModal/>
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

const route = useRoute();
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const searchValue = ref('')
const store = useManageOrderStore()

function search(){
    let data = {}
    for(const type in store.filterTagArray){
        data[type] = []
        for(const tag in store.filterTagArray[type]){
            if(store.filterTagArray[type][tag]){
                data[type].push(tag)
            }
        }
    }
    console.log(searchValue.value)
    eventBus.emit('search',{'value':searchValue.value,'filter_data':data})
}
function test(){
    store.filterModal = true
}
function onExportXlsx(){
    order_export()
}

</script>
