<template>
    <Modal backdrop="static" size="modal-lg" :slideOver="true" :show="showModal" @hidden="hide()">
        <ModalHeader class="p-5">
            <h2 class="flex flex-row justify-center gap-2 font-medium text-center text-xl w-full">{{ $t('stock.wishlist.title') }} ({{wishlist.length}})</h2>
            	<XIcon class="absolute right-0 top-0 mt-3 mr-3 w-8 h-8 text-slate-400" @click="hide()"/>
        </ModalHeader>
        
        <ModalBody>
            <div class="flex flex-col gap-3"> 
                <button class="btn btn-primary ml-auto" @click="sentWishlistMail()"><MailIcon class="mr-2 w-5" />  {{ $t('stock.wishlist.mail_to') }} </button> 
                <table class="table table-report table-auto -mt-3" style="text-align: inherit;">
                    <thead>
                        <tr>
                            <th class="whitespace-nowrap text-left" v-for="column in tableColumns" :key="column.key">
                                {{ $t(`stock.wishlist.${column.key}`) }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="customer in wishlist" :key="customer">
                            <template v-for="column in tableColumns" :key="column.key">
                                <td v-if="column.key == 'email'" class="break-all w-fit">
                                    {{ customer[column.key] ? customer[column.key] : 'None' }}
                                </td>
								<td v-else-if="column.key == 'name'" class="break-all w-fit">
                                    {{ customer[column.key].name ? customer[column.key].name : 'None' }}
                                </td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ModalBody>
    </Modal>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { wish_list_send_email } from '@/api_v2/product'
import i18n from "@/locales/i18n"

const layoutStore = useLSSSellerLayoutStore();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const showModal = ref(false)
const id = ref('')
const tableColumns = ref([
	{ key: 'name', name: 'name'},
    { key: 'email', name: 'email'}
])
// { key: 'customer_name', name: 'Customer name' },
const wishlist = ref([])

onMounted(() => {
    eventBus.on('showWishlistModal', (playload) => {
        showModal.value = true
        id.value = playload.id
		Object.entries(playload.wishlist).forEach(([key,value]) => {
			wishlist.value.push({email:key, name:value})
			console.log(tableColumns.value)
        });
    })
})

onUnmounted(() => {
    eventBus.off('showWishlistModal')
})
const hide=()=>{showModal.value=false, wishlist.value=[] }

const sentWishlistMail = () =>{
	let yes = confirm(`${i18n.global.t('stock.wishlist.confirm_send')}`)
	if (yes) {
		wish_list_send_email(id.value, layoutStore.alert).then(
		res=>{
			layoutStore.notification.showMessageToast(`${i18n.global.t('stock.wishlist.success_send')}`)
			eventBus.emit('refreshStockTable')
			hide()
		})
	}
	else layoutStore.alert.showMessageToast(`${i18n.global.t('stock.wishlist.cancel_send')}`)
}
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
