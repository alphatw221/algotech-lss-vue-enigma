<template>
     <div class="export hidden sm:inline-block">
            <Dropdown class="relative p-2 mr-1 flex items-center btn border-[#131C34] w-24 h-[35px] sm:h-[42px]"
                placement="bottom-start"> {{$t('manage_order.search_bar.export')}}
                <DropdownToggle role="button" class="block w-5 h-5" href="javascript:;">
                    <ChevronDownIcon class="w-5 h-5 text-slate-700" />
                </DropdownToggle>
                <DropdownMenu class="pt-2">
                    <DropdownContent class="w-full text-center">
                        <DropdownItem @click="exportCSV()"> CSV </DropdownItem>
                    </DropdownContent>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div class="sm:hidden w-12">
            <SimpleIcon icon="export" color="#414141"  width="24" height="24" class="mt-1" @click="exportCSV()"/>
        </div>
</template>

<script setup>

import { useRoute, useRouter } from "vue-router";
import { get_campaign_order_report } from "@/api_v2/campaign"
import SimpleIcon from "../../global-components/lss-svg-icons/SimpleIcon.vue";



import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const layoutStore = useLSSSellerLayoutStore()



const route = useRoute();
const exportCSV = ()=>{
    get_campaign_order_report(route.params.campaign_id, layoutStore.alert).then(
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