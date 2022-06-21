<template>
        <Modal class="text-center" :slideOver="true" :show="store.showInstantlyAddProductModal" @hidden="store.showInstantlyAddProductModal = false">
        <a @click="store.showInstantlyAddProductModal = !store.showInstantlyAddProductModal" class="absolute right-0 top-0 mt-3 mr-3">
            <XIcon class="w-8 h-8 text-slate-400" />
        </a>
        <ModalHeader class="text-center p-5">
            <h2 class="font-medium text-base text-center w-full">
                Instantly Add Product
            </h2>
        </ModalHeader>
        <ModalBody class="text-[16px]">
            <div class="text-left">
                <form action="#" class="flex flex-col p-2">
                    <div> <input type="checkbox" /> <span class="ml-2"> Save to Stock </span></div>
                    <label class="mt-5 mb-2">Product Name</label>
                    <input type="text" class="rounded-lg" />
                    <label class="mt-5 mb-2">Category</label>
                    <TomSelect v-model="select" :options="{
                      placeholder: 'Select your favorite actors',
                                }" class="w-full rounded-lg">
                        <option value="1">Leonardo DiCaprio</option>
                        <option value="2">Johnny Deep</option>
                        <option value="3">Robert Downey, Jr</option>
                        <option value="4">Samuel L. Jackson</option>
                        <option value="5">Morgan Freeman</option>
                    </TomSelect>
                    <label class="mt-5 mb-2">Code</label>
                    <input type="text" class="rounded-lg" />
                    <label class="mt-5 mb-2">Price</label>
                    <input type="text" class="rounded-lg" />
                    <label class="mt-5 mb-2">Q’TY</label>
                    <input type="text" class="rounded-lg" />
                    <button class="btn btn-primary mt-10 ml-auto"> Apply</button>
                </form>
            </div>
        </ModalBody>
    </Modal>
</template>

<script setup>
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list";

const store = useLSSCampaignListStore(); 

</script>
