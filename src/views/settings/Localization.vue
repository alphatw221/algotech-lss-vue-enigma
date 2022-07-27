<template>
    <div class="flex flex-col">
        <div class="flex items-center sm:px-20 pt-5 pb-4 intro-y ">
			<h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium">{{ $t('settings.localization.title') }} </h2>
		</div>
        
        <div class="box lg:mx-20 lg:pl-40 pl-16 py-10 gap-4 p-5 intro-y"> 
            <div class="flex mb-3">
                <div class="mr-3 text-lg sm:text-xl font-medium"> {{$t("settings.localization.country")}}  : </div>
                <div class="flex my-auto" v-if="layoutStore.userInfo.user_subscription "> {{  $t(`settings.localization.countries.${layoutStore.userInfo.user_subscription.country}`)||'' }}</div>
            </div>
            <div class="flex my-3 mt-5 form-label text-base font-medium">
                <div> {{$t("settings.localization.currency_symbol")}} </div>
            </div>
            <div class="flex my-1">
                <TomSelect v-model="data.currency" :options="{
                            placeholder: $t('settings.localization.choose_currency_symbol'),
                            }" class="w-5/6">
                    <option :value="option.value" v-for="(option,index) in currencySymbols" :key="index">{{option.text}}</option>
                </TomSelect>
            </div>
            <div class="flex my-3 mt-5 form-label text-base font-medium">
                <div class="mr-5"> {{$t("settings.localization.seller_language")}}</div>
            </div> 
            <div class="flex my-1">
                <TomSelect v-model="data.lang" :options="{
                            placeholder: $t('settings.localization.choose_language'),
                            }" class="w-5/6">
                    <option :value="option.value" v-for="(option,index) in languages" :key="index">{{$t(`settings.localization.languages.${option.value}`)}}</option>
                </TomSelect>
            </div>
            <div class="flex my-3 mt-5 form-label text-base font-medium">
                <div class="mr-5"> {{$t("settings.localization.buyer_language")}}</div>
            </div>
            <div class="flex my-1">
                <TomSelect v-model="data.buyer_lang" :options="{
                            placeholder: $t('settings.localization.choose_language'),
                            }" class="w-5/6">
                    <option :value="option.value" v-for="(option,index) in languages" :key="index">{{$t(`settings.localization.languages.${option.value}`)}}</option>
                </TomSelect>
            </div>
            <div class="flex my-3 mt-5 form-label text-base font-medium">
                <div class="mr-5"> {{$t("settings.localization.decimal_places")}}</div>
            </div>
            <div class="flex my-1">
                <TomSelect v-model="data.decimal_places" :options="{placeholder: $t('settings.localization.choose_decimal_places')}" class="w-5/6">
                    <option :value="option.value" v-for="(option,index) in decimalOptions" :key="index">{{option.text}}</option>
                </TomSelect>
            </div>
            <div class="flex justify-end mt-10 w-5/6"> 
                <!-- <button class="w-32 bg-white btn dark:border-darkmode-400" @click="clean()"> {{$t("settings.localization.discard")}}</button> -->
                <button class="w-32 ml-5 shadow-md btn btn-primary" @click="save()"> {{$t("settings.localization.save")}}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, computed, onMounted, getCurrentInstance } from "vue";
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { seller_update_subscription } from '@/api_v2/user_subscription'

import i18n from '@/locales/i18n';

const layoutStore = useLSSSellerLayoutStore();
const app_i18n = getCurrentInstance().appContext.config.globalProperties.$i18n

const countries = ref({'PH':'Philippines','SG':'Singapore','ID':'Indonesia','IN':'India','TW':'Taiwan'})

const currencySymbols = ref([
    {value:'USD',text:'USD'},
    {value:'TWD',text:'TWD'},
    {value:'SGD',text:'SGD'},
    {value:'IDR',text:'IDR'},
    {value:'PHP',text:'PHP'},
    {value:'MYR',text:'MYR'},
    {value:'VND',text:'VND'},
    {value:'RMB',text:'RMB'},
    {value:'KHR',text:'KHR'},
    {value:'AUD',text:'AUD'},
    {value:'HKD',text:'HKD'}])

const languages = ref([
    {value:'en',text:'English'},
    // {value:'zh_hans',text:'Chinese-simplify'},
    {value:'zh_hant',text:'Chinese-tranditional'},
    // {value:'id',text:'Indonesian'}
])

const decimalOptions = ref([
    {value:'2',text:'0.01'},
    // {value:'1',text:'0.1'},
    {value:'0',text:'1'},
    // {value:'-1',text:'10'},
    // {value:'-2',text:'100'},
    // {value:'-3',text:'1000'}
    ])

const data = ref({currency:'USD', lang:'en', buyer_lang:'en', decimal_places:'2'})
onMounted(()=>{
    console.log(layoutStore.userInfo)
    if(!layoutStore.userInfo.user_subscription) return
    data.value.currency = layoutStore.userInfo.user_subscription.currency
    data.value.lang = layoutStore.userInfo.lang
    data.value.buyer_lang = layoutStore.userInfo.user_subscription.buyer_lang
    data.value.decimal_places = layoutStore.userInfo.user_subscription.decimal_places.toString()
})

const clean =() =>{
    data.value.currency = layoutStore.userInfo.user_subscription.currency
    data.value.lang = layoutStore.userInfo.lang
    data.value.buyer_lang = layoutStore.userInfo.user_subscription.buyer_lang
    data.value.decimal_places = layoutStore.userInfo.user_subscription.decimal_places.toString()
}

const save = ()=>{
    seller_update_subscription(data.value).then(res=>{
        console.log(res)
        layoutStore.userInfo = res.data
        i18n.global.locale.value = res.data.lang
        layoutStore.notification.showMessageToast(i18n.global.t('settings.update_successfully'))
        
    })
}

// const updateUserlanguage = ()=>{
//     seller_update_language(data.value.lang).then(res=>{
        
//         layoutStore.userInfo = res.data
//         i18n.global.locale.value = res.data.lang
//         layoutStore.notification.showMessageToast(i18n.global.t('settings.update_successfully'))
        
//     })
// }

</script>