<template>
    <div class="py-5 sm:p-8 sm:py-5 px-2 lg:px-10 text-sm sm:text-lg ">
        <AccordionGroup class="accordion-boxed">
            <AccordionItem>
                <Accordion>
                    <div class="flex">
                        <div class="mr-auto"> 
                            <span class="form-label text-base font-medium"> {{$t('settings.notes.delivery_note')}}: </span> <br> 
                            <span class="text-slate-400 break-all">
                                {{ deliveryNote }}
                            </span>
                        </div>
                        <div>
                            <EditIcon class="h-6" />
                        </div>
                    </div>
                </Accordion>
                <AccordionPanel class="leading-relaxed text-slate-600 dark:text-slate-500">
                    <textarea 
                        class="h-48 p-2 mr-5 form-control indent-4"
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
                            <span class="form-label text-base font-medium"> {{$t('settings.notes.special_note')}}:</span> <br> 
                            <span class="whitespace-normal text-slate-400  break-all">
                                {{ specialNote }}
                            </span>
                        </div>
                        <div>
                            <EditIcon class="h-6" />
                        </div>
                    </div>
                </Accordion>
                <AccordionPanel class="leading-relaxed text-slate-600 dark:text-slate-500">
                    <textarea 
                        class="h-48 p-2 mr-5 form-control indent-4" 
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
                            <span class="form-label text-base font-medium"> {{$t('settings.notes.confirmation_note')}}:</span> <br> 
                            <span class="text-slate-400  break-all"> 
                                {{ confirmationNote }}
                            </span>
                        </div>
                        <div>
                            <EditIcon class="h-6" />
                        </div>
                    </div>
                </Accordion>
                <AccordionPanel class="leading-relaxed text-slate-600 dark:text-slate-500">
                    <textarea 
                        class="h-48 p-2 mr-5 form-control indent-4"
                        placeholder="confirmation note ..."
                        v-model="confirmationNote"
                    >
                    </textarea>
                </AccordionPanel>
            </AccordionItem>
        </AccordionGroup>
        
        <div class="mt-5 flex text-[14px] justify-end">
            <button class="w-32 btn dark:border-darkmode-400" @click="discard"> {{$t('settings.notes.discard')}}</button>
            <button class="w-32 ml-5 shadow-md btn btn-primary" @click="update"> {{$t('settings.notes.save')}} </button>
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
    update_notes(deliveryNote.value, specialNote.value, confirmationNote.value).then(res => {
        layoutStore.userInfo = res.data
        layoutStore.notification.showMessageToast("Update Successfully")
    }).catch(error =>
        layoutStore.alert.showMessageToast("Update Failed")
    )
}

const discard = () => {
    list()
}

</script>
