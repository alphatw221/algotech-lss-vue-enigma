<template>
  <div class="grid grid-cols-12 box p-5 my-5 gap-2">
    <span class="col-start-1 col-span-12 text-2xl font-medium leading-none mb-2">Create Campaign</span>
    <div class="col-start-1 col-span-12 2xl:col-span-6 xl:col-span-6  2xl:-mb-5 xl:-mb-5">
      <div class="flex">
        <label for="regular-form-2" class="form-label -mb-3 mr-5 w-32">Campaign Title</label>
        <input id="regular-form-2" type="text" class="form-control form-control-rounded" />
      </div>
    </div>

    <div class="col-span-12 -mb-5 2xl:col-span-6 xl:col-span-6">
      <div class="flex">
        <label for="regular-form-2" class="form-label -mb-2 w-16 ">Period</label>
        <v-date-picker class=" z-50" v-model="campaignPeriod" :timezone="timezone" mode="dateTime"
          :model-config="campaignConfig" is-range is-required>
          <template v-slot="{ inputValue, inputEvents }">
            <div class="flex justify-center items-center">
              <input :value="inputValue.start" v-on="inputEvents.start"
                class="form-control border h-10 px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300" />
              <ChevronsRightIcon class="w-8 h-8 m-1" />
              <input :value="inputValue.end" v-on="inputEvents.end" disabled
                class="form-control border h-10 px-2 py-1 w-42 rounded focus:outline-none focus:border-indigo-300" />
            </div>
          </template>
        </v-date-picker>
      </div>
      <br>
    </div>
    <div class="box mt-5 p-5 col-span-12">
      <span class="text-2xl font-medium leading-none mb-3">Assign Product</span>

      <div class="overflow-x-auto">
        <div class="intro-y col-span-12 overflow-auto lg:overflow-visible" v-show="selectProduct">
          <SearchBar :searchColumns="searchColumns" :filterColums="categorySelection" class="-mb-8" />
          <DataTable class="overflow-x-auto" :requestUrl="'/api/v2/product/search'" :columns="tableColumns" />
        </div>
        <table class="table table-report mt-2" v-show="comfirmProduct">
          <thead>
            <tr>
              <th class="whitespace-nowrap" v-for="column in add_product_columns" :key="column.key">
                <template v-if="column.key == 'select'">
                  <div class="form-check mt-2">
                    <input id="checkbox-switch-1" class="form-check-input" type="checkbox" value="" />
                  </div>
                </template>
                <template v-else-if="column.key === 'qty_for_campaign' || column.key === 'max_qty'" style="width:80px;">
                  {{ column.name }}
                </template>
                <template v-else>
                  {{ column.name }}
                </template>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, key) in add_product_results" :key="key" class="intro-x">
              <td v-for="column in add_product_columns" :key="column.key">
                <template v-if="column.key === 'select' || column.key == 'editable' || column.key == 'deletable'">
                  <div class="form-check mt-2">
                    <input id="checkbox-switch-1" class="form-check-input" type="checkbox" value="" />
                  </div>
                </template>
                <template v-else-if="column.key === 'image'" class="w-40">
                  <div class="flex">
                    <div class="w-10 h-10 image-fit zoom-in">
                      <Tippy tag="img" class="rounded-full" :src="product.image" :content="`Uploaded at`" />
                    </div>
                  </div>
                </template>
                <template v-else-if="column.key === 'qty_for_campaign' || column.key === 'max_qty'">
                  <input id="regular-form-1" type="text" class="form-control" placeholder="" style="width:100px;" />
                </template>
                <template v-else-if="column.key === 'price'">
                  $ {{ product.price }}
                </template>
                <template v-else class="w-30">
                  {{ product[column.key] }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-show="selectProduct" class="flex justify-end mt-5">
        <button class="btn btn-outline-primary mr-5" @click="this.$router.back()"> Cancel</button>
        <button class="btn btn-outline-primary" @click="selectProduct = false, comfirmProduct = true"> Next</button>
      </div>
      <div v-show="comfirmProduct" class="flex justify-end mt-5">
        <button class="btn btn-outline-primary mr-5" @click="comfirmProduct = false, selectProduct = true">
          Edit</button>
        <button class="btn btn-outline-primary" @click="this.$router.push('create-campaign/details')">
          Next</button>
      </div>
    </div>
  </div>
</template>


<script>
import SearchBar from "@/components/create-Campaign/SearchBar.vue";
import DataTable from "@/components/create-Campaign/AssignTable.vue";
import { list_category } from '@/api_v2/stock';

export default {
  components: {
    SearchBar,
    DataTable,
  },
  data() {
    return {
      selectProduct: true,
      comfirmProduct: false,
      campaignPeriod: {
        start: new Date(),
        end: new Date(),
      },
      campaignConfig: {
        start: {
          timeAdjust: '',
        },
        end: {
          timeAdjust: '',
        },
      },
      tableColumns: [
        { name: "Selected", key: "selected" },
        { name: "Image", key: "image" },
        { name: "Product Name", key: "name" },
        { name: "Order Code", key: "order_code" },
        { name: "O`ty for Campaign", key: "qty_camp" },
        { name: "Max O`ty /Order", key: "qty_order" },
        { name: "Quantity", key: "qty" },
        { name: "Price", key: "price" },
        { name: "Editable", key: "edit" },
        { name: "Deletable", key: "delete" },
        { name: "Type", key: "type" },
      ],
      categorySelection: [],
      add_product_columns: [
        { name: '', key: 'select' },
        { name: 'Image', key: 'image' },
        { name: 'Name', key: 'name' },
        { name: 'Order Code', key: 'order_code' },
        { name: 'OTY for Campaign', key: 'qty_for_campaign' },
        { name: 'Max OTY/Order', key: 'max_qty' },
        { name: 'Price', key: 'price' },
        { name: 'Editable', key: 'editable' },
        { name: 'Deletable', key: 'deletable' },
        { name: 'Type', key: 'type' },
      ],
      add_product_results: [
        {
          image: '/src/assets/images/lss-product/shirt.jpg',
          name: 'T-shirt',
          order_code: 'B1',
          qty_for_campaign: '',
          max_qty: 20,
          price: 64,
          type: 'Product'
        },
        {
          image: '/src/assets/images/lss-product/sweatshirt.jpg',
          name: 'Turtleneck Sweatshirt',
          order_code: 'B2',
          qty_for_campaign: '',
          max_qty: 20,
          price: 88,
          type: 'Product'
        },
        {
          image: '/src/assets/images/lss-product/sweatpants.jpg',
          name: 'Vintage Sweatpants',
          order_code: 'B3',
          qty_for_campaign: '',
          max_qty: 20,
          price: 59,
          type: 'Product'
        },
        {
          image: '/src/assets/images/lss-product/socks.jpg',
          name: 'Christmas Socks',
          order_code: 'B4',
          qty_for_campaign: '',
          max_qty: 20,
          price: 45,
          type: 'Product'
        }],
    }
  },
  mounted() {
    
    list_category().then(
      response => {
        this.categorySelection = response.data
      }
    )
  },
}

</script>