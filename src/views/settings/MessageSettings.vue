<template>
    <div class="flex flex-col md:flex-row justify-between gap-5 my-5"> 
        <label class="w-72 text-xl"> Custom Message Settings</label>
        <AccordionGroup class="accordion-boxed w-full">
            <template v-for="field in sellerReplyMeta.fields" :key="field.key">
                <AccordionItem v-if="field.type==='textarea'">
                    <Accordion>
                        <div class="flex flex-col">
                            <div class="flex flex-row gap-2 justify-start">
                                <input 
                                    class="form-control form-check-input w-[1.2rem] h-[1.2rem] mr-2" 
                                    type="checkbox" 
                                    :value="field.key"
                                    v-model="computedEnable"
                                />
                                <label class="w-fit whitespace-nowrap form-label text-base font-medium mr-3">{{$t('settings.messages.enable')}}</label>
                                <label class="form-label text-base font-medium"> {{$t('settings.messages.'+ field.key)}}</label> 
                                <div class="ml-auto">
                                    <Tippy  :content="$t('settings.notes.modify')" :options="{ theme: 'light' }"> <SimpleIcon icon="edit" color="#334155"/> </Tippy>
                                </div>
                            </div>
                            <span :id="field.key" class="text-slate-400 break-all"> </span>
                        </div>
                    </Accordion>
                    <AccordionPanel class="leading-relaxed text-slate-600 dark:text-slate-500">
                        <textarea 
                            rows="8"
                            cols="40"
                            class="h-48 p-2 mr-5 form-control"
                            :placeholder="$t('tooltips.settings.note.delivery_note')"
                            v-model="props.meta_reply[field.key]"
                        >
                        </textarea>
                    </AccordionPanel>
                </AccordionItem>
            </template> 

        </AccordionGroup>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, defineProps, onBeforeMount, watch, computed } from 'vue';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useLSSReplyMetaStore } from '@/stores/lss-reply-meta';

import i18n from "@/locales/i18n"
import SimpleIcon from '../../global-components/lss-svg-icons/SimpleIcon.vue';

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
        if(field.datatype == 'string'){
            var message = document.getElementById(field.key); 
            var lineBreak = props.meta_reply[field.key].replaceAll('\n','<br/>')
            message.innerHTML = ['', null, undefined].includes(props.meta_reply[field.key]) ? '' : lineBreak
        }
    });
}

const computedEnable = computed({
  get:()=>{
    // return key.value
  },set:(value,c)=>{

    console.log(value)
    console.log(c)
    // if(value) return true
    // else if(!value){

    }
    // console.log(sellerReplyMeta.value[value])
    })

</script>