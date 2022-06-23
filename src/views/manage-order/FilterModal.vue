<template>
    <Modal
        size="modal-xl"
        :show="store.filterModal"
		@hidden="store.filterModal = false"
    >
            <ModalHeader >
                <h2 class="font-medium text-base mr-auto text-xl">
                        Filter
                </h2>
                <button id="tabulator-html-filter-go" type="button" class="flex-none text-[18px] btn btn-primary w-fit mr-3"
                    >
                    Apply Filter
                </button>
                <XIcon class="w-8 h-8 ml-2" @click="store.filterModal = false"/>
            </ModalHeader>
        <ModalBody>
            <div class="flex flex-row grow flex-wrap">
                <template v-for="(tag, index) in store.filterTagArray" :key="index">
                    <div class="" v-if="tag">
                        <button class="btn btn-rounded-dark w-fit h-10 m-1 text-[15px]" >
                            <HashIcon class="w-4 h-4 mr-2" /> {{index}}
                            <XIcon class="w-4 h-4 ml-2" @click="updateTag(index)"/>
                        </button>
                    </div>
                </template>
            </div>
            <div class="flex text-[16px] my-6">
                <div class="grid grid-cols-12 gap-2">
<<<<<<< HEAD
                    <div class="col-span-12">Payment</div>
                    <div class="col-span-2">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" v-model="store.filterTagArray.payment['Direct Payment']" @click="updateTag('Direct Payment')">Direct Payment
                    </div>
                    <div class="col-span-2">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" v-model="store.filterTagArray.payment['Stripe']" @click="updateTag('Stripe')">Stripe
                    </div>
                    <div class="col-span-12">Delivery Status</div>
                    <div class="col-span-2">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" v-model="store.filterTagArray.delivery['Shipping out']" @click="updateTag('Shipping out')">Shipping out
                    </div>
                    <div class="col-span-2">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" v-model="store.filterTagArray.delivery['To be shipping']" @click="updateTag('To be shipping')">To be shipping
                    </div>
                    <div class="col-span-12">Platform</div>
                    <div class="col-span-2">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" v-model="store.filterTagArray.platform['Facebook']" @click="updateTag('Facebook')">Facebook
                    </div>
                    <div class="col-span-2">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" v-model="store.filterTagArray.platform['Youtube']" @click="updateTag('Youtube')">Youtube
                    </div>
                    <div class="col-span-2">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" v-model="store.filterTagArray.platform['Instagrame']" @click="updateTag('Instagrame')">Instagrame
=======
                    <div class="col-span-12 text-[20px] font-medium my-2">Payment</div>
                    <div class="col-span-3 my-1">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                                v-model="store.filterTagArray['Direct Payment']" 
                                    @click="updateTag('Direct Payment')"> 
                                    <span class="ml-1"> Direct Payment </span> 
                    </div>
                    <div class="col-span-3 my-1">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                            v-model="store.filterTagArray['Stripe']" 
                                @click="updateTag('Stripe')"> <span class="ml-1"> Stripe </span> 
                    </div>
                    <div class="col-span-12 text-[20px] font-medium my-2"> Delivery Status</div>
                    <div class="col-span-3 my-1">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                            v-model="store.filterTagArray['Shipping out']" 
                                @click="updateTag('Shipping out')"> 
                                    <span class="ml-1"> Shipping out </span> 
                    </div>
                    <div class="col-span-3 my-1">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                            v-model="store.filterTagArray['To be shipping']" 
                                @click="updateTag('To be shipping')"> 
                                    <span class="ml-1"> To be shipping </span> 
                    </div>
                    <div class="col-span-12  text-[20px] font-medium my-2"> Platform</div>
                    <div class="col-span-3 my-1">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                            v-model="store.filterTagArray['Facebook']" 
                                @click="updateTag('Facebook')"> 
                                <span class="ml-1"> Facebook </span> 
                    </div>
                    <div class="col-span-3 my-1">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                            v-model="store.filterTagArray['Youtube']" 
                                @click="updateTag('Youtube')"> 
                                <span class="ml-1"> Youtube </span> 
                    </div>
                    <div class="col-span-3 my-1">
                        <input class="form-check-input mr-0 ml-3" type="checkbox" 
                            v-model="store.filterTagArray['Instagram']" 
                                @click="updateTag('Instagram')"> 
                                <span class="ml-1"> Instagram </span> 
>>>>>>> 95dd97ca26889fbbf2d2bb0d4c8f58285b229d42
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