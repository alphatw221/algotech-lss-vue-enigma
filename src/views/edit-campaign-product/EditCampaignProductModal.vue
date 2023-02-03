<template>
    <Modal backdrop="static" :show="campaignDetailStore.showEditCampaignProductModal" @hidden="hideModal()">
        <ModalHeader>
            <h2 class="font-medium text-base m-auto ">
                {{$t('edit_campaign_product.edit_product_modal.edit_campaign_product')}}
            </h2>
            <a @click="hideModal()" class="absolute top-0 right-0 mt-3 mr-3" href="javascript:;">
                <XIcon class="w-8 h-8 text-slate-400" />
            </a>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-5 ">
            <template v-for="(column, index) in computedTableColumns" :key="index">
                <template v-if="column.type ==='checkbox'"> 
                    <div class="col-span-6 flex flex-row gap-5">
                        <input 
                            v-if="column.key ==='customer_editable'"
                            @click="productEditable($event)"
                            class="form-check-input w-[1.2rem] h-[1.2rem] col-span-1"
                            type="checkbox" 
                            v-model="campaignProduct[column.key]" 
                        />
                        <input 
                            v-else-if="column.key ==='customer_removable'"
                            @click="productRemovable($event)"
                            class="form-check-input w-[1.2rem] h-[1.2rem] col-span-1"
                            type="checkbox" 
                            v-model="campaignProduct[column.key]" 
                        />
                        <input 
                            v-else
                            class="form-check-input w-[1.2rem] h-[1.2rem] col-span-1"
                            type="checkbox" 
                            v-model="campaignProduct[column.key]" 
                        />
                        <label for="modal-form-1 col-span-1">{{$t(`edit_campaign_product.edit_product_modal.${column.key}`)}}</label>
                    </div>
                </template>
                
                <div class="col-span-12"  v-else-if="column.key === 'name'">
                    <label for="modal-form-1">{{$t(`product.${column.key}`)}}</label>
                    <input type="text" class="form-control" v-model="campaignProduct[column.key]"/>
                    
                </div>

                <div class="col-span-12"  v-else-if="column.key === 'sku'">
                    <label for="modal-form-1">{{$t(`product.${column.key}`)}}</label>
                    <input type="text" class="form-control" v-model="campaignProduct[column.key]"/>
                    
                </div>


                <div class="col-span-12" v-else-if="column.key === 'type'">
                    <label for="modal-form-1">{{$t(`edit_campaign_product.edit_product_modal.${column.key}`)}}</label>
                    <select class="form-select" v-model="campaignProduct[column.key]" >
                        <option v-for="(type, index) in typeSelection" :key="index" :value="type.value">
                            {{$t(`edit_campaign_product.edit_product_modal.types.${type.value}`)}}
                        </option>
                    </select>
                </div> 

                <div class="col-span-12"  v-else-if="column.key === 'price'">
                    <label for="modal-form-1">{{$t(`edit_campaign_product.edit_product_modal.${column.key}`)}}</label>
                    <input type="number" class="form-control" v-model="v[column.key].$model"/>
                    <template v-if="v[column.key]">
                        <label class="text-danger text-[12px] block" 
                            v-for="error,index in v[column.key].$errors"
                            :key="index"
                            >
                            {{ $t(`edit_campaign_product.edit_product_modal.errors.${error.$validator}`) }}
                        </label>
                    </template>
                </div>

                <div class="col-span-12"  v-else-if="column.key === 'order_code'">
                    <label for="modal-form-1">{{$t(`edit_campaign_product.edit_product_modal.${column.key}`)}}</label>
                    <input type="text" class="form-control" v-model="v[column.key].$model"/>
                    <template v-if="v[column.key]">
                        <label class="text-danger text-[12px] block" 
                            v-for="error,index in v[column.key].$errors"
                            :key="index"
                            >
                            {{ $t(`edit_campaign_product.edit_product_modal.errors.${error.$validator}`) }}
                        </label>
                    </template>
                </div>
                <div class="col-span-12" v-else-if="column.key === 'qty_for_sale'">
                    <label for="modal-form-1">{{$t(`edit_campaign_product.edit_product_modal.${column.key}`)}}</label>
                    <input type="number" class="form-control" v-model.number="v[column.key].$model"/>
                    <template v-if="v[column.key]">
                        <label class="text-danger text-[12px] block" 
                            v-for="error,index in v[column.key].$errors"
                            :key="index"
                            >
                            {{ $t(`edit_campaign_product.edit_product_modal.errors.${error.$validator}`) }}
                        </label>
                    </template>
                </div>
                <div class="col-span-12" v-else-if="column.key === 'max_order_amount'">
                    <label for="modal-form-1">{{$t(`edit_campaign_product.edit_product_modal.${column.key}`)}}</label>
                    <input type="number" class="form-control" v-model.number="v[column.key].$model"/>
                    <template v-if="v[column.key]">
                        <label class="text-danger text-[12px] block" 
                            v-for="error,index in v[column.key].$errors"
                            :key="index"
                            >
                            {{ $t(`edit_campaign_product.edit_product_modal.errors.${error.$validator}`) }}
                        </label>
                    </template>
                </div>
                
            </template>
        </ModalBody>
        <ModalFooter>
            <button 
                class="btn btn-outline-secondary w-20 mr-1"
                type="button" 
                @click="hideModal()" > 
                {{$t(`edit_campaign_product.edit_product_modal.cancel`)}}
            </button>
            <button 
                class="btn btn-primary w-20"
                type="button" 
                @click="updateProduct()">
                {{$t(`edit_campaign_product.edit_product_modal.update`)}}
            </button>
        </ModalFooter>
    </Modal>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance, computed,watch } from 'vue';
import { seller_update_campaign_product } from '@/api_v2/campaign_product';
import { useRoute } from 'vue-router';
import { useCampaignDetailStore } from '@/stores/lss-campaign-detail';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

import { required, integer, minValue, maxValue,decimal } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import i18n from "@/locales/i18n"
const props = defineProps({ campaignStarted: Boolean} )
const layoutStore = useLSSSellerLayoutStore()
const campaignDetailStore = useCampaignDetailStore()
const route = useRoute()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const campaignProduct = ref({
    name:"",
    sku:"",
    order_code:"",
    qty_for_sale:0,
    max_order_amount:0,
    price:0,
    type:null,
    oversell:false,
    customer_editable:false,
    customer_removable:false,
    pinned:false,
})


const campaignProductRules = computed(() => {
	return { 	
        order_code:{required},
        qty_for_sale:{required,integer, minValue:minValue(0)},
        max_order_amount:{integer, maxValue:maxValue(campaignProduct.value.qty_for_sale)},
        price:{required,decimal, minValue:minValue(0) },
    }
})

const v = useVuelidate(campaignProductRules, campaignProduct);

const computedTableColumns = computed(()=>{
    let columns = [
        { name: "Product Name", key: "name", type:"input" },
        { name: "SKU", key: "sku", type:"input" },
        { name: "Order Code", key: "order_code", type:"input" },
        { name: "Qty for Campaign", key: "qty_for_sale", type:"input" },
        { name: "Max Qty / Order", key: "max_order_amount", type:"input" },
        { name: "Price", key: "price", type:"input" },
        { name: "Type", key: "type", type:"select" },
        { name: "Description", key: "description", type:"textarea" },
        { name: "Oversell", key: "oversell", type:"checkbox" },
        { name: "Editable", key: "customer_editable", type:"checkbox" },
        { name: "Deletable", key: "customer_removable", type:"checkbox" },
        { name: "Pinned", key: "pinned", type:"checkbox" },
    ]
    if(campaignProduct.value.type == 'lucky_draw'){
        columns = columns.filter(column=>column.key !== 'order_code' )
		columns = columns.filter(column=>column.key !== 'max_order_amount' )
		columns = columns.filter(column=>column.type !== 'checkbox' )
    }
    // if(props.campaignStarted){
    //     columns = columns.filter(column=>column.key !== 'order_code' )
    //     columns = columns.filter(column=>column.key !== 'qty_for_sale' )
    //     columns = columns.filter(column=>column.key !== 'type' )
	// 	columns = columns.filter(column=>column.key !== 'max_order_amount' )
    // }

    return columns
})

const typeSelection = [
    { name: 'Product', value: 'product' },
    { name: 'Lucky Draw', value: 'lucky_draw' }
]

const payloadBuffer = ref({})
onMounted(() => {
    eventBus.on('editCampaignProduct', (payload) => {
        payloadBuffer.value = payload
        campaignProduct.value = payload.campaignProduct
        console.log(campaignProduct.value)
    })
})

const productEditable = (event)=>{if(!event.target.checked)campaignProduct.value.customer_removable=false}
const productRemovable = (event)=>{if(event.target.checked)campaignProduct.value.customer_editable=true}


onUnmounted(() => {
    eventBus.off('editCampaignProduct')
})

const updateProduct = () => {
    v.value.$touch()
    if(v.value.$invalid){
        layoutStore.alert.showMessageToast(i18n.global.t('edit_campaign_product.edit_product_modal.invalid_data'))
        return
    }
    if(typeof campaignProduct.value.max_order_amount != 'number') campaignProduct.value.max_order_amount = null
    seller_update_campaign_product(campaignProduct.value.id, campaignProduct.value)
    .then(res => {
        // console.log(res.data)
        campaignDetailStore.campaignProducts[payloadBuffer.value.index] = res.data
        layoutStore.notification.showMessageToast(i18n.global.t('edit_campaign_product.edit_product_modal.update_successfully'))
        hideModal()
    })
}

const hideModal = ()=>{
    campaignDetailStore.showEditCampaignProductModal = false
    campaignProduct.value = {}
    payloadBuffer.value = {}
}
</script>