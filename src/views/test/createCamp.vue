<template class="body">
  <div class="flex items-center mt-8"></div>
  <TabGroup>
    <TabList class="nav-tabs">
      <Tab class="w-full py-2" tag="button">Example Tab 1</Tab>
      <Tab class="w-full py-2" tag="button">Example Tab 2</Tab>
    </TabList>
    <TabPanels class="border-l border-r border-b">
      <TabPanel class="leading-relaxed p-5">
        <div class="box p-10">
          <span class="text-2xl font-medium leading-none mb-3">Create Campaign</span>
          <div class="intro-y grid grid-cols-12 gap-5 mt-5">
            <div class="col-start-1 col-span-6">
              <label for="regular-form-2" class="form-label -mb-3">Campaign Title</label>
              <input id="regular-form-2" type="text" class="form-control form-control-rounded" />
            </div>
            <div class="col-span-3">
              <label for="regular-form-2" class="form-label -mb-3">Period</label>
              <Litepicker id="post-form-2" v-model="salesReportFilter" placeholder="Start" :options="{
                autoApply: false,
                showWeekNumbers: true,
                dropdowns: {
                  minYear: 1990,
                  maxYear: null,
                  months: true,
                  years: true,
                },
              }" class="form-control form-control-rounded" />
            </div>
            <div class="col-span-3">
              <label for="regular-form-2" class="form-label -mb-3">　</label>
              <Litepicker id="post-form-2" v-model="salesReportFilter" placeholder="End" :options="{
                autoApply: false,
                showWeekNumbers: true,
                dropdowns: {
                  minYear: 1990,
                  maxYear: null,
                  months: true,
                  years: true,
                },
              }" class="form-control form-control-rounded" />
            </div>
          </div>
        </div>
        <!-- Assign Product-->
        <div class="box mt-5 p-2 intro-y col-span-12 overflow-auto lg:overflow-visible">
          <span class="text-2xl font-medium leading-none mb-3">Assign Product</span>
          <div>
            <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
              <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto sm:flex items-center mt-2">
                <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Category</label>
                <select id="tabulator-html-filter-field"
                  class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto">
                  <option value="name">Cloths</option>
                  <option value="category">Short</option>
                  <option value="remaining_stock">Snacks</option>
                </select>
              </form>
            </div>

            <table class="table table-report mt-2 h-fit overflow-x-scroll">
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
                  <!--<th class="text-center whitespace-nowrap">Edit</th> -->
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
                      $ {{product.price}}
                    </template>
                    <template v-else class="w-30">
                      {{ product[column.key] }}
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </TabPanel>
      <!--Delivery-->
      <TabPanel class="leading-relaxed p-5">
        <span class="text-2xl font-medium leading-none m-10">Delivery</span>
        <div class="box p-10 mt-3 intro-y grid grid-cols-12 gap-5 my-10">
          <label for="regular-form-2" class="form-label col-start-1 col-span-3">Delivery Charge</label>
          <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-6" value="USD $20" />
          <label for="regular-form-2" class="form-label col-start-1 col-span-3">Free Delivery Charge Above</label>
          <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-6" placeholder="" />
          <label for="regular-form-2" class="form-label col-start-1 col-span-3">Free Delivery for Minimum</label>
          <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-6" placeholder="" />
          <label for="regular-form-2" class="form-label col-start-1 col-span-3">Delivery Charge Option</label>
          <div class="col-start-2 col-span-10">
            <div class="intro-y grid grid-cols-12 gap-5">
              <label for="regular-form-2" class="form-label deLable col-start-1 col-span-3 h-10">
                Express Delivery</label>
              <Dropdown class="col-span-4">
                <DropdownToggle class="btn btn-rounded-secondary relative justify-center w-full text-lg">
                  On top of delivery charge
                  <span
                    class="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-1">
                    <ChevronDownIcon class="w-4 h-4" />
                  </span>
                </DropdownToggle>
                <DropdownMenu class="w-full text-lg">
                  <DropdownContent>
                    <DropdownItem>
                      <FileTextIcon class="w-4 h-4 mr-2" />
                      On top of delivery charge
                    </DropdownItem>
                    <DropdownItem>
                      <FileTextIcon class="w-4 h-4 mr-2" />
                      Replace delivery charge
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
              <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-3 h-10"
                placeholder="" />
              <button class="btn btn-outline-danger w-24 inline-block mr-1 mb-2">
                Delete
              </button>
              <label for="regular-form-2" class="form-label deLable col-start-1 col-span-3 h-10">
                Overseas</label>
              <Dropdown class="col-span-4">
                <DropdownToggle class="btn btn-rounded-secondary relative justify-center w-full text-lg">
                  On top of delivery charge
                  <span
                    class="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-1">
                    <ChevronDownIcon class="w-4 h-4" />
                  </span>
                </DropdownToggle>
                <DropdownMenu class="w-full text-lg">
                  <DropdownContent>
                    <DropdownItem>
                      <FileTextIcon class="w-4 h-4 mr-2" />
                      On top of delivery charge
                    </DropdownItem>
                    <DropdownItem>
                      <FileTextIcon class="w-4 h-4 mr-2" />
                      Replace delivery charge
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
              <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-3"
                placeholder="" />
              <button class="btn btn-outline-danger w-24 inline-block mr-1 mb-2">
                Delete
              </button>
            </div>
          </div>
        </div>
        <span class="text-2xl font-medium leading-none m-10">Collect In Store</span>
        <div class="box intro-y grid grid-cols-8 gap-5 mt-5 p-10 ">
          <label for="regular-form-2" class="form-label col-start-1 col-span-1">Pickup Start Date</label>
          <Litepicker id="post-form-2" v-model="salesReportFilter" :options="{
            autoApply: false,
            showWeekNumbers: true,
            dropdowns: {
              minYear: 1990,
              maxYear: null,
              months: true,
              years: true,
            },
          }" class="form-control form-control-rounded col-span-3" />
          <label for="regular-form-2" class="form-label col-start-5 col-span-1">Pickup End Date</label>
          <Litepicker id="post-form-2" v-model="salesReportFilter" :options="{
            autoApply: false,
            showWeekNumbers: true,
            dropdowns: {
              minYear: 1990,
              maxYear: null,
              months: true,
              years: true,
            },
          }" class="form-control form-control-rounded col-span-3" />

          <label for="regular-form-2" class="form-label col-start-1 w-48">Pickup Store</label>
          <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-4" placeholder="" />
          <label for="regular-form-2" class="form-label col-start-1 w-48">Pickup Address</label>
          <input id="regular-form-2" type="text" class="form-control form-control-rounded col-span-6 h-10"
            placeholder="" />
          <button class="btn btn-outline-danger w-24 inline-block mr-1 mb-2">
            Delete
          </button>
        </div>
        <div class="box intro-y grid grid-cols-8 gap-5 mt-5 p-10 ">
          <label for="regular-form-2" class="form-label col-start-1 col-span-2 text-xl">Delivery Note</label>
          <textarea id="update-profile-form-5" class="form-control col-start-1 col-span-7 " placeholder="Adress">
                10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore</textarea>
        </div>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script>

export default {
  data() {
    return {
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
  }
}

</script>


<style scoped>
.body {
  font-size: 18px;
  font-weight: 500;
}

.deLable {
  height: 42px;
  border: 1px solid rgb(129, 129, 129);
  border-radius: 40px 40px;
  text-align: center;
  padding-top: 7px;
}
</style>
