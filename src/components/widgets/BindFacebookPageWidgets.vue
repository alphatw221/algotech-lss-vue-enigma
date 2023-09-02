<template>
    

    <BindSocialPlatformAccountWidgets :title="$t('settings.platform.facebook_fan_page')" :platform="'facebook'">
        <BindFacebookPageButton :bindHandler="bindHandler" :buttonName="'edit'" class="ml-auto" v-if="(userStore?.user?.social_platform_accounts||[]).filter(social_platform_account=>social_platform_account?.platform=='facebook').length"/>
        <BindFacebookPageButton :bindHandler="bindHandler"  class="w-52 sm:w-full mx-auto" v-else/>
    </BindSocialPlatformAccountWidgets>




</template>

<script setup>

import BindSocialPlatformAccountWidgets from './BindSocialPlatformAccountWidgets.vue';
import BindFacebookPageButton from '@/components/button/BindFacebookPageButton.vue'


import {bind_social_platform_account} from "@/api_v3/social_platform_account.js"

import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';


const userStore = useLSSSellerLayoutStore();




const props = defineProps({});



const bindHandler = (credentials)=>{
    console.log(credentials)


    bind_social_platform_account('facebook', credentials).then(res=>{
        console.log(res.data)

        userStore.user = res.data
    })
}


// const bind_facebook_pages = (accessToken) => {
//     fetchingData.value = true
//     bind_platform_instances(platform.value, {'accessToken': accessToken}, layoutStore.alert).then(res=>{
//          if (!res.data.length) {
//             return false
//         }
//         showConnectButton.value = false;
//         showPages.value = true;
//         facebookPages.value = res.data
//         layoutStore.userInfo.user_subscription[props.subscriptionPlatformField] = res.data
//         fetchingData.value = false
//     })
    
// }


// const get_profile_picture = (facebook_page) => {
//     console.log("on error")
//     get_fb_page_profile_picture(facebook_page.id).then(res=> {
//         facebook_page.image = res.data;
//     }).catch(err=> {
//         facebook_page.image = null;
//     })
// }
</script>

<style scoped>
.click-icon:hover {
  cursor: pointer;
}
.click-icon {
    margin: -10px -11px 0px 0px;
}
</style>