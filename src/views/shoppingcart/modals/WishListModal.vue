<template>
    <Modal :show="showWishlist" @hidden="showWishlist = false" backdrop="static"> 
        <ModalHeader class="flex">
                <div class="mx-auto">{{$t('shopping_cart.wishlist_modal.title')}}</div>
                <XIcon class="w-7 h-7 absolute right-2" @click="showWishlist = false"/>
        </ModalHeader>
        <ModalBody class="text-center">
            <div
                class="flex flex-col gap-5 px-2"> 
                <div class="relative mx-10"> 
                    <UserIcon class="absolute w-6 h-6 top-2 left-3 z-10" :class="{'text-danger' : v.name.$error, 'text-slate-400': !v.name.$error}"/> 
                    <input type="text" class="h-[42px] pl-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"
                        :class="{'border-danger' : v.name.$error}"
                        :placeholder="$t('login.user_name')" 
                        v-model="v.name.$model" 
                        @keydown.enter.prevent="add_to_wishlist()" />
                </div>
                <div class="relative mx-10"> 
                    <MailIcon class="absolute w-6 h-6 top-2 left-3 z-10" :class="{'text-danger' : v.email.$error, 'text-slate-400': !v.email.$error}"/>
                    <input type="email" class="h-[42px] pl-11 px-4 rounded-xl form-control border-slate-500 text-[16px]"
                        :class="{'border-danger' : v.name.$error}"
                        :placeholder="$t('login.email')" 
                        v-model="v.email.$model" 
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
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

const showWishlist = ref(false)
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const layoutStore = useLSSBuyerLayoutStore()
const productID = ref()
const info = ref({
    email:'',
    name:''
})

const props = defineProps({
  isAnonymousUser: Boolean,
});

const rules = computed(()=> {
    return {
        email: { required, email },
        name: { required},
    }
})
const v = useVuelidate(rules, info);

onMounted(()=>{
    if(!props.isAnonymousUser){
        info.value.email = layoutStore.userInfo.email
        info.value.name = layoutStore.userInfo.name
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
    v.value.$touch();
    if (v.value.$invalid) {
        layoutStore.notification.showMessageToast(i18n.global.t('shopping_cart.invalid_data'))
        return
    } else{
        wish_list_add(productID.value, info.value, layoutStore.alert).then(
        res => {
            layoutStore.notification.showMessageToast(i18n.global.t('shopping_cart.wishlist_success'))
            showWishlist.value = false
        }
    )
    }
}
</script>
