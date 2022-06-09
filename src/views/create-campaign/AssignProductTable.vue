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
                <tr v-for="(product, index) in productsList" :key="index" class="intro-x">
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
                        <template v-else-if="column.key === 'order_code'">
                            <div class="form-check self-center place-content-center">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    aria-label="default input" 
                                    :value="product.order_code"
                                    @input="changeInput($event, index, 'order_code')"
                                    style="width: 4rem; height: 2rem; margin-top: 5px;"
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
                                    @input="changeInput($event, index, 'qty_campaign')"
                                    style="width: 4rem; height: 2rem; margin-top: 5px;"
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
                                    @input="changeInput($event, index, 'max_order')"
                                    style="width: 4rem; height: 2rem; margin-top: 5px;" 
                                />
                            </div>
                        </template>
                        <template v-else-if="column.key === 'price'">
                            <div class="w-12">{{ product.currency_sign }} {{ product[column.key] }}</div>
                        </template>
                        <template v-else-if="column.key === 'name'">
                            <div class="truncate hover:text-clip lg:w-28 2xl:w-36">{{ product[column.key] }}</div>
                        </template>
                        <template v-else>
                            <div class="w-fit self-center place-content-center"> {{ product[column.key] }} </div>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
            <Page 
                :total="dataCount" 
                show-sizer 
                @on-change="changePage" 
                @on-page-size-change="changePageSize" 
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance} from 'vue';
import { useCreateCampaignStore } from "@/stores/lss-create-campaign";
import { list_product } from '@/api_v2/product';

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
	{ name: "Selected", key: "selected" },
	{ name: "Image", key: "image" },
	{ name: "Product Name", key: "name" },
	{ name: "Order Code", key: "order_code" },
	{ name: "Qty for Campaign", key: "qty_campaign" },
	{ name: "Max Qty / Order", key: "max_order" },
	{ name: "Quantity", key: "qty" },
	{ name: "Price", key: "price" },
	{ name: "Editable", key: "editable" },
	{ name: "Deletable", key: "deletable" },
	{ name: "Type", key: "type" }
])

onMounted(() => {
    search()

    eventBus.on("assignTable", (payload) => {
        currentPage.value = 1
        pageSize.value = payload.pageSize
        category.value = payload.filterColumn
        search()
    })

    eventBus.on("addProducts", () => {
        addProdcuts()
    })
})

onUnmounted(() => {
    eventBus.off("assignTable");
})

const search = () => {
    list_product(pageSize.value, currentPage.value, undefined, undefined, 'enabled', category)
    .then(response => {
        dataCount.value = response.data.count
        productsList.value = response.data.results
        for (let i = 0; i < productsList.value.length; i ++) {
            productsList.value[i].qty_campaign = 1
            productsList.value[i].selected = false
            productsList.value[i].editable = false
            productsList.value[i].deletable = false
        } 

        // 跳頁時選取記憶 selected, editable, deletable 欄位
        if (campaignStore.assignedProducts.length > 0) {
            for (let i = 0; i < campaignStore.assignedProducts.length; i ++) {
                for (let j = 0; j < productsList.value.length; j ++) {
                    if (campaignStore.assignedProducts[i].id == productsList.value[j].id) {
                        productsList.value[j] = campaignStore.assignedProducts[i]
                    }
                }
            }
        }
    }).catch(function (error) {
        console.log(error);
    })
}

const changePage = (page) => {
    currentPage.value = page
    addProdcuts()
    search()
}

const changePageSize = (page_size) => {
    pageSize.value = page_size
    search()
}

const changeInput = (event, index, type) => {
    if (type == 'order_code') {
        productsList.value[index].order_code = event.target.value
    } else {
        if (event.target.value == '') event.target.value = 1 

        if (event.target.value <= productsList.value[index].qty) {
            if (type == 'qty_campaign') {
                productsList.value[index].qty_campaign = event.target.value
            } else if (type == 'max_order') {
                productsList.value[index].max_order_amount = event.target.value
            }
        } else {
            alert('input number is over product max quantity')
            return
        } 
    }
}

// 把選取且無重複的product加入store
const addProdcuts = () => {
    let assignProductIdList = []
    if (campaignStore.assignedProducts.length > 0) {
        for (let j = 0; j < campaignStore.assignedProducts.length; j ++) {
            assignProductIdList.push(campaignStore.assignedProducts[j].id)
        }
    }

    for (let i = 0; i < productsList.value.length; i ++) {
        if (productsList.value[i].selected == true && !assignProductIdList.includes(productsList.value[i].id)) {
            campaignStore.$patch((state) => {
                state.assignedProducts.push(productsList.value[i])
            })
        }
    }
    console.log(campaignStore.assignedProducts)
}
</script>