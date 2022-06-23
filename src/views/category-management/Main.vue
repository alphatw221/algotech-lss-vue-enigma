<template>
    <div class="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5">
        <!-- TODO category選單初始畫面 請van拉圖 -->
        <!-- <div>
            
        </div> -->
        <div class="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2" v-for="item in listItems"
            :key="item">
            <div class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-4 relative zoom-in">
                <div class="w-1/2 file__icon file__icon--empty-directory mx-auto"></div>
                <div class="block font-medium mt-4 text-center truncate">
                    {{ item }}
                </div>

                <Dropdown class="absolute top-0 right-0 mr-2 mt-3 ml-auto">
                    <DropdownToggle tag="a" class="w-5 h-5 block" href="javascript:;">
                        <MoreVerticalIcon class="w-5 h-5 text-slate-500" />
                    </DropdownToggle>
                    <DropdownMenu class="w-40">
                        <DropdownContent>
                            <DropdownItem @click="showModal = true; editType = 'update'; oldCategory = item; modalTitle='Edit Category'">
                                <EditIcon class="w-4 h-4 mr-2" /> Edit
                            </DropdownItem>
                            <DropdownItem @click="deleteCategory(item)">
                                <TrashIcon class="w-4 h-4 mr-2" /> Delete
                            </DropdownItem>
                        </DropdownContent>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>

        <div class="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2"
            @click="showModal = true; editType = 'create'; modalTitle='Create New Category'">
            <div class="file box rounded-md px-5 pt-6 pb-5 px-3 sm:px-5 relative zoom-in">
                <PlusSquareIcon style="margin: auto; width: 7rem; height: 7rem;" />
                <div class="block font-medium mt-4 text-center truncate">
                    Create New Category
                </div>
            </div>
        </div>

        <Modal :show="showModal" @hidden="closeAlert()" backdrop="static">
            <ModalBody class="p-10 text-center">
                <div class="mt-1">
                    <label for="regular-form-2" class="form-label" style="font-size: 1.2rem;">{{modalTitle}}</label>
                    <input v-if="editType == 'update'" id="regular-form-2" type="text"
                        class="form-control form-control-rounded mt-3" placeholder="Category Name" disabled
                        v-model="oldCategory" />
                    <input id="regular-form-2" type="text" class="form-control form-control-rounded mt-3"
                        placeholder="Category Name" v-model="categoryName" />
                </div>
                <button class="btn btn-secondary w-24 mr-1 mt-7" @click="showModal =false">Cancel</button>
                <button class="btn btn-primary w-24 ml-7 mr-1 mt-7" @click="update()">Save</button>
            </ModalBody>
        </Modal>
    </div>
</template>

<script setup>
import { list_product_category, create_product_category, update_product_category, delete_product_category } from '@/api_v2/product';
import { onMounted, ref } from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const layoutStore = useLSSSellerLayoutStore()
const listItems = ref([])
const showModal = ref(false)
const categoryName = ref('')
const oldCategory = ref('')
const editType = ref('create')
const saved = ref(false)
const modalTitle = ref('')

onMounted(() => {
    list();
})

const list = () => {
    list_product_category().then(
        response => {
            listItems.value = response.data;
        }
    )
}

function update(){
    if (editType.value == 'create') {
        let data = { 'category_name': categoryName.value }
        create_product_category(data).then(
            response => {
                showModal.value = false;
                saved.value = true;
                list();
            }
        )
    } else if (editType.value == 'update') {
        let data = { 'category_name': categoryName.value }
        update_product_category(oldCategory.value, data).then(
            response => {
                showModal.value = false;
                saved.value = true;
                list();
            }
        )
    }
}

function deleteCategory(name) {
    delete_product_category(name).then(
        response => {
            list();
        }
    )
}

function closeAlert() {
		if (saved.value === true) {
			showModal.value = false;
			layoutStore.notification.showMessageToast("Save Success")
		} else {
			showModal.value = false;
			layoutStore.alert.showMessageToast("Change Not Saved")
		}
		saved.value = false
        oldCategory.value = ''
        categoryName.value = ''
	}
</script>