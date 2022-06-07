<template>
        <table class="table table-report overflow-y-scroll">
            <thead>
                <tr>
                    <th class="whitespace-normal truncate hover:text-clip items-center" v-for="column in columns" :key="column.key">
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
                                    <Tippy tag="img" class="rounded-full" :src="`${publicPath}` + product.image"
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
                            <div class="form-check mt-2 self-center place-content-center">
                                <input 
								type="text" 
								class="form-control" 
								aria-label="default input"
								:value="product.qty"
								@input="changeQuantity($event, key, 'qty_camp')"
								style="width: 4rem; height: 2rem; margin-top: 5px;"
							/>
                            </div>
                        </template>
                        <template v-else-if="column.key === 'qty_order'">
                            <div class="form-check mt-2 self-center place-content-center">
                                <input 
								type="text" 
								class="form-control" 
								aria-label="default input"
								:value="product.qty"
								@input="changeQuantity($event, key, 'qty_order')"
								style="width: 4rem; height: 2rem; margin-top: 5px;"
							/>
                            </div>
                        </template>
                        <template v-else-if="column.key === 'price'">
                            <div class="w-12">{{product.currency_sign}} {{ product[column.key] }}</div>
                        </template>
                        <template v-else-if="column.key === 'category'" v-for="tag in product['tag']">
                            <div>{{ tag }}</div>
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
import { createAxiosWithBearer } from '@/libs/axiosClient'

export default {
    props: {
        requestUrl: String,
        columns: Array,
    },
    data() {
        return {
            currentPage: 1,
            totalPage: 1,
            pageSize: 10,
            dataCount: 0,
            searchColumn: undefined,
            listItems: [],
            publicPath: import.meta.env.VITE_APP_IMG_URL,
            category: undefined,
            status: 'enabled',
        }
    },
    mounted() {
        this.search();

        this.eventBus.on("assignTable", (payload) => {
            this.currentPage = 1
            this.searchColumn = payload.searchColumn
            this.pageSize = payload.pageSize
            this.category = payload.filterColumn
            this.search()
        });

    },
    unmounted() {
        this.eventBus.off("assignTable");
    },
    methods: {
        search() {
            createAxiosWithBearer()
                .get(this.requestUrl + `?page_size=${this.pageSize}&page=${this.currentPage}&search_column=${this.searchColumn}&product_status=${this.status}&category=${this.category}`)
                .then(
                    response => {
                        if (response.data.count != undefined) {
                            this.dataCount = response.data.count
                            const totalPage = parseInt(response.data.count / this.pageSize)
                            this.totalPage = totalPage == 0 ? 1 : totalPage
                        }
                        this.listItems = response.data.results
                        console.log(this.listItems)
                    }
                ).catch(
                    error => {
                        console.log(error)
                    }
                )
        },
        changePage(page) {
            this.currentPage = page;
            this.search();
        },
        changePageSize(pageSize) {
            this.pageSize = pageSize;
            this.search();
        },
        changeQuantity(event, key, type){
            if (type == 'qty_camp' && event.target.value <= store.stock[key].qty) {
                store.stock[key].qty = store.stock[key].qty - event.target.value
                store.productsForOrder[key].qty == event.target.value
            } else if (type == 'qty_order' && event.target.value <= store.productsForOrder['qty_camp'].qty) {
                store.productsForOrder[key].qty == event.target.value
            } 
        }
    },
}
</script>