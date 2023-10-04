<template>
    <!-- update Modal-->
	<Modal size="modal-lg" backdrop="static" :show="showModal" @hidden="hideModal()">
		<ModalHeader>
			<h2 class="mr-auto text-base font-medium" v-if="modalType==CREATE">{{ $t('discount.modal.create') }} </h2>
            <h2 class="mr-auto text-base font-medium" v-else-if="modalType==EDIT">{{ $t('discount.modal.edit') }} </h2>
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
                    <label class="mt-2 text-base">{{$t(`discount.modal.`+column.name)}}</label>
                    <input 
                        class="w-full form-control"
                        type="text" 
                        v-model="discountCode[column.key]"
                        @blur="v[column.key].$touch"
                    />

                    <label class="text-danger text-[12px]" 
                        v-for="error,index in v[column.key].$errors"
                        :key="index"
                        >
                        {{ $t(`discount.modal.`+ error.$uid) }}
                    </label>
                </template>

                <template v-else-if="column.type === 'text_area'">
                    <label class="mt-2 text-base">{{$t(`discount.modal.`+column.name)}}</label>
                    <textarea 
                        class="p-2 form-control"
                        v-model="discountCode[column.key]"
                    />
                </template>

                <template v-else-if="column.type === 'select_and_set' && column.key==='type' ">
                    <label class="mt-2 text-base">{{$t(`discount.modal.${column.name}`)}}</label>
                    <div>
                        <select v-model="discountCode.type" :options="{
                                placeholder: 'choose_code_type',
                                }" class="w-full form-select rounded-lg mt-2 h-[42px]">
                            <option :value="key" v-for="(data, key, index) in discountCodeMeta.types" :key="index">{{$t(`discount.modal.type_options.`+data.name)}}</option>
                        </select>
                        <label class="text-danger text-[12px]" 
                            v-for="error,index in v.type.$errors"
                            :key="index"
                            >
                            {{$t(`discount.modal.`+error.$uid)}}
                        </label>
                    </div>
                </template>

                <template v-else-if="column.type === 'select_and_set' && column.key==='discount_type' ">
                    <label class="mt-2 text-base">{{$t(`discount.modal.`+column.name)}}</label>
                    <DiscountTypeBlock :discountCode="discountCode" :v="v"/>
                </template>

                <template v-else-if=" column.type ==='period'">
                    <div class="flex flex-col mt-2 gap-2">
                        <div class="flex whitespace-nowrap align-middle"> 
                            <input type="checkbox" v-model="discountCode.period_enabled" class="form-check-input h-[1.2rem] w-[1.2rem] my-auto" />
                            <label for="regular-form-2" class="w-fit text-base ml-4">{{$t('create_campaign.period')}}</label>
                        </div>

                        <div v-show="discountCode.period_enabled">
                            <v-date-picker class="z-10" 
                                v-model="dateTimePicker" 
                                :timezone="timezone" 
                                :columns="1" 
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
                    </div>
                </template>

                <template v-else-if="column.type === 'multiple_select_and_set' && column.key==='limitations' ">
                    <div class="flex flex-row justify-between mt-2">
                        <label class="text-base">{{$t(`discount.modal.`+column.name)}}</label>
                        <button 
                            v-show="showLimitButton"
                            class="inline-block rounded-lg btn btn-primary lg:w-48 h-[42px]" 
                            @click="addLimitation()"
                        >
                            {{$t('discount.modal.add_limitations')}}
                        </button>
                    </div>
                    <div 
                        class="flex flex-col gap-2" :class="`index-${limitation_index}`"
                        v-for="(limitation, limitation_index) in discountCode.limitations" :key="limitation_index"
                    >
                        <LimitationBlock :discountCode="discountCode" :limitationIndex="limitation_index" :limitationErr="limitationErr" :v="v" />

                        <div class="flex w-full"> 
                            <button 
                                class="inline-block w-fit ml-auto text-base btn btn-danger mb-2" 
                                @click="deleteLimitation(limitation_index)"
                            > 
                                {{$t('discount.modal.delete_limitation')}}
                            </button>
                        </div>
                    </div>
                </template>
            </div>
		</ModalBody>


		<ModalFooter>
			<button type="button" @click="hideModal()" class="w-32 btn dark:border-darkmode-400">
				{{$t('discount.modal.cancel')}}
			</button>
			<button type="button" @click="createDiscountCode()" class="w-32 ml-5 shadow-md btn btn-primary" v-if="modalType==CREATE">
				{{$t('discount.modal.save')}}
			</button>

            <button type="button" @click="updateDiscountCode()" class="w-32 ml-5 shadow-md btn btn-primary" v-else-if="modalType==EDIT">
				{{$t('discount.modal.save')}}
			</button>
		</ModalFooter>
	</Modal>
</template>


<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted, watch , computed, onBeforeMount } from "vue";

import { create_discount_code, update_discount_code} from "@/api_v2/discount_code"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import i18n from "@/locales/i18n"
import LimitationBlock from "./LimitationBlock.vue"
import DiscountTypeBlock from "./DiscountTypeBlock.vue"
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useLSSDiscountCodeMetaStore } from "@/stores/lss-discount-code-meta"


const discountCodeMeta = useLSSDiscountCodeMetaStore()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const layoutStore = useLSSSellerLayoutStore()
const CREATE = 'create'
const EDIT = 'edit'
const modalType = ref(CREATE)
const showModal = ref(false)
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const discountCodeIndex = ref(null)
const discountCode = ref({
    name:'',
    code:'',
    period_enabled:false,
    start_at:null,
    end_at:null,
    type:"general",
    discount_type:"",
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
    { name: "discount_type", key: "discount_type" , type:"select_and_set", dataType:"string"},
	{ name: "limitations", key: "limitations" , type:"multiple_select_and_set"},
	{ name: "description", key: "description" , type:"text_area"},
]

// const checkDuplicates = (param) => (value) => param.indexOf(value) === -1;
const discountCodeRules = computed(() => {
	return { 	
        name: { required, minLength: minLength(1), maxLength: maxLength(255) },
        code: { required, minLength: minLength(1), maxLength: maxLength(255)},
        type: { required },
        discount_type:{ required },
        limitations:{
            $each: helpers.forEach({
                key:{required},
            })
        }
    }
})

// onBeforeMount(()=>{
//     listDiscountCodes()
// })
// const listDiscountCodes=()=> {
// 	discountCodes.value = []
// 	list_discount_code(500,1).then((res) => {
// 		(res.data.results).forEach( list => {discountCodes.value.push(list.code)})
//         console.log(discountCodes.value)
//         console.log(array.value)
// 	})
// 	.catch(err=>{console.log(err)});
// }

const v = useVuelidate(discountCodeRules, discountCode);

const dateTimePicker = ref({
	start:new Date(),
	end:new Date()
})

watch(computed(()=>dateTimePicker.value), () => {
	discountCode.value.start_at = dateTimePicker.value.start
	discountCode.value.end_at = dateTimePicker.value.end
}, {deep:true})

watch(computed(()=>discountCode.value.period_enabled), () => {
    if(discountCode.value.period_enabled){
        discountCode.value.start_at = dateTimePicker.value.start
	    discountCode.value.end_at = dateTimePicker.value.end
    }else{
        discountCode.value.start_at = null
	    discountCode.value.end_at = null
    }
})

onMounted(()=>{
    eventBus.on('showCreateModel',() => {modalType.value = CREATE; showModal.value=true; })
    eventBus.on('showEditModel', payload=>{
        modalType.value = EDIT;
        
        discountCodeIndex.value = payload.discountCodeIndex
        discountCode.value = JSON.parse(JSON.stringify(payload.discountCode))

        dateTimePicker.value.start=discountCode.value.start_at
        dateTimePicker.value.end=discountCode.value.end_at


        // console.log(discountCode.value.start_at)
        // console.log(dateTimePicker.value.start)
        // console.log(discountCode.value.end_at)
        // console.log(dateTimePicker.value.end)
       
        showModal.value=true; 
        
        
    })
})
onUnmounted(()=>{
    eventBus.off('showCreateModel')
    eventBus.off('showEditModel')
})

const hideModal = ()=>{
    showModal.value = false
    showLimitButton.value = true
    discountCode.value = {
        name:'',
        code:'',
        period_enabled:false,
        start_at:null,
        end_at:null,
        type:"",
        discount_type:"",
        limitations:[],
        description:"",
        meta:{}
    }
    keyArray.value=[]
    v.value.$reset()
}
const keyArray= ref([])
const limitationErr = ref(false)

const checkIfDuplicateExists=(arr)=> {
    return new Set(arr).size !== arr.length
}


const deleteLimitation = index=>{ discountCode.value.limitations.splice(index, 1) }

const showLimitButton = ref(true)
const addLimitation = ()=>{
    if (discountCode.value.limitations.length < 3) {
        discountCode.value.limitations.unshift({key:''})
        showLimitButton.value = true
    } else {
        discountCode.value.limitations.unshift({key:''})
        showLimitButton.value = false
    }
} 


const createDiscountCode=()=>{
    limitationErr.value = false
    keyArray.value=[]
    discountCode.value.limitations.forEach(limit =>{ keyArray.value.push(limit.key)} )
    v.value.$touch()
	if (v.value.$invalid) {
		layoutStore.alert.showMessageToast(i18n.global.t('discount.create_err'))
        // console.log(v.value)
		return
	}
    else if(checkIfDuplicateExists(keyArray.value)==true){
        layoutStore.alert.showMessageToast(i18n.global.t('discount.create_err'))
        limitationErr.value =true
        keyArray.value=[]
        return
    }

    create_discount_code(discountCode.value, layoutStore.alert).then(res=>{
        // console.log(res.data)
        eventBus.emit('createDiscountCode',res.data)
        layoutStore.notification.showMessageToast(i18n.global.t('auto_reply.create_success'))
        hideModal()
    })
}

const updateDiscountCode = ()=>{
    update_discount_code(discountCode.value.id,discountCode.value, layoutStore.alert).then(res=>{
        limitationErr.value = false
        keyArray.value=[]
        discountCode.value.limitations.forEach((limit,index) =>{ keyArray.value.splice(index,limit.key)} )
        for(let i=0; i<discountCode.value.limitations.length; i++){
            keyArray.value.push(discountCode.value.limitations[i].key)
        }
        v.value.$touch()
        if (v.value.$invalid) {
            layoutStore.alert.showMessageToast(i18n.global.t('discount.create_err'))
            // console.log(v.value)
            return
        }
        else if(checkIfDuplicateExists(keyArray.value)==true){
            layoutStore.alert.showMessageToast(i18n.global.t('discount.create_err'))
            limitationErr.value =true
            keyArray.value=[]
            return
        }

        eventBus.emit('updateDiscountCodes',{'discountCode':res.data,'discountCodeIndex':discountCodeIndex.value})
        layoutStore.notification.showMessageToast(i18n.global.t('auto_reply.saved_message'))
        hideModal()
    })
}
</script>


<style scoped>

.index-0{
    z-index: 9 !important;
}
.index-1{
    z-index: 1 !important;
}
.index-2{
    z-index: -1 !important;
}
</style>