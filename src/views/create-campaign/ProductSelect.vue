<template>
  <div class="grid grid-cols-12 box p-5 mt-5 gap-2">
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

      <div>
        <div class="overflow-x-auto intro-y col-span-12" v-show="selectProduct">
          <SearchBar :searchColumns="searchColumns" :filterColums="categorySelection" class="-mb-8" />
          <AssignTable :columns="tableColumns" />
        </div>
        
        <table class="table-report mt-2" v-show="comfirmProduct">
        </table>
      </div>
      <div v-show="selectProduct" class="flex justify-end mt-5 -mb-5">
        <button class="btn btn-outline-primary mr-5" @click="this.$router.back()"> Cancel</button>
        <button class="btn btn-outline-primary" @click="selectProduct = false, comfirmProduct = true"> Next</button>
      </div>
      <div v-show="comfirmProduct" class="flex justify-end mt-5 -mb-5">
        <button class="btn btn-outline-primary mr-5" @click="comfirmProduct = false, selectProduct = true">
          Edit</button>
        <button class="btn btn-outline-primary" @click="this.$router.push('create-campaign/details')">
          Next</button>
      </div>
    </div>
  </div>
</template>


<script>
import { useCampaignProductsStore } from "@/stores/lss-campaign-products";
import SearchBar from "@/components/create-Campaign/SearchBar.vue";
import AssignTable from "@/components/create-Campaign/AssignTable.vue";
import { list_category } from '@/api_v2/stock';

export default {
  components: {
    SearchBar,
    AssignTable,
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