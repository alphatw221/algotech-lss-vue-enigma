<template>
    <div class="box m-5 p-10">
        <h1 class="text-lg"> Connect social media platform </h1>
        <div v-for="(platform, key) in activated_button" :key="key">
            <div v-if="platform === true">
                <component :is="platform_conponets[key]"></component>
            </div>
            <div v-else>
                <Button type="button" @click="popUpgradeModal(key)">Connect with {{ key }}</Button>
            </div>
        </div>
        
    </div>
    <Modal :show="UpgradeModal" @hidden="closeUpgradeModal()">
        <ModalBody class="p-10 text-center">
            <h4 class="text-center">Your subscription is {{ subscriptionPlan }}</h4>
            <p class="text-center">You have only {{ activatedPlatformNumber }} session{{ plural(activatedPlatformNumber) }} or <a @click="UpgradeModal = false; router.replace('/seller/profile')">click here to upgrade</a></p>
        </ModalBody>
        <ModalFooter class="flex">
            <button type="button" @click="UpgradeModal = false" class="btn btn-outline-secondary w-20 mr-auto">
                Cancel
            </button>
        </ModalFooter>
    </Modal>
</template>

<script setup>
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
import BindFacebookPageWidgets from "@/components/widgets/BindFacebookPageWidgets.vue"
import BindInstagramProfileWidgets from "@/components/widgets/BindInstagramProfileWidgets.vue"
import BindYoutubeChannelWidgets from "@/components/widgets/BindYoutubeChannelWidgets.vue"
import { useRoute, useRouter } from "vue-router";
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const router = useRouter();

const layoutStore = useLSSSellerLayoutStore();

const subscriptionPlan = ref(null)
const activatedPlatformNumber = ref(0)
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


onMounted(() => {
    
    let subscription_plan = layoutStore.userInfo.user_subscription.type
    subscriptionPlan.value = subscription_plan.charAt(0).toUpperCase() + subscription_plan.slice(1);
    if (subscription_plan) {
        if (['trial', 'lite'].includes(subscription_plan)) {
            activated_button.value['facebook'] = true
            activatedPlatformNumber.value = 1
        } else if (['standard'].includes(subscription_plan)) {
            activated_button.value['facebook'] = true
            activated_button.value['instagram'] = true
            activatedPlatformNumber.value = 2
        } else if (['premium'].includes(subscription_plan)) {
            activated_button.value['facebook'] = true
            activated_button.value['instagram'] = true
            activated_button.value['youtube'] = true
            activatedPlatformNumber.value = 3
        }
    }

    eventBus.on("eventBus", (payload) => {
        currentPage.value = 1
        category.value = payload.filterColumn
        search()
    })

onUnmounted()
    
});
const plural = (number) => {
    return number > 1 ? "s" : ""
}
const UpgradeModal = ref(false)
const popUpgradeModal = (key) => {
    UpgradeModal.value = true;
}
const closeUpgradeModal = () => {
    UpgradeModal.value = false,
    eventBus.emit("hide")
}

</script>