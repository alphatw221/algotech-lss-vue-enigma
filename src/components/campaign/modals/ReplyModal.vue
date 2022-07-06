<template>

    <Modal :show="show" @hidden="closeChat" backdrop="static">
        <ModalHeader>
            <img alt="" class="rounded-full zoom-in w-8 h-8" :src="replyTo.image" />
            <h2 class="font-medium text-base mr-auto ml-5">Reply to {{ replyTo.customer_name }} </h2>
            <a @click="show = false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
                <XIcon class="w-12 h-12 text-slate-400" />
            </a>
        </ModalHeader>
        <ModalBody class="w-full h-full flex flex-col">
            <div class="overflow-y-auto max-h-[500px]"> 
                <div class="flex w-fit h-fit">
                    <div class="w-12 h-12 flex-none image-fit mr-1">
                        <img alt="" class="rounded-full zoom-in" :src="replyTo.image" />
                    </div>
                    <div class="box bg-secondary flex flex-col m-3 p-2 w-fit">
                        <div class="flex items-center">
                            <span class="font-medium text-sky-900">{{ replyTo.customer_name }}</span>
                            <div class="text-xs text-slate-400 ml-auto"></div>
                        </div>
                        <div class="w-fit items-left text-slate-700 mt-0.5 p-0.5 space-wrap">
                            {{ replyTo.message }}
                        </div>
                    </div>
                </div>
                <template v-for="(comment,key) in nestComment" :key="key">
                <div v-if="comment.from.id === pageId"
                    class="flex w-full h-fit justify-end">
                    <div class="box bg-secondary flex flex-col m-3 p-2 w-fit">
                        <span class="font-medium text-right text-violet-900">{{ comment.from.name }}</span>
                        <div class="w-fit items-right text-slate-700 mt-0.5 p-0.5 space-wrap text-right">
                            {{ comment.message }}
                        </div>
                    </div>
                    <div class="w-12 h-12 flex-none image-fit mr-1">
                        <img alt="" class="rounded-full zoom-in" :src="comment.from.picture.data.url" />
                    </div>
                </div>
                <div v-else
                    class="flex w-fit h-fit">
                    <div class="w-12 h-12 flex-none image-fit mr-1">
                        <img alt="" class="rounded-full zoom-in" :src="comment.from.picture.data.url" />
                    </div>
                    <div class="box bg-secondary flex flex-col m-3 p-2 w-fit">
                        <span class="font-medium text-sky-900">{{ comment.from.name }}</span>
                        <div class="w-fit items-left text-slate-700 mt-0.5 p-0.5 space-wrap">
                            {{ comment.message }}
                        </div>
                    </div>
                </div>
                </template>
            </div>
            <div class="pt-4 pb-10 sm:py-4 flex items-center border-t border-slate-200/60 dark:border-darkmode-400">
                <textarea v-model="message"
                    class="chat__box__input form-control dark:bg-darkmode-600 h-14 resize-none border-inherit px-5 py-3 shadow-none focus:border-inherit focus:ring-0"
                    rows="1" placeholder="Type your message..."></textarea>
                <a @click="send(replyTo.id, message)"
                    class="w-10 h-10 block bg-primary text-white rounded-full flex-none flex items-center justify-center mx-3">
                    <SendIcon class="w-6 h-6" />
                </a>
            </div>
        </ModalBody>
        <!-- <ModalFooter class="flex">
            <button type="button" @click="show = false" class="btn btn-outline-secondary w-20 mr-auto">
                Cancel
            </button>
        </ModalFooter> -->
    </Modal>

</template>

<script>
import { comment_on_comment, nest_comment } from '@/api_v2/campaign';

export default {
    props: {
        replyTo: {
            required: true,
            type: Object,
        },
        openChat: {
            default: false,
            required: false,
            type: Boolean,
        },
        pageId: {
            type: String, 
        }
    },
    data() {
        return {
            show: false,
            message: '',
            campaignId: this.$route.params.campaign_id,
            nestComment: [],
            dummy: 0,
        }
    },
    mounted() {
        if (this.openChat === true) {
            this.show = true
        }
        setInterval(this.getNestComment(), 5000)
    },
    watch:{
        show: function(){
            if(this.show === true){
                this.loopNestComment()
            }else{
                clearInterval(this.dummy)
                // console.log('off')
                this.show = false
            }
        }   
    },
    methods: {
        closeChat() {
            clearInterval(this.dummy)
            this.show = false,
            this.eventBus.emit("hide")
        },
        getNestComment(){
            nest_comment(this.campaignId,this.replyTo.id).then((response)=>{
                this.nestComment = response.data[1].data
            })
            // console.log('run')
        },
        loopNestComment(){
            clearInterval(this.dummy)
            this.dummy = setInterval(()=>{
                // console.log('tick...')
                nest_comment(this.campaignId,this.replyTo.id).then((response)=>{
                this.nestComment = response.data[1].data
                })
            }, 5000)
        },
        send(comment_id) {
            comment_on_comment(this.campaignId, comment_id, this.message).then((response) => {
                // console.log(response.data);
                this.message=''
                this.getNestComment()
            }).catch(error => {
                console.log(error);
            })
        },
    }
}

</script>