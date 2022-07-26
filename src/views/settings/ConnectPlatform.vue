<template>
    <div class="flex flex-col">
        <h1 class="text-xl sm:text-2xl font-medium mx-auto sm:mx-10 lg:mx-20 pt-5"> {{$t('settings.platform.connected_platform')}} </h1>
        <div v-for="(component, key) in platform_components" :key="key">
            <component :is="component"></component>
        </div>
    </div>
    <Modal :show="UpgradeModal" @hidden="closeUpgradeModal()">
        <ModalBody class="text-center text-lg flex flex-col p-10">
            <AlertCircleIcon class="h-20 w-20 text-danger mx-auto"/>
            <h4 class="text-center">{{$t('settings.platform.your_subscription_plan_is')}} {{ subscriptionPlan }}{{$t('settings.platform.period')}} </h4>
            <p class="text-center">{{$t('settings.platform.you_can_only_bind')}} {{ activatedPlatformNumber }} {{$t('settings.platform.unit')}}{{$t('settings.platform.social_media_platform')}}{{ plural(activatedPlatformNumber) }}{{$t('settings.platform.period')}}</p>
            <div class="flex justify-center h-10 mt-5">
            <button type="button" @click="UpgradeModal = false" class="btn btn-outline-primary rounded-full w-32 mr-5 ">
                {{$t('settings.platform.cancel')}}
            </button>
            <button type="button" @click="UpgradeModal = false; router.replace('/seller/profile')" class="btn btn-rounded-primary w-32 mr-5">
                {{$t('settings.platform.upgrade')}}
            </button>
        </div>
        </ModalBody>
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