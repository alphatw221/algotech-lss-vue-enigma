<template>
  <div class="overflow-x-auto box">
    <table class="table table-sm">
      <thead class="table-dark">
        <tr>
          <th
            class="whitespace-nowrap"
            style=""
            v-for="column in product_columns"
            :key="column.key"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in product_results" :key="data.id">
          <td><img :src="imagePath + data.image" class="w-10" /></td>
          <td>{{ data.name }}</td>
          <td>{{ data.order_code }}</td>
          <td>{{ data.qty_sold }}/{{ data.qty_for_sale - data.qty_sold }}</td>
          <td>{{ data.currency_sign }}{{ data.price }}</td>
          <td>
            <div
              v-if="data.status === 1"
              class="
                form-check form-switch
                w-full
                sm:w-auto sm:ml-auto
                mt-3
                sm:mt-0
              "
            >
              <input
                @click="toggle"
                class="form-check-input mr-0 ml-0"
                type="checkbox"
                checked
              />
            </div>
            <div
              class="
                form-check form-switch
                w-full
                sm:w-auto sm:ml-auto
                mt-3
                sm:mt-0
              "
              v-else
            >
              <input
                @click="toggle"
                class="form-check-input mr-0 ml-0"
                type="checkbox"
              />
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
		campaignId: Number,
		requestUrl: String,
		columns: Array,
	},
	data() {
		return {
			imagePath: import.meta.env.VITE_APP_IMG_URL,
			product_columns: this.columns,
			product_results: []
		};
	},
	methods: {
		getProductData() {
			createAxiosWithBearer().get(`${this.requestUrl}${this.campaignId}`).then(response => {
				console.log(response);
				this.product_results = response;
			}).catch(function (error) {
				console.log(error);
			})
		}
	},
	mounted() {
		this.$cookies.set("access_token", 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUzODc1MzU0LCJpYXQiOjE2NTMyNzA1NTQsImp0aSI6IjZmYWFjZTY2NDIwZTQ5NTg4ZWJhM2E5ZjFjNmJmNThlIiwidXNlcl9pZCI6ODAsImRhdGEiOnsiYXV0aF91c2VyX2lkIjo4MCwic2VsbGVyX2lkIjoyNCwiY3VzdG9tZXJfaWQiOjk3LCJuYW1lIjoiRGVyZWsgSHdhbmciLCJlbWFpbCI6ImRlcmVraHdhbmczM0BnbWFpbC5jb20ifX0.JeRVYZMKkkJSywtrqvw1hb1oEYgtLqSaDx56WFJ-HKk')
		console.log("1234")
		this.getProductData()
	}
};
</script>