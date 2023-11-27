<template>

   <template v-if="(props?.data?.social_platform_connections||[]).length>0">

        <div class="items-center min-w-12 fan_page cursor-pointer" @click="editSocialPlatform()">
            <div class="flex justify-center items-center w-full h-full" >

                <template v-for="social_platform_connection, social_platform_connection_index in props?.data?.social_platform_connections||[]" :key="social_platform_connection_index">





                    <div class="border-0 w-14 h-14 flex-0 relative" v-if="social_platform_connection?.social_platform_account?.platform == 'facebook'">
                        <Tippy tag="img" class="border-0 rounded-full" :src="social_platform_connection?.social_platform_account?.image?.url" 
                            :content="social_platform_connection?.social_platform_account?.name" />
                        <div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
                            <img class="rounded-full bg-[#3c599b]" :src="facebook_platform" >
                        </div>
                    </div>

                    <div class="w-14 h-14 flex-0 relative" v-else-if="social_platform_connection?.social_platform_account?.platform == 'instagram'">
                        <Tippy tag="img" class="rounded-full " :src="social_platform_connection?.social_platform_account?.image?.url" 
                            :content="social_platform_connection?.social_platform_account?.name" />
                        <div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
                            <img class="rounded-full bg-[#d63376]" :src="instagram_platform" >
                        </div>
                    </div>

                    <div class="w-14 h-14 flex-0 relative" v-else-if="social_platform_connection?.social_platform_account?.platform == 'youtube'">
                    <Tippy tag="img" class="rounded-full" :src="social_platform_connection?.social_platform_account?.image?.url"
                        :content="social_platform_connection?.social_platform_account?.name" />
                        <div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
                            <img class="rounded-full bg-[#f70000]" :src="youtube_platform" >
                        </div>
                    </div>
                    <div class="w-14 h-14 flex-0 relative" v-else-if="social_platform_connection?.social_platform_account?.platform == 'twitch'">
                    <Tippy tag="img" class="rounded-full" :src="social_platform_connection?.social_platform_account?.image?.url"
                        :content="social_platform_connection?.social_platform_account?.name" />
                        <div class="absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full dark:border-darkmode-600">
                            <img class="rounded-full bg-[#f70000]" :src="twitch_platform" >
                        </div>
                    </div>
                   


                </template>
                
            </div>
        </div>

   </template>


   <template v-else>
        <div class="flex flex-row justify-center" >
            <SimpleIcon icon="edit" color="#131C34" class=" w-[30px] h-[28px] sm:w-[22px] sm:h-[18px] cursor-pointer" @click="editSocialPlatform()"/>
        </div>
   </template>






   <Modal
    backdrop="static"
      size="modal-xl"
      :show="showModal"
      @hidden="hideModal()"
    >
      <ModalHeader>
        <h2 class="mr-auto text-base font-medium">Social Platform Connections</h2>
        <a
          @click="hideModal()"
          class="absolute top-0 right-0 mt-3 mr-3"
        >
          <XIcon class="w-8 h-8 text-slate-400" />
        </a>
      </ModalHeader>
      <ModalBody >
        <div class="flex flex-col justify-center p-5">
            <SocialPlatformConnectionForm v-model="cacheData.social_platform_connections"/>
        </div>
      </ModalBody>


      <ModalFooter>
        <button
          type="button"
          class="w-32 bg-white btn dark:border-darkmode-400"
          @click="hideModal()"
        >
          {{$t('campaign_list.enter_post_id_modal.cancel')}}
        </button>
        <button type="button" class="w-32 ml-5 shadow-md btn btn-primary" @click="updateCampaign()" >
          Update
        </button>
      </ModalFooter>
    </Modal>


</template>

<script setup>
import {ref, defineProps, defineEmits} from "vue"


import youtube_platform from "/src/assets/images/lss-img/youtube.png"
import facebook_platform from "/src/assets/images/lss-img/facebook.png"
import instagram_platform from "/src/assets/images/lss-img/instagram.png"
import twitch_platform from "/src/assets/images/lss-img/twitch.png"
import SocialPlatformConnectionForm from '../../create-edit-campaign/social-platform-connection-form/SocialPlatformConnectionForm.vue'
const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue:Object,
  data:{
    type:Object,
    default:{}
  },
  dataIndex:{
    type:Number,
    default:null
  }
})

const updateModelValue = ()=>{
  emits('update:modelValue', props.modelValue)
}


const cacheData = ref(JSON.parse(JSON.stringify(props.modelValue)))

const showModal = ref(false)
const hideModal = ()=>{showModal.value = false}
const editSocialPlatform = ()=>{
    showModal.value=true
}

const updateCampaign = ()=>{
    console.log(cacheData.value)
    props.modelValue.social_platform_connections = JSON.parse(JSON.stringify(cacheData?.value?.social_platform_connections||[]));
    console.log(props.modelValue)
    // console.log(props.modelValue.social_platform_connections)
    // updateModelValue()
    // showModal.value=false
    
}


</script>