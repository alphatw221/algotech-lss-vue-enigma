<template>
    <div class="" :class="{ hidden: layout.profileTab !== 1, block: layout.profileTab === 1 }">
        <div 
            v-show="!layout.editProfile" 
            class="flex flex-col md:flex-row"
        >
            <div class="flex flex-col spx-5 items-center justify-center sm:m-10 sm:m-12">
                <div class="w-32 h-32 flex-none image-fit relative">
                    <img 
                        class="rounded-full"
                        :src="userAvatar" 
                    />
                </div>
            </div>
            <div class="flex flex-col items-center py-6 align-middle justify-center xl:w-[50%] gap-2
                sm:mt-0 sm:w-[80%] sm:pt-0
                dark:border-darkmode-400">
                <div class="w-fit truncate font-medium">
                    {{ layout.userInfo.name }}
                </div>
                <div class="truncate flex w-fit">
                    <MailIcon class="w-5 h-5 mr-2 my-auto" />
                    {{ layout.userInfo.email }}
                </div>
            </div>
            <button class="btn btn-primary w-fit h-fit mt-auto ml-auto whitespace-nowrap" @click="layout.profileTab = 4"> Reset Password </button>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref,} from "vue";
import { useLSSDealerLayoutStore } from "@/stores/lss-dealer-layout";
import dom from "@left4code/tw-starter/dist/js/dom";


const layout = useLSSDealerLayoutStore();


const userAvatar = computed(() => {
    if (layout.loginWith == 'facebook') {
        return layout.userInfo.facebook_info.picture
    } else if (layout.loginWith == 'google') {
        return layout.userInfo.google_info.picture
    }
    else return import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR+'fake_head.jpeg'
});

</script>