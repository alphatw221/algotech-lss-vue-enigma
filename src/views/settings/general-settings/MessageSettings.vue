<template>
    <div class="flex flex-col justify-between gap-5 my-5"
        :class="{'md:flex-row': props.status == 'settings'}"> 

        <label v-if="props.status == 'settings'" class="w-72 text-xl">{{$t('settings.messages.title')}}</label>

        <div v-else-if="props.status !== 'settings'"
            class="flex flex-col gap-4"> 
            <span class="text-xl font-medium leading-none lg:-mx-6 whitespace-nowrap">{{$t('settings.messages.title')}}</span>
		    <hr class="-mx-6" />
        </div>

        <AccordionGroup class="accordion-boxed w-full">
            <template v-for="field in sellerReplyMeta.fields" :key="field.key">
                <AccordionItem v-if="field.type==='textarea'">
                    <Accordion>
                        <div class="flex flex-col">
                            <div class="flex flex-row gap-2 justify-start">
                                <label class="form-label text-base font-medium"> {{$t('settings.messages.'+ field.key)}}</label> 
                                <div class="ml-auto">
                                    <Tippy  :content="$t('settings.notes.modify')" :options="{ theme: 'light' }"> <SimpleIcon icon="edit" color="#334155"/> </Tippy>
                                </div>
                            </div>
                            <div v-if="field.status !== 'settings'">
                                    <input 
                                        class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-2" 
                                        type="checkbox"
                                        v-model="props.meta_reply[field.key+'_enabled']"
                                    />
                                    <label class="w-fit whitespace-nowrap form-label text-base font-medium mr-3">{{$t('settings.messages.enable')}}</label>
                                </div>
                            <p class="text-slate-400 break-all w-full whitespace-pre-line"> {{props.meta_reply[field.key]}}</p>
                        </div>
                    </Accordion>
                    <AccordionPanel class="leading-relaxed text-slate-600 dark:text-slate-500">
                        <textarea 
                            rows="8"
                            cols="40"
                            class="h-48 p-2 mr-5 form-control"
                            :placeholder="$t('settings.messages.placeholder.'+ field.key)"
                            v-model="props.meta_reply[field.key]"
                        >
                        </textarea>
                    </AccordionPanel>
                </AccordionItem>
                <!-- <template v-if="field.type==='component'">
                    <template v-for="(messages, index) in props.meta_reply[field.key]" :key="index"> 
                        <AccordionItem>
                            <Accordion>
                                <div class="flex flex-col">
                                    <div class="flex flex-row gap-2 justify-start">
                                        <div v-if="props.status !== 'settings'">
                                            <input 
                                                class="form-control form-check-input w-[1.5rem] h-[1.5rem] mr-2" 
                                                type="checkbox" 
                                            />
                                            <label class="w-fit whitespace-nowrap form-label text-base font-medium mr-3">{{$t('settings.messages.enable')}}</label>
                                        </div>
                                        <div class="ml-auto">
                                            <Tippy  :content="$t('settings.notes.modify')" :options="{ theme: 'light' }"> <SimpleIcon icon="edit" color="#334155"/> </Tippy>
                                        </div>
                                    </div>
                                    
                                    <label class="form-label text-base font-medium"> {{$t('settings.messages.'+ field.key)}}</label>
                                    <span class="text-slate-400 break-all w-full"> {{messages.title}}</span>
                                </div>
                            </Accordion>
                            <AccordionPanel class="leading-relaxed">
                                    <input class="form-control" type="text" v-model="props.meta_reply[field.key][index].title"/>
                            </AccordionPanel>
                        </AccordionItem>
                    </template>
                </template>  -->
            </template> 
        </AccordionGroup>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, defineProps, onBeforeMount, watch, computed } from 'vue';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useLSSReplyMetaStore } from '@/stores/lss-reply-meta';

import i18n from "@/locales/i18n"

const props = defineProps({
    meta_reply: Object,
    status: String, 
})

const layoutStore = useLSSSellerLayoutStore();
const replyMetaStore = useLSSReplyMetaStore();
const sellerReplyMeta = ref({fields:[]})
const key = ref([])

onBeforeMount(() => {
    sellerReplyMeta.value = replyMetaStore['default']
    // if(replyMetaStore?.[layoutStore.userInfo.user_subscription.id.toString()]){ 
    //     sellerReplyMeta.value = replyMetaStore[layoutStore.userInfo.user_subscription.id.toString()]
    // }else{
    //     sellerReplyMeta.value = replyMetaStore['default']
    // }
})

onMounted(()=>{insertReplyData()}) //for create page
watch(computed(()=>props.meta_reply), () => { insertReplyData()}, {deep: true}) //for edit page

const insertReplyData = ()=>{
    sellerReplyMeta.value.fields.forEach(field => {
        if(typeof props.meta_reply[field.key] != field.datatype) props.meta_reply[field.key] = field.default
        // if(field.datatype == 'string'){
        //     var message = document.getElementById(field.key); 
        //     var lineBreak = props.meta_reply[field.key].replaceAll('\n','<br/>')
        //     message.innerHTML = ['', null, undefined].includes(props.meta_reply[field.key]) ? '' : lineBreak
        // }
    });
}

</script>