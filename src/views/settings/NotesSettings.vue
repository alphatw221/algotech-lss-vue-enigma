<template>
    <div class="p-5">
        <AccordionGroup class="accordion-boxed">
            <AccordionItem>
                <Accordion>
                    <div class="flex">
                        <div class="mr-auto"> 
                            Delivery Note: <br> 
                            <span class="text-slate-400">
                                {{ deliveryNote }}
                            </span>
                        </div>
                        <div>
                            <EditIcon class="click-icon m-auto h-6"></EditIcon>
                        </div>
                    </div>
                </Accordion>
                <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed">
                    <textarea 
                        class="form-control h-48 mr-5 p-2 indent-4"
                        placeholder="delivery note ..."
                        v-model="deliveryNote"
                    >
                    </textarea>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <Accordion>
                    <div class="flex">
                        <div class="mr-auto"> 
                            Special Note: <br> 
                            <span class="text-slate-400 whitespace-normal">
                                {{ specialNote }}
                            </span>
                        </div>
                        <div>
                            <EditIcon class="click-icon m-auto h-6"></EditIcon>
                        </div>
                    </div>
                </Accordion>
                <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed">
                    <textarea 
                        class="form-control h-48 mr-5 p-2 indent-4" 
                        placeholder="special note ..."
                        v-model="specialNote"
                    >
                    </textarea>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <Accordion>
                    <div class="flex">
                        <div class="mr-auto"> 
                            Confirmation Note: <br> 
                            <span class="text-slate-400">
                                {{ confirmationNote }}
                            </span>
                        </div>
                        <div>
                            <EditIcon class="click-icon m-auto h-6"></EditIcon>
                        </div>
                    </div>
                </Accordion>
                <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed">
                    <textarea 
                        class="form-control h-48 mr-5 p-2 indent-4"
                        placeholder="confirmation note ..."
                        v-model="confirmationNote"
                    >
                    </textarea>
                </AccordionPanel>
            </AccordionItem>
        </AccordionGroup>
        
        <div class="mt-5 float-right text-[14px]">
            <button class="btn w-32 dark:border-darkmode-400 mt-7" @click="discard"> Discard</button>
            <button class="btn btn-primary w-32 shadow-md ml-5 mt-7" @click="update"> Save </button>
        </div>
        
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { get_notes, update_notes } from '@/api_v2/user_subscription'
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';


const layoutStore = useLSSSellerLayoutStore();

//之後這邊改成 綁layoutStore裡面的userInfo.user_subscription
const deliveryNote = ref('')
const specialNote = ref('')
const confirmationNote = ref('')

onMounted(() => {
    list()
})

const list = () => {
    get_notes().then(response => {
        deliveryNote.value = response.data.delivery_note
        specialNote.value = response.data.special_note
        confirmationNote.value = response.data.confirmation_note
    })
}

const update = () => {
    console.log(deliveryNote.value)
    update_notes(deliveryNote.value, specialNote.value, confirmationNote.value).then(response => {
        layoutStore.notification.showMessageToast("Update Successfully")
    }).catch(error =>
        layoutStore.alert.showMessageToast("Update Failed")
    )
}

const discard = () => {
    list()
}

</script>