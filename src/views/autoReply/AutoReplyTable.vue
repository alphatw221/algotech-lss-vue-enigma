<template>
	<div class=" overflow-y-auto h-[700px]">
		<table class="table table-report">
			<thead>
				<tr>
					<th v-for="column in columns" :key="column.key" class="w-fit">
						{{ column.name }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(reply, index) in listItems" :key="index" class="intro-x">
					<template v-for="(column, index) in columns" :key="index">
						<td v-if="column.key === 'facebook_page'"
							class="w-24 imgtd">
							<div class="flex m-auto w-14 h-14 image-fit zoom-in">
								<Tippy tag="img" class="w-12 h-12 rounded-full " :src="reply.facebook_page.image"
									:content="`facebook`" />
							</div>
						</td>
						<td v-else-if="column.key === 'edit'"
							class="w-20 h-auto edit">
							<EditIcon class="m-auto click-icon" @click="
								updateInfo(reply.id, reply.input_msg, reply.output_msg, reply.description)
							" />
						</td>
						<td v-else-if="column.key === 'delete'"
							class="w-20 h-auto delete">
							<Trash2Icon class="m-auto click-icon" @click="deleteAutoReply(reply.id)" />
						</td>
						<td v-else-if="column.key === 'id'" class="id w-20 text-[12px] lg:text-sm">
							<span class="sm:hidden"># </span>{{ reply[column.key] }}
						</td>
						<td v-else class="info w-auto text-[12px] lg:max-w-30 lg:text-sm longMessage">
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
				<input id="modal-form-1" type="text" class="form-control longMessage" placeholder=""
					v-model="currentInfo.input_msg" />
			</div>
			<div class="col-span-12">
				<label for="modal-form-1" class="form-label">Set Automated Response</label>
				<input id="modal-form-1" type="text" class="form-control longMessage" placeholder=""
					v-model="currentInfo.output_msg" />
			</div>
			<div class="col-span-12">
				<label for="modal-form-1" class="form-label">Remark</label>
				<input id="modal-form-1" type="text" class="form-control" placeholder=""
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
const currentInfo = ref({
	id: "",
	input_msg: "",
	output_msg: "",
	description: "",
	facebook_page: {},
});

onMounted(() => {
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
	console.log(id);
	updateModal.value = true;
	currentInfo.value.id = id;
	currentInfo.value.input_msg = input;
	currentInfo.value.output_msg = output;
	currentInfo.value.description = description;
	currentInfo.value.facebook_page = facebook_page;
}

function getReplyData() {
	list_auto_response(pageSize.value, currentPage.value)
	.then((response) => {

		console.log(response);
		totalCount.value = response.data.count
		totalPage.value = Math.ceil(totalCount.value / pageSize.value)
		listItems.value = response.data.results
	})
	.catch(function (error) {
		console.log(error);
	});
}

function closeWithAlert() {
	if (saved.value === true) {
		updateModal.value = false;
		layoutStore.notification.showMessageToast("Saved the Change");
	} else {
		updateModal.value = false;
		layoutStore.alert.showMessageToast("Change Not Saved");
	}
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
	delete_auto_response(id)
		.then((response) => {
			alert(response.data.message);
			getReplyData();
		})
		.catch((err) => {
			alert(err);
		});
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
  z-index: 99;
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
		top:50%;
	}

	.productName {
		padding-left: 15px;
	}

	.id{
		display:inline-block;
		width:100%;
		font-weight: 500;
		color: theme("colors.primary");
	}

	.imgtd {
		display: inline-block;
		width: 100%;
		padding-left: 0% !important;
		height: 80px !important;
	}
	
	.title{
		display:inline-block;
		width:100%;
		font-weight: 500;
		color: theme("colors.primary");
	}
	.edit{
		display: inline-block;
		width: 50%;
		margin-top:10px;
		padding-left: 0% !important;
		/* color: #0e9893; */
	}
	.delete{
		display: inline-block;
		width: 50%;
		margin-top:10px;
		padding-left: 0% !important;
		/* color: #0e9893; */
	}

	.info{
		margin-top: 10px;
		margin-bottom: 10px;
	}
}
</style>
