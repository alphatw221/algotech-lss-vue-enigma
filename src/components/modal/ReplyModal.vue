<template>

    <Modal :show="openChat" @hidden="openChat = false">
        <ModalHeader>
            <h2 class="font-medium text-base mr-auto"> Reply to XXX </h2>
            <a @click="openChat = false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
                <XIcon class="w-8 h-8 text-slate-400" />
            </a>
        </ModalHeader>
        <ModalBody class="w-full h-full">
            <Tippy class="rounded-full" content="Reply" theme='light'>
                <div class="w-12 h-12 flex-none image-fit mr-1">
                    <img alt="" class="rounded-full zoom-in" :src="replyToImg" />
                    <div
                        class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                    </div>
                </div>
            </Tippy>
            <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                    <a href="javascript:;" class="font-medium">{{ replyToName }}</a>
                    <div class="text-xs text-slate-400 ml-auto"></div>
                </div>
                <div class="w-full truncate text-slate-500 mt-0.5">
                    {{ replyToMessage }}
                </div>
            </div>
            <div class="pt-4 pb-10 sm:py-4 flex items-center border-t border-slate-200/60 dark:border-darkmode-400">
                <textarea
                    class="chat__box__input form-control dark:bg-darkmode-600 h-16 resize-none border-inherit px-5 py-3 shadow-none focus:border-inherit focus:ring-0"
                    rows="1" placeholder="Type your message..."></textarea>
                <a href="javascript:;"
                    class="w-8 h-8 sm:w-10 sm:h-10 block bg-primary text-white rounded-full flex-none flex items-center justify-center mr-5">
                    <SendIcon class="w-4 h-4" />
                </a>
            </div>
        </ModalBody>
        <ModalFooter>
            <button type="button" @click="openChat = false" class="btn btn-outline-secondary w-20 mr-1">
                Cancel
            </button>
            <button type="button" class="btn btn-primary w-20">Save</button>
        </ModalFooter>
    </Modal>


</template>

<script >

const openChat = false 

export default {
    props: {
        columns: Array,
        replyToImg: String,
        replyToName: String, 
        replyToMessage: String,
        openChat: Boolean,
    }
}

</script>