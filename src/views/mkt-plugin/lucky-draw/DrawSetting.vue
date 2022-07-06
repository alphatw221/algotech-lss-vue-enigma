<template>
    <!-- OUTTER BOX -->
    <div class="flex flex-col h-full box text-lg overflow-y-auto p-10">
        <!-- BEGIN: commit box -->
        <h1 class="text-center"> Lucky Draw Settings</h1>

        <form class="flex flex-col">
            <div class="mt-3">
                <label for="update-profile-form-2" class="form-label">Campaign Title</label>
                <TomSelect id="update-profile-form-2" v-model="currentSettings.campaign_id">
                    <!-- Show Ongoing/Scheduled Campaign List -->
                    <option v-for="(campaign, key) in campaignList" :key="key" value="campaign_id">campaign.name
                    </option>
                </TomSelect>
            </div>
            <div class="mt-6 flex">
                <div class="w-[50%] flex flex-col mr-5">
                    <label for="update-profile-form-2" class="form-label"> Prize</label>
                    <select class="w-full form-select-lg" v-model="currentSettings.prize">
                        <option v-for="(prize, key) in prizeList" :key="key" :value="prize.value"> {{ prize.name }}
                        </option>
                    </select>
                </div>
                <div class="w-[50%] flex flex-col ml-5">
                    <label for="update-profile-form-2" class="form-label "> Spin Time(sec)</label>
                    <select class="w-full form-select-lg" v-model="currentSettings.spinTime">
                        <option v-for="(spinTime, key) in spinTimes" :key="key" :value="spinTime.value">
                            {{ spinTime.name }}</option>
                    </select>
                </div>
            </div>
            <div class="mt-6 flex">
                <div class="w-[50%] flex flex-col mr-5">
                    <label for="update-profile-form-2" class="form-label"> No. of Winners</label>
                    <input id="form-2" type="text" class="form-control" v-model="currentSettings.winners" />
                </div>
                <div class="w-[50%] flex flex-col ml-5">
                    <div class="w-full flex">
                        <label for="update-profile-form-2" class="form-label mr-auto"> Animation Style</label>
                        <a class="text-[16px]" @click="showModal = true"> + Create New Animation </a>
                    </div>
                    <div class="flex flex-wrap items-center justify-around">
                        <template v-for="(animates, key) in animationStyle" :key="key">
                            <div class="w-20 h-20 image-fit relative ">
                                <input type="radio" class="rounded-full vertical-center absolute top-0 left-0 z-50"
                                    @click="chooseAnimation(animates.value)" />
                                <Tippy tag="img" class="rounded-full" :src="animates.image" :content="`animation`" />
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <label for="update-profile-form-2" class="form-label "> Winner Repeat</label>
                <div class="flex sm:flex-row mt-2">
                    <div class="form-check mr-5">
                        <input id="radio-switch-yes" class="form-check-input" type="radio"
                            v-model="currentSettings.repeat" :value="true" />
                        <label class="form-check-label" for="radio-switch-yes">Yes</label>
                    </div>
                    <div class="form-check mr-5 mt-2 sm:mt-0">
                        <input id="radio-switch-no" class="form-check-input" type="radio"
                            v-model="currentSettings.repeat" :value="false" />
                        <label class="form-check-label" for="radio-switch-no">No</label>
                    </div>
                </div>
            </div>
            <div class="mt-6 flex">
                <div class="w-[50%] flex flex-col mr-5">
                    <label for="update-profile-form-2" class="form-label"> Draw Type</label>
                    <select class="w-full form-select-lg" v-model="currentSettings.type">
                        <option v-for="(type, key) in drawTypes" :key="key" :value="type.value"> {{ type.name }}</option>
                    </select>
                </div>
                <div v-if="currentSettings.type === 'orderCode'" 
                    class="w-[50%] flex flex-col ml-5">
                    <label for="update-profile-form-2" class="form-label "> Order Code</label>
                    <select class="w-full form-select-lg" v-model="currentSettings.comment">
                        <option v-for="(code, key) in campaignList" :key="key" :value="code.value"> code</option>
                    </select>
                </div>
                <div v-else class="w-[50%] flex flex-col ml-5">
                    <label for="update-profile-form-2" class="form-label "> Comment</label>
                    <textarea class="w-full h-14 overflow-hidden whitespace-pre-line p-1 rounded-lg "
                        v-model="currentSettings.comment" placeholder="Enter your comment...">
                    </textarea>
                </div>
            </div>
        </form>
        <div class="flex justify-end my-8">
            <button class="btn w-32 dark:border-darkmode-400" @click="router.back()"> Cancel</button>
            <button class="btn btn-primary w-32 shadow-md ml-5" @click="save"> Save</button>
        </div>

        <!-- Display Assigned Lucky Draw with For Loop -->
        <div class="box bg-secondary my-5 relative hover:border-2 border-slate-500/50">
            <div class="flex content-evenly h-fit">
                <img class="h-40 m-3 self-center" :src="currentSettings.prize.src" />
                <span class="mr-10 ml-5 inline-block align-middle self-center"> Prize_name</span>
                <div class="m-8 flex w-full justify-evenly">
                    <div class="text-left border-r-2 border-slate-700 flex flex-col w-60">
                        <span class="my-1"> happy </span>
                        <span class="text-sm text-slate-500 mr-5"> {{ currentSettings.comment }} </span>
                    </div>
                    <div class="text-left border-r-2 border-slate-700 flex flex-col w-40">
                        <span class="my-1"> {{ currentSettings.winners }} </span>
                        <div class="text-lg text-slate-500 mr-5"> winner</div>
                    </div>
                    <div class="text-left flex flex-col w-40">
                        <span v-if="currentSettings.repeat === true" class="my-1"> Yes </span>
                        <span v-else class="my-1"> No </span>
                        <span class="text-lg text-slate-500 mr-5"> Winner Repeat</span>
                    </div>
                </div>
            </div>
            <Dropdown class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white p-1 ">
                <DropdownToggle>
                    <MoreHorizontalIcon class="w-6 h-6" />
                </DropdownToggle>
                <DropdownMenu class="w-30">
                    <DropdownContent>
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Duplicate</DropdownItem>
                        <DropdownItem>Delete</DropdownItem>
                    </DropdownContent>
                </DropdownMenu>
            </Dropdown>
        </div>
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
    </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch, onMounted } from 'vue';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const route = useRoute();
const router = useRouter();
const layoutStore = useLSSSellerLayoutStore()

const showModal = ref(false)
const saved = ref(false)
const previewImage =ref(null)
const previewTitle = ref(null)
const formData = new FormData()

const currentSettings = ref({
    campaign_id: '',
    prize: {
        name: '', 
        src: ''
    },
    spinTime: 5,
    winners: 0,
    repeat: false,
    type: 'like',
    comment: '',
})

const newAnimation = ref({
    src: null,
    name: ''
})

const animationStyle = ref([]);
const campaignList = ref([]);
const spinTimes = ref([
    { value: 5, name: '5 secs' },
    { value: 10, name: '10 secs' },
    { value: 20, name: '20 secs' },
    { value: 30, name: '30 secs' },
    { value: 60, name: '60 secs' },
]);

const drawTypes = ref([
    { value: 'like', name: 'Draw Like' },
    { value: 'purchased', name: 'Draw Purchased' },
    { value: 'orderCode', name: 'Draw Order Code' },
    { value: 'comments', name: 'Draw Comments' },
]);



const save = () => {

}

const chooseAnimation = () => {

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

const submit = ()=>{
    newAnimation.value.name = previewTitle.value
	newAnimation.value.src = previewImage.value
    saved.value = true
    showModal.value = false
}

</script>

<style scoped>
</style> 