<template>
    <div class="my-auto"> 
        <div class="export hidden sm:inline-block align-middle">
            <Dropdown class="relative p-2 mr-1 flex items-center btn border-[#131C34] w-24 h-[35px] sm:h-[42px]"
                placement="bottom-start"> {{$t('manage_order.search_bar.export')}}
                <DropdownToggle role="button" class="block w-5 h-5" href="javascript:;">
                    <ChevronDownIcon class="w-5 h-5 text-slate-700" />
                </DropdownToggle>
                <DropdownMenu class="pt-2">
                    <DropdownContent class="w-full text-center">
                        <DropdownItem @click="exportXLSX()"> XLSX </DropdownItem>
                    </DropdownContent>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div class="sm:hidden w-12 inline-block align-middle">
            <SimpleIcon icon="export" color="#414141"  width="24" height="24" class="mt-1" @click="exportXLSX()"/>
        </div>
    </div>
</template>

<script setup>
import { defineProps, getCurrentInstance } from 'vue'

import { useRoute, useRouter } from "vue-router";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const layoutStore = useLSSSellerLayoutStore()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

const props = defineProps({
    tableStatus: String,
});


const route = useRoute();
const exportXLSX = ()=>{
    eventBus.emit(`exportTable-${props.tableStatus}`)
}
</script>