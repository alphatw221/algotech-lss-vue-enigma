<!-- <template>
    <Modal :show="showModal" @hidden="closeModal()">
    <ModalHeader>
        <h2 class="font-medium text-center"> Create New Animation </h2>
    </ModalHeader>
    <ModalBody class="flex flex-col text-center">
        <input type="text" placeholder="Title" class="rounded-lg" v-model="previewTitle"/>
        <div class="border-2 border-dashed dark:border-darkmode-400 rounded-lg mt-5 relative">
					<div class="px-4 items-center justify-center flex">
						<img :src="previewImage" class="uploading-image h-48 object-cover" />
					</div>
					<div class="px-4 pb-4 text-[16px] absolute top-16 text-center w-full flex flex-col items-center justify-center"
                v-if="previewImage === null">
						<div class="flex"> <ImageIcon class="w-8 h-8 mr-2 -mt-2 text-slate-600" /> <strong class="text-slate-600">Upload a file or drag and drop</strong> </div>
                <div class="mt-2 text-slate-500">Supported file types : gif</div>
                <div class="text-slate-500">Max file size : 2MB</div>  
					</div>
					<input
                type="file"
                class="w-full h-full top-0 left-0 absolute opacity-0 border-6 cursor-pointer"
                accept="image/jpeg" 
                @change="uploadImage"
            />
				</div>
        <div class="flex mt-5 justify-around"> 
            <button type="button" @click="showModal = false"
                class="btn btn-rounded-secondary w-20 mr-5">
                Cancel
            </button>
            <button type="button" @click="submit" 
                class="btn btn-rounded-primary w-20">
                submit
            </button>
        </div>
    </ModalBody>
</Modal>
</template>


<script setup>
const previewImage =ref(null)
const previewTitle = ref(null)
const formData = new FormData()

const newAnimation = ref({
    src: null,
    name: ''
})
const submit = ()=>{
    newAnimation.value.name = previewTitle.value
	newAnimation.value.src = previewImage.value
    saved.value = true
    showModal.value = false
}

const closeModal = () => {
    if (saved.value === true) {
        layoutStore.notification.showMessageToast("Save Success")
    } else {
        layoutStore.alert.showMessageToast("Change Not Saved")
    }
    saved.value = false
    previewImage.value = null
    previewTitle.value = null
}

const uploadImage = e =>{
	const image = e.target.files[0];
	formData.append('image', image)

	const reader = new FileReader();
	reader.readAsDataURL(image);
	reader.onload = e =>{
		previewImage.value = e.target.result;
	};
}

</script>
 -->
