<template>
    <CrudForm
        :title="title"    
        :formSettings="settings"
        :action="actions"
        v-model="data"
    >
    
    </CrudForm>

    <CrudForm
        :title="'Point Settings'"    
        :formSettings="pointSettings"
        :action="actions"
        v-model="data"
    >
    
    </CrudForm>


    <CrudForm
        :title="'Message Settings'"    
        :formSettings="messageSettings"
        :action="actions"
        v-model="data"
    >
    
    </CrudForm>


    <CrudForm
        :title="'Note Settings'"    
        :formSettings="notesSettings"
        :action="actions"
        v-model="data"
    >
    
    </CrudForm>

</template>

<script setup>
import CrudForm from '@/views/crud-form-lss/Main.vue'
import { ref, onMounted, reactive, computed } from 'vue';
// import { get_general_info, update_general_info } from '@/api_v2/user_subscription'
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
// import i18n from "@/locales/i18n"
// import PointsSettingsVue from './PointsSettings.vue';
// import MessageSettingsVue from './MessageSettings.vue';

const layoutStore = useLSSSellerLayoutStore();


const title = 'Campaign General Settings'
const data = ref({})

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



const messageSettings = [


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

onMounted(() => {


    data.value = JSON.parse(JSON.stringify(layoutStore?.user?.general_settings||{}))
    // get_general_info(layoutStore.alert).then(response => {

    
    // })
})

const update = () => {
    // console.log(generalInfo.value)
    // update_general_info(generalInfo.value, layoutStore.alert).then(res => {
    //     layoutStore.userInfo = res.data
    //     document.querySelector('#lss-content').scrollTo(0, -70)
    //     layoutStore.notification.showMessageToast(i18n.global.t('settings.update_successfully'))
    //     // console.log(layoutStore.userInfo)
    // })

}

const actions = {'update':update, }

</script>
