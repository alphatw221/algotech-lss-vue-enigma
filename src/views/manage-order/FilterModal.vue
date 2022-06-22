<template>
    <Modal
        size="modal-xl"
        :show="store.filterModal"
		@hidden="store.filterModal = false"
    >
        <ModalBody>
            <ModalHeader>
                <h2 class="font-medium text-base mr-auto">
                        Filter
                </h2>
                <button id="tabulator-html-filter-go" type="button" class="flex-none btn btn-primary w-16 mr-3"
                    >
                    Apply
                </button>
            </ModalHeader>
            <div class="flex grid grid-cols-12 gap-2">
                <template v-for="(tag, index) in store.filterTagArray" :key="index">
                    <div class="col-span-3" v-if="tag">
                        <button class="btn btn-rounded-dark w-fit h-8 m-1" >
                            <HashIcon class="w-4 h-4 mr-2" /> {{index}}
                            <XIcon class="w-4 h-4 ml-2" @click="updateTag(index)"/>
                        </button>
                    </div>
                </template>
            </div>
            <div class="flex">
                <div class="grid grid-cols-12 gap-2">
                    <div class="col-span-12">Payment</div>
                    <div class="col-span-2">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" v-model="store.filterTagArray['Direct Payment']" @click="updateTag('Direct Payment')">Direct Payment
                    </div>
                    <div class="col-span-2">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" v-model="store.filterTagArray['Stripe']" @click="updateTag('Stripe')">Stripe
                    </div>
                    <div class="col-span-12">Delivery Status</div>
                    <div class="col-span-2">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" v-model="store.filterTagArray['Shipping out']" @click="updateTag('Shipping out')">Shipping out
                    </div>
                    <div class="col-span-2">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" v-model="store.filterTagArray['To be shipping']" @click="updateTag('To be shipping')">To be shipping
                    </div>
                    <div class="col-span-12">Platform</div>
                    <div class="col-span-2">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" v-model="store.filterTagArray['Facebook']" @click="updateTag('Facebook')">Facebook
                    </div>
                    <div class="col-span-2">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" v-model="store.filterTagArray['Youtube']" @click="updateTag('Youtube')">Youtube
                    </div>
                    <div class="col-span-2">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" v-model="store.filterTagArray['Instagrame']" @click="updateTag('Instagrame')">Instagrame
                    </div>
                </div>
                
            </div>
        </ModalBody>
    </Modal>
</template>
<script setup>
import { ref, provide, onMounted, onUnmounted, getCurrentInstance } from "vue";
import { useManageOrderStore } from "@/stores/lss-manage-order";

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;
const store = useManageOrderStore()

function updateTag(changeTag){
    store.filterTagArray[changeTag] = !store.filterTagArray[changeTag]
}

</script>