<template>
	<div>
		<table class="table table-report mt-5 overflow-y-scroll table-auto">
			<thead>
				<tr>
					<th v-for="column in columns" :key="column.key" class="w-fit">
						{{ column.name }}
					</th>
				</tr>
			</thead>
			<tbody style="height: 500px">
				<tr v-for="(reply, key) in listItems" :key="reply.key" class="intro-x">
					<template v-for="(column, key) in columns" :key="column.key">
						<td v-if="column.key === 'facebook_page'"
							class="w-24 h-auto imgtd">
								<div class="w-14 h-14 image-fit zoom-in flex pt-2">
									<Tippy tag="img" class="rounded-full w-12 h-12" :src="reply.facebook_page.image"
										:content="`facebook`" />
								</div>
						</td>
						<td v-else-if="column.key === 'edit'"
							class="w-24 h-auto">
							<EditIcon class="click-icon" @click="
								updateInfo(reply.id, reply.input_msg, reply.output_msg, reply.description)
							" />
						</td>
						<td v-else-if="column.key === 'delete'"
							class="w-24 h-auto">
							<Trash2Icon class="click-icon" @click="deleteAutoReply(reply.id)" />
						</td>
						<td v-else-if="column.key === 'id'" class="w-20 text-[12px] lg:text-sm 2xl:text-sm">
							{{ reply[column.key] }}
						</td>
						<td v-else class="w-auto text-[12px] lg:max-w-30 lg:text-sm xl:max-w-30 2xl:max-w-30 2xl:text-sm">
							{{ reply[column.key] }}
						</td>
					</template>
				</tr>
			</tbody>
		</table>
		<div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
			<Page :total="totalCount" show-sizer @on-change="changePage" @on-page-size-change="changePageSize" />
		</div>
	</div>
	<!-- update Modal-->
	<Modal :show="updateModal" @hidden="closeWithAlert()">
		<ModalHeader>
			<h2 class="font-medium text-base mr-auto">Update Auto Response</h2>
			<a @click="updateModal = false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
				<XIcon class="w-8 h-8 text-slate-400" />
			</a>
		</ModalHeader>
		<ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
			<div class="col-span-12">
				<label for="modal-form-1" class="form-label">Keywords to Detect</label>
				<input id="modal-form-1" type="text" class="form-control rounded-full" placeholder=""
					v-model="currentInfo.input_msg" />
			</div>
			<div class="col-span-12">
				<label for="modal-form-1" class="form-label">Set Automated Response</label>
				<input id="modal-form-1" type="text" class="form-control rounded-full" placeholder=""
					v-model="currentInfo.output_msg" />
			</div>
			<div class="col-span-12">
				<label for="modal-form-1" class="form-label">Remark</label>
				<input id="modal-form-1" type="text" class="form-control rounded-full" placeholder=""
					v-model="currentInfo.description" />
			</div>
			<!-- <div class="col-span-12">
				<label for="modal-form-1" class="form-label">Following</label>
				<img :src="currentInfo.facebook_page.image" />
			</div> -->
		</ModalBody>
		<ModalFooter>
			<button type="button" @click="updateModal = false" class="btn btn-outline-secondary w-20 mr-1">
				Cancel
			</button>
			<button type="button" @click="updateAutoReply(currentInfo.id, currentInfo)" class="btn btn-primary w-20">
				Save
			</button>
		</ModalFooter>
	</Modal>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted } from "vue";
import { createAxiosWithBearer } from "@/libs/axiosClient";
import { delete_auto_response, update_auto_response } from "@/api/auto_reply";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";

const props = defineProps({
	requestUrl: String,
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
}

function changePageSize(pageSize) {
	pageSize.value = pageSize;
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
	createAxiosWithBearer()
		.get(`${props.requestUrl}`)
		.then((response) => {
			console.log(response);
			totalCount.value = response.data.length;
			listItems.value = response.data;
			listItems.value = listItems.value.reverse();
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
	height: auto !important;
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

	.imgtd {
		height: 80px !important;
	}

	thead tr {
		position: absolute;
		top: -9999px;
		left: -9999px;
	}

	tr {
		border-bottom: 1px solid black;
		margin-top: 20px;
	}

	td {
		border: none;
		position: relative;
		padding-left: 50% !important;
		text-align: left !important;
		box-shadow: none !important;
	}

	.productName {
		padding-left: 15px;
	}

	td:before {
		position: absolute;
		left: 6px;
		width: 45%;
		padding-right: 10px;
		white-space: nowrap;
		font-weight: bold;
		box-shadow: none !important;
		background-color: white !important;
	}

	td:nth-of-type(1):before {
		content: "#";
		/* color: #0e9893; */
	}

	td:nth-of-type(2):before {
		content: "Keywords to Detect";
		overflow-wrap: break-word;
		/* color: #0e9893; */
	}

	td:nth-of-type(3):before {
		content: "Automated Response";
		overflow-wrap: break-word;
		/* color: #0e9893; */
	}

	td:nth-of-type(4):before {
		content: "Remark";
		/* color: #0e9893; */
	}

	td:nth-of-type(5):before {
		content: "Following";
		/* color: #0e9893; */
	}

	td:nth-of-type(6):before {
		content: "";
		/* color: #0e9893; */
	}
	td:nth-of-type(7):before {
		content: "";
		/* color: #0e9893; */
	}
}
</style>
