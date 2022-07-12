<template>
    <div class="overflow-x-auto overflow-y-auto h-[67vh] sm:h-[62vh]">
        <table class="table table-report ">
            <thead>
                <tr>
                    <th class="items-center truncate whitespace-normal hover:text-clip" v-for="column in tableColumns"
                        :key="column.key">
                        {{ column.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in campaignStore.assignedProducts" :key="index" class="intro-x">
                    <template v-for="column in tableColumns" :key="column.key" class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center">

                        <td v-if="column.key === 'image'"
                            class="w-18 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 imgtd"> 
                            <div class="flex items-center justify-center">
                                <div class="w-[120px] h-[120px] image-fit zoom-in lg:w-12 lg:h-12 2xl:w-12 place-items-center">
                                    <Tippy 
                                        tag="img" 
                                        class="rounded-lg cursor-auto" 
                                        :src="`${publicPath}` + product.image"
                                        :content="product.name"
                                    />
                                </div>
                            </div>
                        </td>

                        <td v-else-if="column.key === 'name'" class="w-20 name">
                            <div class="w-full"> {{ product[column.key] }} </div>
                        </td>

                        <td v-else-if="column.key === 'order_code'">
                            <div class=" form-check place-content-end sm:place-content-center">
                                <input type="text" class="form-control w-full sm:w-24 h-[42px] mt-1 inputBox" :class="{ red: isOrderCodeDuplicate(index) }"
                                    aria-label="default input" :value="product.order_code"
                                    @input="changeInput($event, index, 'order_code')" />
                            </div>
                        </td>
                        <td v-else-if="column.key === 'qty'">
                            <div class=" form-check place-content-end sm:place-content-center">
                                <input type="text" class="form-control w-full sm:w-24 h-[42px] mt-1 inputBox" aria-label="default input" :value="product.qty"
                                    @input="changeInput($event, index, 'qty')" />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'max_order'">
                            <div class=" form-check place-content-end sm:place-content-center">
                                <input type="text" class="form-control w-full sm:w-24 h-[42px] mt-1 inputBox" aria-label="default input"
                                    :value="product.max_order_amount"
                                    @input="changeInput($event, index, 'max_order')" />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'tag'"
                            class="my-2 w-full text-[12px] lg:w-18 lg:text-sm 2xl:w-32 items-end">
                            <div v-for="(tag,index) in product[column.key]" :key="index">
                                {{ tag }}
                            </div>
                        </td>

                        <td v-else-if="column.key === 'price'" class="w-18">
                            {{ product.currency_sign }} {{ product[column.key] }}
                        </td>

                        <td v-else-if="column.key === 'editable'" class="editable">
                            <div class=" form-check place-content-end sm:place-content-center">
                                <input v-if="product.type === 'lucky_draw'"
                                    id="selectCheckbox" 
                                    class="form-check-input w-[1.2rem] h-[1.2rem]" 
                                    type="checkbox" 
                                    disabled
                                    v-model="product[column.key]"
                                />
                                <input v-else
                                    id="selectCheckbox" 
                                    class="form-check-input w-[1.2rem] h-[1.2rem]" 
                                    type="checkbox"
                                    v-model="product[column.key]"
                                    @click="product.deletable = false" 
                                />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'deletable'" class="deletable">
                            <div class=" form-check place-content-end sm:place-content-center">
                                <input 
                                    v-if="product.editable === true" 
                                    id="selectCheckbox" 
                                    class="form-check-input w-[1.2rem] h-[1.2rem]" 
                                    type="checkbox" 
                                    v-model="product[column.key]"
                                />
                                <input 
                                    v-else
                                    id="selectCheckbox" 
                                    class="form-check-input w-[1.2rem] h-[1.2rem]" 
                                    type="checkbox" 
                                    disabled
                                    v-model="product[column.key]"
                                />
                            </div>
                        </td>
                        <td v-else-if="column.key === 'status'" class="form-switch status">
                            <input 
                                type="checkbox" 
                                class="form-check-input" 
                                v-model="product[column.key]" 
                                />
                        </td>
                        <td v-else-if="column.key === 'type'" class="type">
                                {{ product[column.key] }}
                        </td>
                    </template>

                </tr>
            </tbody>
        </table>

        <Modal :show="warningModalPreview" @hidden="warningModalPreview = false">
            <ModalBody class="p-0">
                <div class="p-5 text-center">
                    <XCircleIcon class="w-16 h-16 mx-auto mt-3 text-warning" />
                    <div class="mt-5 text-3xl">Oops...</div>
                    <div class="mt-2 text-lg text-slate-500">{{ warningModalText }}</div>
                </div>
                <div class="px-5 pb-8 text-center">
                    <button type="button" @click="warningModalPreview = false" class="w-24 btn btn-primary">
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
    { name: "Qty for Campaign", key: "qty" },
    { name: "Max Qty / Order", key: "max_order" },
    { name: "Category", key: "tag" },
    { name: "Price", key: "price" },
    { name: "Type", key: "type" },
    { name: "Editable", key: "editable" },
    { name: "Deletable", key: "deletable" },
    { name: "Activate", key: "status" }
])

onMounted(() => {
    campaignStore.assignedProducts.forEach((item) => {
        if (item.status == 'enabled') item.status = true
        else if (item.status == 'disabled') item.status = false
    });

    eventBus.on('confirmProducts', () => {
        let orderCodeList = []
        campaignStore.assignedProducts.forEach((item) => {
            orderCodeList.push(item.order_code)
        })

        duplicateOrderCode.value = false
        if (new Set(orderCodeList).size !== orderCodeList.length) {
            duplicateOrderCode.value = true
            warningModalPreview.value = true
            return
        }
        // router.push('campaign/create/confirm')
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
            if (type == 'qty') {
                campaignStore.assignedProducts[index].qty = event.target.value
            } else if (type == 'max_order') {
                campaignStore.assignedProducts[index].max_order_amount = event.target.value
            }
        } else {
            alert('Input number is over product max quantity')
            event.target.value = campaignStore.assignedProducts[index].qty
            return
        }
    }
    // console.log(campaignStore.assignedProducts[index])
}

const isOrderCodeDuplicate = (index) => {
    let this_order_code = campaignStore.assignedProducts[index].order_code
    for (let i = 0; i < campaignStore.assignedProducts.length; i++) {
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
.click-icon:hover {
	cursor: pointer;
}

.name{
	overflow-wrap: break-word;
}

td {
	height: auto !important;
    min-height: 50px;
    border-collapse: collapse;
    width: auto !important;
    padding-right: 10px !important;
    padding-left: 10px !important;
}

thead th{ 
  position: sticky !important; 
  top: 0 !important;
  z-index: 50;
  background-color: theme("colors.secondary");
    padding-right: 10px !important;
    padding-left: 10px !important;
}
.checkboxWord{
    display: none;
}

@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 768px) {

	table, thead, tbody, th, td, tr {
		display: block;
		font-size: 16px;
		padding: 0px !important;
	}

	.imgtd {
        display: inline-block;
        width: 80% !important;
        padding-left: 20% !important;
        height: 125px !important;
    }
    
    .inputBox{
        height: 35px !important;
    }

    .checkboxWord{
        display: block;
    }

	thead tr {
		position: absolute;
		top: -9999px;
		left: -9999px;
	}

	tr {
		border-bottom: 3px solid rgba(61, 61, 61, 0.7);
		margin-top: 20px;
	}

	td {
        min-height: 35px;
        height: auto;
        border: none;
        position: relative;
        padding-left: 50% !important;
        text-align: right !important;
        box-shadow: none !important;
        font-size: 14px;
        vertical-align: middle !important;
        padding-right: 15px !important;
    }

    td:before {
        position: absolute;
        min-height: 20px;
        left: 6px;
        width: 45%;
        padding-right: 10px;
        white-space: nowrap;
        font-weight: bold;
        box-shadow: none !important;
        background-color: white !important;
        text-align: left;
    }

	td:nth-of-type(1):before {
		display:none; 
		/* color: #0e9893; */
	}
    td:nth-of-type(1){
		display: inline-block;
		width: 100% !important;
		padding-left: 0% !important;
		/* color: #0e9893; */
	}

	.name:before {
        display:none; 
	}
    .name{
		display: inline-block;
        text-align: center !important;
        width: 100% !important;
        padding-left: 0% !important;
		font-weight: 500;
		color: theme("colors.primary");
        font-size: 16px !important;
	}

	td:nth-of-type(3):before {
		content: "Order Code";
        top:25%;
		/* color: #0e9893; */
	}

	td:nth-of-type(4):before {
		content: "Qty for Campaign";
        top:25%;
		/* color: #0e9893; */
	}
	td:nth-of-type(5):before {
		content: "Max Qty / Order";
        top:25%;
		/* color: #0e9893; */
	}

	td:nth-of-type(6):before {
        content: "Category";
	}
    td:nth-of-type(6){
        display: flex;
        flex-direction:column; 
        justify-content: center;
        vertical-align:baseline !important;
    }
	td:nth-of-type(7):before {
        margin-top:0px !important;
		content: "Price";
		/* color: #0e9893; */
	}
    .editable:before {
		content: "Editable";
	}
    .deletable:before {
		content: "Deletable";
	}

    .type:before {
		content: "Type";
        text-align: left !important;
        margin-top: 0 !important;
	}
    .status:before {
		content: "Active";
	}
    .status{
        padding-right: 5px !important;
    }
}
</style>