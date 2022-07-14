<template>
    <Modal size="modal-lg" :slideOver="true" :show="winnerListPreview" @hidden="winnerListPreview = false">
        <ModalHeader class="p-5">
            <h2 class="font-medium text-base mr-auto">All Winners</h2>
        </ModalHeader>
        
        <ModalBody>
            <table class="box table table-report table-auto -mt-3" style="text-align: inherit;">
                <thead>
                    <tr>
                        <th class="whitespace-normal xl:whitespace-nowrap" v-for="column in tableColumns" :key="column.key">
                            {{ column.name }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="winner in winnerList" :key="winner">
                        <template v-for="column in tableColumns" :key="column.key">
                            <td v-if="column.key == 'platform'" class="imgtd">
                                <div class="flex w-full justify-around">
                                    <div class="flex-0 w-12 h-12 zoom-in border-0">
                                        <Tippy v-if="winner.customer_image == '' || winner.customer_image == null" tag="img" class="rounded-full border-0" :src="`${storageUrl}fake_head.jpeg`"
                                            />
                                        <Tippy v-else tag="img" class="rounded-full border-0" :src="winner.customer_image"
                                            />
                                        <div class="w-5 h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                                            <img v-if="winner.platform == 'facebook'" class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
                                            <img v-if="winner.platform == 'instagram'" class="rounded-full bg-[#d63376]" :src="instagram_platform" >
                                            <img v-if="winner.platform == 'youtube'" class="rounded-full bg-[#f70000]" :src="youtube_platform" >
                                            <img v-if="winner.platform == null" class="rounded-full bg-[#9D9D9D]" :src="unbound" >
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td v-else>
                                {{ winner[column.key] }}
                            </td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </ModalBody>
    </Modal>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import { list_campaign_lucky_draw_winners } from '@/api_v2/campaign_lucky_draw';
import { useRoute, useRouter } from "vue-router";
import youtube_platform from '/src/assets/images/lss-img/youtube.png';
import facebook_platform from '/src/assets/images/lss-img/facebook.png';
import instagram_platform from '/src/assets/images/lss-img/instagram.png';
import unbound from '/src/assets/images/lss-img/noname.png';

const route = useRoute();
const router = useRouter();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL
const tableColumns = ref([
    { key: 'platform', name: 'Platform' },
    { key: 'customer_name', name: 'Customer name' },
    { key: 'draw_type', name: 'Type'},
    { key: 'prize', name: 'Prize'}
])
const winnerList = ref([])
const winnerListPreview = ref(false)


onMounted(() => {
    eventBus.on('showWinnersList', () => {
        list_campaign_lucky_draw_winners(route.params.campaign_id).then(res => {
        winnerList.value = res.data    
    })
    winnerListPreview.value = true
    })
})

onUnmounted(() => {
    eventBus.off('showWinnersList')
})

</script>

<style scoped>

td {
	height: auto !important;
	padding-right:10px;
	padding-left:10px;
	font-size: 16px;
}

thead th{ 
	position: sticky !important; 
	top: 0 !important;
	font-size: 16px;
	z-index: 50;
	background-color: theme("colors.secondary");
  	padding-right:10px;
	padding-left:10px;
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
		font-size: 14px;
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
		padding-left: 50% !important;
		text-align: left !important;
		box-shadow: none !important;
		height: auto;
		min-height: 30px;
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
		height: auto;
	}

	.imgtd:before {
		display:none; 
	}
	.imgtd {
		display:inline-flex;
		justify-content: center;
		height: 90px !important;
		width: 100%;
		padding-left: 0px !important;
	}

    td:nth-of-type(2):before {
		content: "Customer Name";
	}
    td:nth-of-type(3):before {
		content: "Type";
	}
    td:nth-of-type(4):before {
		content: "Prize";
	}
}
</style>
