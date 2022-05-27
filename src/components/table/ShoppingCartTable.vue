<template>
  <div>
    <table class="table table-report mt-5 overflow-y-scroll">
      <thead>
        <tr>
          <th
            class="whitespace-nowrap text-center"
            v-for="column in columns"
            :key="column.key"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, key) in listItems" :key="key" class="intro-x">
          <td class=" h-20">
            <div class="flex">
              <div class="w-10 h-10 image-fit zoom-in">
                <Tippy
                  tag="img"
                  class="rounded-full"
                  :src="product.image"
                  :content="`Uploaded at`"
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
              <a class="flex items-center text-danger" href="">
                <Trash2Icon class="w-4 h-4 mr-1" /> Delete
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { createAxiosWithBearer } from "@/libs/axiosClient";

export default {
  props: {
    requestUrl: String,
    columns: Array,
    product: Array,
  },
  data() {
    return {
      dataCount: 0,
      listItems: this.product,
      publicPath: import.meta.env.VITE_APP_IMG_URL,
    };
  },
  mounted() {},
  unmounted() {},
  computed: {},
  methods: {
    pre_order() {
      createAxiosWithBearer()
        .get(this.requestUrl)
        .then((response) => {
          this.listItems = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
  td{
    height: 60px !important;
  }
</style>