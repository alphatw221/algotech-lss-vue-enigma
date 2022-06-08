<template>
    <div class="intro-y box p-5 mt-5">
        <div 
            v-show="!editModal" 
            class="flex flex-col lg:flex-row w-fit border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5"
        >
            <div class="flex flex-wrap flex-1 px-5 items-center justify-center">
                <div class="w-32 h-32 flex-none image-fit relative m-8 lg:m-10 2xl:m-10">
                    <img 
                        class="rounded-full"
                        :src="userAvatar" 
                    />
                    <!-- <div class="absolute mb-1 mr-1 flex items-center justify-center bottom-0 right-0 bg-primary rounded-full p-2">
                        <CameraIcon class="w-4 h-4 text-white" />
                    </div> -->
                </div>
                <button class="btn btn-outlined m-3 lg:m-5 2xl:m-5" @click="editModal=true"> Edit Profile </button>
            </div>
            <div class="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0 ">
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
                        12345678  <EyeOffIcon class="w-4 h-4 ml-2"/> 
                    </div> -->
                    <div class="truncate sm:whitespace-normal flex items-center mt-3">
                        <PhoneIcon class="w-4 h-4 mr-2" />
                        {{ sellerLayoutStore.userInfo.phone }}
                    </div>
                </div>
            </div>
        </div>
        <div v-show="editModal">
            <div class="grid grid-cols-12 px-5 justify-center justify-items-center">
                <div class="col-span-12 lg:col-span-3 2xl:col-span-3 w-32 h-32 flex-none image-fit relative m-8 lg:m-10 2xl:m-10">
                    <img 
                        class="rounded-full"
                        :src="userAvatar" 
                    />
                    <div class="absolute mb-1 mr-1 flex items-center justify-center bottom-0 right-0 bg-primary rounded-full p-2">
                        <CameraIcon class="w-4 h-4 text-white" />
                    </div>
                </div>
                <div
                class="col-span-12 lg:col-span-9 2xl:col-span-9 w-full mt-0 p-0 lg:px-10 2xl:px-10">
                    <div>
                        <div>
                            <label class="form-label">First Name</label>
                            <input type="text" class="form-control" disabled />
                        </div>
                        <div class="mt-3">
                            <label class="form-label">Last Name</label>
                            <input type="text" class="form-control" disabled />
                        </div>
                    </div>
                    <div class="mt-3">
                        <label class="form-label">Email</label>
                        <input type="text" class="form-control"/>
                    </div>
                    <div class="mt-3">
                        <label class="form-label">Old Password</label>
                        <input type="password" class="form-control" />
                    </div>
                    <div class="mt-3">
                        <label class="form-label">New Password</label>
                        <input type="text" class="form-control"/>
                        <div class="form-help">
                            Password should be at least 8 characters
                        </div>
                    </div>
                    <div class="mt-3">
                        <label class="form-label">Phone</label>
                        <input type="text" class="form-control"/>
                    </div>
                    <div class="flex justify-center lg:justify-end 2xl:justify-end mt-5">
                        <button class="btn btn-outline-primary mr-auto lg:mr-10 2xl:mr-10" @click="editModal = false">
                        Cancel</button>
                        <button class="btn btn-outline-primary">
                        Save</button>
                    </div>
                </div>
            </div>
        </div>   
    </div>
</template>

<script setup>
import { computed, onMounted, provide, ref, watch } from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import dom from "@left4code/tw-starter/dist/js/dom";
import ProfileTab from './ProfileTab.vue';

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