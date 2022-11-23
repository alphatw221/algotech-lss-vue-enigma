<template>
    <div class="flex flex-col sm:px-5 sm:h-fit">

        <div class="flex flex-row justify-betweeen items-center sm:px-20 lg:py-5 intro-y my-3 pt-10">
            <h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium whitespace-nowrap">{{$t('discount.discount_code' )}}</h2>
            <div
                class="ml-auto"
            >
                <FileUploadButton 
                    class="mx-1 sm:w-40 h-[35px] sm:h-[42px] text-white btn btn-warning btn-rounded border-[2px] border-slate-100 shadow-lg"
                    button_id="import_discount_code"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    :multiple="false"
                    :uploadFunction = "importDiscountCode"
                    v-if="layoutStore.userInfo?.user_subscription?.user_plan?.display?.import_discount_code_button"
                >
                    <span class="font-bold mr-1 text-[16px]">+</span> {{$t('discount.import' )}} 
                </FileUploadButton>

                <button class="mx-1 sm:w-40 h-[35px] sm:h-[42px] text-white btn btn-warning btn-rounded border-[2px] border-slate-100 shadow-lg"
                    @click="showCreateModal() ">
                    <span class="font-bold mr-1 text-[16px]">+</span> {{$t('discount.create_discount_code' )}}
                </button>
            </div>
        </div>
            

        <div class="flex flex-col gap-3 p-2 sm:gap-5 box sm:p-10 sm:h-[80vh] lg:mx-20">
            <DiscountCodeTable  />
        </div>
    </div>
    
    <CreateEditDiscountCodeModal/>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import DiscountCodeTable from "./DiscountCodeTable.vue";
import CreateEditDiscountCodeModal from "./create-edit-modal/Main.vue"
import { create_discount_code, import_discount_code } from "@/api_v2/discount_code";

import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import i18n from "@/locales/i18n"
import FileUploadButton from "@/components/file-upload-button/Main.vue"


const layoutStore = useLSSSellerLayoutStore();

const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

const showCreateModal = ()=>{eventBus.emit('showCreateModel',null)}

const importDiscountCode = file =>{
    let formData = new FormData()
	formData.append('file', file)
    import_discount_code(formData, layoutStore.alert).then(res=>{

    })
}
</script>

