<template>


    <BindSocialPlatformAccountWidgets :title="$t('settings.platform.instagram_profile')" :platform="'instagram'">

            <BindInstagramProfileButton :bindHandler="bindHandler" :buttonName="'edit'" class="ml-auto" v-if="(userStore?.user?.social_platform_accounts||[]).filter(social_platform_account=>social_platform_account?.platform=='instagram').length"/>
            <BindInstagramProfileButton :bindHandler="bindHandler"  class="w-52 sm:w-full mx-auto" v-else/>


    </BindSocialPlatformAccountWidgets>


</template>

<script setup>

import BindSocialPlatformAccountWidgets from './BindSocialPlatformAccountWidgets.vue';
import BindInstagramProfileButton from '@/components/button/BindInstagramProfileButton.vue'


import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import {bind_social_platform_account} from "@/api_v3/social_platform_account.js"


const userStore = useLSSSellerLayoutStore();

const props = defineProps({
});



const bindHandler = (credentials)=>{
    console.log(credentials)


    bind_social_platform_account('instagram', credentials).then(res=>{
        console.log(res.data)
        userStore.user = res.data

    })
}




// const bind_instagram_profiles = (accessToken) => {
//     // fetchingData.value=true
//     // bind_platform_instances(platform.value,{'accessToken': accessToken}, layoutStore.alert).then(response=>{
//     //     if (!response.data.length) {
//     //         return false
//     //     }
//     //     showConnectButton.value = false;
//     //     showPages.value = true;
//     //     InstagramProfiles.value = response.data
//     //     layoutStore.userInfo.user_subscription[props.subscriptionPlatformField] = response.data
//     //     fetchingData.value=false
//     // })
// }


// // const get_profile_picture = (instagram_profile) => {
// //     console.log("on error")
// //     get_ig_profile_picture(instagram_profile.id).then(res=> {
// //         instagram_profile.image = res.data;
// //     }).catch(err=> {
// //         instagram_profile.image = null;
// //     })
// // }

</script>

<style scoped>
.click-icon:hover {
  cursor: pointer;
  
}
.click-icon {
    margin: -10px -11px 0px 0px;
}
</style>