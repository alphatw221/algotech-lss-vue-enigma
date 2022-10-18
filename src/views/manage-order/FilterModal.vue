<template>
    <Modal
        size="modal-xl"
        backdrop="static"
        :show="manageOrderStore.filterModal[tableStatus]"
		@hidden="manageOrderStore.filterModal[tableStatus] = false"
    >
            <ModalHeader >
                <h2 class="font-medium text-base mr-auto text-xl">
                        {{$t('manage_order.filter_modal.filter')}}
                </h2>
                <button id="tabulator-html-filter-go" type="button" class="flex-none text-[18px] btn btn-primary w-fit mr-3"
                    @click="filter()">
                    {{$t('manage_order.filter_modal.apply')}}
                </button>
                <XIcon class="w-8 h-8 ml-2" @click="clickXButton()"/>
            </ModalHeader>
        <ModalBody class="w-full h-full">

            <!-- APPLIED_FILTER_TAG -->
            <div class="flex flex-row grow flex-wrap ">
                <template v-for="(type, type_key) in filterData" :key="type_key">
                    <template v-for="(tag,tag_key) in type" :key="tag_key">
                    <div class="" v-if="tag">
                        <button class="btn w-fit h-10 m-1 text-[15px]" 
                                :class="{ 'btn-rounded-danger' : type_key === 'payment', 'btn-rounded-primary' : type_key === 'delivery', 'btn-rounded-warning' : type_key === 'platform'}">
                            <HashIcon class="w-4 h-4 mr-2" /> {{$t(`manage_order.filter_modal.`+type_key+`.`+tag_key)}}
                            <XIcon class="w-4 h-4 ml-2" @click="removeFilterTag(type_key,tag_key)"/>
                        </button>
                    </div>
                    </template>
                </template>
            </div>

            <div class="flex text-[16px] my-6">
                <div class="grid grid-cols-12 gap-2">
                    <!-- PAYMENT_FILTER_OPTIONS -->
                    <div class="col-span-12 text-[20px] font-medium my-2">{{$t('manage_order.filter_modal.payment.payment')}}</div>
                    <div  class="col-span-6 lg:col-span-3 lg:my-1" v-for="paymentOption, index in computedPaymentOptions" :key="index">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                                v-model="filterData.payment[paymentOption.key]" > 
                        <span class="ml-1">{{ $t(`manage_order.filter_modal.payment.${paymentOption.key}`) }}</span> 
                    </div>

                    <!-- DELIVERY_FILTER_OPTIONS -->
                    <div class="col-span-12 text-[20px] font-medium my-2">{{$t('manage_order.filter_modal.delivery.status')}}</div>
                    <div class="col-span-6 lg:col-span-3 lg:my-1" v-for="deliveryOption, index in deliveryStatusOprions" :key="index">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                            v-model="filterData.delivery[deliveryOption.key]" > 
                        <span class="ml-1"> {{$t(`manage_order.filter_modal.delivery.${deliveryOption.key}`)}} </span> 
                    </div>


                    <!-- PLATFORM_FILTER_OPTIONS -->
                    <div class="col-span-12  text-[20px] font-medium my-2"> {{$t('manage_order.filter_modal.platform.platform')}}</div>
                    <div class="col-span-6 lg:col-span-3 lg:my-1" v-for="platformOption, index in platformOptions" :key="index">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                            v-model="filterData.platform[platformOption.key]" > 
                        <span class="ml-1"> {{platformOption.name}}</span> 
                    </div>

                </div>
            </div>
        </ModalBody>
    </Modal>
</template>
<script setup>
import { ref, provide, onMounted, onUnmounted, getCurrentInstance, computed } from "vue";
import { useManageOrderStore } from "@/stores/lss-manage-order";
import { useLSSPaymentMetaStore } from '@/stores/lss-payment-meta';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import i18n from "@/locales/i18n"

const paymentStore = useLSSPaymentMetaStore()
const sellerStore = useLSSSellerLayoutStore()

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const manageOrderStore = useManageOrderStore()

const props = defineProps({
    tableStatus: String,
    filterEventBusName: String
});

const computedPaymentOptions = computed(()=>{
    const payments = []
    if(!sellerStore.userInfo.user_subscription) return payments
    const meta_country = sellerStore.userInfo.user_subscription.meta_country
    const paymentKeySet = new Set()
    meta_country.activated_country.forEach( country => { paymentStore[country].forEach( key => paymentKeySet.add(key) ) } )
    paymentKeySet.forEach(key => {
        payments.push(paymentStore[key])
    });
    return payments
})

const deliveryStatusOprions =[
    {name:"awaiting_shipment",key:"awaiting_shipment"},
    {name:"shipped",key:"shipped"},
] 

const platformOptions = [
    {name:"Facebook",key:"facebook"},
    {name:"Youtube",key:"youtube"},
    {name:"Instagram",key:"instagram"},
]
const filterData = ref({"payment":{},"delivery":{},"platform":{}})


const filter = ()=>{

    eventBus.emit(props.filterEventBusName,filterData.value)
    hideFilterModal()
}

const removeFilterTag = (type_key,tag_key)=>{
    delete filterData.value[type_key][tag_key]
}

const clickXButton = () =>{
    if(Object.keys(filterData.value.payment).length || Object.keys(filterData.value.delivery).length || Object.keys(filterData.value.platform).length){
        let yes = confirm(`${i18n.global.t('manage_order.filter_modal.close_alert')}`)
	    if (yes) filter()
        else hideFilterModal();
    }
    else hideFilterModal()
}

const hideFilterModal=()=>{
    manageOrderStore.filterModal[props.tableStatus] = false
}
const clearFilterModal=()=>{
    filterData.value = {"payment":{},"delivery":{},"platform":{}}
}

</script>