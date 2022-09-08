<template>
    <Modal
        size="modal-xl"
        backdrop="static"
        :show="store.filterModal[tableStatus]"
		@hidden="store.filterModal[tableStatus] = false"
    >
            <ModalHeader >
                <h2 class="font-medium text-base mr-auto text-xl">
                        {{$t('manage_order.filter_modal.filter')}}
                </h2>
                <button id="tabulator-html-filter-go" type="button" class="flex-none text-[18px] btn btn-primary w-fit mr-3"
                    @click="filter()">
                    {{$t('manage_order.filter_modal.apply')}}
                </button>
                <XIcon class="w-8 h-8 ml-2" @click="closeFilter()"/>
            </ModalHeader>
        <ModalBody class="w-full h-full">
            <div class="flex flex-row grow flex-wrap ">
                <template v-for="(type, index) in store.filterTagArray" :key="index">
                    <template v-for="(tag,_index) in type" :key="_index">
                    <div class="" v-if="tag">
                        <button class="btn w-fit h-10 m-1 text-[15px]" 
                                :class="{ 'btn-rounded-danger' : index === 'payment', 'btn-rounded-primary' : index === 'delivery', 'btn-rounded-warning' : index === 'platform'}">
                            <HashIcon class="w-4 h-4 mr-2" /> {{$t(`manage_order.filter_modal.`+index+`.`+_index)}}
                            <XIcon class="w-4 h-4 ml-2" @click="updateTag(index,_index)"/>
                        </button>
                    </div>
                    </template>
                </template>
            </div>
            <div class="flex text-[16px] my-6">
                <div class="grid grid-cols-12 gap-2">
                    <div class="col-span-12 text-[20px] font-medium my-2">{{$t('manage_order.filter_modal.payment.payment')}}</div>
                    <div class="col-span-6 lg:col-span-3 lg:my-1">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                                v-model="store.filterTagArray.payment['direct_payment']" 
                                    @click="updateTag('payment','direct_payment')"> 
                                    <span class="ml-1"> Direct Payment </span> 
                    </div>
                    <div class="col-span-6 lg:col-span-3 lg:my-1">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                            v-model="store.filterTagArray.payment['stripe']" 
                                @click="updateTag('payment','stripe')"> <span class="ml-1"> Stripe </span> 
                    </div>
                    <div class="col-span-6 lg:col-span-3 lg:my-1">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                            v-model="store.filterTagArray.payment['hitpay']" 
                                @click="updateTag('payment','hitpay')"> <span class="ml-1"> Hitpay </span> 
                    </div>
                    <div class="col-span-6 lg:col-span-3 lg:my-1">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                            v-model="store.filterTagArray.payment['paypal']" 
                                @click="updateTag('payment','paypal')"> <span class="ml-1"> Paypal </span> 
                    </div>
                    <div class="col-span-12 text-[20px] font-medium my-2">{{$t('manage_order.filter_modal.delivery.status')}}</div>
                    <div class="col-span-6 lg:col-span-3 lg:my-1">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                            v-model="store.filterTagArray.delivery['shipping out']" 
                                @click="updateTag('delivery','shipping out')"> 
                                    <span class="ml-1"> {{$t('manage_order.filter_modal.delivery.shipping out')}} </span> 
                    </div>
                    <div class="col-span-6 lg:col-span-3 lg:my-1">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                            v-model="store.filterTagArray.delivery['to be shipping']" 
                                @click="updateTag('delivery','to be shipping')"> 
                                    <span class="ml-1"> {{$t('manage_order.filter_modal.delivery.to be shipping')}} </span> 
                    </div>
                    <div class="col-span-12  text-[20px] font-medium my-2"> {{$t('manage_order.filter_modal.platform.platform')}}</div>
                    <div class="col-span-6 lg:col-span-3 lg:my-1">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                            v-model="store.filterTagArray.platform['facebook']" 
                                @click="updateTag('platform','facebook')"> 
                                <span class="ml-1"> Facebook </span> 
                    </div>
                    <div class="col-span-6 lg:col-span-3 lg:my-1">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                            v-model="store.filterTagArray.platform['youtube']" 
                                @click="updateTag('platform','youtube')"> 
                                <span class="ml-1"> Youtube </span> 
                    </div>
                    <div class="col-span-6 lg:col-span-3 lg:my-1">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                            v-model="store.filterTagArray.platform['instagram']" 
                                @click="updateTag('platform','instagram')"> 
                                <span class="ml-1"> Instagram </span> 
                    </div>
                </div>
            </div>
        </ModalBody>
    </Modal>
</template>
<script setup>
import { ref, provide, onMounted, onUnmounted, getCurrentInstance } from "vue";
import { useManageOrderStore } from "@/stores/lss-manage-order";
import i18n from "@/locales/i18n"

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const store = useManageOrderStore()

const props = defineProps({
    tableFilter: String,
    tableStatus: String
});

function updateTag(type,tag){
    store.filterTagArray[type][tag] = !store.filterTagArray[type][tag]
}
function filter(){
    let data = {}
    for(const type in store.filterTagArray){
        data[type] = []
        for(const tag in store.filterTagArray[type]){
            if(store.filterTagArray[type][tag]){
                if(tag === 'to be shipping') data[type].push('complete')
                else data[type].push(tag)
            }
        }
    }
    eventBus.emit(props.tableFilter,{'filter_data':data})
    console.log(data)
    store.filterModal[props.tableStatus] = false
}

const closeFilter = () => {
    if(store.filterTagArray){
        let yes = confirm(`${i18n.global.t('manage_order.filter_modal.close_alert')}`)
	    if (yes) filter()
        else store.filterModal[props.tableStatus] = false
    }
    else store.filterModal[props.tableStatus] = false
}

</script>