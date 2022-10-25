<template>
    <Modal :show="categoryManagementStore.showCreateEditModal" @hidden="hideModal()" backdrop="static">
            <ModalBody class="p-10 text-center">
                <div class="mt-1">

                    <label for="regular-form-2" class="form-label" style="font-size: 1.2rem;" v-if="props.modalType==='create'">{{ $t(`stock.category_manage.create`) }}</label>
                    <label for="regular-form-2" class="form-label" style="font-size: 1.2rem;" v-else-if="props.modalType==='edit'">{{ $t(`stock.category_manage.edit`) }}</label>

                    <div class="text-left">
                        <input id="regular-form-2" type="text"
                            class="mt-3 form-control" placeholder="Category Name" 
                            v-model="productCategory.name" 
                            @blur="v.name.$touch()"    
                        />
                        <label class="block text-danger text-[12px] mx-3" 
                            v-for="error, index in v.name?.$errors"
                            :key="index">
                            {{ $t(`vulidate.${error.$validator}`) }}
                        </label>
                    </div>
                    
                    <div class="text-left">
                        <textarea 
                            class="mt-3 p-3 form-control"
                            :placeholder="'Description'"
                            v-model="productCategory.description"
                            @blur="v.description?.$touch()"
                        >
                        </textarea>
                        <label class="block text-danger text-[12px] mx-3" 
                            v-for="error, index in v.description?.$errors"
                            :key="index">
                            {{ $t(`vulidate.${error.$validator}`) }}
                        </label>
                    </div>
                    


                    <template v-for="field, fieldIndex in metaLogisticFields" :key="fieldIndex">

                        <div class="mt-3 text-left" v-if="field.type=='checkbox'"> 
                            <input 
                                class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-2" 
                                type="checkbox" 
                                v-model="productCategory.meta_logistic[field.key]"
                            />
                            <label class="w-full text-base">{{field.key}}</label>
                        </div> 

                        <div class="text-left" v-else-if="field.type=='input_number'"> 
                            
                            <!-- <label class="w-full text-base whitespace-nowrap">{{field.key}}</label> -->
                            <input 
                                class="mt-1 form-control w-full" 
                                type="number"
                                :max="field.max"
                                :min="field.min" 
                                v-model="productCategory.meta_logistic[field.key]"
                                @blur="v.meta_logistic?.[field.key]?.$touch()"
                            />
                            <label class="block text-danger text-[12px]" 
                                v-for="error, index in v.meta_logistic?.[field.key]?.$errors"
                                :key="index">
                                {{ $t(`settings.delivery.errors.${error.$validator}`) }}
                            </label>
                        </div> 





                    </template>
                    

                    <!-- <input id="regular-form-2" type="text" class="mt-3 form-control"
                        :placeholder="$t('stock.category_manage.input_holder')" v-model="categoryName" />
                    <div class="text-danger whitespace-nowrap " v-if="duplicateName">{{ $t('stock.category_manage.modal.warning_duplicate') }}</div> -->
                </div>
                <div class="flex justify-between">
                    <button class="w-32 btn dark:border-darkmode-400 mt-7" @click="hideModal()">{{ $t('stock.category_manage.modal.cancel') }}</button>

                    <button v-if="props.modalType==='create'" class="w-32 shadow-md btn btn-primary mt-7" @click="createProductCategory()">{{ $t('stock.category_manage.modal.save') }}</button>
                    <button v-if="props.modalType==='edit'" class="w-32 shadow-md btn btn-primary mt-7" @click="updateProductCategory()">{{ $t('stock.category_manage.modal.save') }}</button>
                </div>
            </ModalBody>
        </Modal>
</template>
<script setup>
import {create_product_category, update_product_category} from '@/api_v2/product_category'
import { onMounted, ref, computed, onUnmounted, defineProps, getCurrentInstance, reactive } from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useLSSCategoryManagementStore } from "@/stores/lss-category-management"
import dom from "@left4code/tw-starter/dist/js/dom";
import i18n from "@/locales/i18n"
import { helpers, required, requiredIf, numeric, integer, decimal, minValue, maxLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const layoutStore = useLSSSellerLayoutStore()
const categoryManagementStore = useLSSCategoryManagementStore()
const productCategory = ref({
    name:"",
    description:"",
    meta_logistic:{},
    meta:{},
})
const payloadBuffer = ref({})

const props = defineProps({
  modalType: String,
});


const productCategoryRules = computed(()=> {
    return {
        name: { required, maxLength:maxLength(225) },
        meta_logistic: { 
            flat_rate:{
                requiredIf:requiredIf(()=>{return productCategory.value.meta_logistic?.enable_flat_rate}),
                decimal,
            }
        },
    }
});

const v = useVuelidate(productCategoryRules, productCategory)

const metaLogisticFields = [
    {key:"enable_flat_rate",dataType:"boolean", default:false, type:'checkbox'},
    {key:"flat_rate",dataType:"number", default:0, type:'input_number', max:999999999, min:0},
]



onMounted(() => {
    eventBus.on('editProductCategory', (payload) => {
        payloadBuffer.value = JSON.parse(JSON.stringify(payload))
        productCategory.value = payloadBuffer.value.product_category
    })
})

onUnmounted(() => {
    eventBus.off('editCampaignProduct')
})

const createProductCategory = ()=>{
    create_product_category(productCategory.value, layoutStore.alert).then(res=>{
            layoutStore.userInfo.user_subscription.product_categories.unshift(res.data)
            layoutStore.notification.showMessageToast(i18n.global.t('edit_campaign_product.edit_product_modal.update_successfully'))
            hideModal()
        })
}

const updateProductCategory = () => {

    update_product_category(productCategory.value.id, productCategory.value, layoutStore.alert)
        .then(res => {
            console.log(res.data)
            layoutStore.userInfo.user_subscription.product_categories[payloadBuffer.value.index] = res.data
            layoutStore.notification.showMessageToast(i18n.global.t('edit_campaign_product.edit_product_modal.update_successfully'))
            hideModal()
        })
    
}


const hideModal = ()=>{
    productCategory.value = {
        name:"",
        description:"",
        meta_logistic:{},
        meta:{},
    }
    payloadBuffer.value = {}
    categoryManagementStore.showCreateEditModal = false
}




</script>