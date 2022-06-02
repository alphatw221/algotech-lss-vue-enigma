<template>
	<div >
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
						<template v-if="column.key === 'facebook_page'" >
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
                            <EditIcon @click="updateReply" />
                        </template>
                        <template v-else-if="column.key === 'delete'">
                            <Trash2Icon @click="deleteAutoReply(reply.id)"/>
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
				:total="dataCount" 
				show-sizer
				@on-change="changePage"
				@on-page-size-change="changePageSize"
			/>
		</div> 
	</div>
</template>

<script>
import { createAxiosWithBearer } from "@/libs/axiosClient";
import { delete_auto_response} from "@/api/auto_reply";
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
			dataCount: 0,
            keyword: undefined,
            listItems: [],
		}
	},
	mounted() {
		this.getReplyData()
	},
	methods: {
		changePage(page) {      
			this.currentPage = page;
		},
		changePageSize(pageSize) {
			this.pageSize = pageSize;
		},
		getReplyData() {
			createAxiosWithBearer().get(`${this.requestUrl}`).then(response => {
				console.log(response);
                this.dataCount = response.data.length;
				this.listItems = response.data;
                console.log(this.listItems);
			}).catch(function (error) {
				console.log(error);
			})
		},
        updateReply(){
            this.eventBus.emit("updateReply");
        },
        deleteAutoReply(name) {
            delete_auto_response(name).then(
                response => {
                    this.list();
                }
            )
        }
	},
}
</script>