<template>
    <div class="intro-y box">
        <div 
            v-show="!sellerLayoutStore.editProfile" 
            class="flex flex-col sm:flex-row"
        >
            <div class="flex flex-col px-5 items-center justify-center m-10 sm:m-12">
                <div class="w-32 h-32 flex-none image-fit relative">
                    <img 
                        class="rounded-full"
                        :src="userAvatar" 
                    />
                    <!-- <div class="absolute mb-1 mr-1 flex items-center justify-center bottom-0 right-0 bg-primary rounded-full p-2">
                        <CameraIcon class="w-4 h-4 text-white" />
                    </div> -->
                </div>
                <!-- <button class="btn btn-outlined m-3 sm:m-5 2xl:m-5" @click="sellerLayoutStore.editProfile=true"> Edit Profile </button> -->
            </div>
            <div class="flex flex-col items-center sm:mt-0 sm:border-l sm:border-slate-200/60 sm:border-t-0 dark:border-darkmode-400 border-t py-6 sm:pt-0 align-middle justify-center sm:w-[80%] xl:w-[50%]">
                <div class="w-fit truncate font-medium text-sm mb-5 text-center">
                    {{ sellerLayoutStore.userInfo.name }}
                </div>
                <div class="truncate flex w-fit text-center">
                    <MailIcon class="w-4 h-4 mr-2" />
                    {{ sellerLayoutStore.userInfo.email }}
                </div>
                <!-- <div class="truncate sm:whitespace-normal flex items-center mt-3">
                    Password:
                    <EyeOffIcon class="w-4 h-4 ml-2" @click="call" /> 
                </div> -->
                <!-- <div class="truncate sm:whitespace-normal flex items-center mt-3 text-center">
                    <PhoneIcon class="w-4 h-4 mr-2" />
                    {{ sellerLayoutStore.userInfo.phone }}
                </div> -->
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