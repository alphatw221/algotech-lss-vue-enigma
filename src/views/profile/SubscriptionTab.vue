<template> 
    <div  class="intro-y box p-10 sm:p-12 text-sm lg:text-[16px]">
        <div class="grid grid-cols-12 gap-5 w-[100%]">
            <div class="col-span-12 sm:col-span-8 2xl:col-span-8">
                <table class="w-full">
                    <thead>
                        <tr class="p-4">
                            <th class="flex">
                                <span class="current_plan mr-2">{{ sellerLayoutStore.userInfo.user_subscription.type }}</span>
                                <AwardIcon />
                            </th>
                            <th> 
                                <div class="pl-4 flex flex-col lg:flex-row justify-start items-start " >
                                    <div class="mr-1 " >Joined: </div>
                                    <div>
                                        {{ new Date(sellerLayoutStore.userInfo.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }}
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="mt-10">
                        <tr class="p-4"> 
                            <td class="p-4">
                                Subscription ID 
                            </td>
                            <td class="p-4">
                                {{ sellerLayoutStore.userInfo.user_subscription.id }}
                            </td>
                        </tr>
                        <tr class="p-4">
                            <td class="p-4">
                                Vaild till
                            </td>
                            <td class="p-4">
                                {{ new Date(sellerLayoutStore.userInfo.user_subscription.expired_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-span-12 sm:col-span-4 2xl:col-span-4 pa-10 mt-5 justify-self-center">
                <button class="btn btn-elevated-success capitalize text-white" @click="router.replace('lss/#/changeplan/payment')">
                    Change Plan</button>
            </div>
        </div>
    </div>  
</template>

<script setup>
import { computed, onMounted, provide, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import dom from "@left4code/tw-starter/dist/js/dom";

const sellerLayoutStore = useLSSSellerLayoutStore();
const editModal = ref(false);
const route = useRoute();
const router = useRouter();
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

<style scoped>

.current_plan{
    --height:30px;
    cursor:default;
    outline: none;
    border: 1px solid gray;
    background-color: #4f6d75;
    padding: 0.3em 1.2em;
    border-radius: var(--height);
    font-size: 1.2rem;
    color: #fff;
    background-size: 100% 100%;
} 
.dark .current_plan{
    border: 1px solid rgb(18, 48, 39);
}

td {
  border-bottom: 2px solid #b3Dee5;
}
</style>