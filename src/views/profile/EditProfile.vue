<template>
    <div v-show="sellerLayoutStore.editProfile"  class="grid grid-cols-12 px-5 justify-center justify-items-center">
        <div
            class="col-span-12 lg:col-span-3 2xl:col-span-3 w-32 h-32 flex-none image-fit relative m-8 lg:m-10 2xl:m-10">
            <img class="rounded-full" :src="userAvatar" />
            <div
                class="absolute mb-1 mr-1 flex items-center justify-center bottom-0 right-0 bg-primary rounded-full p-2">
                <CameraIcon class="w-4 h-4 text-white" />
                <input
                    type="file"
                    class="w-full h-full top-0 left-0 absolute opacity-0"
                  />
            </div>
        </div>
        <div class="col-span-12 lg:col-span-9 2xl:col-span-9 w-full mt-0 p-0 lg:px-10 2xl:px-10">
            <div>
                <label class="form-label">User Name</label>
                <input type="text" v-model="sellerLayoutStore.userInfo.name" class="form-control" disabled />
            </div>
            <div class="mt-3">
                <label class="form-label">Email</label>
                <input type="text" v-model="sellerLayoutStore.userInfo.email" class="form-control" />
            </div>
            <div class="mt-3">
                <label class="form-label">Old Password</label>
                <input type="password" class="form-control" />
            </div>
            <div class="mt-3">
                <label class="form-label">New Password</label>
                <input type="text" class="form-control" />
                <div class="form-help">
                    Password should be at least 8 characters
                </div>
            </div>
            <div class="mt-3">
                <label class="form-label">Phone</label>
                <input type="text" class="form-control" />
            </div>
            <div class="flex justify-center lg:justify-end 2xl:justify-end mt-5">
                <button class="btn btn-outline-primary mr-auto lg:mr-10 2xl:mr-10" @click="sellerLayoutStore.editProfile = false">
                    Cancel</button>
                <button class="btn btn-outline-primary">
                    Save</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue"
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const sellerLayoutStore = useLSSSellerLayoutStore()

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