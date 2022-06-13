<template>
    <div>
        <table class="table table-report overflow-x-scroll">
            <thead>
                <tr>
                    <th class="whitespace-normal truncate hover:text-clip items-center" v-for="column in tableColumns"
                        :key="column.key">
                        {{ column.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in campaignStore.assignedProducts" :key="index" class="intro-x">
                    <td v-for="column in tableColumns" :key="column.key" 
                        class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center"
                    >
                        <template v-if="column.key === 'image'">
                            <div class="flex">
                                <div class="w-10 h-10 image-fit zoom-in lg:w-12 lg:h-12 2xl:w-12 lg:h-12">
                                    <Tippy 
                                        tag="img" 
                                        class="rounded-full" 
                                        :src="`${publicPath}` + product.image"
                                    />
                                </div>
                            </div>
                        </template>
                        <template v-else-if="column.key === 'selected' || column.key === 'editable' || column.key === 'deletable'">
                            <div class="form-check mt-2 self-center place-content-center">
                                <input 
                                    id="selectCheckbox" 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    v-model="product[column.key]"
                                />
                            </div>
                        </template>
                        <template v-else-if="column.key === 'order_code'" >
                            <div class="form-check self-center place-content-center">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    :class="{ red: isOrderCodeDuplicate(index) }"
                                    aria-label="default input" 
                                    :value="product.order_code"
                                    style="width: 4rem; height: 2rem; margin-top: 5px;"
                                    @input="changeInput($event, index, 'order_code')"
                                />
                            </div>
                        </template>
                        <template v-else-if="column.key === 'qty_campaign'">
                            <div class="form-check self-center place-content-center">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    aria-label="default input" 
                                    :value="product.qty"
                                    style="width: 4rem; height: 2rem; margin-top: 5px;"
                                    @input="changeInput($event, index, 'qty_campaign')"
                                />
                            </div>
                        </template>
                        <template v-else-if="column.key === 'max_order'">
                            <div class="form-check self-center place-content-center">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    aria-label="default input" 
                                    :value="product.max_order_amount"
                                    style="width: 4rem; height: 2rem; margin-top: 5px;"
                                    @input="changeInput($event, index, 'max_order')"
                                />
                            </div>
                        </template>
                        <template v-else-if="column.key === 'tag'" v-for="tag in product[column.key]">
							<div>{{ tag }}</div> 
						</template>
                        <template v-else-if="column.key === 'price'">
                            <div class="w-12">{{ product.currency_sign }} {{ product[column.key] }}</div>
                        </template>
                        <template v-else-if="column.key === 'name'">
                            <div class="truncate hover:text-clip lg:w-28 2xl:w-36">{{ product[column.key] }}</div>
                        </template>
                        <template v-else-if="column.key === 'status'">
                            <div class="form-switch mt-2">
                                <input 
                                    type="checkbox" 
                                    class="form-check-input" 
                                    v-model="product[column.key]"
                                />
                            </div>
                        </template>
                        <template v-else>
                            <div class="w-fit self-center place-content-center"> {{ product[column.key] }} </div>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>

        <Modal :show="warningModalPreview" @hidden="warningModalPreview = false">
            <ModalBody class="p-0">
                <div class="p-5 text-center">
                    <XCircleIcon class="w-16 h-16 text-warning mx-auto mt-3" />
                    <div class="text-3xl mt-5">Oops...</div>
                    <div class="text-slate-500 text-lg mt-2">{{ warningModalText }}</div>
                </div>
                <div class="px-5 pb-8 text-center">
                    <button type="button" @click="warningModalPreview = false" class="btn w-24 btn-primary">
                        Ok
                    </button>
                </div>
            </ModalBody>
        </Modal>
        
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance, computed } from 'vue';
import { useCreateCampaignStore } from "@/stores/lss-create-campaign";
import { useRoute, useRouter } from "vue-router";

const campaignStore = useCreateCampaignStore(); 
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const publicPath = ref(import.meta.env.VITE_APP_IMG_URL)
const route = useRoute();
const router = useRouter();

const dataCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const productsList = ref([])
const category = ref(undefined)

const warningModalPreview = ref(false)
const emptyTitle = ref(false)
const duplicateOrderCode = ref(false)

const tableColumns = ref([
	{ name: "Image", key: "image" },
	{ name: "Product Name", key: "name" },
	{ name: "Order Code", key: "order_code" },
	{ name: "Qty for Campaign", key: "qty_campaign" },
	{ name: "Max Qty / Order", key: "max_order" },
	{ name: "Category", key: "tag" },
	{ name: "Price", key: "price" },
	{ name: "Editable", key: "editable" },
	{ name: "Deletable", key: "deletable" },
	{ name: "Type", key: "type" },
    { name: "Activate", key: "status" }
])

onMounted(() => {
    campaignStore.assignedProducts.forEach((item) => {
        if (item.status == 'enabled') item.status = true
        else if (item.status == 'disabled') item.status = false
    });
   
   eventBus.on('confirmProducts', () => {
        let campaignTitle = campaignStore.campaignTitle
        let orderCodeList = []
        campaignStore.assignedProducts.forEach((item) => {
            orderCodeList.push(item.order_code)
        })
 
        emptyTitle.value = false
        duplicateOrderCode.value = false
        if (campaignTitle == undefined || campaignTitle == '') {
            emptyTitle.value = true
            warningModalPreview.value = true
            return
        } else if (new Set(orderCodeList).size !== orderCodeList.length) {
            duplicateOrderCode.value = true
            warningModalPreview.value = true
            return
        } 
        router.push('create-campaign/details')
        console.log(campaignStore.assignedProducts)
   })
})

onUnmounted(() => {
    eventBus.off('confirmProducts')
})

const warningModalText = computed(() => {
    if (emptyTitle.value == true) return 'Please enter campaign title !'
    else if (duplicateOrderCode.value == true) return 'There are duplicated order code, please rename it.'
})

const changeInput = (event, index, type) => {
    if (type == 'order_code') {
        campaignStore.assignedProducts[index].order_code = event.target.value
    } else {
        if (event.target.value == '') event.target.value = 1 

        if (event.target.value <= campaignStore.assignedProducts[index].qty) {
            if (type == 'qty_campaign') {
                campaignStore.assignedProducts[index].qty_campaign = event.target.value
            } else if (type == 'max_order') {
                campaignStore.assignedProducts[index].max_order_amount = event.target.value
            }
        } else {
            alert('input number is over product max quantity')
            return
        } 
    }
    console.log(campaignStore.assignedProducts[index])
}

const isOrderCodeDuplicate = (index) => {
    let this_order_code = campaignStore.assignedProducts[index].order_code
    for (let i = 0; i < campaignStore.assignedProducts.length; i ++) {
        if (i != index && campaignStore.assignedProducts[i].order_code == this_order_code) {
            return true
        }
    }
}

</script>

<style scoped>

.red {
    border-color: red !important;
}

</style>