<template>
                <table id="orderTable" class="table table-report mt-3 text-lg">
                    <thead>
                        <tr>
                            <th class="whitespace-nowrap" v-for="column in columns" :key="column.key">
                                {{ column.name }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(order, key) in store.manageOrder" :key="key" class="intro-x">
                            <td v-for="column in columns" :key="column.key">
                                <template v-if="column.key === 'platform'" class="w-40">
                                    <div class="flex place-content-center">
                                        <div v-if="order[column.key] === 'facebook'"
                                            class="w-10 h-10 image-fit">
                                            <div class="w-10 h-10 image-fit">
                                                <img src='/src/assets/images/lss-img/facebook.png' />
                                            </div>
                                        </div>
                                        <div v-else-if="order[column.key] === 'instagram'"
                                            class="w-10 h-10 image-fit">
                                            <div class="w-10 h-10 image-fit">
                                                <img src='/src/assets/images/lss-img/instagram.png' />
                                            </div>
                                        </div>
                                        <div v-else-if="order[column.key] === 'youtube'"
                                            class="w-10 h-10 image-fit">
                                            <div class="w-10 h-10 image-fit">
                                                <img src='/src/assets/images/lss-img/youtube.png' />
                                            </div>
                                        </div>
                                        <div v-else class="w-10 h-10 image-fit">
                                            <img src='/src/assets/images/lss-img/noname.png' />
                                        </div>
                                    </div>
                                </template>
                                <template v-else-if="column.key === 'view'" class="w-40">
                                    <div class="flex place-content-center">
                                        <div class="w-10 h-10 image-fit">
                                            <EyeIcon @click="to_order_detail(order.id,order.type)"/>
                                        </div>
                                    </div>
                                </template>
                                <template v-else-if="column.key === 'delivery'" class="w-40">
                                    <div class="flex place-content-center">
                                        <div class="w-10 h-10 image-fit">
                                            <TruckIcon/>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="column.key === 'name'" class="w-40">
                                        <div class="flex">
                                            <div class="w-10 h-10 image-fit zoom-in">
                                                <Tippy tag="img" class="rounded-full" :src="store.manageOrder.customer_img" />
                                            </div>
                                            <div>{{order.customer_name}}</div>
                                        </div>
                                </template>
                                <template v-else class="w-30">
                                    {{ order[column.key] }}
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
</template>
<script setup>
import { ref, provide, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useManageOrderStore } from "@/stores/lss-manage-order";
const route = useRoute();
const router = useRouter();
const store = useManageOrderStore()
const columns = ref([
    { name: 'Order Number', key: 'id' },
    { name: 'Platform', key: 'platform' },
    { name: 'Name', key: 'name' },
    { name: 'Amount', key: 'subtotal' },
    { name: 'Payment', key: 'payment_method' },
    { name: 'Status', key: 'status' },
    { name: 'View', key: 'view' },
    { name: 'Delivery Status', key: 'delivery' },
]);

function to_order_detail(order_id,type){
    store.order_type = type
    router.push(`/seller/order/${order_id}`)
}
</script>
