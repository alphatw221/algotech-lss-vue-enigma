<template> 
    <div  class="intro-y py-5 text-[16px] sm:text-[1.2rem]" >
        <div class="grid grid-cols-12 gap-5 w-[100%]">
            <div class="col-span-12 lg:col-span-8 2xl:col-span-8">
                <table class="w-full ">
                    <thead>
                        <tr class="p-4">
                            <th class="flex">
                                <!-- layout.userInfo.user_subscription.type == ('trial'||'lite'||'standard'||'premium'||'dealer'||'kol') -->
                                <template v-if="['trial','lite','standard','premium','dealer','kol'].includes(plan)" > 
                                    <span class="mr-2 current_plan bg-[#FFD66B] shadow-lg text-black"> {{ $t(`profile.plan.`+ plan) }}</span>
                                </template>
                                    <span v-else class="mr-2 current_plan bg-[#FFD66B] shadow-lg text-black"> {{plan}}</span>
                                <span v-if="plan === 'standard'"> <font-awesome-icon icon="fa-solid fa-star" class="" /> </span>
                                <span v-else-if="plan === 'premium'"> <font-awesome-icon icon="fa-solid fa-crown" class="text-[#FFD66B]" /> </span>
                                <span v-else-if="plan === 'lite'"><font-awesome-icon icon="fa-solid fa-shield" /> </span>
                                <span v-else> <font-awesome-icon icon="fa-regular fa-star" /></span>
                            </th>
                            <th> 
                                <div class="flex flex-col wrap lg:flex-row items-start pl-4" >
                                    <div class="mr-1 whitespace-nowarp" >{{ $t(`profile.subscription.joined`)}} :</div>
                                    <div class="whitespace-nowarp">
                                        {{ new Date(layout.userInfo.created_at).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) }}
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="mt-10">
                        <tr class="p-4"> 
                            <td class="p-4 whitespace-nowrap">
                                {{ $t(`profile.subscription.title`)}} {{ $t(`profile.subscription.id`) }} :
                            </td>
                            <td class="p-4">
                                {{ layout.userInfo.user_subscription.id }}
                            </td>
                        </tr>
                        <tr class="p-4">
                            <td class="p-4">
                                {{ $t(`profile.subscription.vaild`)}} :
                            </td>
                            <td class="p-4">
                                {{ new Date(layout.userInfo.user_subscription.expired_at).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) }}
                            </td>
                        </tr>
                        <tr class="p-4"> 
                            <td class="p-4"> 
                                <div> {{$t("profile.subscription.country")}} : </div>
                            </td>
                            <td class="p-4"> 
                                <div class="flex my-auto" v-if="layout.userInfo.user_subscription "> {{  $t(`settings.localization.countries.${layout.userInfo.user_subscription.country}`)||'' }}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-span-12 mt-5 lg:col-span-4 2xl:col-span-4 p-10 justify-self-center">
                <button class="text-white capitalize btn btn-elevated-success whitespace-nowrap" @click="router.push('/seller/change-plan')">
                {{ $t(`profile.subscription.change_plan`)}}
                </button>
            </div>
        </div>
    </div>  
</template>

<script setup>
import { computed, onMounted, provide, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import dom from "@left4code/tw-starter/dist/js/dom";

const layout = useLSSSellerLayoutStore();
const editModal = ref(false);
const route = useRoute();
const router = useRouter();

const plan = ref(layout.userInfo.user_subscription.type)
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

<style scoped>

.current_plan{
    --height:30px;
    cursor:default;
    outline: none;
    border: 1px solid rgb(206, 202, 0);
    padding: 0.3em 1.2em;
    border-radius: var(--height);
} 
.dark .current_plan{
    border: 1px solid rgb(18, 48, 39);
}

td {
  border-bottom: 2px solid #011316c0;
}
</style>