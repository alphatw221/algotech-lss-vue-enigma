<template>
	<div class="flex"> 
		<div class="relative"> 
			<input type="text" class=" mr-2 form-control w-40 lg:w-60 rounded-lg"
			:placeholder="$t('stock.search_bar.search_holder')" v-model="searchKeyword" @keydown.enter.prevent="getReplyData" />
			<SearchIcon class="absolute w-7 h-7 top-1 sm:top-2 right-4 z-10 text-slate-600" @click="getReplyData()"/>
		</div>
		<XIcon 
				v-if="searchKeyword"
				class="flex-none w-7 h-7 mt-2 text-slate-600" @click="reset()"/>
		<button
			v-show="isBulkDeleteShow"
			type="button" 
			class="btn btn-primary shadow-md w-32 h-[35px] lg:h-[42px] ml-4" 
			@click="batchDelete"
		>
			{{ $t('auto_reply.table_column.bulk_delete') }}
		</button> 
	</div>
	<div class="overflow-auto h-full sm:h-fit">
		<table class="table -mt-3 table-report">
			<thead>
				<tr>
					<th v-for="column in columns" :key="column.key" class="w-fit whitespace-nowrap text-center">
						<template v-if="column.name === 'check'">
							<input 
								class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" 
								type="checkbox" 
								@change="selectAllReply($event)"
							/>
						</template>
						<template v-else-if="column.name === '#'">
							<span class="px-6"> {{ $t(`auto_reply.table_column.${column.name}`) }} </span> 
						</template>
						<template v-else-if="column.name === ''">
						</template>
						<template v-else-if="column.key === 'page'"> 
							<div class="flex w-full"> 
								<span class="my-auto"> {{ $t(`auto_reply.table_column.${column.name}`) }} </span> 
								<Tippy 
									class="rounded-full w-fit whitespace-wrap" 
									data-tippy-allowHTML="true" 
									data-tippy-placement="right" 
									:content="$t('tooltips.auto_reply.assign_to')" 
									theme='light'
								> 
									<HelpCircleIcon class="w-5 ml-1 tippy-icon" />
								</Tippy> 
							</div>
						</template>
						<template v-else> {{ $t(`auto_reply.table_column.${column.name}`) }} </template>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td v-if="showCommentLoding"
						class="h-[300px] items-center relative tdDot"
						:colspan="columns.length" >
						<LoadingIcon icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] right-[50%] top-[50%] translate-x-1/2"/>
					</td>
					<td v-else-if="listItems.length === 0" :colspan="columns.length" class="tdDot">
						<div class="mt-5 text-center md:mt-40 md:mb-20" >
							<h1 class="text-slate-500 text-sm md:text-lg font-bold">
								{{ $t('auto_reply.no_have_autoreply') }}
							</h1>
							<!-- <h1 class="text-slate-500 text-sm md:text-lg">
								{{ $t('auto_reply.set_up_first') }}
							</h1> -->
						</div>
					</td> 
				</tr>
				<tr v-for="(reply, index) in listItems" :key="index" class="intro-x">
					<template v-for="(column, cindex) in columns" :key="cindex">
						<td class="w-10" v-if="column.key == 'check'">
							<input 
								class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto selectCheck" 
								type="checkbox" 
								v-model="reply.check"
								@click="selectReply(reply, $event)"
							/>
						</td>
						<td v-else-if="column.key === 'page'"
							class="w-32 imgtd">
							<span class="mt-4 title sm:hidden">{{ $t(`auto_reply.table_column.${column.name}`) }}</span>
							<div class="w-12 h-12 mb-5 ml-auto -mt-8 sm:m-auto image-fit zoom-in">
								<Tippy tag="img" class="w-12 h-12 rounded-lg ml-10 sm:mx-auto" :src="reply.facebook_page.image" v-if="reply.facebook_page"
									:content="`facebook`" />
								<Tippy tag="img" class="w-12 h-12 rounded-lg ml-10 sm:mx-auto" :src="reply.instagram_profile.image" v-else-if="reply.instagram_profile"
								:content="`instagram`" />
							</div>
						</td>
						<td v-else-if="column.key === 'edit'"  class="w-20 edit">
							<Dropdown placement="bottom-start">
								<DropdownToggle role="button" class="block w-5 h-5" href="javascript:;">
								<MoreHorizontalIcon class="w-5 h-5 text-slate-700" />
								</DropdownToggle>
								<DropdownMenu class="w-24 pt-2 ">
								<DropdownContent class="w-24 text-center">
									<DropdownItem class="w-24 text-center whitespace-nowrap text-[14px]" 
										@click="updateInfo(index, reply)">
											<SimpleIcon icon="edit" color="#2d8cf0" class="mr-1"/> 
											{{$t('auto_reply.manipulate.edit')}} </DropdownItem>
									<DropdownItem class="w-24 text-center text-danger whitespace-nowrap text-[14px]" 
										@click="deleteAutoReply(reply,index)"> 
											<SimpleIcon icon="delete" color="#b91c1c" class="mr-1" /> 
											{{$t('auto_reply.manipulate.delete')}} </DropdownItem>
								</DropdownContent>
								</DropdownMenu>
							</Dropdown> 
						</td>
						<td v-else-if="column.key === 'id'" class="w-20 text-center id lg:text-sm">
							<span class="sm:hidden"># </span>{{index+1}}
						</td>
						<td v-else class="w-auto info lg:max-w-30 lg:text-sm longMessage">
							<span class="title sm:hidden">{{ $t(`auto_reply.table_column.${column.name}`) }}</span> {{ reply[column.key] }}
						</td>
					</template>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap mb-10 sm:mb-0">
		<Page class="mx-auto my-3" :total="totalCount" @on-change="changePage" @on-page-size-change="changePageSize" />
	</div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
import { delete_auto_response, list_auto_response, batch_delete_auto_response } from "@/api_v2/auto_response";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import i18n from "@/locales/i18n";

const props = defineProps({
	columns: Array,
});

const layoutStore = useLSSSellerLayoutStore();
const internalInstance = getCurrentInstance();
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const currentPage = ref(1);
const totalPage = ref(1);
const pageSize = ref(10);
const totalCount = ref(0);
const listItems = ref([]);
const showCommentLoding = ref(true)
const searchKeyword = ref('')

const keyinInfo = ref([])
const bulkDeleteIdList = ref([])
const isBulkDeleteShow = ref(false)

watch(computed(() => bulkDeleteIdList.value), () => {
	if (bulkDeleteIdList.value.length > 0) isBulkDeleteShow.value = true
	else isBulkDeleteShow.value = false
}, { deep:true })

onMounted(() => {
	showCommentLoding.value = true
	getReplyData();
	eventBus.on("getReplyData", (payload) => {
		payload.forEach( reply =>{
			listItems.value.unshift(reply)
		})
	});
	eventBus.on("getUpdateReplyData", (payload) => {
		listItems.value.forEach(function(reply,i) { 
		if (reply.id == payload.id){ 
			listItems.value[i].description = payload.description
			listItems.value[i].input_msg = payload.input_msg
			listItems.value[i].output_msg = payload.output_msg
		}});
	});
});

onUnmounted(() => {
	eventBus.off("getReplyData");
});

function changePage(page) {
	currentPage.value = page;
	getReplyData()
}

function changePageSize(page_size) {
	pageSize.value = page_size;
	getReplyData()
}

function updateInfo(index, reply) {
	keyinInfo.value = Object.assign({}, reply)
	keyinInfo.value.index = index
	eventBus.emit('showEditAutoreply',keyinInfo.value)
}

const reset=()=>{
	searchKeyword.value = ''
	getReplyData()
}

function getReplyData() {
	listItems.value =[]
	showCommentLoding.value = true
	list_auto_response(pageSize.value, currentPage.value, searchKeyword.value, layoutStore.alert)
	.then((response) => {
		totalCount.value = response.data.count
		totalPage.value = Math.ceil(totalCount.value / pageSize.value)
		listItems.value = response.data.results
		showCommentLoding.value = false
	})
	.catch(function (error) {
		console.log(error);
	});
}

function deleteAutoReply(reply,index) {
	hideDropDown()
	delete_auto_response(reply.id, layoutStore.alert)
		.then((response) =>{
			layoutStore.notification.showMessageToast(i18n.global.t('auto_reply.deleted_message'));
			listItems.value.splice(index,1)
		})
}

const selectAllReply = (event) => {
	if (event.target.checked) {
		listItems.value.forEach(reply => { 
			reply.check = true 
			bulkDeleteIdList.value.push(reply.id)
			// console.log(bulkDeleteIdList.value)
		})
	} else {
		listItems.value.forEach(reply => { 
			reply.check = false 
			bulkDeleteIdList.value = []
		})		
	}
}

const selectReply = (reply, event) => {
	if (event.target.checked) bulkDeleteIdList.value.push(reply.id)  
	else bulkDeleteIdList.value = bulkDeleteIdList.value.filter((v) => v != reply.id)
}

const batchDelete = () => {
	var yes = confirm(i18n.global.t('auto_reply.table_column.confirm_delete'));
	if (yes) {
		batch_delete_auto_response(bulkDeleteIdList.value, layoutStore.alert).then(res => {
			bulkDeleteIdList.value.forEach(bulk => listItems.value.splice(listItems.value.findIndex(list => list.id === bulk),1));
			bulkDeleteIdList.value = []
		})
	}
}

const hideDropDown = ()=>{
  dom('.dropdown-menu').removeClass('show')
}
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
		border-bottom: 2px solid #dddddd; 
		margin-top: 10px;
	}

	td {
		border: none;
		position: relative;
		text-align: left !important;
		box-shadow: none !important;
		min-height:30px;
		padding-left: 20px !important;
	}

	.id{
		display:inline-block;
		width:50%;
		font-weight: 500;
		color: theme("colors.primary");
		height:40px;
		padding-top: 10px !important;
	}
	.imgtd {
		display: inline-block;
		width:50%;
		margin-right: 20px;
	}
	
	.title{
		display:inline-block;
		font-size: 14px;
		width:100%;
		font-weight: 600;
		color: theme("colors.primary");
	}
	.edit{
		display: inline-block;
		position: absolute;
		width:50px;
		top:0;
		right:0;
	}
	.delete{
		display: inline-block;
		width: 50%;
		margin-top:10px;
		padding-left: 0% !important;
		margin-bottom: 10px;
	}

	.info{
		margin-top: 10px;
		margin-bottom: 10px;
		font-size: 14px !important;
	}
}
</style>
