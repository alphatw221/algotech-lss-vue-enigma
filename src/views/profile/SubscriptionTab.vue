<template> 
    <div  class="intro-y box py-10 px-5 sm:p-12 text-[16px] sm:text-[1.2rem]">
        <div class="grid grid-cols-12 gap-5 w-[100%]">
            <div class="col-span-12 sm:col-span-8 2xl:col-span-8">
                <table class="w-full ">
                    <thead>
                        <tr class="p-4">
                            <th class="flex">
                                <span class="mr-2 capitalize current_plan">{{ sellerLayoutStore.userInfo.user_subscription.type }}</span>
                                <span v-if="plan === 'standard'"> <font-awesome-icon icon="fa-solid fa-star" /> </span>
                                <span v-else-if="plan === 'premium'"> <font-awesome-icon icon="fa-solid fa-crown" /> </span>
                                <span v-else-if="plan === 'lite'"><font-awesome-icon icon="fa-solid fa-shield" /> </span>
                                <span v-else> <font-awesome-icon icon="fa-regular fa-star" /></span>
                            </th>
                            <th> 
                                <div class="flex flex-col items-start justify-start pl-4 lg:flex-row " >
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
            <div class="col-span-12 mt-5 sm:col-span-4 2xl:col-span-4 pa-10 justify-self-center">
                <button class="text-white capitalize btn btn-elevated-success" @click="router.replace('/lss/#/changeplan/payment')">
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

const plan = ref(sellerLayoutStore.userInfo.user_subscription.type)
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
    background-color: theme("colors.primary");
    padding: 0.3em 1.2em;
    border-radius: var(--height);
    color: #fff;
} 
.dark .current_plan{
    border: 1px solid rgb(18, 48, 39);
}

td {
  border-bottom: 2px solid #011316c0;
}
</style>