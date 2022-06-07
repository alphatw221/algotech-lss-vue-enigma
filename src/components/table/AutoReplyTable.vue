<template>
<Alert :show="successAlert" class="col-start-1 col-span-12 alert-warning mb-2"> Update Success </Alert>
<Alert :show="warnAlert" class="col-start-1 col-span-12 alert-danger mb-2"> Change - Not Saved </Alert>
	<div>
		<table class="table table-report mt-5 overflow-y-scroll table-auto">
			<thead>
				<tr >
					<th class="whitespace-nowrap" v-for="column in columns" :key="column.key">
						{{ column.name }}
					</th>
				</tr>
			</thead>
			<tbody style=" height: 500px;">
				<tr
					v-for="(reply, key) in listItems"
					:key="reply.key"
					class="intro-x"
				>
					<td v-for="column in columns" class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm">
						<template v-if="column.key === 'facebook_page'">
							<div class="flex">
								<div class="w-10 h-10 image-fit zoom-in lg:w-12 lg:h-12 2xl:w-12 lg:h-12">
									<Tippy 
										tag="img"
										class="rounded-full"
										:src= "reply.facebook_page.image"
										:content="`facebook`"
									/>
								</div>
							</div>
						</template>
                        <template v-else-if="column.key === 'edit'">
                            <EditIcon class="click-icon" @click="updateInfo(reply.id,reply.input_msg,reply.output_msg,reply.description)" />
                        </template>
                        <template v-else-if="column.key === 'delete'">
                            <Trash2Icon class="click-icon" @click="deleteAutoReply(reply.id)"/>
                        </template>
						<template v-else>
							{{reply[column.key]}}
						</template>
					</td>
				</tr>
			</tbody>
		</table> 
		<div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
			<Page 
				:total="totalCount" 
				show-sizer
				@on-change="changePage"
				@on-page-size-change="changePageSize"
			/>
		</div> 
	</div>
	<!-- update Modal-->
	<Modal :show="updateModal" @hidden="updateModal = false">
        <ModalHeader>
            <h2 class="font-medium text-base mr-auto">Update Auto Response</h2>
            <a @click="closeUpdate" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
                <XIcon class="w-8 h-8 text-slate-400" />
            </a>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Keywords to Detect</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder="" v-model="currentInfo.input_msg" />
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Set Automated Response</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder="" v-model="currentInfo.output_msg"/>
            </div>
            <div class="col-span-12">
                <label for="modal-form-1" class="form-label">Remark</label>
                <input id="modal-form-1" type="text" class="form-control rounded-full" placeholder="" v-model="currentInfo.description"/>
            </div>
			<div class="col-span-12">
                <label for="modal-form-1" class="form-label">Following</label>
                <img :src="currentInfo.facebook_page.image"/>
            </div>
        </ModalBody>
        <ModalFooter>
            <button type="button" @click="closeUpdate" class="btn btn-outline-secondary w-20 mr-1">
                Cancel
            </button>
            <button type="button" @click="updateAutoReply(this.currentInfo.id)" class="btn btn-primary w-20">Save</button>
        </ModalFooter>
    </Modal>
</template>

<script>
import { createAxiosWithBearer } from "@/libs/axiosClient";
import { delete_auto_response, update_auto_response} from "@/api/auto_reply";
export default {
	props: {
		requestUrl: String,
		columns: Array,
	},
	data() {
		return {
			currentPage: 1,
            totalPage: 1,
            pageSize: 10,
			totalCount: 0,
			updateModal: false,
			warnAlert : false,
			successAlert : false,
            listItems: [],
			currentInfo:{
				id:'',
				input_msg:'', 
				output_msg:'',
				discription:'',
				facebook_page:{},
			},
		}
	},
	mounted() {
		this.getReplyData()
		this.eventBus.on("getReplyData", (payload) => {
			console.log(payload)
			this.getReplyData()
		})
	},
	unmounted() {
		this.eventBus.off("getReplyData")
	},
	methods: {
		changePage(page) {      
			this.currentPage = page;
		},
		changePageSize(pageSize) {
			this.pageSize = pageSize;
		},
		updateInfo(id,input,output,description, facebook_page){
			console.log(id)
			this.updateModal=true;
			this.currentInfo.id = id;
			this.currentInfo.input_msg = input;
			this.currentInfo.output_msg = output; 
			this.currentInfo.description = description;
			this.currentInfo.facebook_page = facebook_page;
			console.log(this.currentInfo)
		},
		getReplyData() {
			createAxiosWithBearer().get(`${this.requestUrl}`).then(response => {
				console.log(response);
                this.totalCount = response.data.length;
				this.listItems = response.data;
				console.log(response.data)
			}).catch(function (error) {
				console.log(error);
			})
		},
		updateAutoReply(id) {
			update_auto_response(id, this.currentInfo).then(
				response => {
					console.log(response)
					this.updateModal = false;
					this.successAlert = true;
					this.getReplyData()
					setTimeout( () => ( this.successAlert= false ), 3000);
				}
			)
		},
		closeUpdate(){
			this.updateModal = false, 
			this.warnAlert = true, 
			setTimeout( () => ( this.warnAlert= false ), 5000);
		},
        deleteAutoReply(id) {
            delete_auto_response(id).then(
                response => {
					alert(response.data.message);
					this.getReplyData()
                }
            ).catch(err=>{
            alert(err)
        })
        },
	},
}
</script>

<style scoped>
.click-icon:hover {
	cursor: pointer;
}
</style>