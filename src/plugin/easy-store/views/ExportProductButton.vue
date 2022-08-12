<template>
    <button 
        v-if="userGotPlugin"
        @click="exportProductFromEasyStore()"
        type="button"
        class="h-[35px] w-[35px] sm:w-40 mr-2 sm:mr-0 sm:h-[42px] text-white font-medium shadow-lg btn btn-warning rounded-full mb-5 border-[2px] border-slate-100" 
        :class="{ 'disabled:opacity-50': processing, 'cursor-not-allowed':processing }"
        >
        <template class="hidden sm:block"><span class="mr-1 text-lg font-bold">+</span> Export From Easy Store </template>

    </button>
</template>

<script setup>
import { provide, onMounted,ref, computed, watch, getCurrentInstance } from "vue"
import { useRouter ,useRoute} from "vue-router";
import { useCookies } from "vue3-cookies";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import i18n from "@/locales/i18n"
import { export_product_from_easy_store } from '../api/product'

const { cookies } = useCookies()
const accessToken = cookies.get('access_token')

const route = useRoute();
const router = useRouter();
const store = useLSSSellerLayoutStore();


const userGotPlugin = ref(false)
const processing = ref(false)
const EASY_STORE = 'easy_store'
onMounted(()=>{if(store.userInfo.user_subscription.user_plan?.plugins?.[EASY_STORE])userGotPlugin.value = true})

const exportProductFromEasyStore = ()=>{
    export_product_from_easy_store().then(res=>{console.log(res.data);processing.value=true})
    .catch(err=>{console.log(err.response?.data?.message)})
}




</script>
