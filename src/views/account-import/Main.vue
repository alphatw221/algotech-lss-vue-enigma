<template>   
    <div class="flex flex-row justify-between w-full">
        <p class="font-medium text-base mr-auto my-2">
                Create Accounts by Uplaod excel file
        </p>
    </div> 
    <div class="flex flex-col">
        <div class="relative">
            <!-- <XCircleIcon class="absolute top-1 right-1 w-4 h-4 ml-2 z-index-99" style="color:red" @click="clear"/> -->
            <Dropzone ref-key="dropzoneFile" :options="{
                    method: 'put',
                    url: 'url',
                    uploadMultiple: false,
                    maxFilesize: 256,
                    paramName:file,
                    addRemoveLinks: true,
                    autoProcessQueue: false,
                    acceptedFiles: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                }" class="dropzone rounded-lg">
                <div class="flex flex-col"> 
                    <div class="text-lg font-medium">
                        Drop files here or click to upload.
                    </div>
                    <span> File types: excel</span>
                    <div class="text-gray-600">  Max size：256MB </div>  
                </div>
            </Dropzone>
        </div>
        <div class="relative mt-8">
            <LoadingIcon  v-if="processing" icon="three-dots" color="white" class="absolute h-[30px] w-[20px] sm:w-32 mr-2 sm:mr-0 sm:h-[20px] top-3 right-1/2 translate-x-1/2 "/>
            <button 
                @click="submitFile()"
                type="button"
                class="ml-auto items-center brn btn-primary rounded-lg w-full h-[35px] sm:h-[42px]" 
                :class="{ 'cursor-not-allowed':processing }"
                >
                <template v-if="!processing" class="block">Upload file</template>
            </button>
        </div>
    </div> 
</template>

<script setup>
import { computed, watch, ref, provide } from "vue";
import xsmlImage from "/src/assets/images/lss-icon/xlsx_icon.svg"
import { admin_import_account } from "@/api_v2/user"
import { useLSSAdminLayoutStore } from "@/stores/lss-admin-layout"
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies()
const layoutStore = useLSSAdminLayoutStore();
const accessToken = cookies.get('access_token')
const showModal = ref(false)
const formData = new FormData()
const processing = ref(false)
const props = defineProps({
    showModal: Boolean,
});


const dropzoneFile = ref(null);
provide("bind[dropzoneFile]", (el) => {
    dropzoneFile.value = el;
    //a way to restrict user only upload one file at a time
    el.dropzone.on('addedfile', file => {
        const files = el.dropzone.getAcceptedFiles()
        file.previewElement.querySelector("img").src = xsmlImage;
        if (files.length > 0) el.dropzone.removeFile(files[0])
    })
});

const submitFile = ()=>{
    processing.value = true
    startWebSocketConnection(true)
}


const startWebSocketConnection =(init)=> {
    const websocket = new WebSocket(
        `${import.meta.env.VITE_APP_WEBSOCKET_URL}/ws/admin/account/import/?token=${accessToken}`
    );

    websocket.onmessage = e =>{
        const data = JSON.parse(e.data);

        if(data.type==="room_data" && init){
            const formData = new FormData()
            formData.append('file', dropzoneFile.value.dropzone.getAcceptedFiles()[0])
            formData.append('room_id',data.room_id)
            admin_import_account(formData, layoutStore.alert).then(res=>{
                console.log(res.data)
            }).catch(err=>{
                console.log('upload file error')
                websocket.close(1000);
            })
        } 

        else if(data.type==="complete_data"){
            console.log(data)
            // if(data.data.result=='complete'){
            //     location.reload()
            // }else{
            //     store.alert.showMessageToast('export_fail, please try again or contect support team.')
            // }
            // processing.value = false
            layoutStore.notification.showMessageToast(`${data.data?.detail}`)
            websocket.close(1000);
        } 

        else if(data.type==="error_data"){
            console.log(data)
            layoutStore.alert.showMessageToast(`error:${data.data?.detail}`)
            // if(data.data.result=='complete'){
            //     location.reload()
            // }else{
            //     store.alert.showMessageToast('export_fail, please try again or contect support team.')
            // }
            // processing.value = false
            // websocket.close(1000);
        } 

        else if(data.type==="success_data"){
            console.log(data)
            layoutStore.notification.showMessageToast(`success:${data.data?.username}`)
            // if(data.data.result=='complete'){
            //     location.reload()
            // }else{
            //     store.alert.showMessageToast('export_fail, please try again or contect support team.')
            // }
            // processing.value = false
            // websocket.close(1000);
        } 
    };

    websocket.onopen = e => {
        console.log('socket connected')
    };

    websocket.onclose = e => {
        if(e.code!=1000){
            startWebSocketConnection(false)
        }
        console.error('socket closed');
        processing.value = false
    };

    websocket.onerror = function(err) {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        websocket.close(1000);
    };
}



</script>

<style scoped>
.dz-preview{
	position:absolute;
	left: 50%;
	height: 100% !important;
	width: 100% !important; 
}
.dz-image {
	width: 100% !important; 
}


.dropzone :deep(.dz-details) {
    display: block !important;
  }
</style>






