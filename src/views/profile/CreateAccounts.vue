<template>
	<Modal
	backdrop="static"
		:show="showModal"
		@hidden="hide()"
	>
    <ModalHeader>
        <div class="flex flex-row justify-between w-full">
            <p class="font-medium text-base mr-auto">
                    Create Accounts by Upload excel file
            </p>
            <XIcon class="w-8 h-8 text-slate-400" @click="hide()"/>
        </div> 
        
    </ModalHeader>
    <ModalBody>
        <div class="flex flex-col">
				<div class="relative">
					<!-- <XCircleIcon class="absolute top-1 right-1 w-4 h-4 ml-2 z-index-99" style="color:red" @click="clear"/> -->
					<Dropzone ref-key="dropzoneSingleFile" :options="{
							method: 'put',
							url: 'url',
							uploadMultiple: false,
							maxFilesize: 256,
                            paramName:file,
							addRemoveLinks: true,
							autoProcessQueue: false,
							acceptedFiles: 'text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
						}" class="dropzone rounded-lg">
						<div class="flex flex-col"> 
							<div class="text-lg font-medium">
                                Drop files here or click to upload.
							</div>
                            <span> File types: csv,excel</span>
							<div class="text-gray-600">  Max size：256MB </div>  
						</div>
					</Dropzone>
				</div>
                <div class="relative mt-8">
                    <LoadingIcon  v-if="processing" icon="three-dots" color="white" class="absolute h-[30px] w-[20px] sm:w-32 mr-2 sm:mr-0 sm:h-[20px] top-3 right-1/2 translate-x-1/2 "/>
                    <button 
                        @click="submit()"
                        type="button"
                        class="ml-auto items-center brn btn-primary rounded-lg w-full h-[35px] sm:h-[42px]" 
                        :class="{ 'cursor-not-allowed':processing }"
                        >
                        <template v-if="!processing" class="block">Upload file</template>
                    </button>
                </div>
			</div> 
    </ModalBody>
	</Modal>
</template>

<script setup>
import { computed, watch, ref, provide } from "vue";
import xsmlImage from "/src/assets/images/lss-icon/xlsx_icon.svg"

const showModal = ref(false)
const formData = new FormData()
const processing = ref(false)
const props = defineProps({
    showModal: Boolean,
});

const show=()=>{ showModal.value = true, console.log('none',formData) }
const hide=()=>{ showModal.value = false, formData.forEach(element => { data => data.pop()});}
watch(computed(()=>props.showModal),show)

const dropzoneSingleFile = ref(null);
provide("bind[dropzoneSingleFile]", (el) => {
    dropzoneSingleFile.value = el;
    //a way to restrict user only upload one file at a time
    el.dropzone.on('addedfile', file => {
        const files = el.dropzone.getAcceptedFiles()
        file.previewElement.querySelector("img").src = xsmlImage;
        if (files.length > 0) el.dropzone.removeFile(files[0])
    })
});

const submit = ()=>{
    processing.value = true
    formData.append('file', dropzoneSingleFile.value.dropzone.getAcceptedFiles()[0])
    for (var pair of formData.entries()) {  console.log(pair[0]+ ', ' + pair[1]); }
    processing.value = false
    hide()
    // api(formData)
    // .then(
    //     response => {
    //         processing.value = false
    //         layoutStore.notification.showMessageToast(i18n.global.t('stock.add_product_page.create_message'))
    //     }
    // )
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


