<template>
    <!-- update Modal-->
	<Modal size="modal-lg" :show="showModal" @hidden="hideModal()">
		<ModalHeader>
			<h2 class="mr-auto text-base font-medium" v-if="modalType==CREATE">{{ 'Create Discount Code' }} </h2>
            <h2 class="mr-auto text-base font-medium" v-else-if="modalType==EDIT">{{ 'Edit Discount Code' }} </h2>
			<a @click="hideModal()" class="absolute top-0 right-0 mt-3 mr-3" href="javascript:;">
				<XIcon class="w-8 h-8 text-slate-400" />
			</a>
		</ModalHeader>
		<ModalBody >
            <div 
                class="flex flex-col intro-y mx-2"
                v-for="(column, column_index) in columns" 
                :key="column_index"
            >
                <template v-if="column.type === 'text'">
                    <label class="mt-2 text-base">{{ column.name  }}</label>
                    <input 
                        class="w-full form-control"
                        type="text" 
                        v-model="discountCode[column.key]"
                    />
                    <label class="text-danger text-[12px]" ></label>
                </template>

                <template v-else-if="column.type === 'text_area'">
                    <label class="mt-2 text-base">{{ column.name }}</label>
                    <textarea 
                        class="p-2 form-control"
                        v-model="discountCode[column.key]"
                    />
                </template>

                <template v-else-if="column.type === 'select_and_set' && column.key==='type' ">
                    <label class="mt-2 text-base">{{ column.name }}</label>
                    <DiscountTypeBlock :discountCode="discountCode"/>
                </template>

                <template v-else-if=" column.type ==='period'">
                    <div class="flex flex-col mt-2">
                        <div class="flex whitespace-nowrap align-middle"> 
                            <label for="regular-form-2" class="w-fit text-base">{{$t('create_campaign.period')}}</label>
                        </div>
                        <v-date-picker class="z-10" 
                            v-model="dateTimePicker" 
                            :timezone="timezone" 
                            :columns="$screens({ default: 1, sm: 2 })" 
                            mode="dateTime" is-range is-required is24hr
                            :min-date='new Date()'
                            >
                            <template v-slot="{ inputValue, inputEvents }">
                                <div class="flex items-center justify-center">
                                <input :value="inputValue.start" v-on="inputEvents.start"
                                    class="form-control border h-[42px] px-2 py-1 w-42 rounded-lg focus:outline-none focus:border-indigo-300" />
                                <ChevronsRightIcon class="w-8 h-8 m-1" />
                                <input :value="inputValue.end" v-on="inputEvents.end" disabled
                                    class="form-control border h-[42px] px-2 py-1 w-42 rounded-lg focus:outline-none focus:border-indigo-300" />
                                </div>
                            </template>
                        </v-date-picker>
                    </div>
                </template>

                <template v-else-if="column.type === 'multiple_select_and_set' && column.key==='limitations' ">
                    <div class="flex flex-row justify-between mt-2">
                        <label class="text-base">{{ column.name }}</label>
                        <button 
                            class="inline-block rounded-lg btn btn-primary lg:w-48 h-[42px]" 
                            @click="addLimitation()"
                        >
                            {{'add_limitation'}}
                        </button>
                    </div>

                    <div 
                        class="flex flex-col gap-2"
                        v-for="(limitation, limitation_index) in discountCode.limitations" :key="limitation_index"
                    >
                        <LimitationBlock :discountCode="discountCode" :limitationIndex="limitation_index"/>

                        <div class="flex w-full"> 
                            <button 
                                class="inline-block w-fit ml-auto text-base btn btn-danger mb-2" 
                                @click="deleteLimitation(limitation_index)"
                            > 
                                    {{'delete_limitation'}}
                            </button>
                        </div>
                    </div>
                </template>
            </div>
		</ModalBody>


		<ModalFooter>
			<button type="button" @click="hideModal()" class="w-32 btn dark:border-darkmode-400">
				{{ 'cancel' }}
			</button>
			<button type="button" @click="createDiscountCode()" class="w-32 ml-5 shadow-md btn btn-primary" v-if="modalType==CREATE">
				{{ 'create' }}
			</button>

            <button type="button" @click="updateDiscountCode()" class="w-32 ml-5 shadow-md btn btn-primary" v-else-if="modalType==EDIT">
				{{ 'save' }}
			</button>
		</ModalFooter>
	</Modal>
</template>


<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted, watch , computed } from "vue";

import { create_discount_code, update_discount_code } from "@/api_v2/discount_code"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import i18n from "@/locales/i18n"
import LimitationBlock from "./LimitationBlock.vue"
import DiscountTypeBlock from "./DiscountTypeBlock.vue"


const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const layoutStore = useLSSSellerLayoutStore()
const CREATE = 'create'
const EDIT = 'edit'
const modalType = ref(CREATE)

const showModal = ref(false)

const discountCode = ref({
    name:'',
    code:'',
    start_at:null,
    end_at:null,
    type:"",
    limitations:[],
    description:"",
    meta:{}

})

const columns = [
    { name: "name", key: "name" , type:"text", dataType:"string"},
    { name: "code", key: "code" , type:"text", dataType:"string"},
    { name: "period", key: "period", type:"period", dataType:"string"},
    // { name: "start_at", key: "start_at", type:"datetime", dataType:"string"},
    // { name: "end_at", key: "end_at" , type:"datetime", dataType:"string"},
    { name: "type", key: "type" , type:"select_and_set", dataType:"string"},
	{ name: "limitations", key: "limitations" , type:"multiple_select_and_set"},
	{ name: "description", key: "description" , type:"text_area"},
]



const dateTimePicker = ref({
	start:new Date(),
	end:new Date()
})

watch(computed(()=>dateTimePicker.value),()=>{
	discountCode.value.start_at = dateTimePicker.value.start
	discountCode.value.end_at = dateTimePicker.value.end
},{deep:true})

onMounted(()=>{
    eventBus.on('showCreateModel',()=>{modalType.value = CREATE;showModal.value=true; })
    eventBus.on('showEditModel',_discountCode=>{
        modalType.value = EDIT;
        showModal.value=true; 
        
        discountCode.value = JSON.parse(JSON.stringify(_discountCode))
        dateTimePicker.value.start=discountCode.value.start_at
		dateTimePicker.value.end=discountCode.value.end_at
        
    })
})
onUnmounted(()=>{
    eventBus.off('showCreateModel')
    eventBus.off('showEditModel')
})

const hideModal = ()=>{
    showModal.value = false
    discountCode.value = {
        name:'',
        code:'',
        start_at:null,
        end_at:null,
        type:"",
        limitations:[],
        description:"",
        meta:{}

    }
}



const deleteLimitation = index=>{discountCode.value.limitations.splice(index,1)}

const addLimitation = ()=>{discountCode.value.limitations.unshift({})}


const createDiscountCode=()=>{
    console.log(discountCode.value)
    create_discount_code(discountCode.value).then(res=>{

        eventBus.emit('listDiscountCodes',null)
        layoutStore.notification.showMessageToast(i18n.global.t('auto_reply.create_success'))
        hideModal()
    })
}
const updateDiscountCode = ()=>{
    update_discount_code(discountCode.value.id,discountCode.value).then(res=>{

        eventBus.emit('listDiscountCodes',null)
        layoutStore.notification.showMessageToast(i18n.global.t('auto_reply.saved_message'))
        hideModal()
    })
}
</script>
