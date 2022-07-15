<template>
	<div class=" overflow-y-auto max-h-[62vh]">
	
		<table class="table -mt-3 table-report">
			<thead>
				<tr>
					<th v-for="column in columns" :key="column.key" class="w-fit whitespace-nowrap">
						<template v-if="column.name === '#' || column.key === 'facebook_page'">
							<span class="px-6"> {{ column.name }}</span> 
						</template>
						<template v-else> {{ column.name }} </template>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td v-if="showCommentLoding"
						class="h-[300px] items-center relative"
						:colspan="columns.length" >
						<LoadingIcon icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] right-[50%] top-[50%] translate-x-1/2"/>
					</td>
					<td v-else-if="listItems.length === 0" :colspan="columns.length">
						<div class="mt-5 text-center md:mt-10" >
							<h1 class="text-slate-500 text-sm md:text-lg h-[300px]">
								Assign your first auto-reply by click (+ Create) button
							</h1>
						</div>
					</td> 
				</tr>
				<tr v-for="(reply, index) in listItems" :key="index" class="intro-x">
					<template v-for="(column, cindex) in columns" :key="cindex">
						<td v-if="column.key === 'facebook_page'"
							class="w-32 imgtd">
							<span class="mt-4 title sm:hidden">{{column.name}}</span>
							<div class="w-12 h-12 mb-5 ml-auto -mt-8 sm:m-auto image-fit zoom-in">
								<Tippy tag="img" class="w-12 h-12 rounded-lg " :src="reply.facebook_page.image" v-if="reply.facebook_page"
									:content="`facebook`" />
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
										@click="updateInfo(reply.id, reply.input_msg, reply.output_msg, reply.description)"> 
											<EditIcon class="w-[20px] h-[20px] mx-1"/> Edit </DropdownItem>
									<DropdownItem class="w-24 text-center text-danger whitespace-nowrap text-[14px]" 
										@click="deleteAutoReply(reply.id)"> 
											<Trash2Icon class="w-[20px] h-[20px] mx-1"/> Delete </DropdownItem>
								</DropdownContent>
								</DropdownMenu>
							</Dropdown> 
						</td>
						<td v-else-if="column.key === 'id'" class="w-20 text-center id lg:text-sm">
							<span class="sm:hidden"># </span>{{index+1}}
						</td>
						<td v-else class="w-auto info lg:max-w-30 lg:text-sm longMessage">
							<span class="title sm:hidden">{{column.name}}</span> {{ reply[column.key] }}
						</td>
					</template>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
		<Page class="mx-auto my-3" :total="totalCount" @on-change="changePage" @on-page-size-change="changePageSize" />
	</div>
	<!-- update Modal-->
	<Modal :show="updateModal" @hidden="closeWithAlert()">
		<ModalHeader>
			<h2 class="mr-auto text-base font-medium">Edit #{{currentInfo.id}}</h2>
			<a @click="updateModal = false" class="absolute top-0 right-0 mt-3 mr-3" href="javascript:;">
				<XIcon class="w-8 h-8 text-slate-400" />
			</a>
		</ModalHeader>
		<ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
			<div class="col-span-12">
				<label for="modal-form-1" class="form-label">Keywords to Detect</label>
				<input id="modal-form-1" type="text" class="rounded-lg form-control longMessage" placeholder=""
					v-model="currentInfo.input_msg" />
			</div>
			<div class="col-span-12">
				<label for="modal-form-1" class="form-label">Set Automated Response</label>
				<input id="modal-form-1" type="text" class="rounded-lg form-control longMessage" placeholder=""
					v-model="currentInfo.output_msg" />
			</div>
			<div class="col-span-12">
				<label for="modal-form-1" class="form-label">Remark</label>
				<input id="modal-form-1" type="text" class="rounded-lg form-control" placeholder=""
					v-model="currentInfo.description" />
			</div>
			<!-- <div class="col-span-12">
				<label for="modal-form-1" class="form-label">Following</label>
				<img :src="currentInfo.facebook_page.image" />
			</div> -->
		</ModalBody>
		<ModalFooter>
			<button type="button" @click="updateModal = false" class="w-32 btn dark:border-darkmode-400">
				Cancel
			</button>
			<button type="button" @click="updateAutoReply(currentInfo.id, currentInfo)" class="w-32 ml-5 shadow-md btn btn-primary">
				Save
			</button>
		</ModalFooter>
	</Modal>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted } from "vue";
import { createAxiosWithBearer } from "@/libs/axiosClient";
import { delete_auto_response, update_auto_response,list_auto_response } from "@/api_v2/auto_response"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";

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
const updateModal = ref(false);
const saved = ref(false);
const listItems = ref([]);
const showCommentLoding = ref(true)

const currentInfo = ref({
	id: "",
	input_msg: "",
	output_msg: "",
	description: "",
	facebook_page: {},
});

onMounted(() => {
	showCommentLoding.value = true
	getReplyData();
	eventBus.on("getReplyData", (payload) => {
		getReplyData();
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

function updateInfo(id, input, output, description, facebook_page) {
	updateModal.value = true;
	currentInfo.value.id = id;
	currentInfo.value.input_msg = input;
	currentInfo.value.output_msg = output;
	currentInfo.value.description = description;
	currentInfo.value.facebook_page = facebook_page;
}

function getReplyData() {
	listItems.value =[]
	showCommentLoding.value = true
	list_auto_response(pageSize.value, currentPage.value)
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

function closeWithAlert() {
	if (saved.value === true) {
		updateModal.value = false;
		hideDropDown()
		layoutStore.notification.showMessageToast("Saved the Change");
	} else {
		updateModal.value = false;
		hideDropDown()
		layoutStore.alert.showMessageToast("Change Not Saved");
	}
	hideDropDown()
	saved.value = false;
}

function updateAutoReply(id, currentInfo) {
	update_auto_response(id, currentInfo).then((response) => {
		console.log(response.data.results);
		currentInfo.value = response.data.results;
		console.log(response);
		updateModal.value = false;
		saved.value = true;
		getReplyData();
	});
}

function deleteAutoReply(id) {
	hideDropDown()
	delete_auto_response(id)
		.then((response) =>{
			layoutStore.notification.showMessageToast("Deleted");
			getReplyData();
		})
		.catch((err) => {
			alert(err);
		});
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

	thead tr {
		position: absolute;
		top: -9999px;
		left: -9999px;
	}

	tr {
		border-bottom: 3px solid rgba(61, 61, 61, 0.7);
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
