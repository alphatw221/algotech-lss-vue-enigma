<template>

    <Modal :show="show" @hidden="closeChat()">
        <ModalHeader>
            <h2 class="font-medium text-base mr-auto"> Reply to {{ replyTo.customer_name }} </h2>
            <a @click="show=false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
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
            <div class="pt-4 pb-10 sm:py-4 flex items-center border-t border-slate-200/60 dark:border-darkmode-400">
                <textarea
                    class="chat__box__input form-control dark:bg-darkmode-600 h-14 resize-none border-inherit px-5 py-3 shadow-none focus:border-inherit focus:ring-0"
                    rows="1" placeholder="Type your message..."></textarea>
                <a 
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
import { createAxiosWithBearer } from '@/libs/axiosClient'

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
    data(){
        return {
            show: null,
            baseURL: import.meta.env.VITE_FACEBOOK_API_URL_V13,
            comment_id: '',
            comments:'',
        }
    },
     mounted() {
        if (this.openChat === true) {
            this.show = true
        }
    },
    methods:{
        closeChat(){
            this.show = false,
            this.eventBus.emit("hide")
        },
        // send(reply){
        //     console.log(reply)
        //     // FacebookApiCaller(f'{comment_id}/comments', bearer_token=page_token,
        //     //                 data=data).post()
            
        //     createAxiosWithBearer()
        //         .post(this.baseURL + `${this.comment_id}/${this.comments}` )
        //         .then(
        //             response => {
        //                 console.log(this.comments)
        //             }
        //         ).catch(
        //             error => {
        //                 console.log(error)
        //             }
        //     )
        // },
    }
}

</script>