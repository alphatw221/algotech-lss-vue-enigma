<template>
    <table class="table table-report mt-5 overflow-y-scroll">
      <thead>
        <tr>
          <th
            class="whitespace-nowrap text-center"
            v-for="column in tableColumns"
            :key="column.key"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in store.preOrder.products" :key="index" class="intro-x">
          <td class=" h-20">
            <div class="flex">
              <div class="w-10 h-10 image-fit zoom-in">
                <Tippy
                  tag="img"
                  class="rounded-full"
                  :src="storageUrl+product.image"
                  :content="product.name"
                />
              </div>
            </div>
          </td>
          <td class="text-center h-20">
            {{ product.name }}
          </td>
          <td class="text-center h-20">
            {{ product.qty }}
          </td>
          <td class="text-center h-20">
            {{ product.price }}
          </td>
          <td class="text-center h-20">
            {{ product.qty * product.price }}
          </td>
          <td class="table-report__action w-30 h-20">
            <div class="flex justify-center items-center">
              <a class="flex items-center text-danger" @click="deleteOrderProduct(product.order_product_id, index)">
                <Trash2Icon class="w-4 h-4 mr-1" /> Delete
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script setup>

import { computed, onMounted, ref, watch } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { delete_order_product } from "@/api_v2/pre_order"
// import { useRoute, useRouter } from "vue-router";
// const route = useRoute();
const store = useShoppingCartStore(); 
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL
const tableColumns =ref( [
        { key: "image", name: " ",  },
        { key: "product", name: "Product",  },
        { key: "qty", name: "Quantity",  },
        { key: "price", name: "Price",  },
        { key: "subtotal", name: "Subtotal",  },
        { key: "remove", name: " ",  },
      ])

const deleteOrderProduct = (order_product_id, index) =>{
  delete_order_product(order_product_id).then(res=>{
    store.products.splice(index, 1);
  })
}


</script>


<style scoped>
  td{
    height: 60px !important;
  }
</style>