<template>
    <table class="table table-report mt-5 overflow-y-scroll overflow-x-auto">
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
			<tr v-for="(product, index) in store.order.products" :key="index" class="intro-x">
				<td class=" h-20 imgTd self-center">
					<div class="flex items-center self-center justify-center">
						<div class="w-10 h-10 image-fit zoom-in">
						<Tippy
							tag="img"
							class="rounded-lg"
							:src="product.image"
							:content="product.name"
              data-action="zoom"
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
					$ {{ (parseFloat(product.price).toFixed(2)).toLocaleString('en-GB') }}
				</td>
				<td class="text-center h-20">
					$ {{ (parseFloat(product.qty * product.price).toFixed(2)).toLocaleString('en-GB') }}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useLSSBuyerOrderStore } from "@/stores/lss-buyer-order";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const store = useLSSBuyerOrderStore(); 


const tableColumns = ref([
	{ key: "image", name: " ",  },
	{ key: "product", name: "Product",  },
	{ key: "qty", name: "Qty",  },
	{ key: "price", name: "Price",  },
	{ key: "subtotal", name: "Subtotal",  }
])
</script>

<style scoped>
  td{
    height: 28px !important;
	padding-left: 20px !important;
  }

  @media only screen and (max-width: 760px),
  (min-device-width: 769px) and (max-device-width: 1024px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
	padding: 0px !important;
	font-size: 15px;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border-bottom: 1px solid black;
	padding-top: 10px;
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
	  width: auto;
    padding-left: 50% !important;
    text-align: left !important;
  }
  .imgTd{
	  padding-top: 10px !important;
	  height: 50px !important;
  }

  td:before {
    position: absolute;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: bold;
  }

  td:nth-of-type(1):before {
    content: "";
    /* color: #0e9893; */
  }
  td:nth-of-type(2):before {
    content: "Product";
    /* color: #0e9893; */
  }
  td:nth-of-type(3):before {
    content: "Quantity";
    /* color: #0e9893; */
  }
  td:nth-of-type(4):before {
    content: "Price";
    /* color: #0e9893; */
  }
  td:nth-of-type(5):before {
    content: "Subtotal";
    /* color: #0e9893; */
  }
}
</style>