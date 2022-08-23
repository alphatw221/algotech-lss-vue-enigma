<template>
    <div class="" :class="{ hidden: layout.profileTab !== 1, block: layout.profileTab === 1 }">
        <div 
            v-show="!layout.editProfile" 
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
                <!-- <button class="btn btn-outlined m-3 sm:m-5 2xl:m-5" @click="layout.editProfile=true"> Edit Profile </button> -->
            </div>
            <div class="flex flex-col items-center border-t py-6 align-middle justify-center xl:w-[50%] gap-2
                sm:mt-0 sm:border-l sm:border-slate-200/60 sm:border-t-0 sm:w-[80%] sm:pt-0
                dark:border-darkmode-400">
                <div class="w-fit truncate font-medium">
                    {{ layout.userInfo.name }}
                </div>
                <div class="truncate flex w-fit">
                    <MailIcon class="w-5 h-5 mr-2 my-auto" />
                    {{ layout.userInfo.email }}
                </div>
                <!-- <div class="truncate sm:whitespace-normal flex items-center mt-3">
                    Password:
                    <EyeOffIcon class="w-4 h-4 ml-2" @click="call" /> 
                </div> -->
                <!-- <div class="truncate sm:whitespace-normal flex items-center mt-3 text-center">
                    <PhoneIcon class="w-4 h-4 mr-2" />
                    {{ layout.userInfo.phone }}
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


const layout = useLSSSellerLayoutStore();
const editModal = ref(false);


const userAvatar = computed(() => {
    if (layout.loginWith == 'facebook') {
        return layout.userInfo.facebook_info.picture
    } else if (layout.loginWith == 'google') {
        return layout.userInfo.google_info.picture
    }
    if (layout.userInfo.facebook_info.picture) {
        return layout.userInfo.facebook_info.picture
    }
    return layout.userInfo.google_info.picture
});

</script>