<template>
    <div class="intro-y box p-5 mt-5">
        <div 
            v-show="!sellerLayoutStore.editProfile" 
            class="flex flex-col lg:flex-row w-fit w-full border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5 w-[80%]"
        >
            <div class="flex flex-col flex-1 px-5 items-center justify-center">
                <div class="w-32 h-32 flex-none image-fit relative m-8 lg:m-10 2xl:m-10">
                    <img 
                        class="rounded-full"
                        :src="userAvatar" 
                    />
                    <!-- <div class="absolute mb-1 mr-1 flex items-center justify-center bottom-0 right-0 bg-primary rounded-full p-2">
                        <CameraIcon class="w-4 h-4 text-white" />
                    </div> -->
                </div>
                <button class="btn btn-outlined m-3 lg:m-5 2xl:m-5" @click="sellerLayoutStore.editProfile=true"> Edit Profile </button>
            </div>
            <div class="mt-6 lg:mt-0 flex-1 px-5 border-l border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0 ">
                <div class="flex flex-col justify-center items-center lg:items-start mt-0 lg:mt-4 2xl:mt-4">
                    <div class="w-fit sm:w-40 truncate sm:whitespace-normal font-medium text-lg mb-5">
                        {{ sellerLayoutStore.userInfo.name }}
                    </div>
                    <div class="truncate sm:whitespace-normal flex items-center">
                        <MailIcon class="w-4 h-4 mr-2" />
                        {{ sellerLayoutStore.userInfo.email }}
                    </div>
                    <!-- <div class="truncate sm:whitespace-normal flex items-center mt-3">
                        Password:
                        <EyeOffIcon class="w-4 h-4 ml-2" @click="call" /> 
                    </div> -->
                    <div class="truncate sm:whitespace-normal flex items-center mt-3">
                        <PhoneIcon class="w-4 h-4 mr-2" />
                        {{ sellerLayoutStore.userInfo.phone }}
                    </div>
                </div>
            </div>
        </div>
            <EditProfile />
    </div>
</template>

<script setup>
import { computed, onMounted, ref,} from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import EditProfile from "./EditProfile.vue"; 
import dom from "@left4code/tw-starter/dist/js/dom"; 


const sellerLayoutStore = useLSSSellerLayoutStore();
const editModal = ref(false);

onMounted(() => {
    console.log(sellerLayoutStore.userInfo)
});

const userAvatar = computed(() => {
    if (sellerLayoutStore.loginWith == 'facebook') {
        return sellerLayoutStore.userInfo.facebook_info.picture
    } else if (sellerLayoutStore.loginWith == 'google') {
        return sellerLayoutStore.userInfo.google_info.picture
    }
    if (sellerLayoutStore.userInfo.facebook_info.picture) {
        return sellerLayoutStore.userInfo.facebook_info.picture
    }
    return sellerLayoutStore.userInfo.google_info.picture
});

</script>