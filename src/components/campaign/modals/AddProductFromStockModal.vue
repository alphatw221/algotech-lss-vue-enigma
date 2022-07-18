<template>
    <Modal size="modal-xl" class="text-center" :slideOver="true" :show="campaignDetailStore.showAddProductFromStockModal"
        @hidden="hideModal()" @show="search()"> 
        <a @click="hideModal()" class="absolute right-0 top-0 mt-3 mr-3">
            <XIcon class="w-8 h-8 text-slate-400" />
        </a>
        <ModalHeader class="text-center text-base p-5">
            <h2 class="font-medium w-full">
                Add Product From Stock
            </h2>
        </ModalHeader>
        <ModalBody>
            
            <!-- BEGIN SearchPage -->
            <div v-show="openTab=='select'">
                <!-- BEGIN SearchBar -->
                <div class="flex flex-wrap justify-around gap-3 w-[100%] text-[13px] sm:text-[16px]">
                    <div class="flex-1 flex flex-wrap items-center" >
                        <label class="w-14 mr-1 sm:mr-2 text-[13px] sm:text-[16px]">
                            Category
                        </label>
                        <select 
                            class="form-select min-w-fit h-[35px] sm:h-[42px] lg:max-w-xl"
                            v-model="selectedCategory"
                            @change="search()"
                        >
                            <option v-for="category in productCategories" :key="category.value" :value="category.value">{{ category.name }}</option>
                        </select>
                    </div>
                    <div class="flex-1 flex-wrap items-center flex" >
                        <label class="mr-2 whitespace-wrap sm:whitespace-nowrap text-[13px] sm:text-[16px]">
                            Search by
                        </label>
                        <select
                            class="form-select min-w-fit mr-0 h-[35px] sm:h-[42px] lg:max-w-xl" v-model="searchField">
                            <option v-for="searchColumn in searchColumns" :key="searchColumn.value"
                                :value="searchColumn.value">
                                {{ searchColumn.text }}
                            </option>
                        </select>
                    </div>
                    <div class="flex-0 items-center input-group ml-auto">
                        <input type="text"
                            class="form-control input-group min-w-fit mr-0 h-[35px] sm:h-[42px] lg:max-w-xl mt-auto" placeholder="Search..."
                            v-model="searchKeyword" @keydown.enter.prevent="search()" />
                        <button 
                            type="button"
                            class="flex-none w-14 h-[35px] sm:h-[42px] rounded-l-none btn btn-secondary mt-auto" @click="resetSearchBar">
                            Reset
                        </button>
                    </div>
                </div>   
                <!-- END SearchBar -->


                <!-- BEGIN ProductTable -->
                <div class="relative"> 
                    <div class="overflow-auto h-[62vh] text-[14px] mt-5">
                        <table class="table table-report h-[100%] w-[100%]">
                            <thead>
                                <tr>
                                    <th class="w-10">
                                        <input class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" type="checkbox" @change="selectAllStockProduct($event)"/></th>
                                    <th 
                                        class="whitespace-normal truncate hover:text-clip" 
                                        v-for="column in tableColumns" :key="column.key">
                                        {{ column.name }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(product, product_index) in stockProducts"
                                    :key="product_index"
                                    class="intro-x align-middle"
                                >
                                    <td class="w-10">
                                        <input class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" 
                                            type="checkbox" v-model="product.check" @click="selectStockProduct(product, $event)"/>
                                    </td>

                                    <template v-for="column in tableColumns" :key="column.key" class="text-[14px]">

                                        <td v-if="column.key === 'image'" >
                                            <div class="flex items-center justify-center imgtd">
                                                <div class="w-[120px] h-[120px] image-fit zoom-in md:w-14 md:h-14 place-items-center">
                                                    <img class="rounded-lg cursor-auto" 
                                                        :src="product.image ? imageUrl + product.image : imageUrl + 'no_image.jpeg'" />
                                                </div>
                                            </div>
                                        </td>

                                        <td 
                                            v-else-if="column.key === 'order_code'" class="orderCode" 
                                            >
                                            <div class="place-content-end w-full md:w-24 lg:place-content-center">
                                                <input class="form-control w-[100%] mt-2 sm:mt-2" type="text" v-model="product[column.key]" v-if="product.type=='product'"/>
                                            </div>
                                        </td>

                                        <td v-else-if="column.key === 'category'" 
                                            class="category"
                                            >
                                            <div v-for="(tag,tag_index) in product['tag']" :key="tag_index"
                                            class="flex flex-col justify-center content-center"
                                            >{{ tag }}</div> 
                                        </td>

                                        <td v-else-if="column.key === 'qty'"
                                            class="qty">
                                            <div class="flex flex-col place-content-end w-full md:w-24">
                                                <input class="form-control w-full mt-2 sm:mt-2" min="1" type="number" v-model="product[column.key]" />
                                            </div>
                                        </td>
                                        <td v-else-if="column.key === 'max_order_amount'"
                                            class="maxqty">
                                            <div class="flex flex-col place-content-end w-full md:w-24">
                                                <input class="form-control w-full mt-2 sm:mt-2" min="1" type="number" v-model="product[column.key]" v-if="product.type=='product'" />
                                            </div>
                                        </td>

                                        <td v-else-if="column.key === 'type'" class="type"> 
                                            <div v-if="props.productType === 'lucky_draw'">{{product[column.key]}}  </div>
                                            <select v-else
                                                class="form-select w-auto mt-2 sm:mt-2"
                                                v-model="product[column.key]"
                                            >
                                                <option v-for="(type, index) in product_type" :key="index" :value="type.value">{{type.name}}</option>
                                            </select> 
                                        </td>

                                        <td v-else-if="column.key === 'customer_editable'" class="editable">
                                            <input class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" type="checkbox" v-model="product[column.key]" @click="stockProductEditable(product_index, $event)" v-if="product.type=='product'"/>
                                        </td>

                                        <td v-else-if=" column.key === 'customer_removable'" class="removable">
                                            <input class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" type="checkbox" v-model="product[column.key]" @click="stockProductRemovable(product_index, $event)" v-if="product.type=='product'"/>
                                        </td>

                                        <td v-else-if="column.key === 'price'"  class="price">
                                            <div class="w-full lg:w-fit lg:text-sm whitespace-nowrap"> ${{product[column.key]}} </div>
                                        </td>

                                        <td v-else-if="column.key === 'name'" class="name text-[16px] w-full h-fit lg:w-24 lg:text-sm content-center items-center longMessage">
                                            {{product[column.key]}}
                                        </td>
                                        <td v-else class="hidden"> </td>
                                    </template>
                                </tr>
                            </tbody>
                        </table> 
                        
                        
                    </div>
                    <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center justify-between">
                        <Page 
                            class="mx-auto my-3"
                            :total="dataCount" 
                            @on-change="changePage"
                            @on-page-size-change="changePageSize"
                        />
                        
                    </div> 
                    <div class=" flex items-center justify-between">
                        <button type="button" class="btn btn-primary inline-flex w-20 md:w-32 shadow-md ml-auto mr-1 md:mr-5" @click="openTab='confirm'">Next</button>
                    </div> 
                </div>
                <!-- END ProductTable -->
            </div>
            <!-- END SearchPage -->

        <!-- BEGIN ConfirmPage -->
            <div v-show="openTab=='confirm'">
                <div class="text-left text-[16px]"> 
                    Comfirm Selected Product
                </div>
                <div class="relative"> 
                    <div class="overflow-auto h-[72vh] text-[14px] mt-5">
                        <table class="table table-report h-[100%] w-[100%]">
                            <thead>
                                <tr>
                                    <th class="w-10"></th>
                                    <th 
                                        class="whitespace-normal truncate hover:text-clip" 
                                        v-for="column in tableColumns" :key="column.key">
                                        {{ column.name }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(product, product_index) in selectedProducts"
                                    :key="product_index"
                                    class="intro-x align-middle"
                                >
                                    <td class="w-10">
                                        <input class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" type="checkbox" checked @click="unSelectProduct(product, product_index, $event)"/>
                                    </td>
                                    <template v-for="column in tableColumns" :key="column.key" class="text-[14px]">

                                        <td v-if="column.key === 'image'">
                                            <div class="flex items-center justify-center">
                                                <div class="w-[120px] h-[120px] image-fit zoom-in md:w-14 md:h-14 place-items-center">
                                                    <img class="rounded-lg cursor-auto"
                                                        :src="product.image ? imageUrl + product.image : imageUrl + 'no_image.jpeg'" />
                                                </div>
                                            </div>
                                        </td>

                                        <td v-else-if="column.key === 'order_code'" class="orderCode">
                                            <div class="relative place-content-end w-full md:w-24 lg:place-content-center">
                                                <input class="form-control w-[100%] mt-2 sm:mt-2" type="text" v-model="product[column.key]" v-if="product.type=='product'"/>
                                                <label class="text-danger absolute -bottom-5 left-1" v-if="errorMessages[product_index]">{{errorMessages[product_index][column.key]}}</label>
                                            </div>
                                        </td>
                                        
                                        <td v-else-if="column.key === 'category'" class="category">
                                            <div v-for="(tag,tag_index) in product['tag']" :key="tag_index">{{ tag }}</div> 
                                        </td>

                                        <td v-else-if="column.key === 'qty'" class="qty">
                                            <div class="place-content-end relative w-full md:w-24 lg:place-content-center">
                                                <input class="form-control w-[100%] mt-2 sm:mt-2" min="1" type="number" v-model="product[column.key]" />
                                                <label class="text-danger absolute -bottom-5 left-1 whitespace-nowrap z-10" v-if="errorMessages[product_index]">{{errorMessages[product_index][column.key]}}</label>
                                            </div>
                                        </td>

                                        <td v-else-if="column.key === 'max_order_amount'" class="maxqty">
                                            <div class="place-content-end relative w-full md:w-24 lg:place-content-center">
                                                <input class="form-control w-[100%] mt-2 sm:mt-2" min="1" type="number" v-model="product[column.key]" v-if="product.type=='product'" />
                                            </div>
                                        </td>

                                        <td v-else-if="column.key === 'type'" class="type">
                                            <div v-if="props.productType == 'lucky_draw'"> {{product[column.key]}}</div>
                                            <select  v-else
                                                class="form-select w-auto mt-2 sm:mt-2"
                                                v-model="product[column.key]"
                                            >
                                                <option v-for="(type, index) in product_type" :key="index" :value="type.value">{{type.name}}</option>
                                            </select> 
                                            <label class="text-danger absolute -bottom-5 left-1 whitespace-nowrap" v-if="errorMessages[product_index]">{{errorMessages[product_index][column.key]}}</label>
                                        </td>

                                        <td v-else-if="column.key === 'customer_editable'" class="editable">
                                            <input class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" type="checkbox" v-model="product[column.key]" @click="selectedProductEditable(product_index, $event)" v-if="product.type=='product'"/>
                                        </td>

                                        <td v-else-if=" column.key === 'customer_removable'" class="removable">
                                            <input class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" type="checkbox" v-model="product[column.key]" @click="selectedProductRemovable(product_index, $event)" v-if="product.type=='product'"/>
                                        </td>

                                        <td v-else-if="column.key === 'price'" class="price">
                                            <div class="w-full lg:w-fit lg:text-sm whitespace-nowrap"> ${{product[column.key]}} </div>
                                        </td>

                                        <td v-else-if="column.key === 'name'" class="name">
                                            <div class="relative text-[16px] w-full lg:w-24 lg:text-sm  content-center items-center longMessage"> {{product[column.key]}} </div>
                                            <label class="text-danger text-danger absolute -bottom-5 left-1" v-if="errorMessages[product_index]">{{errorMessages[product_index][column.key]}}</label>
                                        </td>
                                    </template>
                                </tr>
                            </tbody>
                        </table> 
                    </div>
                    <div class=" flex items-center justify-between mt-10">
                        <button type="button" class="btn btn-primary inline-flex w-20 md:w-32 shadow-md ml-1 md:ml-5" @click="openTab='select'">Previous</button>
                        <button type="button" class="btn w-20 md:w-32 inline-flex dark:border-darkmode-400 ml-auto" @click="resetSelectedProduct()">Reset</button>
                        <button type="button" class="btn btn-primary inline-flex w-20 md:w-32 shadow-md mx-1 md:mx-5" @click="submitData()">Apply</button>
                    </div> 
                </div>
            </div>
            <!-- END ConfirmPage -->

        </ModalBody>
    </Modal>
</template>

<script setup>
import { seller_bulk_create_campaign_products } from "@/api_v2/campaign_product"
import { list_product_category, list_product } from '@/api_v2/product';
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance, defineProps } from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";

const props = defineProps({
    productType: String,
})

const tableColumns = ref([
    { name: "Product", key: "image" },
    { name: "", key: "name" },
    { name: "Order Code", key: "order_code" },
	{ name: "QTY for Campaign", key: "qty" },
	{ name: "Max QTY/Order", key: "max_order_amount" },
    { name: "Price", key: "price" },
	{ name: "Editable", key: "customer_editable" },
	{ name: "Deletable", key: "customer_removable" },
	{ name: "Category", key: "category" },
	{ name: "Type", key: "type" },
])

const productColumns = ref([
    { name: "Product", key: "image" },
    { name: "", key: "name" },
    { name: "Order Code", key: "order_code" },
	{ name: "QTY for Campaign", key: "qty" },
	{ name: "Max QTY/Order", key: "max_order_amount" },
    { name: "Price", key: "price" },
	{ name: "Editable", key: "customer_editable" },
	{ name: "Deletable", key: "customer_removable" },
	{ name: "Category", key: "category" },
	{ name: "Type", key: "type" },
])

const luckyColumns = ref([
    { name: "Product", key: "image" },
    { name: "", key: "name" },
	{ name: "QTY for Campaign", key: "qty" },
    { name: "Price", key: "price" },
	{ name: "Category", key: "category" },
	{ name: "Type", key: "type" },
])

const layoutStore = useLSSSellerLayoutStore();
const campaignDetailStore = useCampaignDetailStore()

const route = useRoute();
const router = useRouter();

const openTab = ref('select')
const currentPage = ref(1)
const totalPage = ref(1)
const pageSize = ref(10)
const dataCount = ref(0)

const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const imageUrl = import.meta.env.VITE_APP_IMG_URL
const selectedCategory = ref('')
const searchField = ref('name')
const searchKeyword = ref('')
const productCategories = ref([{value:'', name:'All'}])
const product_type = [{value:'product',name:'Product'},{value:'lucky_draw',name:'Lucky Draw'}]

const searchColumns = [
	{ text: "Name", value: "name" },
	{ text: "Order Code", value: "order_code" },
	{ text: "Description", value: "description" }
]

const stockProducts = ref([])
const selectedProducts = ref([])
const errorMessages = ref([])
const selectedProductDict = ref({})

let isSelectedProductsValid=false
let campaignProductCache = null

onMounted(() => {
	list_product_category().then(
		res => { 
			res.data.forEach(category => {
				productCategories.value.push({value:category, name:category})
			});
		}
	)
})

const updateStockProducts = ()=>{
    stockProducts.value.forEach((product,stockProductIndex) => {
        
        if(product.id in selectedProductDict.value){ 
            const index = selectedProductDict.value[product.id.toString()]
            stockProducts.value[stockProductIndex] = selectedProducts.value[index]
        }else{
            product.check=false
        }
    });
}

const getProductCache = ()=>{
    if(campaignProductCache==null)createProductCache()
    return JSON.parse(JSON.stringify(campaignProductCache))
}

const createProductCache = ()=>{

    const stockProductIdDict={}
    const orderCodeDict={}

    campaignDetailStore.campaignProducts.forEach(campaignProduct => {
        stockProductIdDict[campaignProduct.id.toString()]=true
        orderCodeDict[campaignProduct.order_code]=true
	});

    campaignProductCache = {
        'stockProductIdDict':stockProductIdDict, 
        'orderCodeDict':orderCodeDict
    }
}

const checkIfValid = ()=>{
    isSelectedProductsValid = true
    const productCache = getProductCache()
    selectedProducts.value.forEach((selectedProduct,index) => {
        errorMessages.value[index]={}
        if(selectedProduct.type=='product' && selectedProduct.order_code in productCache.orderCodeDict) {
                if(typeof productCache.orderCodeDict[selectedProduct.order_code] == 'number') errorMessages.value[productCache.orderCodeDict[selectedProduct.order_code]]['order_code']='duplicate'
                errorMessages.value[index]['order_code']='duplicate';
                isSelectedProductsValid=false;
            }
        if(selectedProduct.type=='product' && !selectedProduct.order_code) {errorMessages.value[index]['order_code']='invalid order code';isSelectedProductsValid=false;}
        // if(selectedProduct.product in productCache.stockProductIdDict) errorMessages.value[index]['name']='product already exists'
        if(selectedProduct.qty<=0) {errorMessages.value[index]['qty']='invalid qty';isSelectedProductsValid=false;}
        if(selectedProduct.type=='product' && selectedProduct.max_order_amount>selectedProduct.qty) {errorMessages.value[index]['max_order_amount']='max amount greater than qty';isSelectedProductsValid=false;}
        if(!(['product', 'lucky_draw'].includes(selectedProduct.type))){errorMessages.value[index]['type']='please select type';isSelectedProductsValid=false;}
        productCache.orderCodeDict[selectedProduct.order_code]=index
    });

}

watch(computed(()=>props.productType), () => {
    if(props.productType == 'lucky_draw'){
        tableColumns.value = luckyColumns.value
    }else{
        tableColumns.value = productColumns.value
    }
})

watch(computed(()=>campaignDetailStore.campaignProducts),createProductCache)

watch(computed(()=>stockProducts.value),updateStockProducts)

watch(computed(()=>selectedProducts.value),checkIfValid,{deep:true})


const stockProductRemovable = (product_index, event)=>{if(event.target.checked)stockProducts.value[product_index].customer_editable=true}
const selectedProductRemovable = (product_index, event)=>{if(event.target.checked)selectedProducts.value[product_index].customer_editable=true}
const stockProductEditable = (product_index, event)=>{if(!event.target.checked)stockProducts.value[product_index].customer_removable=false}
const selectedProductEditable = (product_index, event)=>{if(!event.target.checked)selectedProducts.value[product_index].customer_removable=false}


const selectStockProduct = (stockProduct, event) =>{

    if(event.target.checked){
        errorMessages.value.push({})
        selectedProducts.value.push( stockProduct )
        selectedProductDict.value[stockProduct.id.toString()]=selectedProducts.value.length-1   //cache index
        
    }else{
        const _index = selectedProductDict[stockProduct.id.toString()]
        selectedProducts.value.splice(_index,1)
        errorMessages.value.splice(_index,1)
        delete selectedProductDict[stockProduct.id.toString()]
    }
}

const unSelectProduct = (selectedProduct ,selectedProductIndex, event) =>{
	event.target.checked=true
	delete selectedProductDict.value[selectedProduct.id.toString()]
	selectedProducts.value.splice(selectedProductIndex,1)
	errorMessages.value.splice(selectedProductIndex,1)

    updateStockProducts()
}

const resetSelectedProduct = ()=>{
	selectedProducts.value.forEach(product => {
		delete selectedProductDict.value[product.id.toString()]
	});
	selectedProducts.value = []
	errorMessages.value = []
    updateStockProducts()

}

const selectAllStockProduct = (event)=>{
	event.target.checked=false
	stockProducts.value.forEach(product => {
        if(!(product.id.toString() in selectedProductDict.value)) {
            product.check=true
            selectedProducts.value.push(product)
            selectedProductDict.value[product.id.toString()]=selectedProducts.value.length-1
            errorMessages.value.push({})
        }
	});
    openTab.value='select'
}

const search = () => {
	list_product(pageSize.value, currentPage.value, searchField.value, searchKeyword.value, 'enabled', props.productType, selectedCategory.value)
	.then(response => {
		dataCount.value = response.data.count
		totalPage.value = Math.ceil(response.data.count / pageSize.value)
		stockProducts.value = response.data.results
		
	})
}

const resetSearchBar = ()=>{
    selectedCategory.value=''
    searchField.value='name'
    searchKeyword.value = ''
    search()
}

const changePage = (page) => {
	currentPage.value = page
	search()
}


const changePageSize = (pageSize)=>{
	pageSize = pageSize;
	search();
}

const submitData = ()=>{
    if(!isSelectedProductsValid){
        layoutStore.alert.showMessageToast("Invalid")
        return
    }
	errorMessages.value = []
	seller_bulk_create_campaign_products(route.params.campaign_id, selectedProducts.value).then(res=>{
		campaignDetailStore.campaignProducts = res.data
        hideModal()
	}).catch(err=>{
		if (err.response){
			errorMessages.value = err.response.data.errors
		}
	})
}

const hideModal = ()=>{
    selectedCategory.value=''
    selectedProducts.value=[]
    errorMessages.value=[]
    stockProducts.value=[]
    selectedProductDict.value = {}
    openTab.value = 'select'
    currentPage.value = 1
    totalPage.value = 1
    pageSize.value=10
    dataCount.value =0
    campaignDetailStore.showAddProductFromStockModal = false
}

</script>


<style scoped>
.click-icon:hover {
    cursor: pointer;
}

td {
    height: auto !important;
    min-height: 50px;
    border-collapse: collapse;
    width: auto !important;
    padding-right: 10px !important;
    padding-left: 10px !important;
}

.longMessage {
    overflow-wrap: break-word;
}

thead th {
    position: sticky !important;
    top: 0 !important;
    z-index: 50;
    background-color: theme("colors.secondary");
    padding-right: 10px !important;
    padding-left: 10px !important;
}

.checkboxWord {
    display: none;
}
.form-check-input {
    border-color: rgb(128, 128, 128) !important;
}

@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 768px) {

    table,
    thead,
    tbody,
    th,
    td,
    tr {
        display: block;
        font-size: 16px;
        padding: 0px !important;
    }

    .form-check-input{
        width: 1.2rem !important;
        height: 1.2rem !important;
    }

    .checkboxWord {
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
        padding-bottom: 10px !important;
	}

    td {
        min-height: 42px;
        height: auto;
        border: none;
        position: relative;
        padding-left: 50% !important;
        text-align: right !important;
        box-shadow: none !important;
        font-size: 14px;
        vertical-align: middle !important;
        padding-right: 15px !important;
        place-content: right !important;
    }

    td:before {
        position: absolute;
        min-height: 42px;
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
        display: none;
    }
    td:nth-of-type(1){
        display: inline-block;
        position: absolute;
        z-index: 10;
        right: 0;
        width: 40px !important;
        padding-left: 0 !important;
        min-height: 25px !important;
    }
    td:nth-of-type(2):before {
        display: none;
    }

    td:nth-of-type(2){
        display: inline-block;
        width: 100% !important;
        padding-left: 0 !important;
        height: 125px !important;
    }

    .name:before {
        display: none;
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

    .orderCode:before {
        content: "Order Code";
        text-align: left !important;
        top:25% !important;
    }

    .qty:before {
        content: "Qty for Campaign";
        top:25% !important;
    }

    .maxqty:before {
        content: "Max Qty / Order";
        top:25% !important;
    }

    .price:before {
        content: "Price";
    }
    .price{
        top: 10px;
    }
    /* .price{
        display: flex;
        flex-direction:column; 
        justify-content: center;
        vertical-align:baseline !important;
    } */

    .editable:before {
        content: "Editable";
        margin-top: 0px !important;
    }
    .removable:before {
        content: "Deletable";
        text-align: left !important;
        margin-top: 0px !important;
    }

    .category:before {
        content: "Category";
    }

    .type:before {
        content: "Type";
        text-align: left !important;
    }
}
</style>
