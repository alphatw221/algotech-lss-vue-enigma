<template>
    <div class="flex flex-col h-[88vh]">
            <div class="flex items-center sm:px-20 lg:pt-5 mt-2 pb-4 intro-y">
                <h2 class="text-xl text-center sm:text-2xl font-medium mx-auto sm:mx-0">{{$t('settings.platform.connected_platform')}}
                </h2>
            </div>
            <iframe class="t-3 mx-auto" :src="`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F${fbPageUsername}&
            tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&
            appId=${FB_APP_ID}`" width="500" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
    </div>
    
</template> 

<script setup>
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance, onBeforeMount } from "vue";
import { get_single_platform_instance } from '@/api_v2/user_subscription'
import { useRoute, useRouter } from "vue-router";
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const router = useRouter();
const route = useRoute();
const fbPageUsername = ref("kuai.mai.2021")
const FB_APP_ID = import.meta.env.VITE_APP_FB_APP_ID



onMounted(() => {
    let platform_name = route.params.platform_name
    let platform_id = route.params.platform_id
    get_single_platform_instance(platform_name, platform_id).then(res=> {
        console.log(res)
    })
})

const Capitalize = (word) => {
    let new_word = word.charAt(0).toUpperCase() + word.slice(1);
    if (new_word === "Youtube") {
        new_word = new_word.replace("t", "T")
    }
    return new_word
}

</script>