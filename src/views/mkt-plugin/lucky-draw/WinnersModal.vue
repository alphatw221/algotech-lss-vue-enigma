<template>
    <Modal backdrop="static" size="modal-lg" :slideOver="true" :show="winnerListPreview" @hidden="winnerListPreview = false">
        <ModalHeader class="p-5">
            <h2 class="font-medium text-center text-xl w-full">{{ $t('lucky_draw.winner_modal.all_winner') }}</h2>
			<a @click="winnerListPreview = false" class="absolute right-0 top-0 mt-3 mr-3">
            	<XIcon class="w-8 h-8 text-slate-400" />
        	</a>
        </ModalHeader>
        
        <ModalBody>
            <table class="table table-report table-auto -mt-3" style="text-align: inherit;">
                <thead>
                    <tr>
                        <th class="whitespace-nowrap text-left" v-for="column in tableColumns" :key="column.key">
                            {{ $t(`lucky_draw.winner_modal.${column.key}`) }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="winner in winnerList" :key="winner">
						<template v-if="winner.draw_type">

							<template v-for="column in tableColumns" :key="column.key">
								<td v-if="column.key == 'platform'" class="imgtd w-20">
									<div class="flex w-full justify-around">
										<div class="flex-0 w-20 h-20 sm:w-12 sm:h-12 zoom-in border-0">
											<Tippy v-if="winner.customer_image == '' || winner.customer_image == null" tag="img" 

												class="rounded-full border-0 w-20" :src="`${staticDir}fake_head.jpeg`"

												/>
											<Tippy v-else tag="img" class="rounded-full border-0 w-20 h-20 sm:w-12 sm:h-12" :src="winner.customer_image"
												/>
											<div v-if="winner.platform != null" class="w-6 h-6 sm:w-5 sm:h-5 absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
												<img v-if="winner.platform == 'facebook'" class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
												<img v-else-if="winner.platform == 'instagram'" class="rounded-full bg-[#d63376]" :src="instagram_platform" >
												<img v-else-if="winner.platform == 'youtube'" class="rounded-full bg-[#f70000]" :src="youtube_platform" >
												<img v-else-if="winner.platform == 'twitch'" class="rounded-full bg-[#6441a5]" :src="twitch_platform" >
												<img v-else-if="winner.platform == 'tiktok'" class="rounded-full bg-[#000000]" :src="tiktok_platform" >
											</div>
										</div>
									</div>
								</td>
								<td v-else-if="column.key == 'draw_type'"  class="whitespace-nowrap w-fit">
									{{ $t(`lucky_draw.draw_list.${winner[column.key]}`) }}
								</td>

								<td v-else-if="column.key == 'customer_name'" class="break-all w-fit">
									<div v-if="winner[column.key] != ''"> {{ winner[column.key] }} </div>
									<div v-else> Guest </div>
								</td>

								<td v-else class="break-all w-fit">
									{{ winner[column.key] }}
								</td>
							</template>
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
import tiktok_platform from '/src/assets/images/lss-img/tiktok_black_bg.png';
import twitch_platform from '/src/assets/images/lss-img/twitch.png';
import unbound from '/src/assets/images/lss-img/noname.png';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const layoutStore = useLSSSellerLayoutStore();
const route = useRoute();
const router = useRouter();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const staticDir = import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR
const tableColumns = ref([
    { key: 'platform', name: 'Platform' },
    { key: 'customer_name', name: 'Customer name' },
    { key: 'draw_type', name: 'Type'},
    { key: 'prize', name: 'Prize'}
])
const winnerList = ref([])
const winnerListPreview = ref(false)


onMounted(() => {
    eventBus.on('showWinnersListModal', () => {
        list_campaign_lucky_draw_winners(route.params.campaign_id, layoutStore.alert).then(res => {
        winnerList.value = res.data    
    })
    winnerListPreview.value = true
    })
})

onUnmounted(() => {
    eventBus.off('showWinnersListModal')
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
(min-device-width: 769px) and (max-device-width: 769px) {

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
		border-bottom: 2px solid #DDDDDD;
		margin-top: 10px;
	}

	td {
		border: none;
		position: relative;
		padding-left: 50% !important;
		text-align: right;
		box-shadow: none !important;
		height: auto;
		min-height: 30px;
		width: 100%;
		right: 10px; 
	}

	td:before {
		position: absolute;
		left: 10px;
		width: 45%; 
		padding-right: 10px;
		text-align: left;
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
