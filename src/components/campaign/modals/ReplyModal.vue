<template>

    <Modal :show="show" @hidden="closeChat()">
        <ModalHeader>
            <h2 class="font-medium text-base mr-auto"> Reply to {{ replyTo.customer_name }} </h2>
            <a @click="show = false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
                <XIcon class="w-8 h-8 text-slate-400" />
            </a>
        </ModalHeader>
        <ModalBody class="w-full h-full flex flex-col">
            <div class="flex w-full h-full">
                <Tippy class="rounded-full" content="Reply" theme='light'>
                    <div class="w-12 h-12 flex-none image-fit mr-1">
                        <img alt="" class="rounded-full zoom-in" :src="replyTo.image" />
                    </div>
                </Tippy>
                <div class="box overflow-y-auto bg-secondary scrollbar-hidden flex m-3 p-2 w-fit">
                    <div class="w-fit items-left text-slate-700 mt-0.5 p-0.5 space-wrap">
                        {{ replyTo.message }}
                    </div>
                </div>
            </div>
            <template v-for="comment in nestComment" :key="comment">
            <div v-if="comment.customer_name === replyTo.customer_name"
                class="intro-x relative flex items-center p-3" >
                <Tippy class="rounded-full " content="Reply" theme='light'>
                    <div class="relative flex items-center w-full">
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                        <img alt="" class="rounded-full zoom-in" :src="comment.image" />
                        </div>
                    
                        <div class="ml-2 overflow-hidden w-full">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">{{ comment.customer_name }}</a>
                                <div class="text-xs text-slate-400 ml-auto"></div>
                            </div>
                            <div class="text-slate-500 mt-0.5">
                                {{ comment.message }}
                            </div>
                        </div>
                    </div>
                </Tippy>
            </div>
            <div v-else
                class="intro-x relative flex items-center p-3" >
                <Tippy class="rounded-full " content="Reply" theme='light'>
                    <div class="relative flex items-center w-full">
                        <div class="w-12 h-12 flex-none image-fit mr-1">
                        <img alt="" class="rounded-full zoom-in" :src="comment.image" />
                        </div>
                    
                        <div class="ml-2 overflow-hidden w-full">
                            <div class="flex items-center">
                                <a href="javascript:;" class="font-medium">{{ comment.customer_name }}</a>
                                <div class="text-xs text-slate-400 ml-auto"></div>
                            </div>
                            <div class="text-slate-500 mt-0.5">
                                {{ comment.message }}
                            </div>
                        </div>
                    </div>
                </Tippy>
            </div>
            
            </template>
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
        <ModalFooter class="flex">
            <button type="button" @click="show = false" class="btn btn-outline-secondary w-20 mr-auto">
                Cancel
            </button>
        </ModalFooter>
    </Modal>

</template>

<script>
import { comment_on_comment } from '@/api_v2/campaign';

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
    },
    data() {
        return {
            show: null,
            message: '',
            campaignId: this.$route.params.campaign_id,
            nestComment: [],
        }
    },
    mounted() {
        if (this.openChat === true) {
            this.show = true
        }
    },
    methods: {
        closeChat() {
            this.show = false,
            this.eventBus.emit("hide")
        },
        send(comment_id) {
            console.log(this.message)
            comment_on_comment(this.campaignId, comment_id, this.message).then((response) => {
                console.log(response.data);

            }).catch(error => {
                console.log(error);
            })

        }
    }
}

</script>