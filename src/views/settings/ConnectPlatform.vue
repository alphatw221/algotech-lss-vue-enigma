<template>
    <div class="box flex flex-col">
        <h1 class="text-lg mx-5 pt-5"> Connect social media platform </h1>
        <div v-for="(component, key) in platform_components" :key="key">
            <component :is="component"></component>
        </div>
    </div>
    <Modal :show="UpgradeModal" @hidden="closeUpgradeModal()">
        <ModalBody class="p-10 text-center text-lg text-danger">
            <h4 class="text-center">Your subscription plan is <strong class="text-primary"> {{ subscriptionPlan }} </strong></h4>
            <p class="text-center">You have only {{ activatedPlatformNumber }} session{{ plural(activatedPlatformNumber) }} or <br/> 
            <a @click="UpgradeModal = false; router.replace('/seller/profile')" class="font-bold">Upgrade your plan Now</a></p>
        </ModalBody>
        <ModalFooter class="flex justify-end">
            <button type="button" @click="UpgradeModal = false" class="btn btn-outline-secondary w-30 mr-5">
                maybe next time
            </button>
        </ModalFooter>
    </Modal>
</template>

<script setup>
import { check_activated_platform } from '@/api/user_subscription'
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

const activated_platform = ref([])
const platform_components = ref({
    "facebook": BindFacebookPageWidgets,
    "instagram": BindInstagramProfileWidgets,
    "youtube": BindYoutubeChannelWidgets
})


onMounted(() => {
    
    let subscription_plan = layoutStore.userInfo.user_subscription.type
    subscriptionPlan.value = subscription_plan.charAt(0).toUpperCase() + subscription_plan.slice(1);
    
    checkActivatedPlatform()
    eventBus.on("check_activated_platform", (payload) => {
      checkActivatedPlatform()
    });
    eventBus.on("showUpgradeModal", (payload) => {
      UpgradeModal.value = payload
    });

});

const plural = (number) => {
    return number > 1 ? "s" : ""
}
const UpgradeModal = ref(false)

const closeUpgradeModal = () => {
    UpgradeModal.value = false,
    eventBus.emit("hide")
}

const checkActivatedPlatform = () => {
    let platform_dict = {
        "facebook": false,
        "instagram": false,
        "youtube": false
    
    }
    console.log("checkActivatedPlatform")
    check_activated_platform().then(res=> {
        activated_platform.value = res.data["activated_platform"]
        console.log(activated_platform.value)
        activated_platform.value.forEach(v=>{
            platform_dict[v] = true;
        })
        activatedPlatformNumber.value = res.data["activated_platform"].length
    }).then(res=>{
        Object.keys(platform_dict).forEach(v=>{
            console.log(v)
            console.log(platform_dict[v])
            eventBus.emit(`activate_${v}`, platform_dict[v])
        })
    }).catch(err=> {
        console.log(err)
    })
}

const Capitalize = (word) => {
    let new_word = word.charAt(0).toUpperCase() + word.slice(1);
    if (new_word === "Youtube") {
        new_word = new_word.replace("t", "T")
    }
    return new_word
}



</script>