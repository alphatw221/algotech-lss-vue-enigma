<template>
    <!-- update Modal-->
	<Modal size="modal-lg" backdrop="static" :show="showModal" @hidden="hideModal()">
		<ModalHeader>
			<h2 class="mr-auto text-base font-medium">Add New Seller under my subs</h2>
		</ModalHeader>
		<ModalBody >
            <div 
                class="flex flex-col intro-y mx-2"
                v-for="(column, column_index) in columns" 
                :key="column_index"
            >
                <template v-if="column.type === 'select'">
                    <label class="mt-2 text-base">{{$t(`discount.modal.`+column.name)}}</label>
                    <input 
                        class="w-full form-control"
                        type="text" 
                        v-model="sellerInfo[column.key]"
                        @blur="v[column.key].$touch"
                    />
                    <label class="text-danger text-[12px]" 
                        v-for="error,index in v[column.key].$errors"
                        :key="index"
                        >
                        {{ $t(`discount.modal.`+ error.$uid) }}
                    </label>
                </template>
            </div>
		</ModalBody>


		<ModalFooter>
			<button type="button" @click="hideModal()" class="w-32 btn dark:border-darkmode-400">
				{{ 'cancel' }}
			</button>
			<button type="button" @click="createSeller()" class="w-32 ml-5 shadow-md btn btn-primary" v-if="modalType==CREATE">
				{{ 'create' }}
			</button>
		</ModalFooter>
	</Modal>
</template>


<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted, watch , computed } from "vue";

// import { create_discount_code, update_discount_code } from "@/api_v2/discount_code"
import { useLSSDealerLayoutStore } from "@/stores/lss-dealer-layout";
import i18n from "@/locales/i18n"
import { required, minLength, maxLength, helpers, numeric, requiredIf, decimal, integer, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const layoutStore = useLSSDealerLayoutStore()

const showModal = ref(false)

const sellerInfo = ref({
    id:'',
    plan:'',
    period:'',
})

const columns = [
    { name: "seller", key: "seller" , type:"text", dataType:"select"},
    { name: "plan", key: "plan" , type:"text", dataType:"select"},
    { name: "period", key: "period", type:"period", dataType:"select"},
]

const sellerRule = computed(() => {
	return { 	
        id: { required, minLength: minLength(1), maxLength: maxLength(255) },
        plan: { required, minLength: minLength(1), maxLength: maxLength(255) },
        period: { required },
    }
})

const v = useVuelidate(discountCodeRules, sellerRule);

onMounted(()=>{
    eventBus.on('showCreateModel',()=>{modalType.value = CREATE;showModal.value=true; })
})
onUnmounted(()=>{
    eventBus.off('showCreateModel')
})

const hideModal = ()=>{
    showModal.value = false
    sellerInfo.value = {
        id:'',
        plan:'',
        period:'',
    }
    v.value.$reset()
}

const createSeller=()=>{

    v.value.$touch()
	if (v.value.$invalid) {
		layoutStore.alert.showMessageToast("Invalid Data")
        console.log(v.value)
		return
	}
}
</script>
