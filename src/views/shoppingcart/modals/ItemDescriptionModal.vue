<template>
    <Modal :show="show" @hidden="!show" backdrop="static" > 
        <ModalBody class="text-center">
            <XIcon class="w-7 h-7 absolute top-1 right-2" @click="show = false"/>
            <div class="flex flex-col gap-2 px-2 justify-start"> 
                <div class="text-xl"> {{product.name}}</div>
                <img v-if="product.image" :src="product.image" class="w-[300px] h-[300px] mx-auto object-cover rounded-lg" />
                <img v-else :src="staticDir + `no_image.jpeg`" class="w-[300px] h-[300px] mx-auto object-cover rounded-lg" />
                <div v-if="props.status='PREVIEW'" class="text-lg"> ${{product.price}}</div>
                <div v-else class="text-lg"> {{store.order.campaign?.currency}} 
                    {{(Math.floor(parseFloat(product.price) * (10 ** store.order.campaign?.decimal_places)) / 10 ** store.order.campaign?.decimal_places).toLocaleString('en-GB')}}
                    {{store.order.campaign?.price_unit?$t(`global.price_unit.${store.order.campaign?.price_unit}`):''}}</div>
                <div class="text-xl text-left font-medium"> {{$t('shopping_cart.add_item.description')}}</div>
                <div id="description" class="text-left"></div>
            </div>
        </ModalBody>
    </Modal>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance, watch, computed } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
const staticDir =  import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR;

const store = useShoppingCartStore(); 	
const show = ref(false)
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const product = ref([])

const props = defineProps({
  status: String,
});

onMounted(()=>{
    eventBus.on('showDescriptionModal',p=>{
        show.value = true
        product.value = p
        var tag_id = document.getElementById('description');
        tag_id.innerHTML = product.value.description;
    })
})
onUnmounted(()=>{
    eventBus.off('showDescriptionModal')
})
</script>
