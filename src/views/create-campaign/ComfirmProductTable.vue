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
                                    disabled
                                />
                            </div>
                        </template>
                        <template v-else-if="column.key === 'order_code'">
                            <div class="form-check self-center place-content-center">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    aria-label="default input" 
                                    :value="product.order_code"
                                    style="width: 4rem; height: 2rem; margin-top: 5px;"
                                    @input="changeOrderCode($event, index)"
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
                                    disabled
                                />
                            </div>
                        </template>
                        <template v-else-if="column.key === 'max_order'">
                            <div class="form-check self-center place-content-center">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    aria-label="default input" 
                                    :value="product.qty"
                                    style="width: 4rem; height: 2rem; margin-top: 5px;"
                                    disabled
                                />
                            </div>
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
        <!-- <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
            <Page 
                :total="dataCount" 
                show-sizer 
                @on-change="changePage" 
                @on-page-size-change="changePageSize" 
            />
        </div> -->
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance} from 'vue';
import { useCreateCampaignStore } from "@/stores/lss-create-campaign";
import { list } from '@/api_v2/stock';

const campaignStore = useCreateCampaignStore(); 
const internalInstance = getCurrentInstance();
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const publicPath = ref(import.meta.env.VITE_APP_IMG_URL)

const dataCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const productsList = ref([])
const category = ref(undefined)

const tableColumns = ref([
	{ name: "Image", key: "image" },
	{ name: "Product Name", key: "name" },
	{ name: "Order Code", key: "order_code" },
	{ name: "Qty for Campaign", key: "qty_campaign" },
	{ name: "Max Qty / Order", key: "max_order" },
	{ name: "Quantity", key: "qty" },
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

   console.log(campaignStore.assignedProducts)
})

onUnmounted(() => {

})

const changeOrderCode = (event, index) => {
    campaignStore.assignedProducts[index].order_code = event.target.value
    console.log(campaignStore.assignedProducts)
}

</script>