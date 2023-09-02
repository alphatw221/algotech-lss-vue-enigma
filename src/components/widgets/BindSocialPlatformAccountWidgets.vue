<template>
    
    <div v-if="(userStore?.user?.social_platform_accounts||[]).filter(social_platform_account=>social_platform_account?.platform==props?.platform).length" class="box border-2 rounded-lg p-5 mx-4 lg:p-10 lg:mx-20 mb-3 flex flex-col">
        <div class="flex flex-wrap justify-between gap-3 mb-5 sm:mb-8">
            <h4 class="text-lg sm:text-xl font-medium leading-none my-auto">{{props?.title}}</h4>

            <slot ></slot>



        </div>
        <LoadingIcon icon="three-dots" color="1a202c" class="flex flex-wrap w-20 h-20 mx-auto" v-if="fetchingData"/>
        <div class="flex flex-wrap grow justify-evenly lg:justify-start gap-2 lg:gap-5" v-else>
            <div v-for="social_platform_account, index in (userStore?.user?.social_platform_accounts||[]).filter(social_platform_account=>social_platform_account?.platform==props?.platform)" :key="index" class="flex-col flex justify-center text-center relative my-3 w-24 h-auto lg:w-32">
                <img :src="social_platform_account?.image?.url" class="rounded-full w-16 h-16 mx-auto lg:w-20 lg:h-20">
                <span class="leading-tight text-[13px] sm:text-[15px] w-20 lg:w-32 mx-auto">{{ social_platform_account?.name}}</span>
                <Tippy tag="a" href="javascript:;" class="absolute right-0 top-0 tooltip" :content="$t('settings.platform.unbind_page')" :options="{
                    theme: 'light',
                }">
                <XCircleIcon class="absolute right-0 top-0 z-10 click-icon text-danger" @click="remove(social_platform_account)"/></Tippy>
            </div>
        </div>
    </div>


    <div v-else class="box border-2 rounded-lg p-5 min-h-[200px] mx-4 lg:mx-20 px-10 mb-3 flex flex-col justify-center">
        <slot ></slot>

    </div>


</template>

<script setup>


import { ref, reactive, onMounted, getCurrentInstance, onUnmounted, watch, computed } from "vue";
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { unbind_social_platform_account } from '@/api_v3/social_platform_account'

const userStore = useLSSSellerLayoutStore();

const fetchingData = ref(false)

const props = defineProps({
    title: String,
    platform: String,
});





const remove = (socialPlatformAccount) => {


    unbind_social_platform_account(socialPlatformAccount?.uuid).then(res=>{
        userStore.user.social_platform_accounts = (userStore?.user?.social_platform_accounts||[]).filter(social_platform_account=>social_platform_account?.uuid!=socialPlatformAccount?.uuid)
    })

    
}

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