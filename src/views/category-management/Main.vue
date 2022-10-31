<template>
    <div class="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5 overflow-auto p-5 h-fit">
        <!-- TODO category選單初始畫面 請van拉圖 -->
        <!-- <div>
            
        </div> -->
        <div class="col-span-6 intro-y sm:col-span-4 md:col-span-3 2xl:col-span-2"
            @click="showCreateModal()">
            <div class="relative px-3 px-5 pt-6 pb-5 rounded-md file box sm:px-5 zoom-in">
                <PlusSquareIcon style="margin: auto; width: 7rem; height: 7rem;" />
                <div class="block mt-4 font-medium text-center truncate">
                    {{ $t('stock.category_manage.create_new_category') }}
                </div>
            </div>
        </div>

        <div v-for="productCategory, index in layoutStore.userInfo.user_subscription.product_categories" :key="index" class="col-span-6 intro-y sm:col-span-4 md:col-span-3 2xl:col-span-2">
            <div class="relative px-3 px-5 pt-8 pb-5 rounded-md file box sm:px-4">
                <div class="w-1/2 mx-auto file__icon file__icon--empty-directory"></div>
                <div class="block mt-4 font-medium text-center truncate">
                    {{ productCategory.name }}
                </div>

                <Dropdown class="absolute top-0 right-0 mt-3 ml-auto mr-2">
                    <DropdownToggle tag="a" class="block w-5 h-5" href="javascript:;">
                        <MoreVerticalIcon class="w-5 h-5 text-slate-500" />
                    </DropdownToggle>
                    <DropdownMenu class="w-40">
                        <DropdownContent>
                            <DropdownItem @click="showEditModal(productCategory, index); modalTitle='edit_title'">
                                <EditIcon class="w-4 h-4 mr-2" /> {{ $t('stock.category_manage.edit') }}
                            </DropdownItem>
                            <DropdownItem @click="deleteCategory(productCategory, index)">
                                <Trash2Icon class="w-4 h-4 mr-2 text-[#B91D1D]" /> <span class="text-[#B91D1D]">{{ $t('stock.category_manage.delete') }}</span>
                            </DropdownItem>
                        </DropdownContent>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <CreateEditModalVue :modalType="modalType"/>
    </div>
</template>

<script setup>
import { delete_product_category} from '@/api_v2/product_category'
import { onMounted, ref, computed, getCurrentInstance } from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import dom from "@left4code/tw-starter/dist/js/dom";
import i18n from "@/locales/i18n"
import { useLSSCategoryManagementStore } from "@/stores/lss-category-management"
import CreateEditModalVue from './CreateEditModal.vue';
const layoutStore = useLSSSellerLayoutStore()
const categoryManagementStore = useLSSCategoryManagementStore()

const modalType = ref('create')
const saved = ref(false)


const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;



const hideDropDown = ()=>{
  dom('.dropdown-menu').removeClass('show')
}

const showCreateModal = ()=>{
    modalType.value = 'create'
    categoryManagementStore.showCreateEditModal = true;
}

const showEditModal = (productCategory, index)=>{
    hideDropDown()
    modalType.value = 'edit'
    eventBus.emit("editProductCategory", {'product_category':productCategory, 'index':index})
    categoryManagementStore.showCreateEditModal = true;
}


const deleteCategory = (productCategory, index)=> {
    hideDropDown()
    let yes = confirm(`${i18n.global.t('stock.category_manage.confirm_delete')}`)
    if (yes) delete_product_category(productCategory.id, layoutStore.alert).then(res => { 
        layoutStore.userInfo.user_subscription?.product_categories?.splice(index,1) 
    } )
    
}

// const closeAlert = () =>{
//     if (saved.value === true) {
//         showModal.value = false;
//         layoutStore.notification.showMessageToast(i18n.global.t('stock.category_manage.save_success'))
//     } else {
//         showModal.value = false;
//         layoutStore.alert.showMessageToast(i18n.global.t('stock.category_manage.not_saved'))
//     }
//     saved.value = false
//     oldCategory.value = ''
//     categoryName.value = ''
// }
</script>