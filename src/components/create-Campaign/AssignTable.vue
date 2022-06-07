<template>
    <table class="table table-report overflow-x-scroll">
        <thead>
            <tr>
                <th class="whitespace-normal truncate hover:text-clip items-center" v-for="column in columns"
                    :key="column.key">
                    {{ column.name }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(product, key) in listItems" :key="key" class="intro-x">
                <td v-for="column in columns" :key="column.key"
                    class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center">
                    <template v-if="column.key === 'image'">
                        <div class="flex">
                            <div class="w-10 h-10 image-fit zoom-in lg:w-12 lg:h-12 2xl:w-12 lg:h-12">
                                <Tippy tag="img" class="rounded-full" :src="`${publicPath.value}` + product.image"
                                    :content="`Uploaded at`" />
                            </div>
                        </div>
                    </template>
                    <template v-else-if="column.key === 'selected'">
                        <div class="form-check mt-2 self-center place-content-center">
                            <input id="selectCheckbox" class="form-check-input" type="checkbox" value="" />
                        </div>
                    </template>
                    <template v-else-if="column.key === 'edit'">
                        <div class="form-check mt-2 self-center place-content-center">
                            <input id="editCheckbox" class="form-check-input" type="checkbox" value="" />
                        </div>
                    </template>
                    <template v-else-if="column.key === 'delete'">
                        <div class="form-check mt-2 self-center place-content-center">
                            <input id="deleteCheckbox" class="form-check-input" type="checkbox" value="" />
                        </div>
                    </template>
                    <template v-else-if="column.key === 'qty_camp'">
                        <div class="form-check self-center place-content-center">
                            <input type="text" class="form-control" aria-label="default input" :value="product.qty"
                                @input="changeQuantity($event, key, 'qty_camp')"
                                style="width: 4rem; height: 2rem; margin-top: 5px;" />
                        </div>
                    </template>
                    <template v-else-if="column.key === 'qty_order'">
                        <div class="form-check self-center place-content-center">
                            <input type="text" class="form-control" aria-label="default input" :value="product.qty"
                                @input="changeQuantity($event, key, 'qty_order')"
                                style="width: 4rem; height: 2rem; margin-top: 5px;" />
                        </div>
                    </template>
                    <template v-else-if="column.key === 'price'">
                        <div class="w-12">{{ product.currency_sign }} {{ product[column.key] }}</div>
                    </template>
                    <template v-else-if="column.key === 'name'">
                        <div class="truncate hover:text-clip lg:w-28 2xl:w-36">{{ product[column.key] }}</div>
                    </template>
                    <template v-else>
                        <div class="w-fit  self-center place-content-center"> {{ product[column.key] }} </div>
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
        <Page :total="dataCount" show-sizer @on-change="changePage" @on-page-size-change="changePageSize" />
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, defineProps, getCurrentInstance} from 'vue'
import { createAxiosWithBearer } from '@/libs/axiosClient'

const props = defineProps({
    requestUrl: String,
    columns: Array,
});

const internalInstance = getCurrentInstance();
const eventBus = internalInstance.AppContext.config.globalProperties.eventBus;

const currentPage = ref(1)
const totalPage = ref(1)
const pageSize = ref(10)
const dataCount = ref(0)
const searchColumn = ref(undefined)
const listItems = ref([])
const publicPath = ref(import.meta.env.VITE_APP_IMG_URL)
const category = ref(undefined)
const status = ref('enabled')

onMounted(() => {
    search()
    eventBus.on("assignTable", (payload) => {
        currentPage.value = 1
        searchColumn.value = payload.searchColumn
        pageSize.value = payload.pageSize
        category.value = payload.filterColumn
        search()
    });
})
onUnmounted(() => {
    eventBus.off("assignTable");
})

function search() {
    createAxiosWithBearer()
        .get(requestUrl.value + `?page_size=${pageSize.value}&page=${currentPage.value}&product_status=${status.value}&category=${category.value}`)
        .then(
            response => {
                if (response.data.count != undefined) {
                    dataCount.value = response.data.count
                    const total = parseInt(response.data.count / pageSize.value)
                    totalPage.value = total == 0 ? 1 : total
                }
                listItems.value = response.data.results
                console.log(listItems.value)
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
}

function changePage(page) {
    currentPage.value = page;
    search();
}

function changePageSize(pageSize) {
    pageSize.value = pageSize;
    search();
}

function changeQuantity(event, key, type) {
    if (type == 'qty_camp' && event.target.value <= store.stock[key].qty) {
        store.stock[key].qty = store.stock[key].qty - event.target.value
        store.productsForOrder[key].qty == event.target.value
    } else if (type == 'qty_order' && event.target.value <= store.productsForOrder['qty_camp'].qty) {
        store.productsForOrder[key].qty == event.target.value
    } else {
        alert('Invalid Quantity')
        return
    }
}
</script>