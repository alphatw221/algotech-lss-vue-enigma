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
    </CrudForm>



    <CrudForm
        :title="'Logistic Settings'"    
        :formSettings="logisticSettings"
        :action="actions"
        v-model="logisticSettingsData"
        class="intro-y"
    >
        <template v-slot:self_pickup_form>
            <SelfPickupForm v-model="logisticServices" @change="()=>{logisticSettingsChanged=true}" :getLogisticServiceTemplate="()=>{return {provider:'self_pickup'}}"/>
        </template>
        
        <template v-slot:self_delivery_form>
            <SelfDeliveryForm v-model="logisticServices" @change="()=>{logisticSettingsChanged=true}" :getLogisticServiceTemplate="()=>{return {provider:'self_delivery'}}"/>
        </template>

        <template v-slot:logistic_services >
            <h3 class="text-base">Logistic Services</h3>
            <div v-if="(logisticServices||[]).filter(_logisticService=>_logisticService?.provider!='self_pickup'&&_logisticService?.provider!='self_delivery')?.length<=0" class="text-center my-5">
                <h3>No Logistic Service Added</h3>
            </div>
            <template v-for="logisticService, i in (logisticServices||[])" :key="i">
                <CrudWidge
                    v-if="logisticService?.provider!='self_pickup' && logisticService?.provider!='self_delivery'"
                    :formSettings="logisticServiceSettings"
                    :action="actions"
                    v-model="logisticService[i]"
                    class="intro-y border-slate border-[1px] rounded p-3 my-2"
                    @change="()=>{paymentSettingsChanged=true}"
                    :error="paymentServicesVuelidate?.$each?.$response?.$errors?.[i]"
                >
                    <template v-slot:remove_button>
                        <XIcon class="w-6 h-6 right-1 top-1 cursor-pointer absolute text-slate-500" @click="()=>{logisticServices?.splice(i,1);  }"/>
                    </template>
                </CrudWidge>
            </template>
        </template>

        <template v-slot:add_service_button >
            <div class="text-center my-2">
                <button class="btn btn-primary rounded-[50%]" @click="()=>{ (logisticServices||[]).push({provider:''});paymentSettingsChanged=true}">
                    <PlusIcon/>
                </button>
            </div>
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
import SelfDeliveryForm from './delivery-settings/SelfDeliveryForm.vue'

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


    data.value = JSON.parse(JSON.stringify(LSSSellerLayoutStore?.user?.general_settings||{}))
    paymentServicesData.value.payment_services = JSON.parse(JSON.stringify(LSSSellerLayoutStore?.user?.payment_services||[]))
    logisticServicesData.value.logistic_services = JSON.parse(JSON.stringify(LSSSellerLayoutStore?.user?.logistic_services||[]))


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
const logisticSettings = [
    
    {type:'slot', slot_name:'self_pickup_form'},
    {type:'slot', slot_name:'self_delivery_form'},


    {type:'slot', slot_name:'logistic_services'},
    {type:'slot', slot_name:'add_service_button'},

    {type:'buttons' ,class:'text-right', buttons:[
        {name:'Save', action:'update_logistic_settings', class:'btn-primary w-24'}
    ]},
]
const logisticServiceSettings = [


    {key:'provider', name:'Logistic Service', class:'w-full', type:'select', placeholder:'Choose a Logistic Service', multiple:false, value_key:'value', name_key:'name', options:[
            {value:'ecpay', name:'ECPay(T-Cat, 7-11, FamilyMart)'},
        ]},
    {type:'slot', slot_name:'ecpay'},
    {type:'slot', slot_name:'remove_button'},

]

const paymentSettingsChanged = ref(false)
const paymentSettings = [
    
    {type:'slot', slot_name:'payment_services'},
    {type:'slot', slot_name:'add_service_button'},

    {type:'buttons' ,class:'text-right', buttons:[
        {name:'Save', action:'update_payment_settings', class:'btn-primary w-24'}
    ]},
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

    // console.log(paymentServicesData.value.payment_services)
    console.log(paymentServices.value)
    paymentSettingsChanged.value=false

    paymentServicesVuelidate.value.$touch();
    
    console.log( paymentServicesVuelidate.value.$each.$response.$errors)


    //json to formdata conversion
}

const actions = {'update':update, 'update_payment_settings':updatePaymentSettings}

</script>
