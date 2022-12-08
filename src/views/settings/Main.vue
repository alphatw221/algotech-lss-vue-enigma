<template>
    <!-- OUTTER BOX -->
    <div class="flex flex-col p-2 font-medium text-sm sm:text-xl">
        <!-- BEGIN: commit box -->
 
        <div class="flex flex-row items-center sm:px-20 pb-4 intro-y lg:mt-5">
            <h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium"> {{$t('settings.default_settings')}}</h2>
            <Tippy 
                class="rounded-full w-30 whitespace-wrap" 
                data-tippy-allowHTML="true" 
                data-tippy-placement="right" 
                :content="$t('tooltips.settings.default_settings')" 
                theme='light'
            > 
                <HelpCircleIcon class="h-5 ml-1 tippy-icon" />
            </Tippy> 
        </div>
        <div class="flex flex-col gap-5 box lg:mx-20">
            <div class="switch-toggle mx-auto sm:ml-14 mt-6 sm:mt-10">
                <template v-for="category in computedCategorys" :key="category"> 
                    <input :id="category.name" type="radio" :checked="(openTab == category.name)" :value="category.name" v-model="openTab"/>
                    <label :for="category.name">{{$t('settings.categorys.'+ category.name)}}</label>
                </template>
            </div>


            <div class="pb-10 px-3">
                <div id="general" :class="{ hidden: openTab !== 'general', block: openTab === 'general' }">
                    <NotesSettings />
                </div>

                <div id="payment" :class="{ hidden: openTab !== 'payment', block: openTab === 'payment' }">
                    <PaymentSettings />
                </div>

                <div id="logistic" :class="{ hidden: openTab !== 'logistic', block: openTab === 'logistic' }">
                    <DeliverySettings />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, getCurrentInstance } from "vue";
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

import NotesSettings from './NotesSettings.vue';
import PaymentSettings from './payment-settings/Main.vue';
import DeliverySettings from './delivery-settings/Main.vue';

const sellerLayout = useLSSSellerLayoutStore()
const openTab = ref('general')
const computedCategorys = computed(()=>{
    var categorys = [ {name:'general'},{name:'payment'},{name:'logistic'} ]

    if(sellerLayout.userInfo?.user_subscription?.type === 'supplier'){
        categorys = categorys.filter(category=>category.name!='general')
        categorys = categorys.filter(category=>category.name!='payment')
        openTab.value = 'logistic'
    }
    return categorys
})


</script>

<style scoped>
.switch-toggle input+label {
    @apply py-[7px]; 
}
</style>