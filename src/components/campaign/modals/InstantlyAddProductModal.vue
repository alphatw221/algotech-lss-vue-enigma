<template>
        <Modal class="text-center" :slideOver="true"  backdrop="static" :show="store.showInstantlyAddProductModal" @hidden="store.showInstantlyAddProductModal = false">
        <a @click="store.showInstantlyAddProductModal = false" class="absolute right-0 top-0 mt-3 mr-3">
            <XIcon class="w-8 h-8 text-slate-400" />
        </a>
        <ModalHeader class="text-center p-5">
            <h2 class="font-medium text-base text-center w-full">
                {{$t('campaign_live.product.instantly')}}
            </h2>
        </ModalHeader>
        <ModalBody class="text-[16px]">
            <div class="text-right">
                <form class="flex flex-col p-2 text-left">
                    <div> <input type="checkbox" v-model="addProduct.save_to_stock"/> <span class="ml-2"> {{$t('campaign_live.product.save_to_stock')}} </span></div>
                    <label class="mt-5 mb-2">{{$t('campaign_live.product.modal_column.name')}}</label>
                    <input type="text" class="rounded-lg" 
                        v-model="validate.name.$model"
                        :class="{ 'border-danger text-danger border-2': validate.name.$error }" />
                    <template v-if="validate.name.$error">
                          <label class="text-danger" >
                            product name required, with no more than 40 digits
                          </label>
                    </template>

                    <label class="mt-5 mb-2">{{$t('campaign_live.product.modal_column.category')}}</label>
                    <select v-model="addProduct.category" class="w-full rounded-lg">
                        <option value="">Uncategorized</option>
                        <template v-for="(category, key) in categoryList" :key="key"> 
                            <option :value="category">{{category}}</option>
                        </template>
                    </select>

                    <label class="mt-5 mb-2">{{$t('campaign_live.product.modal_column.order_code')}}</label>
                    <input type="text" class="rounded-lg" 
                        v-model="validate.order_code.$model"
                        :class="{ 'border-danger text-danger border-2': validate.order_code.$error }" />
                    <template v-if="validate.order_code.$error">
                          <label class="text-danger" >
                            order code required
                          </label>
                    </template>

                    <label class="mt-5 mb-2">{{$t('campaign_live.product.modal_column.price')}}</label>
                    <input type="text" class="rounded-lg" 
                        v-model="validate.price.$model"
                        :class="{ 'border-danger text-danger border-2': validate.price.$error }" />
                    <template v-if="validate.price.$error">
                          <label class="text-danger" >
                            price required
                          </label>
                    </template>

                    <label class="mt-5 mb-2">{{$t('campaign_live.product.modal_column.qty')}}</label>
                    <input type="text" class="rounded-lg" 
                        v-model="validate.qty.$model"
                        :class="{ 'border-danger text-danger border-2': validate.qty.$error }" />
                    <template v-if="validate.qty.$error">
                          <label class="text-danger" >
                            qty must be above 1 
                          </label>
                    </template>
                </form>
                <button class="btn btn-primary mt-10 w-32 shadow-md"
                    @click="apply()" > {{$t('campaign_live.product.apply')}}</button>
            </div>
        </ModalBody>
    </Modal>
</template>

<script setup>

import { ref, onMounted, computed,getCurrentInstance} from 'vue';
import { useRoute, useRouter } from "vue-router";
import { fast_add_product } from '@/api_v2/campaign';
import { list_product_category} from '@/api_v2/product';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { useVuelidate } from "@vuelidate/core";
import { required,minValue, decimal, integer, maxLength } from "@vuelidate/validators";
import i18n from "@/locales/i18n"

const router = useRouter();
const route = useRoute();
const store = useCampaignDetailStore(); 
const layoutStore = useLSSSellerLayoutStore(); 
// const internalInstance = getCurrentInstance()
// const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const categoryList = ref([])
const campaign_id = route.params.campaign_id
// const campaign_product = ref(productList.value)
const addProduct = ref({
    save_to_stock:false,
    name: '', 
    category: '',
    order_code: '', 
    price: '', 
    qty: '',
    status: true, 
})

const list = () => {
    list_product_category().then(
        response => {
            categoryList.value = response.data;
        }
    )
}

const addtoCampaign =()=>{
    fast_add_product(campaign_id,addProduct.value ).then(
        response =>{
            console.log(response.data);
            store.campaignProducts.push(response.data)
            layoutStore.notification.showMessageToast(i18n.global.t('campaign_live.product.successed'))
        }
    )
} 

const apply = ()=>{
    validate.value.$touch();
    if (validate.value.$invalid) {
        layoutStore.alert.showMessageToast(i18n.global.t('campaign_live.product.invalid_data'))
        return
    }else 
    addtoCampaign()
    store.showInstantlyAddProductModal = false
}

onMounted(() => {
    list();
})

const rules = computed(()=>{
    return{
        name:{required, maxLength: maxLength(40)},
        order_code:{required, maxLength: maxLength(10)},
        price:{required, decimal},
        qty: {required, minValue: minValue(1), integer}  
    }
});

const validate = useVuelidate(rules, addProduct);

</script>
