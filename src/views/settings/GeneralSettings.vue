<template>
    <CrudForm
        :title="title"    
        :formSettings="settings"
        :action="actions"
        v-model="data"
    >
    
    </CrudForm>

    <CrudForm
        :title="'Payment Settings'"    
        :formSettings="paymentSettings"
        :action="actions"
        class="intro-y"

    >
        <template v-slot:payment_services >
            <div v-if="(paymentServices||[]).length<=0" class="text-center my-5">
                <h3>No Payment Service Added</h3>
            </div>
            <template v-for="paymentService, i in (paymentServices||[])" :key="i">
                <CrudWidge
                    :formSettings="paymentServiceSettings"
                    :action="actions"
                    v-model="paymentServices[i]"
                    class="intro-y border-slate border-[1px] rounded p-3 my-2"
                    @change="()=>{paymentSettingsChanged=true}"
                    :error="paymentServicesVuelidate?.$each?.$response?.$errors?.[i]"
                >
                    <template v-slot:remove_button>
                        <XIcon class="w-6 h-6 right-1 top-1 cursor-pointer absolute text-slate-500" @click="()=>{paymentServices.splice(i,1); paymentSettingsChanged=true}"/>
                    </template>
                    <template v-slot:bank_transfer_form>
                        <BankTransferForm v-model="paymentServices[i]" @change="()=>{paymentSettingsChanged=true}" :error="paymentServicesVuelidate?.$each?.$response?.$errors?.[i]"/>
                    </template>
                    <template v-slot:ecpay_form>
                        <ECPayForm v-model="paymentServices[i]" @change="()=>{paymentSettingsChanged=true}" :error="paymentServicesVuelidate?.$each?.$response?.$errors?.[i]"/>
                    </template>
                    <template v-slot:stripe_form>
                        <StripeForm v-model="paymentServices[i]" @change="()=>{paymentSettingsChanged=true}" :error="paymentServicesVuelidate?.$each?.$response?.$errors?.[i]"/>
                    </template>
                    <template v-slot:rapyd_form>
                        <RapydForm v-model="paymentServices[i]" @change="()=>{paymentSettingsChanged=true}" :error="paymentServicesVuelidate?.$each?.$response?.$errors?.[i]"/>
                    </template>
                </CrudWidge>
            </template>
        </template>

        <template v-slot:add_service_button >
            <div class="text-center my-2">
                <button class="btn btn-primary rounded-[50%]" @click="()=>{ (paymentServices||[]).push(getPaymentServiceTemplate());paymentSettingsChanged=true}">
                    <PlusIcon/>
                </button>
            </div>
        </template>

        <template v-slot:save >
            <button class="btn btn-primary w-fit float-right" @click="updatePaymentSettings()">
                <div role="status" v-if="paymentSettingsUpdating">
                    <svg aria-hidden="true" class="inline w-6 h-6 mx-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Updating...</span>
                </div>
                <template v-else>{{ paymentSettingsChanged?'Save (Changes not saved yet)':'Save' }}</template>
            </button>
        </template>


    </CrudForm>


    <!-- Logistic Settings -->
    <CrudForm
        :title="'Logistic Settings'"    
        :formSettings="logisticSettings"
        :action="actions"
        v-model="logisticSettingsData"
        class="intro-y"
    >
        <template v-slot:self_pickup_form>
            <SelfPickupForm v-model="logisticServices" @update:modelValue="()=>{logisticSettingsChanged=true}" @change="()=>{logisticSettingsChanged=true}" :getLogisticServiceTemplate="()=>{return {provider:'self_pickup'}}"/>
        </template>
        
        <template v-slot:seller_deliver_form>
            <SellerDeliverForm v-model="logisticServices" @update:modelValue="()=>{logisticSettingsChanged=true}" @change="()=>{logisticSettingsChanged=true}" :getLogisticServiceTemplate="()=>{return {provider:'seller_deliver'}}"/>
        </template>

        <template v-slot:logistic_services >
            <h3 class="text-base">Logistic Services</h3>
            <div v-if="(logisticServices||[]).filter(_logisticService=>_logisticService?.provider!='self_pickup'&&_logisticService?.provider!='seller_deliver'&&!_logisticService?.remove)?.length<=0" class="text-center my-5">
                <h3>No Logistic Service Added</h3>
            </div>
            <template v-for="logisticService, i in (logisticServices||[])" :key="i">
                <CrudWidge
                    v-if="logisticService?.provider!='self_pickup' && logisticService?.provider!='seller_deliver' && !logisticService?.remove"
                    :formSettings="logisticServiceSettings"
                    :action="actions"
                    v-model="logisticServices[i]"
                    class="intro-y border-slate border-[1px] rounded p-3 my-2"
                    @change="()=>{logisticSettingsChanged=true}"

                >

                    <template v-slot:ecpay>
                        <ECPayLogisticForm v-model="logisticServices[i]" @change="()=>{logisticSettingsChanged=true}" />
                    </template>

                    <template v-slot:remove_button>
                        <XIcon class="w-6 h-6 right-1 top-1 cursor-pointer absolute text-slate-500" @click="()=>{logisticServices[i].provider='';logisticServices[i].remove=true; logisticSettingsChanged=true }"/>
                    </template>
                </CrudWidge>
            </template>
        </template>

        <template v-slot:add_service_button >
            <div class="text-center my-2">
                <button class="btn btn-primary rounded-[50%]" @click="()=>{ (logisticServices||[]).push({provider:''});logisticSettingsChanged=true}">
                    <PlusIcon/>
                </button>
            </div>
        </template>

        <template v-slot:save >
            <button class="btn btn-primary w-fit float-right" @click="updateLogisticSettings()">
                <div role="status" v-if="logisticSettingsUpdating">
                    <svg aria-hidden="true" class="inline w-6 h-6 mx-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Updating...</span>
                </div>
                <template v-else>{{ logisticSettingsChanged?'Save (Changes not saved yet)':'Save' }}</template>
            </button>
        </template>
    </CrudForm>

    <CrudForm
        :title="'Point Settings'"    
        :formSettings="pointSettings"
        :action="actions"
        v-model="pointSettingsData"
    >
    
    </CrudForm>


    <CrudForm
        :title="'Message Settings'"    
        :formSettings="replySettings"
        :action="actions"
        v-model="replySettingsData"
    >
    
    </CrudForm>


    <CrudForm
        :title="'Note Settings'"    
        :formSettings="notesSettings"
        :action="actions"
        v-model="noteSettingsData"
    >
    
    </CrudForm>

</template>

<script setup>
import CrudForm from '@/views/crud-form-lss/Main.vue'
import CrudWidge from '@/views/crud-form-lss/CrudWidge.vue'
import { ref, onMounted, reactive, computed } from 'vue';
// import { get_general_info, update_general_info } from '@/api_v2/user_subscription'
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
// import i18n from "@/locales/i18n"
// import PointsSettingsVue from './PointsSettings.vue';
// import MessageSettingsVue from './MessageSettings.vue';
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, requiredIf } from "@vuelidate/validators";

import BankTransferForm from './payment-settings/BankTransferForm.vue';
import ECPayForm from './payment-settings/ECPayForm.vue'
import RapydForm from './payment-settings/RapydForm.vue'
import StripeForm from './payment-settings/StripeForm.vue'

import SelfPickupForm from './delivery-settings/SelfPickupForm.vue'
import SellerDeliverForm from './delivery-settings/SellerDeliverForm.vue'
import ECPayLogisticForm from './delivery-settings/ECPayLogisticForm.vue';


import {update_user_logistic_services} from '@/api_v3/logistic_service.js'
import {update_user_payment_services} from '@/api_v3/payment_service.js'

const LSSSellerLayoutStore = useLSSSellerLayoutStore();


const title = 'Campaign General Settings'
const data = ref({})

const paymentServicesData = ref({})
const paymentServices = ref([])

const logisticServicesData = ref({})
const logisticServices = ref([])

const getPaymentServiceTemplate = ()=>{
    return {
        provider:'',
        bank_account:'', 
        bank_name:'', 
        
        ecpay_merchant_id:'',
        ecpay_hash_key:'',
        ecpay_hash_iv:'',

        rapyd_access_key:'',
        rapyd_secret_key:'',
        rapyd_country:'',
        rapyd_currency:'',

        stripe_secret_key:'',
        stripe_currency:'',
            
    }
}
const paymentServicesRule = computed(()=> {
    return {
        $each: helpers.forEach({
                provider:{required, },
                bank_name:{required:requiredIf((_,b)=>{return b?.provider=='bank_transfer'})},
                bank_account:{required:requiredIf((_,b)=>{return b?.provider=='bank_transfer'})},

                ecpay_merchant_id:{required:requiredIf((_,b)=>{return b?.provider=='ecpay'})},
                ecpay_hash_key:{required:requiredIf((_,b)=>{return b?.provider=='ecpay'})},
                ecpay_hash_iv:{required:requiredIf((_,b)=>{return b?.provider=='ecpay'})},

                rapyd_access_key:{required:requiredIf((_,b)=>{return b?.provider=='rapyd'})},
                rapyd_secret_key:{required:requiredIf((_,b)=>{return b?.provider=='rapyd'})},
                rapyd_country:{required:requiredIf((_,b)=>{return b?.provider=='rapyd'})},
                rapyd_currency:{required:requiredIf((_,b)=>{return b?.provider=='rapyd'})},

                stripe_secret_key:{required:requiredIf((_,b)=>{return b?.provider=='stripe'})},
                stripe_currency:{required:requiredIf((_,b)=>{return b?.provider=='stripe'})},

                
            })
    }
})
const paymentServicesVuelidate = useVuelidate(paymentServicesRule, paymentServices);

onMounted(() => {
    console.log(LSSSellerLayoutStore.user)

    data.value = JSON.parse(JSON.stringify(LSSSellerLayoutStore?.user?.general_settings||{}))
    paymentServicesData.value.payment_services = JSON.parse(JSON.stringify(LSSSellerLayoutStore?.user?.payment_services||[]))
    logisticServices.value = JSON.parse(JSON.stringify(LSSSellerLayoutStore?.user?.logistic_services||[]))


})

const logisticSettingsData = ref({})
const replySettingsData = ref({})
const pointSettingsData = ref({})
const noteSettingsData = ref({})

const settings = [
    {key:'currency', name:'Currency', type:'select', placeholder:'選擇電子發票服務', multiple:false, value_key:'value', name_key:'value', options:[
                {value:'TWD', name:'台幣'},
                {value:'SGD', name:'新加坡幣'},
                {value:'MYR', name:'馬來西亞令吉'},
                {value:'USD', name:'美金'},
                {value:'AUD', name:'澳幣'},
                {value:'JPY', name:'日圓'},
                {value:'EUR', name:'歐元'},
                {value:'RMB', name:'人民幣'},
                {value:'KRW', name:'韓元'},
                {value:'PHP', name:'菲律賓披索'},
                {value:'VND', name:'越南盾'},
                {value:'THB', name:'泰銖'},
                {value:'IDR', name:'台幣'},
            ]},

    {key:'currency_symbol', name:'Currency Symbol', type:'select', placeholder:'選擇電子發票服務', multiple:false, value_key:'name', name_key:'name', options:[
                {name:'$'},
                {name:'NT$'},
                {name:'€'},
                {name:'£'},
                {name:'¥'},
                {name:'₩'},
                {name:'RM'},
                {name:'₱'},
                {name:'₫'},
                {name:'฿'},
                {name:'Rp'},
                {name:'S$'},
    ]},



    {type:'buttons' ,class:'text-right', buttons:[
        {name:'Save', action:'update', class:'btn-primary w-24'}
    ]},
]

const logisticSettingsChanged = ref(false)
const logisticSettingsUpdating = ref(false)
const logisticSettings = [
    
    {type:'slot', slot_name:'self_pickup_form'},
    {type:'slot', slot_name:'seller_deliver_form'},
    {type:'slot', slot_name:'logistic_services'},
    {type:'slot', slot_name:'add_service_button'},

    {type:'slot', slot_name:'save'},

    // {type:'buttons' ,class:'text-right', buttons:[
    //     {name:'Save', action:'update_logistic_settings', class:'btn-primary w-24'}
    // ]},
]
const logisticServiceSettings = [
    {key:'provider', name:'Logistic Service', class:'w-full intro-y', type:'select', placeholder:'Choose a Logistic Service', multiple:false, value_key:'value', name_key:'name', options:[
            {value:'ecpay', name:'ECPay(T-Cat, 7-11, FamilyMart)'},
        ]},
    {type:'slot', slot_name:'ecpay'},
    {type:'slot', slot_name:'remove_button'},

]

const paymentSettingsChanged = ref(false)
const paymentSettingsUpdating = ref(false)

const paymentSettings = [
    
    {type:'slot', slot_name:'payment_services'},
    {type:'slot', slot_name:'add_service_button'},
    {type:'slot', slot_name:'save'},

    // {type:'buttons' ,class:'text-right', buttons:[
    //     {name:'Save', action:'update_payment_settings', class:'btn-primary w-24'}
    // ]},
]

const paymentServiceSettings = [

    {type:'inline', class:'intro-y', inline_items:[
        {key:'enable', name:'Enable', type:'toggle', class:'mr-2'},
        {key:'provider', name:'Payment Service', class:'w-full', type:'select', placeholder:'Choose a Payment Service', multiple:false, value_key:'value', name_key:'name', options:[
            {value:'bank_transfer', name:'Bank Transfer'},
            {value:'ecpay', name:'ECPay(Credit Card)'},
            {value:'stripe', name:'Stripe(Credit Card)'},
            {value:'rapyd', name:'Rapyd(Credit Card)'},
        ]},

    ]},

    {type:'slot', slot_name:'bank_transfer_form'},
    {type:'slot', slot_name:'ecpay_form'},
    {type:'slot', slot_name:'stripe_form'},
    {type:'slot', slot_name:'rapyd_form'},

    {type:'slot', slot_name:'remove_button'},

]

const pointSettings = [

    {key:'allow_guest_checkout', name:'Enable', type:'toggle'},

    {key:'point_validity', name:'Point Validity', type:'select', placeholder:'選擇電子發票服務', multiple:false, value_key:'value', name_key:'name', options:[
                {value:0, name:'Unlimited'},
                {value:1, name:'1 Month'},
                {value:2, name:'2 Month'},
                {value:3, name:'3 Month'},
                {value:4, name:'4 Month'},
                {value:5, name:'5 Month'},
                {value:6, name:'6 Month'},
                {value:7, name:'7 Month'},
                {value:8, name:'8 Month'},
                {value:9, name:'9 Month'},
                {value:10, name:'10 Month'},
                {value:11, name:'11 Month'},
                {value:12, name:'12 Month'},
            ]},

 
    {type:'slot', slot_name:'reward_table'},
    {type:'slot', slot_name:'redemption_rate'},


    {key:'point_description', name:'Point Descriptions', type:'textarea',},



    {type:'buttons' ,class:'text-right', buttons:[
        {name:'Save', action:'update', class:'btn-primary w-24'}
    ]},

    

]



const replySettings = [


    {key:'add', name:'Successfully Add Product', type:'accordion_textarea',placeholder:'', class:''},
    {key:'update', name:'Customer Change Quantity', type:'accordion_textarea',placeholder:'', class:'mt-5'},
    {key:'delete', name:'Product Delete From Shopping Cart', type:'accordion_textarea',placeholder:'', class:'mt-5'},
    {key:'oos', name:'Out Of Stock', type:'accordion_textarea', placeholder:'', class:'mt-5'},


    {type:'buttons' ,class:'text-right', buttons:[
        {name:'Save', action:'update', class:'btn-primary w-24'}
    ]},

    

]


const notesSettings = [


    {key:'delivery_note', name:'Delivery Note', type:'accordion_textarea',placeholder:'', class:''},
    {key:'special_note', name:'Special Note', type:'accordion_textarea',placeholder:'', class:'mt-5'},
    {key:'confirmation_note', name:'Confirmation Note', type:'accordion_textarea',placeholder:'', class:'mt-5'},


    {type:'buttons' ,class:'text-right', buttons:[
        {name:'Save', action:'update', class:'btn-primary w-24'}
    ]},

    

]



const update = () => {
    // console.log(generalInfo.value)
    // update_general_info(generalInfo.value, layoutStore.alert).then(res => {
    //     layoutStore.userInfo = res.data
    //     document.querySelector('#lss-content').scrollTo(0, -70)
    //     layoutStore.notification.showMessageToast(i18n.global.t('settings.update_successfully'))
    //     // console.log(layoutStore.userInfo)
    // })
    console.log('')
}

const updatePaymentSettings = ()=>{

    console.log(paymentServices.value)
    paymentSettingsUpdating.value = true
    update_user_payment_services(paymentServices.value).then(res=>{
        console.log(res.data)
        paymentServices.value = res.data
        LSSSellerLayoutStore.user.payment_services = res.data
        paymentSettingsChanged.value=false
        paymentSettingsUpdating.value = false
    }).catch(err=>{
        paymentSettingsUpdating.value = false

    })

}

const updateLogisticSettings = ()=>{

    console.log(logisticServices.value)
    logisticSettingsUpdating.value = true
    update_user_logistic_services(logisticServices.value).then(res=>{
        console.log(res.data)
        logisticServices.value = res.data
        LSSSellerLayoutStore.user.logistic_services = res.data
        logisticSettingsChanged.value=false
        logisticSettingsUpdating.value = false
    }).catch(err=>{
        logisticSettingsUpdating.value = false

    })


}

const actions = {'update':update, 'update_payment_settings':updatePaymentSettings, 'update_logistic_settings':updateLogisticSettings}

</script>
