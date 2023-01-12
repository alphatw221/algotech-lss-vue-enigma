<template>
	<div class="overflow-hidden sm:overflow-auto max-h-fit sm:max-h-[62vh]">
		<table class="table -mt-3 table-report">
			<thead>
				<tr>
					<th v-for="column, column_index in tableColumns" :key="column_index" class="whitespace-nowrap text-left">
						
							<template v-if="column.type === 'index'">
								<span class="px-1"> # </span> 
							</template>
						<div v-else-if="column.type == 'action'" class="px-1 text-center"> {{$t(`discount.table.`+column.name)}} </div>
						<div v-else class="w-[80px]">  {{$t(`discount.table.`+column.name)}} </div>
						
					</th>
				</tr>
			</thead>
			<tbody>
				<template v-if="showLoadingIcon || discountCodes.length === 0" >
					<tr class="intro-x h-[300px]">
						<td v-if="showLoadingIcon"
							class="h-[300px] items-left relative tdDot"
							:colspan="tableColumns.length" >
							<LoadingIcon icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] right-[50%] top-[50%] translate-x-1/2"/>
						</td>
						<td class="tdDot" v-else-if="discountCodes.length === 0" :colspan="tableColumns.length">
							<div class="mt-5 text-center md:mt-40" >
								<h1 class="text-slate-500 text-sm md:text-lg font-bold">
									{{$t('discount.table.noCode')}}
								</h1>
								<!-- <h1 class="text-slate-500 text-sm md:text-lg">
									{{$t('discount.table.setupFirst')}}
								</h1> -->
							</div>
						</td> 
					</tr>
				</template>
				<tr v-for="(discountCode, discountCodeIndex) in discountCodes" :key="discountCodeIndex" class="intro-x">
					<template v-for="(column, column_index) in tableColumns" :key="column_index">

						<td v-if="column.type === 'index'" class="index sm:w-20 text-left id lg:text-sm"
							:data-content="$t(`discount.table.`+column.name) " >
							<span class="sm:hidden"># </span>{{discountCodeIndex+1}}
						</td>

						<td v-else-if="column.type === 'text'" class="sm:min-w-24 text-left"
							:data-content="$t(`discount.table.`+column.name) " >
							{{ discountCode[column.key] }}
						</td>

						<td v-else-if="column.type === 'textI18'" class="sm:min-w-32"
							:data-content="$t(`discount.table.`+column.key) " >
							{{ $t(`discount.table.` + discountCode[column.key]) }}
						</td>

						<td v-else-if="column.type === 'multipleI18' && column.key=='limitations'" class="text-[12px] whitespace-nowrap sm:min-w-32"
							:data-content="$t(`discount.table.`+column.key) " >

							<div v-if="isDiscountCodeForAllCampaign(discountCode)" class="flex justify-end sm:justify-between flex-row flex-wrap w-full sm:w-[120px]"> 
								* {{ $t(`discount.table.specific_campaign`) }} 
								<div class="ml-2 sm:ml-auto"> 
									{{$t(`discount.table.all`)}}
								</div>
							</div>

							<div  v-for="(limitation, index) in discountCode.limitations" :key="index" class="flex justify-end sm:justify-between flex-row flex-wrap w-full sm:min-w-[130px]"> 
								<template v-for="(field, limit_key ) in limitation" :key="limit_key" class="mr-auto"> 
									<div v-if="limit_key !== 'key' && field != ''" class="font-medium"> * {{ $t(`discount_code.limitation_fields.` + limitation.key +'.' + limit_key ) }}</div>
								</template>
								<div class="ml-2 sm:ml-auto" v-if="limitation.key == 'subtotal_over_specific_amount'"> $ {{(limitation.amount).toLocaleString('en-US')}} </div>
								<div class="ml-2 sm:ml-auto" v-else-if="limitation.key == 'product_over_specific_number'"> {{limitation.number}} pcs </div>
								<div class="ml-2 sm:ml-auto" v-else-if="limitation.key == 'discount_code_usable_time'"> {{limitation.times}} </div>
								<div class="ml-2 sm:ml-auto" v-else-if="limitation.key == 'specific_buyer_name'"> 
									<div v-for="name, index in limitation.names.split(',')" :key="index">{{name}}</div>
								</div>
								<div class="ml-2 sm:ml-auto" v-else-if="limitation.key == 'specific_buyer_email'"> 
									<div v-for="email, index in limitation.emails.split(',')" :key="index">{{email}}</div>
								</div>
								<div class="ml-2 sm:ml-auto" v-else-if="limitation.key == 'new_buyer_only'"> {{$t('discount_code.limitation_options.new_buyer_only')}} </div>
								<div class="ml-2 sm:ml-auto" v-else-if="limitation.key == 'buyer_usage_times'"> {{limitation.times}} </div>
								<div class="ml-2 sm:ml-0 truncate w-fit hover:text-clip hover:w-full" v-else-if="limitation.key == 'specific_campaign'"> 
									<template v-for="(campaign, index) in scheduledCamapign" :key="index"> 
										<template v-if="campaign.id == limitation.campaign_id"> {{campaign.title}} </template>	
									</template>
								</div>
							</div>
						</td>
						
						<td v-else-if="column.key === 'start_at'" class="sm:min-w-32" 
							:data-content="$t(`discount.table.`+column.name) " >
							<template v-if="discountCode[column.key]">
								{{ 
									new Date(discountCode[column.key]).toLocaleTimeString('en-us', {
										year: "numeric", month: "short", hour12: false,
										day: "numeric", hour: '2-digit', minute: '2-digit'
									}) 
								}}
							</template>
							<div v-else class="w-full text-black text-right sm:text-center"> - </div>
						</td>
						<td v-else-if="column.key === 'end_at'" class="sm:min-w-32" :class="{'text-danger': new Date() > new Date(discountCode[column.key])}"
							:data-content="$t(`discount.table.`+column.name) " >
							<template v-if="discountCode[column.key]">
								{{ 
									new Date(discountCode[column.key]).toLocaleTimeString('en-us', {
										year: "numeric", month: "short", hour12: false,
										day: "numeric", hour: '2-digit', minute: '2-digit'
									}) 
								}}
							</template>
							<div v-else class="w-full text-black text-right sm:text-center"> - </div>
						</td>

						<td v-else-if="column.type === 'action'" class="w-20"
							:data-content="$t(`discount.table.`+column.name) " >
							<Dropdown placement="bottom-start">
								<DropdownToggle role="button" class="block w-5 h-5 mx-auto" href="javascript:;">
								<MoreHorizontalIcon class="w-5 h-5 text-slate-700" />
								</DropdownToggle>
								<DropdownMenu class="w-24 pt-2 ">
								<DropdownContent class="w-24 text-center">
									<DropdownItem class="w-24 text-center whitespace-nowrap text-[14px]" 
										@click="editDiscountCode(discountCode, discountCodeIndex)"> 
											<SimpleIcon icon="edit" color="#2d8cf0" class="mr-1"/>
											{{ $t('discount.table.edit') }}
									</DropdownItem>
									<DropdownItem class="w-24 text-center text-danger whitespace-nowrap text-[14px]" 
										@click="deleteDiscountCode(discountCode, discountCodeIndex)"> 
										<SimpleIcon icon="delete" color="#b91c1c" class="mr-1"/>
										{{ $t('discount.table.del') }}
									</DropdownItem>
								</DropdownContent>
								</DropdownMenu>
							</Dropdown> 
						</td>
					</template>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="flex flex-wrap items-center intro-y sm:flex-row sm:flex-nowrap mb-10 sm:mb-0">
		<Page 
			class="mx-auto my-3 flex flex-row flex-wrap justify-center gap-1 mb-10" 
			:total="totalCount" 
			:page-size="page_size" 
			@on-change="changePage" 
			@on-page-size-change="changePageSize"
			show-sizer :page-size-opts="[10,20,50,100]" 
			/>
	</div>

</template>

<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted, computed } from "vue";

import { delete_discount_code, list_discount_code,list_scheduled_campaign_options } from "@/api_v2/discount_code"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import i18n from "@/locales/i18n"

const tableColumns = [
	{ name: "index", key: "index" , type:"index"},
    { name: "name", key: "name" , type:"text"},
    { name: "code", key: "code" , type:"text"},
	{ name: "used_count", key: "used_count" , type:"text"},
    { name: "start_at", key: "start_at", type:"datetime" },
    { name: "end_at", key: "end_at" , type:"datetime"},
    { name: "type", key: "type" , type:"textI18"},
	{ name: "discount_type", key: "discount_type" , type:"textI18"},
	{ name: "limitations", key: "limitations" , type:"multipleI18"},
	// { name: "description", key: "description" , type:"text"},
	{ name: "edit", key: "edit" , type:"action"},
	
]

const layoutStore = useLSSSellerLayoutStore();

const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

const currentPage = ref(1);
const totalPage = ref(1);
const pageSize = ref(10);
const totalCount = ref(0);

const discountCodes = ref([]);
const showLoadingIcon = ref(true)

const scheduledCamapign = ref() 
onMounted(() => {
	showLoadingIcon.value = true
	getScheduleCamp();
	listDiscountCodes();
	// eventBus.on("listDiscountCodes", () => {
	// 	listDiscountCodes();
	// });

	eventBus.on("createDiscountCode", discountCode => {

		// console.log(discountCode)
		// discountCodes.value.unshift(discountCode)
		listDiscountCodes()
		//
	});
	eventBus.on("updateDiscountCodes", payload => {
		// console.log(payload.discountCode)
		// console.log(payload.discountCodeIndex)
		discountCodes.value[payload.discountCodeIndex] = payload.discountCode

		//
	});
});

onUnmounted(() => {
	// eventBus.off("listDiscountCodes");

	eventBus.off("createDiscountCode");
	eventBus.off("updateDiscountCodes");

});

const isDiscountCodeForAllCampaign = (discountCode) => {

	discountCode.limitations.forEach(limitation => {
		if (limitation.key == 'specific_campaign') return true
	})
	return false
}

const changePage = page=> {
	currentPage.value = page;
	listDiscountCodes()
}

const changePageSize = page_size=> {
	pageSize.value = page_size;
	listDiscountCodes()
}

const getScheduleCamp =()=>{
	list_scheduled_campaign_options(layoutStore.alert).then(res=>{
        scheduledCamapign.value= res.data
    })
}

const listDiscountCodes=()=> {
	discountCodes.value = []
	showLoadingIcon.value = true
	list_discount_code(pageSize.value, currentPage.value, layoutStore.alert)
	.then((res) => {
		totalCount.value = res.data.count
		totalPage.value = Math.ceil(totalCount.value / pageSize.value)
		discountCodes.value = res.data.results
		showLoadingIcon.value = false
		console.log(discountCodes.value)
	})
	.catch(err=>{console.log(err)});
}

const editDiscountCode = (discountCode, discountCodeIndex)=>{


	// console.log(discountCodeIndex)

	hideDropDown()
	eventBus.emit('showEditModel', {'discountCode':discountCode, 'discountCodeIndex':discountCodeIndex})
}

const deleteDiscountCode = (discountCode, discountCodeIndex)=> {

	// console.log(discountCodeIndex)

	hideDropDown()
	delete_discount_code(discountCode.id, layoutStore.alert)
		.then(res =>{
			layoutStore.notification.showMessageToast(i18n.global.t('auto_reply.deleted_message'));
			// discountCodes.value.splice(discountCodeIndex,1)
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

    thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
    }

    tr {
		border-bottom: 2px solid #DDDDDD;
		margin-top: 50px;
	}

    td {
        min-height: 30px;
        height: auto;
        border: none;
        position: relative;
        padding-left: 45% !important;
        padding-right: 15px !important;
        text-align: right !important;
        box-shadow: none !important;
        font-size: 14px;
        vertical-align: middle !important;
        place-content: right !important;
    }

    td:before {
        position: absolute;
        min-height: 30px;
        left: 6px;
        width: 45%;
        padding-right: 10px;
        white-space: nowrap;
        font-weight: bold;
        box-shadow: none !important;
        text-align: left;
		content: attr(data-content);
		color: black;
    }
    .index:before {
        display: none;
    }
    .index{
        display: inline-block;
        position: absolute;
		top: -30px !important;
        z-index: 10;
        left: 0;
        width: 50px !important;
        padding-left: 0 !important;
        min-height: 25px !important;
    }
	td:nth-of-type(10):before {
        display: none;
    }
    td:nth-of-type(10){
        display: inline-block;
        position: absolute;
		top: -30px !important;
        z-index: 10;
        right: 0;
        width: 40px !important;
        padding-left: 0 !important;
        min-height: 25px !important;
    }
	.tdDot:before{
		display: none !important;
	}
	.tdDot{
		display: inline-block;
		left: 50%;
		top:30%;
		padding-left: 0px !important;
		transform: translateX(-50%);
	}
}
</style>
