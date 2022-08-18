



<template>
    <!-- update Modal-->
	<Modal :show="showModal" @hidden="hideModal()">
		<ModalHeader>
			<h2 class="mr-auto text-base font-medium">{{ 'edit' }} #{{currentInfo.id}}</h2>
			<a @click="updateModal = false" class="absolute top-0 right-0 mt-3 mr-3" href="javascript:;">
				<XIcon class="w-8 h-8 text-slate-400" />
			</a>
		</ModalHeader>
		<ModalBody class="grid grid-cols-12 gap-4 gap-y-3">


            <div 
                class="flex flex-col intro-y"
                v-for="(column, column_index) in columns" 
                :key="column_index"
            >
                <template v-if="field.type === 'text'">
                    <label class="mt-2 text-base">{{ $t(`settings.payment_form.direct_payment.${field.key}`)  }}</label>
                    <input 
                        class="w-full form-control"
                        type="text" 
                        v-model="account[field.key]"
                    />
                    <label class="text-danger text-[12px]" 
                        v-for="error,index in v.v2_accounts.$each.$response.$errors[index_i][field.key]"
                        :key="index"
                    >{{ $t(`settings.payment_form.errors.${error.$message.replace(/\s/g, "_")}`)}}</label>
                </template>

                <template v-else-if="field.type === 'textarea'">
                    <label class="mt-2 text-base">{{ $t(`settings.payment_form.direct_payment.${field.key}`)  }}</label>
                    <textarea 
                        class="p-2 form-control"
                        v-model="account[field.key]"
                    />
                </template>

                <template v-else-if="field.type === 'checkbox'">
                    <div class="flex flex-wrap my-3">
                        <input 
                                class="form-control form-label form-check-input w-[1.2rem] h-[1.2rem] my-auto mr-2"
                                type="checkbox" 
                                v-model="account[field.key]"
                            />
                        <label class="mt-2 text-base form-label">{{ $t(`settings.payment_form.direct_payment.${field.key}`)  }}
                        </label>
                    </div>
                </template>

                <template v-else-if="field.type === 'file'">
                    <label>{{ $t('settings.payment_form.upload_image') }}</label>
                    <div class="relative border-2 border-dashed dark:border-darkmode-400">
                        <div class="flex items-center justify-center px-4">
                            <img :src="previewImages[index_i]" class="object-cover uploading-image h-60" />
                            <Tippy v-show="previewImages[index_i]" tag="a" href="javascript:;" class="absolute right-0 top-0 tooltip" :content="$t('create_campaign.payment_form.remove_image')"  :options="{theme: 'light',}">
                                <XCircleIcon class="absolute right-0 top-0 z-10 click-icon text-danger" @click="removeImage(index_i)"/>
                            </Tippy>
                        </div>
                        <div class="px-4 text-[1rem] sm:text-[16px] absolute top-20 text-center w-full flex flex-col items-center justify-center"
                            v-if="[undefined, null, ''].includes(previewImages[index_i])">
                            <div class="flex flex-col items-center justify-center sm:flex-row"> 
                                <ImageIcon class="w-8 h-8 mr-2 -mt-2 text-slate-600" /> 
                                <strong class="text-slate-600">{{ $t('settings.payment_form.upload_a_file_or_drag_and_drop') }}</strong> 
                            </div>
                            <div class="mt-2 text-slate-500">{{ $t('settings.payment_form.accepted_file_types') }}: jpeg, png, jpg</div>
                            <div class="text-slate-500">{{ $t('settings.payment_form.max_file_size') }} : 10MB</div>  
                        </div>
                        <input
                            type="file"
                            :id="`file_input_${index_i}`"
                            class="absolute top-0 left-0 w-full h-full opacity-0"
                            accept="image/jpeg,image/png,image/jpg" 
                            @change="uploadImage($event, index_i)"
                        />
                    </div>
                    <!-- <div 
                        class="flex justify-center text-[#0080FF]"
                        v-if="![undefined, null, ''].includes(previewImages[index_i])"
                        @click="removeImage(index_i)"
                    >Remove File</div> -->
                </template>

            </div>

            <div class="gap-5 flex-col flex p-5">

                <div>
                    <DiscountTypeBlock :discountCode="discountCode"/>
                </div>


                <div class="flex mt-5 sm:mx-5 sm:mt-0">
                    
                    <button 
                        class="inline-block rounded-lg btn btn-primary sm:ml-auto lg:w-60 h-[42px] sm:mt-auto mx-auto" 
                        @click="addLimitation()"
                    >
                        {{'add_limitation'}}
                    </button>

                </div>

                <div 
                    class="sm:mx-5"
                    v-for="(limitation, limitation_index) in discountCode.limitations" :key="limitation_index"
                >
                    <LimitationBlock :limitation="limitation"/>

                    <div class="flex w-full"> 
                        <button 
                            class="inline-block w-24 my-5 ml-auto text-base btn btn-danger" 
                            @click="deleteLimitation(index_i)"
                        > 
                                {{'delete_limitation'}}
                        </button>
                    </div>

                </div>

            </div>
            


























		</ModalBody>
		<ModalFooter>
			<button type="button" @click="updateModal = false" class="w-32 btn dark:border-darkmode-400">
				{{ 'cancel' }}
			</button>
			<button type="button" @click="updateAutoReply(currentInfo.replyId, currentInfo)" class="w-32 ml-5 shadow-md btn btn-primary">
				{{ 'save' }}
			</button>
		</ModalFooter>
	</Modal>





</template>


<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted } from "vue";

import { delete_discount_code, list_discount_code } from "@/api_v2/discount_code"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import i18n from "@/locales/i18n"
import LimitationBlock from "./LimitationBlock.vue"
import DiscountTypeBlock from "./DiscountTypeBlock.vue"

const showModal = ref(false)

const discountCode = ref({
    name:'',
    code:'',
    start_at:null,
    end_at:null,
    type:null,
    limitations:[],
    description:"",
    meta:{}

})

const columns = [

    { name: "name", key: "name" , type:"text", dataType:"string"},
    { name: "code", key: "code" , type:"text", dataType:"string"},
    { name: "start_at", key: "start_at", type:"datetime", dataType:"string"},
    { name: "end_at", key: "end_at" , type:"datetime", dataType:"string"},
    { name: "type", key: "type" , type:"select_and_set", dataType:"string"},
	{ name: "limitations", key: "limitations" , type:"multiple_select_and_set"},
	{ name: "description", key: "description" , type:"text_area"},
]
const hideModal = ()=>{

}



const deleteLimitation = index=>{
    discountCode.value.limitations.splice(index,1)
}

const addLimitation = ()=>{
    discountCode.value.limitations.unshift({})
}


</script>
