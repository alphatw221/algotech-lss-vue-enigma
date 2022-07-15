<template>
    <div class="box p-5 px-10 lg:p-10 lg:px-20">
        <div class="flex my-3 text-lg">
            <div class="mr-5"> Country: </div>
            <div v-if="layoutStore.userInfo.user_subscription "> {{  countries[layoutStore.userInfo.user_subscription.country]||'' }}</div>
        </div>
        <div class="flex my-3 mt-5 text-m">
            <div> Currency Symbol: </div>
        </div>
        <div class="flex my-1">
            <TomSelect v-model="data.currency" :options="{
                        placeholder: 'Choose Currency Symbol',
                        }" class="w-5/6">
                <option :value="option.value" v-for="(option,index) in currencySymbols" :key="index">{{option.text}}</option>
            </TomSelect>
        </div>
        <div class="flex my-3 mt-5 text-lg">
            <div class="mr-5"> Seller</div>
        </div> 
        <div class="flex my-1">
            <TomSelect v-model="data.lang" :options="{
                        placeholder: 'Choose Language',
                        }" class="w-5/6">
                <option :value="option.value" v-for="(option,index) in languages" :key="index">{{option.text}}</option>
            </TomSelect>
        </div>
        <div class="flex my-3 mt-5 text-lg">
            <div class="mr-5"> Buyer</div>
        </div>
        <div class="flex my-1">
            <TomSelect v-model="data.buyer_lang" :options="{
                        placeholder: 'Choose Language',
                        }" class="w-5/6">
                <option :value="option.value" v-for="(option,index) in languages" :key="index">{{option.text}}</option>
            </TomSelect>
        </div>
        <div class="flex my-3 mt-5 text-lg">
            <div class="mr-5"> Decimal Places</div>
        </div>
        <div class="flex my-1">
            <TomSelect v-model="data.decimal_places" :options="{placeholder: 'Select your Decimal Places'}" class="w-5/6">
                <option :value="option.value" v-for="(option,index) in decimalOptions" :key="index">{{option.text}}</option>
            </TomSelect>
        </div>
        <div class="flex justify-end mt-10 w-5/6"> 
            <button class="btn btn-rounded-secondary mr-5 w-20" @click="clean()"> Discard</button>
            <button class="btn btn-rounded-primary w-20" @click="save()"> Save</button>
        </div>
    </div>

</template>

<script setup>
import { ref, defineEmits, computed, onMounted, getCurrentInstance } from "vue";
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { seller_update_subscription } from '@/api_v2/user_subscription'

const layoutStore = useLSSSellerLayoutStore();
import i18n from '@/locales/i18n';

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
    {value:'zh_hans',text:'Chinese-simplify'},
    {value:'zh_hant',text:'Chinese-tranditional'},
    {value:'id',text:'Indonesian'}])

const decimalOptions = ref([
    {value:2,text:'0.01'},
    {value:1,text:'0.1'},
    {value:0,text:'1'},
    {value:-1,text:'10'},
    {value:-2,text:'100'},
    {value:-3,text:'1000'}])

const data = ref({currency:'USD', lang:'en', buyer_lang:'en', decimal_places:2})
onMounted(()=>{
    if(!layoutStore.userInfo.user_subscription) return
    data.value.currency = layoutStore.userInfo.user_subscription.currency
    data.value.lang = layoutStore.userInfo.user_subscription.lang
    data.value.buyer_lang = layoutStore.userInfo.user_subscription.buyer_lang
    data.value.decimal_places = layoutStore.userInfo.user_subscription.decimal_places
})

const clean =() =>{
    data.value.currency = layoutStore.userInfo.user_subscription.currency
    data.value.lang = layoutStore.userInfo.user_subscription.lang
    data.value.buyer_lang = layoutStore.userInfo.user_subscription.buyer_lang
    data.value.decimal_places = layoutStore.userInfo.user_subscription.decimal_places
}

const save = ()=>{
    seller_update_subscription(data.value).then(res=>{

        layoutStore.userInfo = res.data
        layoutStore.notification.showMessageToast("Update Successfully")
        i18n.global.locale = layoutStore.userInfo.user_subscription.lang
    })
}
</script>