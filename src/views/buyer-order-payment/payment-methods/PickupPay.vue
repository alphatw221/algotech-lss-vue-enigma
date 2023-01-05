<template>

    <AccordionItem  class="mx-5" >
        <Accordion class="bg-primary rounded-t-lg" >
            <div class="text-white mx-5 text-[20px]" > 超商貨到付款 </div>
        </Accordion>
        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary" >
            <div v-if="store.order.campaign" class="grid grid-cols-3 justify-center text-left mx-5 sm:mx-20 text-[16px] gap-1">
                <lable class="col-span-3 col-start-1 text-center my-3 text-[20px]"> 超商資訊:</lable>
                <p class="col-span-3"> {{ store.order.shipping_option_data.LogisticsSubType == 'UNIMARTC2C'? '7-11店到店':'全家店到店' }}</p>
                <p> 門市名稱: </p>
                <p class="col-span-2">{{store.order.shipping_option_data.cvs_store_name}}</p>
                <p> 地址: </p>
                <p class="col-span-2">{{store.order.shipping_option_data.cvs_address}}</p>
                <p> 店號: </p>
                <p class="col-span-2">{{store.order.shipping_option_data.cvs_store_id}}</p>
                <template v-if="store.order.shipping_option_data.cvs_telephone">
                    <p> 門市電話: </p>
                    <p class="whitespace-nowrap">{{store.order.shipping_option_data.cvs_telephone}}</p>
                </template>   
                
                <button
                    :disabled="uploadPickupPayLoading" 
                    class="col-span-3 w-fit btn btn-primary rounded-lg mt-10 mb-3 ml-auto" 
                    @click.once="cash_on_delivery()">
                    貨到付款  
                </button>
            </div>
        </AccordionPanel>
    </AccordionItem>
    <Modal :show="uploadPickupPayLoading" @hidden="!uploadPickupPayLoading" class="text-center" backdrop="static">
        <ModalBody class="">
          <div class="flex flex-col"> 
            <p class="text-lg text-primary font-medium"> {{$t('shopping_cart.payment.processing')}} </p>
            <LoadingIcon icon="loading_payment"/>
          </div>
        </ModalBody>
    </Modal>
</template>

<script setup>
import {onMounted, computed, watch, ref} from "vue"
import { useRoute, useRouter } from "vue-router";
import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
import { create_ecpay_delivery_order } from "@/api_v2/delivery" 

const store = useLSSBuyerOrderStore();
const layoutStore = useLSSBuyerLayoutStore()

const route = useRoute();
const router = useRouter();
const uploadPickupPayLoading = ref(false)

const cash_on_delivery = () =>{
    uploadPickupPayLoading.value = true
    create_ecpay_delivery_order(route.params.order_oid,{'is_collection': 'Y'}, layoutStore.alert).then(
    res=>{
        // console.log(res.data)
        uploadPickupPayLoading.value = false
        layoutStore.notification.showMessageToast(res.data.RtnMsg)
        router.push(`/buyer/order/${route.params.order_oid}/confirmation`)
    }
  ).catch( err=>{ uploadPickupPayLoading.value = false})
  
}

</script>
