<template>
    <Modal :show="showWishlist" @hidden="showWishlist = false">
        <ModalBody class="text-center">
            <div
                class="flex flex-col gap-5"> 
                <div>Notify me if the product becomes available again</div>
                <div class="relative mx-10"> 
                    <MailIcon class="absolute w-6 h-6 top-2 left-3 z-10 text-slate-400"/>
                    <input type="email" class="h-[42px] pl-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"
                        :placeholder="$t('login.email')" 
                        v-model="email" 
                        @keydown.enter.prevent="add_to_wishlist(productID)" />
                </div>
                <button 
                    class="btn btn-sm bg-green-700 w-24 ml-auto text-white"
                    @click="add_to_wishlist(productID)"
                >
                {{$t('shopping_cart.add_item.wishlist')}}
                </button>
                <p> With your consent, LSS will use your contact information (E-mail address) to alert you of the product availability.</p>
                <p> For more information about our privacy practices and your rights, please consult our <a href="https://liveshowseller.com/privacy-policy/" target="#"> Privacy Policy. </a></p>
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
        productID.value = product
        // console.log(productID.value)

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
