<template>
    <Modal :show="showWishlist" @hidden="showWishlist = false" backdrop="static"> 
        <ModalBody class="text-center">
            <div
                class="flex flex-col gap-5 px-2"> 
                <div class="flex justify-between"> 
                    <div class="mx-auto">{{$t('shopping_cart.wishlist_modal.title')}}</div>
                    <XIcon class="w-7 h-7 ml-2" @click="showWishlist = false"/>
                </div>
                <div class="relative mx-10"> 
                    <MailIcon class="absolute w-6 h-6 top-2 left-3 z-10 text-slate-400"/>
                    <input type="email" class="h-[42px] pl-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"
                        :placeholder="$t('login.email')" 
                        v-model="email" 
                        @keydown.enter.prevent="add_to_wishlist()" />
                </div>
                <button 
                    class="btn btn-sm bg-green-700 w-24 ml-auto text-white"
                    @click="add_to_wishlist()"
                >
                {{$t('shopping_cart.add_item.wishlist')}}
                </button>
                <p> {{$t('shopping_cart.wishlist_modal.message_1')}}</p>
                <p> {{$t('shopping_cart.wishlist_modal.message_2')}}<a href="https://liveshowseller.com/privacy-policy/" target="#">{{$t('shopping_cart.wishlist_modal.policy')}} </a></p>
            </div>
        </ModalBody>
    </Modal>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance, watch, computed } from "vue";
import { wish_list_add } from "@/api_v2/product"
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"
import i18n from "@/locales/i18n"

const showWishlist = ref(false)
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const layoutStore = useLSSBuyerLayoutStore()
const productID = ref()
const email = ref()

const props = defineProps({
  isAnonymousUser: Boolean,
});

onMounted(()=>{
    if(!props.isAnonymousUser){
        email.value = layoutStore.userInfo.email
    }
    eventBus.on('showWishlistModal',product=>{
        showWishlist.value = true
        productID.value = product.product
    })
})
onUnmounted(()=>{
    eventBus.off('showWishlistModal')
})

const add_to_wishlist = ()=>{
    wish_list_add(productID.value, email.value).then(
        res => {
            layoutStore.notification.showMessageToast(i18n.global.t('shopping_cart.wishlist_success'))
            showWishlist.value = false
        }
    )
}
</script>
