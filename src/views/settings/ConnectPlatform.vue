<template>
    <div class="box m-5 p-10">
        <h1 class="text-lg"> Connect social media platform </h1>
        <div v-for="(platform, key) in activated_button" :key="key">
            <div v-if="platform === true">
                <component :is="platform_conponets[key]"></component>
            </div>
            <div v-else>
                <Button type="button" disabled>Connect with {{ key }}</Button>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import { computed, onMounted, ref, watch } from "vue";
import BindFacebookPageWidgets from "@/components/widgets/BindFacebookPageWidgets.vue"
import BindInstagramProfileWidgets from "@/components/widgets/BindInstagramProfileWidgets.vue"
import BindYoutubeChannelWidgets from "@/components/widgets/BindYoutubeChannelWidgets.vue"


const layoutStore = useLSSSellerLayoutStore();

const activated_button = ref(
    {
        "facebook": false,
        "instagram": false,
        "youtube": false
    
    }
)


const platform_conponets = ref({
    "facebook": BindFacebookPageWidgets,
    "instagram": BindInstagramProfileWidgets,
    "youtube": BindYoutubeChannelWidgets
})
const activated_platform = ref([])

 
onMounted(() => {
    let activated_platform = layoutStore.userInfo.user_subscription.user_plan.activated_platform
    if (activated_platform) {
        activated_platform.forEach(v=>{
            activated_button.value[v] = true
        })
    }
    
});
</script>