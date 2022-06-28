<template>
        <Modal class="text-center" :slideOver="true"  backdrop="static" :show="store.showInstantlyAddProductModal" @hidden="store.showInstantlyAddProductModal = false">
        <a @click="store.showInstantlyAddProductModal = !store.showInstantlyAddProductModal" class="absolute right-0 top-0 mt-3 mr-3">
            <XIcon class="w-8 h-8 text-slate-400" />
        </a>
        <ModalHeader class="text-center p-5">
            <h2 class="font-medium text-base text-center w-full">
                Instantly Add Product
            </h2>
        </ModalHeader>
        <ModalBody class="text-[16px]">
            <div class="text-left">
                <form class="flex flex-col p-2">
                    <div> <input type="checkbox" /> <span class="ml-2"> Save to Stock </span></div>
                    <label class="mt-5 mb-2">Product Name</label>
                    <input type="text" class="rounded-lg" 
                        v-model="validate.name.$model"
                        :class="{ 'border-danger text-danger border-2': validate.name.$error }" />
                    <template v-if="validate.name.$error">
                          <label class="text-danger" >
                            Please enter product name with atleast 3 digits
                          </label>
                    </template>

                    <label class="mt-5 mb-2">Category</label>
                    <select v-model="addProduct.category" class="w-full rounded-lg">
                        <option value="">Uncategorized</option>
                        <template v-for="(category, key) in categoryList" :key="key"> 
                            <option :value="category">{{category}}</option>
                        </template>
                    </select>

                    <label class="mt-5 mb-2">order Code</label>
                    <input type="text" class="rounded-lg" 
                        v-model="validate.code.$model"
                        :class="{ 'border-danger text-danger border-2': validate.code.$error }" />
                    <template v-if="validate.code.$error">
                          <label class="text-danger" >
                            Please enter order code with atleast 3 digits
                          </label>
                    </template>

                    <label class="mt-5 mb-2">Price</label>
                    <input type="text" class="rounded-lg" 
                        v-model="validate.price.$model"
                        :class="{ 'border-danger text-danger border-2': validate.price.$error }" />
                    <template v-if="validate.price.$error">
                          <label class="text-danger" >
                            Please enter product price
                          </label>
                    </template>

                    <label class="mt-5 mb-2">Q’TY</label>
                    <input type="text" class="rounded-lg" 
                        v-model="validate.qty.$model"
                        :class="{ 'border-danger text-danger border-2': validate.qty.$error }" />
                    <template v-if="validate.qty.$error">
                          <label class="text-danger" >
                            Please enter product quantity above value of one 
                          </label>
                    </template>
                </form>
                <button class="btn btn-primary mt-10 ml-auto"
                    @click="apply()" > Apply</button>
            </div>
        </ModalBody>
    </Modal>
</template>

<script setup>

import { ref, onMounted, computed,getCurrentInstance} from 'vue';
import { useRoute, useRouter } from "vue-router";
import { fast_add_product } from '@/api/campaign_product';
import { list_product_category} from '@/api_v2/product';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list";
import { useVuelidate } from "@vuelidate/core";
import { required,minValue, integer, minLength } from "@vuelidate/validators";


const router = useRouter();
const route = useRoute();
const store = useLSSCampaignListStore(); 
const layoutStore = useLSSSellerLayoutStore(); 
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const categoryList = ref([])
const campaign_id = route.params.campaign_id
// const campaign_product = ref(productList.value)
const addProduct = ref({
    name: '', 
    category: '',
    code: '', 
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
    fast_add_product(campaign_id,addProduct.value.code,addProduct.value.price,addProduct.value.qty ).then(
        response =>{
            console.log(response.data);
            eventBus.emit("addInstantProduct", response.data);
        }
    ).catch(function (error) {
		console.log(error);
	});
} 

const apply = ()=>{
    validate.value.$touch();
    if (validate.value.$invalid) {
        layoutStore.alert.showMessageToast("Invild Data Inputed")
        return
    }else 
    addtoCampaign()
    layoutStore.notification.showMessageToast("Successed")
    store.showInstantlyAddProductModal = false
}

onMounted(() => {
    list();
})

const rules = computed(()=>{
    return{
        name:{required, minLength: minLength(3)},
        code:{required, minLength: minLength(3)},
        price: {required, integer},
        qty: {required, minValue: minValue(1), integer}  
    }
});

const validate = useVuelidate(rules, addProduct);

</script>
