<template>
    <Modal :show="showModal" @hidden="hide()" backdrop="static" >
        <ModalHeader>
            <h2 v-if="action == 'CREATE'" class="mr-2 text-base font-medium text-[16px]">{{$t('auto_reply.modal_title')}}</h2>
            <h2 v-if="action == 'EDIT'" class="mr-auto text-base font-medium">{{ $t('auto_reply.manipulate.edit') }} #{{keyinInfo.index+1}} {{ $t('auto_reply.title') }}</h2>
            <Tippy 
                v-if="action == 'CREATE'"
                class="rounded-full w-fit whitespace-wrap ml-1 tippy-mobile mr-auto" 
                data-tippy-allowHTML="true" 
                data-tippy-placement="right" 
                :content="$t('tooltips.auto_reply.platform')" 
                > 
                <HelpCircleIcon class="w-5 tippy-icon tippy-mobile" />
            </Tippy> 
            <a @click="showModal=false; layoutStore.alert.showMessageToast(i18n.global.t('auto_reply.not_saved_message'))" class="absolute top-0 right-0 mt-3 mr-3">
                <XIcon class="w-8 h-8 text-slate-400" />
            </a>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
                <label for="modal-form-1 text-base font-medium" >{{$t('auto_reply.table_column.keyword_detect')}}</label>
                <input id="modal-form-1" type="text" class="rounded-lg form-control" placeholder=""
                    v-model="validate.input_msg.$model" 
                    :class="{ 'border-danger text-danger border-2': validate.input_msg.$error }" 
				/>
				<template v-if="validate.input_msg.$error">
					<label class="text-danger ml-2 text-[13px]" >
						{{ $t('auto_reply.modal_field_require') }}
					</label>
				</template>
            </div>
            <div class="col-span-12">
                <label for="modal-form-1">{{$t('auto_reply.table_column.set_auto_reply')}}</label>
                <input id="modal-form-1" type="text" class="rounded-lg form-control" placeholder="" 
                    v-model="validate.output_msg.$model" 
                    :class="{ 'border-danger text-danger border-2': validate.output_msg.$error }" 
				/>
				<template v-if="validate.output_msg.$error">
					<label class="text-danger ml-2 text-[13px]" >
						{{ $t('auto_reply.modal_field_require') }}
					</label>
				</template>
            </div>
            <div class="col-span-12">
                <label for="modal-form-1">{{$t('auto_reply.table_column.remark')}}</label>
                <input id="modal-form-1" type="text" class="rounded-lg form-control" placeholder=""
                    v-model="keyinInfo.description" 
				/>
            </div>
            <template v-if="action=='CREATE'"> 
                <div class="col-span-12 flex">
                    <label for="modal-form-1" class="form-label">{{$t('auto_reply.table_column.assign_to')}}</label>
                    <Tippy 
                        class="rounded-full w-fit whitespace-wrap ml-1 tippy-mobile" 
                        data-tippy-allowHTML="true" 
                        data-tippy-placement="right" 
                        :content="$t('tooltips.auto_reply.platform')" 
                        > 
                        <HelpCircleIcon class="w-5 tippy-icon tippy-mobile" />
                    </Tippy> 
                </div>

                <!-- old version -->
                <!-- <div class="flex flex-wrap items-center justify-around col-span-12">
                    <template v-for="(data, key) in PagesData" :key="key">
                        <div class="relative w-20 h-20 image-fit">
                            <input name="fb_page" type="radio" class="absolute top-0 left-0 z-50 rounded-lg vertical-center" :value="data" v-model="validate.chosenPage.$model" />
                            <img class="rounded-full" :src="data.image" />
                            <div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
                                <img v-if="data.page_id" class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
                                <img v-else class="rounded-full bg-[#d63376]" :src="instagram_platform" >
                            </div>
                        </div>
                    </template>
                </div>
                <template v-if="validate.chosenPage.$error">
                    <label class="text-danger ml-2 text-[13px] col-span-12" >
                    {{ $t('auto_reply.modal_select_page') }} 
                    </label>
                </template> -->

                <div class="flex flex-wrap items-center justify-around col-span-12">
                    <template v-for="(data, key) in PagesData" :key="key">
                        <div class="relative w-20 h-20 image-fit">
                            <input name="fb_page" type="checkbox" class="absolute top-0 left-0 z-50 rounded-lg vertical-center" @click="addAssignPage($event, data)"/>
                            <img class="rounded-full" :src="data.image" />
                            <div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
                                <img v-if="data.page_id" class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
                                <img v-else class="rounded-full bg-[#d63376]" :src="instagram_platform" >
                            </div>
                        </div>
                    </template>
                </div>
                <template v-if="validate.chosenPage.$error">
                    <label class="text-danger ml-2 text-[13px] col-span-12" >
                    {{ $t('auto_reply.modal_select_page') }} 
                    </label>
                </template>
            </template>
        </ModalBody>
        <ModalFooter>
            <button type="button" @click="showModal=false; layoutStore.alert.showMessageToast(i18n.global.t('auto_reply.not_saved_message'))"
                class="w-32 bg-white btn dark:border-darkmode-400">
                {{ $t('auto_reply.modal_cancel') }}
            </button>
            <button v-if="action == 'CREATE'" type="button" @click="createAutoReply()" class="w-32 ml-5 shadow-md btn btn-primary">{{ $t('auto_reply.modal_save') }}</button>
            <button v-if="action == 'EDIT'" type="button" @click="updateAutoReply(keyinInfo)" class="w-32 ml-5 shadow-md btn btn-primary">
				{{ $t('auto_reply.modal_save') }}
			</button>
        </ModalFooter>
    </Modal>
</template>


<script setup>
    import { ref, onMounted, getCurrentInstance, computed, onUnmounted, watch } from 'vue'
    import CreateEditModalVue from './CreateEditModal.vue';
    import facebook_platform from "/src/assets/images/lss-img/facebook.png"
    import instagram_platform from "/src/assets/images/lss-img/instagram.png"
    import { create_auto_response, update_auto_response } from "@/api_v2/auto_response";
    import {get_user_subscription_facebook_pages, get_user_subscription_instagram_profiles} from "@/api/user_subscription"
    import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
    import { useVuelidate } from "@vuelidate/core";
    import { required } from "@vuelidate/validators";
    import i18n from "@/locales/i18n"
    
    const action = ref('CREATE')
    const layoutStore = useLSSSellerLayoutStore();
    const internalInstance = getCurrentInstance();
    const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
    const showModal = ref(false)
    const keyinInfo = ref({
        input_msg: "",
        output_msg: "",
        description: "",
        chosenPage:[],
    })

    const rules = computed(()=>{
        return{
            input_msg:{required},
            output_msg: {required},
            chosenPage: {required},
        }
    });
    const validate = useVuelidate(rules, keyinInfo);
    
    let PagesData = ref([])
    onMounted(() => {
        get_user_subscription_facebook_pages().then(res=>{
            PagesData.value = res.data
            return get_user_subscription_instagram_profiles()
        }).then(res=>{
            PagesData.value = PagesData.value.concat(res.data);
        }).catch(err=> {
            console.log(err)
        })
        eventBus.on("showCreateAutoreply", () => {showModal.value = true; action.value = 'CREATE' })
        eventBus.on("showEditAutoreply", (payload) => {
            keyinInfo.value = payload
            action.value = 'EDIT'
            showModal.value = true })
    })

    onUnmounted(()=>{
        eventBus.off("showCreateAutoreply")
        eventBus.off("showEditAutoreply")})

        const emptyForm =()=>{
        keyinInfo.value.input_msg = ""
        keyinInfo.value.output_msg = ""
        keyinInfo.value.description = ""
        keyinInfo.value.chosenPage = []
        unChecked()
    }
    const unChecked=()=>{
        Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(value=>{
            value.checked = false
        })
    }
    
    const hide=()=>{
        showModal.value=false
        emptyForm()
    }
        


    function createAutoReply() {
        validate.value.$touch();
        if (validate.value.$invalid) {
            layoutStore.alert.showMessageToast(i18n.global.t('auto_reply.invalid_data'))
            return
        } else {
            create_auto_response(keyinInfo.value).then(response => {
                showModal.value = false
                PagesData.value.forEach(value =>{
                    for(let i=0; i< response.data.length; i++){
                        if(value.id == response.data[i].facebook_page) response.data[i].facebook_page = value
                        else if (value.id == response.data[i].instagram_profile) response.data[i].instagram_profile = value
                    }
                });
                layoutStore.notification.showMessageToast(i18n.global.t('auto_reply.create_success'))
                eventBus.emit('getReplyData',response.data)
                emptyForm()
            })
        }
    }

    
    const addAssignPage = (event, data) => {
        if (event.target.checked) keyinInfo.value.chosenPage.push(data) 
        else keyinInfo.value.chosenPage = keyinInfo.value.chosenPage.filter(val => { return val.id !== data.id})
    }

    function updateAutoReply(keyinInfo) {
        update_auto_response(keyinInfo.id, keyinInfo).then((response) => {
            eventBus.emit('getUpdateReplyData',response.data)
            showModal.value = false;
        });
    }
    
    </script>
    
    