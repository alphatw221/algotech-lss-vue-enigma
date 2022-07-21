<template>
    <table class="table table-report mt-5">
		<thead>
			<tr>
				<th
					class="whitespace-nowrap text-center"
					v-for="column in tableColumns"
					:key="column.key"
				>
				{{ $t(`order_detail.table.`+column.name) }}
				</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="(product, index) in store.order.products" :key="index" class="intro-x">
				<td class=" h-20 imgTd self-center">
					<div class="flex items-center self-center justify-center">
						<div class="flex w-24 h-24 lg:w-12 lg:h-12 2xl:x-12 2xl:h-12 image-fit zoom-in" v-if="product.image">
						<Tippy
							tag="img"
							class="rounded-lg"
							:src="storageUrl+product.image"
							:content="product.name"
              data-action="zoom"
						/>
						</div>
            <div class="flex w-24 h-24 lg:w-12 lg:h-12 2xl:x-12 2xl:h-12 image-fit zoom-in" v-else>
						<Tippy
							tag="img"
							class="rounded-lg"
							:src="storageUrl+`no_image.jpeg`"
							:content="product.name"
              data-action="zoom"
						/>
						</div>
					</div>
				</td>
				<td class="text-center h-20">
					{{ product.name }}
				</td>
				<td class="text-center h-20" :data-content="$t('order_detail.table.qty')">
					{{ product.qty }}
				</td>
				<td class="text-center h-20" :data-content="$t('order_detail.table.price')">
					$ {{ parseFloat(product.price).toFixed(2) }}
				</td>
				<td class="text-center h-20" :data-content="$t('order_detail.table.sub_total')">
					$ {{ parseFloat(product.qty * product.price).toFixed(2) }}
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
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL

const tableColumns = ref([
	{ key: "image", name: "null",  },
	{ key: "product", name: "product",  },
	{ key: "qty", name: "qty",  },
	{ key: "price", name: "price",  },
	{ key: "subtotal", name: "sub_total",  }
])
</script>

<style scoped>
  td{
    height: 28px !important;
	  padding-left: 20px !important;
  }

  @media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
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
    padding-left: 50% !important;
    text-align: left !important;
    box-shadow: none !important;
    min-height: 28px;
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
    box-shadow: none !important;
  }
  td:nth-of-type(1):before{
    display: none;
    /* color: #0e9893; */
  }
  td:nth-of-type(1){
    padding-left: 0 !important;
    min-height: 110px !important;
    /* color: #0e9893; */
  }
  td:nth-of-type(2):before {
    content: attr(data-content);
    /* color: #0e9893; */
  }
  td:nth-of-type(1):before {
    display: none;
    /* color: #0e9893; */
  }
  td:nth-of-type(3):before {
    content: attr(data-content);
    /* color: #0e9893; */
  }
  td:nth-of-type(4):before {
    content: attr(data-content);
    /* color: #0e9893; */
  }
  td:nth-of-type(5):before {
    content: attr(data-content);
    /* color: #0e9893; */
  }
}
</style>