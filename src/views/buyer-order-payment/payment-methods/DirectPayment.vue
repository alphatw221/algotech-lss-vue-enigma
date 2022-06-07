<template>
    <AccordionItem >
        <Accordion class="bg-primary rounded-t-lg ">
            <div class="text-white mx-3"> Direct Payment </div>
        </Accordion>

        <!-- BEGIN Direct Payment -->
        <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary">

            <!-- BEGIN Direct Payment Select -->
            <div >

                <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
                    <li class="-mb-px last:mr-0 flex-auto text-center ml-14">
                        <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
                            <button @click="toggleTabs(count)" :class="{
                                'text-neutral-600 bg-white': this.openTab !== count,
                                'text-white bg-primary': this.openTab === count,
                            }" class="w-8 h-8 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
                                1
                            </button>
                        </div>
                    </li>
                </ul>

                <div class="gird grid-cols-2 gap-5 mx-5 px-10" 
                    :class="{ hidden: this.openTab !== count, block: this.openTab === count }">
                    <table>
                        <tr>
                            <td>Country</td><td></td>
                        </tr>
                        <tr>
                            <td>Account Number</td><td></td>
                        </tr>
                        <tr>
                            <td>Account Name</td><td></td>
                        </tr>
                        <tr>
                            <td>Other Note ( Press enter to add new line )</td><td></td>
                        </tr>
                    </table>
                </div>

            </div>
            <!-- END Direct Payment Select -->
            
            <!-- acceptedFiles: 'image/jpeg|image/png|image/jpg', -->

            <Dropzone ref-key="receiptUploadDropzoneRef" :options="{
                method:'put',
                url: 'url',
                uploadMultiple:false,
                thumbnailWidth: 150,
                maxFilesize: 256,
                addRemoveLinks:true,
                autoProcessQueue:false,
                clickable:true,
                acceptedFiles: 'image/*',
            }" class="dropzone">

                <div class="text-lg font-medium">
                    Drop files here or click to upload.
                </div>
                <div class="text-gray-600">
                    <!-- This is just a demo dropzone. Selected files are
                    <span class="font-medium">not</span> actually uploaded. -->
                    <br>accepted File types: jpeg, png, jpg
                </div>
            </Dropzone>
            <div class="m-3">
                <label for="regular-form-2" class="form-label">Last Five Digits</label>
                <input id="regular-form-2" type="text" class="form-control form-control" />
                <button type="button" @click="uploadReceipt()" >Upload</button>
            </div>
        </AccordionPanel>
    </AccordionItem>

</template>

<script setup>

import { computed, onMounted, ref, watch, provide } from "vue";

import { buyer_upload_receipt } from "@/api_v2/order";

import { useRoute, useRouter } from "vue-router";


const route = useRoute();


const receiptUploadDropzoneRef = ref();

provide("bind[receiptUploadDropzoneRef]", (el) => {
    receiptUploadDropzoneRef.value = el;

    //a way to restrict user only upload one file at a time
    el.dropzone.on('addedfile',file=>{
        const files = el.dropzone.getAcceptedFiles()
        if(files.length>0) el.dropzone.removeFile(files[0])
        
    })
});

const uploadReceipt = ()=>{

    let formData = new FormData()
    formData.append('last_five_digits','12345' )
    formData.append('image',receiptUploadDropzoneRef.value.dropzone.getAcceptedFiles()[0]||null)
    buyer_upload_receipt(route.params.order_id, formData)
    .then(
        res => {



        }
    )
}


</script>
