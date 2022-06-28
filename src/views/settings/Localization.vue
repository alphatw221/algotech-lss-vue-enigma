<template>
    <div class="box m-5 p-10">
        <div class="flex my-3 text-lg">
            <div class="mr-5"> Country: </div>
            <div v-if="layoutStore.userInfo.user_subscription "> {{  countries[layoutStore.userInfo.user_subscription.country]||'' }}</div>
        </div>
        <div class="flex my-3 text-m">
            <div> Currency Symbol: </div>
        </div>
        <div class="flex my-3">
            <TomSelect v-model="data.currency" :options="{
                        placeholder: 'Choose Currency Symbol',
                        }" class="w-full">
                <option :value="option.value" v-for="(option,index) in currencySymbols" :key="index">{{option.text}}</option>
            </TomSelect>
        </div>
        <div class="flex my-3 text-lg">
            <div class="mr-5"> Seller</div>
        </div> 
        <div class="flex my-3">
            <TomSelect v-model="data.seller_language" :options="{
                        placeholder: 'Choose Language',
                        }" class="w-full">
                <option :value="option.value" v-for="(option,index) in languages" :key="index">{{option.text}}</option>
            </TomSelect>
        </div>
        <div class="flex my-3 text-lg">
            <div class="mr-5"> Buyer</div>
        </div>
        <div class="flex my-3">
            <TomSelect v-model="data.buyer_language" :options="{
                        placeholder: 'Choose Language',
                        }" class="w-full">
                <option :value="option.value" v-for="(option,index) in languages" :key="index">{{option.text}}</option>
            </TomSelect>
        </div>
        <div class="flex my-3 text-lg">
            <div class="mr-5"> Decimal Places</div>
        </div>
        <div class="flex my-3">
            <TomSelect v-model="data.decimal_places" :options="{placeholder: 'Select your Decimal Places'}" class="w-full">
                <option :value="option.value" v-for="(option,index) in decimalOptions" :key="index">{{option.text}}</option>
            </TomSelect>
        </div>
        <div class="flex justify-end"> 
            <!-- <button class="btn btn-rounded-secondary mr-5"> Cancel</button> -->
            <button class="btn btn-rounded-primary"> Save</button>
        </div>
    </div>

</template>

<script setup>
import { ref, defineEmits, computed } from "vue";
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

const layoutStore = useLSSSellerLayoutStore();


// userInfo

// <option value="USD"> $ </option>
// <option value="TWD">NT $</option>
// <option value="SGD">SGD $</option>
// <option value="IDR">Rp</option>
// <option value="PHP">PH ₱</option>
// <option value="MYR">RM</option>
// <option value="VND">VN ₫</option>
// <option value="RMB">RMB ¥</option>
// <option value="KHR">KHR ៛</option>
// <option value="AUD">AUD $</option>
// <option value="HKD">HKD $</option>


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


const data = ref({currency:'USD', seller_language:'us', buyer_language:'us', decimal_places:2})
</script>