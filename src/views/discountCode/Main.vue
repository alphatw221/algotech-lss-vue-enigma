<template>
    <div class="flex flex-col sm:px-5 sm:h-fit">
        <div class="flex-col flex gap-3 flex-wrap sm:flex-row justify-center sm:justify-between">
            <div class="flex items-center sm:px-20 lg:pt-5 mt-3 lg:pb-4 intro-y lg:pt-5 mt-3">
                <h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium">{{ 'discount_code' }}</h2>
            </div>
            <button class="w-40 h-[35px] sm:h-[42px] text-white btn btn-warning btn-rounded mx-auto sm:mx-0 lg:mx-20 lg:mt-5 sm:mt-0 lg:mb-0 mb-3 border-[2px] border-slate-100 shadow-lg"
                @click="showCreateModal() ">
                <span class="font-bold mr-1 text-[16px]">+</span> {{ 'create_discount_code' }}
            </button>
        </div>
        <div class="flex flex-col gap-3 p-2 sm:gap-5 box sm:p-10 sm:h-[80vh] lg:mx-20">
            <DiscountCodeTable  />
        </div>
    </div>
    
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import DiscountCodeTable from "./DiscountCodeTable.vue";

import { create_discount_code } from "@/api_v2/discount_code";

import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import i18n from "@/locales/i18n"

const layoutStore = useLSSSellerLayoutStore();

const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;





const showCreateModal = ()=>{
    
}

</script>

