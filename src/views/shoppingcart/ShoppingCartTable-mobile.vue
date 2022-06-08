<template>
    <table class="table table-report -mt-5">
        <thead>
            <tr>
                <th class="whitespace-nowrap text-center" v-for="column in tableColumns" :key="column.key">
                    {{ column.name }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(product, index) in store.order.products" :key="index" class="intro-x">
                <td class="w-fit">
                    <div class="h-36 w-32 box flex flex-wrap items-center justify-center ">
                        <div class="w-28 h-28 flex-none image-fit">
                            <Tippy tag="img" class="rounded-full zoom-in" :src="storageUrl + product.image"
                                :content="product.name" />
                        </div>
                        <div class="text-lg font-bold">{{ product.name }}</div>
                    </div>
                </td>
                <td class="text-center w-fit">
                    <div class="w-32"> 
                        <table class="text-center w-32 font-bold">
                        <tr>
                            <button type="button"
                                @click="changeQuantity($event, index, product.qty, 'minus', product.order_product_id)">
                                <MinusSquareIcon class="w-5 h-5 mt-2 mr-2" />
                            </button>
                            <input type="text" class="form-control" placeholder="Input inline 1"
                                aria-label="default input" :value="product.qty" style="width: 2.7rem;"
                                @input="changeQuantity($event, index, product.qty, 'input', product.order_product_id)" />
                            <button type="button"
                                @click="changeQuantity($event, index, product.qty, 'add', product.order_product_id)">
                                <PlusSquareIcon class="w-5 h-5 mt-2 ml-2" />
                            </button>
                        </tr>
                        <tr class="flex mt-2"> <div class="mr-auto mx-2">Price</div> <div>$ {{ product.price }}</div></tr>
                        <tr class="flex"> <div class="mr-auto mx-2">Subtotal</div> <div>$ {{ product.qty * product.price }}</div></tr>
                        <tr>
                            <div class="flex justify-center items-center mt-2">
                                <a class="flex items-center text-danger"
                                    @click="deleteOrderProduct(product.order_product_id, index)">
                                    <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                                </a>
                            </div>
                        </tr>
                    </table>
                    </div>
                    
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { buyer_delete_order_product, buyer_update_order_product } from "@/api_v2/order_product"
import { list_campapign_product } from "@/api_v2/pre_order";

import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useShoppingCartStore();
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL

const tableColumns = ref([
    { key: "image", name: "", },
    { key: "product", name: "", },
])

const deleteOrderProduct = (order_product_id, index) => {
    buyer_delete_order_product(order_product_id).then(res => {
        // store.order.products.splice(index, 1);
        store.order = res.data
        list_campapign_product(route.params.pre_order_id)
            .then(
                response => {
                    store.addOnProducts = response.data
                    for (let i = 0; i < store.addOnProducts.length; i++) {
                        store.addOnProducts[i].qty = 1
                    }
                }
            )
    })
}

const changeQuantity = (event, index, qty, operation, order_product_id) => {
    if (operation == 'add' && qty < 99) {
        qty += 1
    } else if (operation == 'minus' && qty > 1) {
        qty -= 1
    } else if (operation == 'input' && event.target.value >= 1 && event.target.value <= 99) {
        qty = event.target.value
    } else if (event.target.value == '') {
        event.target.value = 1
        return
    } else {
        alert('Invalid Quantity')
        event.target.value = store.order.products[index].qty
        return
    }

    buyer_update_order_product(order_product_id, qty)
        .then(
            res => {
                store.order = res.data
            }
        ).catch(
            event.target.value = store.order.products[index].qty
        )
}
</script>

<style scoped>
td {
    height: 60px !important;
}
</style>