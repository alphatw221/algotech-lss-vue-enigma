<template>
    <div class="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5">
        <!-- TODO category選單初始畫面 請van拉圖 -->
        <!-- <div>
            
        </div> -->
        <div 
            class="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2"
            v-for="item in listItems"
            :key="item"
        >
            <div class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative zoom-in" >
                <div class="w-3/5 file__icon file__icon--empty-directory mx-auto"></div>
                <div class="block font-medium mt-4 text-center truncate">
                    {{ item }}
                </div>
                
                <Dropdown class="absolute top-0 right-0 mr-2 mt-3 ml-auto">
                    <DropdownToggle tag="a" class="w-5 h-5 block" href="javascript:;">
                        <MoreVerticalIcon class="w-5 h-5 text-slate-500" />
                    </DropdownToggle>
                    <DropdownMenu class="w-40">
                        <DropdownContent>
                        <DropdownItem @click="showModal=true; editType='update'; oldCategory=item">
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

        <div class="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2" @click="showModal=true; editType='create'">
            <div class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative zoom-in">
                <PlusSquareIcon style="margin: auto; width: 8rem; height: 8rem;"/>
                <div class="block font-medium mt-4 text-center truncate">
                    Create New Category
                </div>
            </div>
        </div>

        <Modal :show="showModal" @hidden="showModal=false">
            <ModalBody class="p-10 text-center">
                <div class="mt-1">
                    <label for="regular-form-2" class="form-label" style="font-size: 1.2rem;">Edit Category</label>
                    <input 
                    v-if="editType=='update'"
                        id="regular-form-2" 
                        type="text" 
                        class="form-control form-control-rounded mt-3" 
                        placeholder="Category Name" 
                        v-model="oldCategory"
                    />
                    <input 
                        id="regular-form-2" 
                        type="text" 
                        class="form-control form-control-rounded mt-3" 
                        placeholder="Category Name" 
                        v-model="categoryName"
                    />
                </div>
                <button class="btn btn-secondary w-24 mr-1 mt-7">Cancel</button>
                <button class="btn btn-primary w-24 ml-7 mr-1 mt-7" @click="update">Save</button>
            </ModalBody>
        </Modal>
    </div>
</template>

<script>
import { list_category, create_category, update_category, delete_category } from '@/api/stock';

export default {
    setup() {
        
    },
    data() {
        return {
            listItems: [],
            showModal: false,
            categoryName: undefined,
            oldCategory: undefined,
            editType: 'create'
        }
    },
    mounted() {
        this.list();
    },
    methods: {
        list() {
            list_category().then(
                response => {
                    this.listItems = response.data;
                }
            )
        },
        update() {
            if (this.editType == 'create') {
                create_category(this.categoryName).then(
                    response => {
                        this.showModal = false;
                        this.list();
                    }
                )
            } else if (this.editType == 'update') {
                update_category(this.oldCategory, this.categoryName).then(
                    response => {
                        this.showModal = false;
                        this.list();
                    }
                )
            }
        },
        deleteCategory(name) {
            delete_category(name).then(
                response => {
                    this.list();
                }
            )
        }
    },
}
</script>