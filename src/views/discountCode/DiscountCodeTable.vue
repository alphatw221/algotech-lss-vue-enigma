<template>
	<div class="overflow-auto max-h-fit sm:h-[62vh] sm:max-h-full">
		<table class="table -mt-3 table-report">
			<thead>
				<tr>
					<th v-for="column, column_index in tableColumns" :key="column_index" class="w-fit whitespace-nowrap text-center">
						<template v-if="column.type === 'index'">
							<span class="px-6"> {{ '' }} </span> 
						</template>
						<template v-else> {{$t(`discount.table.`+column.name)}} </template>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td v-if="showLoadingIcon"
						class="h-[300px] items-center relative tdDot"
						:colspan="tableColumns.length" >
						<LoadingIcon icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] right-[50%] top-[50%] translate-x-1/2"/>
					</td>
					<td v-else-if="discountCodes.length === 0" :colspan="tableColumns.length">
						<div class="mt-5 text-center md:mt-40 tdDot" >
							<h1 class="text-slate-500 text-sm md:text-lg font-bold">
								{{ 'no discount code' }}
							</h1>
							<h1 class="text-slate-500 text-sm md:text-lg">
								{{ 'set up discount code first'}}
							</h1>
						</div>
					</td> 
				</tr>
				<tr v-for="(discountCode, discountCodeIndex) in discountCodes" :key="discountCodeIndex" class="intro-x">
					<template v-for="(column, column_index) in tableColumns" :key="column_index">

						<td v-if="column.type === 'index'" class="sm:w-20 text-center id lg:text-sm"
							:data-content="$t(`discount.table.`+column.name) " >
							<span class="sm:hidden"># </span>{{discountCodeIndex+1}}
						</td>

						<td v-else-if="column.type === 'text'" class="sm:w-32"
							:data-content="$t(`discount.table.`+column.name) " >
							{{ discountCode[column.key] }}
						</td>
						
						<td v-else-if="column.type === 'datetime'" class="sm:w-32"
							:data-content="$t(`discount.table.`+column.name) " >
							{{ 
								new Date(discountCode[column.key]).toLocaleTimeString('en-us', {
									year: "numeric", month: "short", hour12: false,
									day: "numeric", hour: '2-digit', minute: '2-digit'
								}) 
							}}
						</td>

						<td v-else-if="column.type === 'action'" class="w-20 edit"
							:data-content="$t(`discount.table.`+column.name) " >
							<EditIcon v-if="column.key == 'edit'" @click="editDiscountCode(discountCode)"
								class="w-[20px] h-[20px] text-blue-700 mx-auto" />
							<Trash2Icon v-if="column.key == 'delete'" @click="deleteDiscountCode(discountCode)" 
								class="w-[20px] h-[20px] text-red-700 mx-auto" />
							<!-- <Dropdown placement="bottom-start">
								<DropdownToggle role="button" class="block w-5 h-5" href="javascript:;">
								<MoreHorizontalIcon class="w-5 h-5 text-slate-700" />
								</DropdownToggle>
								<DropdownMenu class="w-24 pt-2 ">
								<DropdownContent class="w-24 text-center">
									<DropdownItem class="w-24 text-center whitespace-nowrap text-[14px]" 
										@click="editDiscountCode(discountCode)"> 
											<EditIcon class="w-[20px] h-[20px] mx-1"/> {{ 'edit' }} 
									</DropdownItem>
									<DropdownItem class="w-24 text-center text-danger whitespace-nowrap text-[14px]" 
										@click="deleteDiscountCode(discountCode)"> 
											<Trash2Icon class="w-[20px] h-[20px] mx-1"/> {{ 'delete' }} 
									</DropdownItem>
								</DropdownContent>
								</DropdownMenu>
							</Dropdown>  -->
						</td>
					</template>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="flex flex-wrap items-center intro-y sm:flex-row sm:flex-nowrap mb-10 sm:mb-0">
		<Page class="mx-auto my-3" :total="totalCount" @on-change="changePage" @on-page-size-change="changePageSize" />
	</div>

</template>

<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted } from "vue";

import { delete_discount_code, list_discount_code } from "@/api_v2/discount_code"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import i18n from "@/locales/i18n"

const tableColumns = [
	{ name: "index", key: "index" , type:"index"},
    { name: "name", key: "name" , type:"text"},
    { name: "code", key: "code" , type:"text"},
    { name: "start_at", key: "start_at", type:"datetime" },
    { name: "end_at", key: "end_at" , type:"datetime"},
    { name: "type", key: "type" , type:"text"},
	// { name: "limitations", key: "limitations" , type:"array"},
	{ name: "edit", key: "edit" , type:"action"},
	{ name: "del", key: "delete" , type:"action"},
]

const layoutStore = useLSSSellerLayoutStore();

const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

const currentPage = ref(1);
const totalPage = ref(1);
const pageSize = ref(10);
const totalCount = ref(0);

const discountCodes = ref([]);
const showLoadingIcon = ref(true)

onMounted(() => {
	showLoadingIcon.value = true
	listDiscountCodes();
	eventBus.on("listDiscountCodes", () => {
		listDiscountCodes();
	});
});

onUnmounted(() => {
	eventBus.off("listDiscountCodes");
});

const changePage = page=> {
	currentPage.value = page;
	listDiscountCodes()
}

const changePageSize = page_size=> {
	pageSize.value = page_size;
	listDiscountCodes()
}



const listDiscountCodes=()=> {
	discountCodes.value = []
	showLoadingIcon.value = true
	list_discount_code(pageSize.value, currentPage.value)
	.then((res) => {
		console.log(res.data)
		totalCount.value = res.data.count
		totalPage.value = Math.ceil(totalCount.value / pageSize.value)
		discountCodes.value = res.data.results
		showLoadingIcon.value = false
	})
	.catch(err=>{console.log(err)});
}

const editDiscountCode = discountCode=>{
	hideDropDown()
	eventBus.emit('showEditModel', discountCode)
}

const deleteDiscountCode = discountCode=> {
	hideDropDown()
	delete_discount_code(discountCode.id)
		.then(res =>{
			layoutStore.notification.showMessageToast(i18n.global.t('auto_reply.deleted_message'));
			listDiscountCodes();
		})
		.catch((err) => {
			alert(err);
		});
}
const hideDropDown = ()=>{dom('.dropdown-menu').removeClass('show')}
</script>

<style scoped>
.click-icon:hover {
	cursor: pointer;
}


td {
  min-height: 50px;
  border-collapse: collapse;
  padding-right: 10px !important;
  padding-left: 10px !important;
}

.tdDot{
	box-shadow: none !important;
}

thead th{ 
  position: sticky !important; 
  top: 0 !important;
  z-index: 50;
  background-color: theme("colors.secondary");
  padding-right: 10px !important;
  padding-left: 10px !important;
}

.longMessage{
	overflow-wrap: break-word;
	white-space: normal;
}	

@media only screen and (max-width: 760px),
(min-device-width: 769px) and (max-device-width: 769px) {

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
        width: 1.5rem !important;
        height: 1.5rem !important;
        border-color: theme('colors.primary') !important;
        border: 2px solid;
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
		border-bottom: 2px solid #DDDDDD;
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
		content: attr(data-content);
    }

    td:nth-of-type(1):before {
        display: none;
    }
    td:nth-of-type(1){
        display: inline-block;
        position: absolute;
        z-index: 10;
        left: 0;
        width: 40px !important;
        padding-left: 0 !important;
        min-height: 25px !important;
    }
}
</style>
