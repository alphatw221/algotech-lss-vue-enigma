<template class="body">
  <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" v-show="null">
    <li class="-mb-px last:mr-0 flex-auto text-center ml-14">
      <div @click="toggleTabs(1)" class="intro-x text-center flex items-center :mt-0 :block flex-1 z-10">
        <div class="w-32 text-base mt-1 ml-3 mx-auto text-slate-600">
          Assign
        </div>
      </div>
    </li>
    <li class="-mb-px last:mr-0 flex-auto text-center ml-14">
      <div @click="toggleTabs(2)" class="intro-x text-center flex items-center :mt-0 :block flex-1 z-10">
        <div class="w-32 text-base mt-1 ml-3 mx-auto text-slate-600">
          Delievery
        </div>
      </div>
    </li>
  </ul>
  <div class="grid grid-cols-12 box p-5 my-5 gap-2" :class="{ hidden: openTab !== 1, block: openTab === 1 }">
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
      <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
        <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto sm:flex items-center mt-2">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Category</label>
          <select id="tabulator-html-filter-field" class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto">
            <option value="name">Cloths</option>
            <option value="category">Short</option>
            <option value="remaining_stock">Snacks</option>
          </select>
        </form>
      </div>

      <div class="overflow-x-auto">
        <table class="table table-report mt-2" v-show="selectProduct">
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
        <button class="btn btn-outline-primary" @click="toggleTabs(2)">
          Next</button>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-12 box p-5 m-5" :class="{ hidden: openTab !== 2, block: openTab === 2 }">
    <span class="col-start-1 col-span-12 text-lg"> <strong>Delivery Details</strong></span>
    <div class="col-start-1 text-sm col-span-12 lg:text-[15px] 2xl:text-[16px]">
      <div class="relative">
        <u class="text-lg"> Delivery</u>
        <a class="absolute top-0 right-0 text-[15px]" @click="editDelivery = true"> Edit</a>
        <div class="flex mt-2">
          <span class="w-52"> Delivery Charge</span>
          <span> USD $20</span>
        </div>
        <div class="flex">
          <span class="w-52"> Free Delivery Charge Above</span>
          <span> USD $200</span>
        </div>
        <div class="flex">
          <span class="w-52"> Free Delivery for Minimum</span>
          <span> 10 Items</span>
        </div>
        <div class="flex flex-wrap">
          <span class="w-52">Delivery Charge Option</span>
          <div class="grid grid-cols-2">
            <span class="col-start-1 mr-3">Express Delivery </span>
            <span class="col-start-2"> ---------- USD $35</span>

            <span class="col-start-1 mr-3">Overseas </span>
            <span class="col-start-2"> ---------- USD $35</span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-1 relative">
        <u class="col-start-1 col-span-12 text-lg mt-5 mb-2"> Collect In Store</u>
        <a class="absolute top-0 right-0 text-[15px]" @click="editPickup = true"> Edit</a>
        <span class="col-start-1 col-span-12 lg:col-span-4 2xl:col-span-4"> Pickup Store/Pickup Address</span>
        <span class="col-start-1 col-span-2 lg:col-start-5  lg:col-span-1 2xl:col-start-5 2xl:col-span-1">Store 1</span>
        <span class="col-start-1 col-span-12 lg:col-start-6 lg:col-span-6 2xl:col-start-6 2xl:col-span-6">2401
          Utah Avenue South Seattle, Washington, U.S.</span>
        <span class="col-start-1 col-span-2 lg:col-start-5 lg:col-span-1 2xl:col-start-5 2xl:col-span-1">Store 2</span>
        <span class="col-start-1 col-span-12 lg:col-start-6 lg:col-span-6 2xl:col-start-6 2xl:col-span-6">2401
          Utah Avenue South Seattle, Washington, U.S.</span>
        <span class="col-start-1 col-span-2 lg:col-start-5  lg:col-span-1 2xl:col-start-5 2xl:col-span-1">Store 3</span>
        <span class="col-start-1 col-span-12 lg:col-start-6 lg:col-span-6 2xl:col-start-6 2xl:col-span-6">2401
          Utah Avenue South Seattle, Washington, U.S.</span>
      </div>
      <label for="regular-form-2" class="form-label col-start-1 col-span-1 mt-5"> Choose pickup start & end date
      </label>
      <v-date-picker class="mb-5" v-model="pickupPeriod" :timezone="timezone" mode="dateTime"
        :model-config="pickupConfig" is-range is-required>
        <template v-slot="{ inputValue, inputEvents }">
          <div class="flex justify-start ml-10 items-center">
            <input :value="inputValue.start" v-on="inputEvents.start"
              class="form-control border h-10 px-2 py-1 rounded focus:outline-none focus:border-indigo-300" />
            <ChevronsRightIcon class="w-8 h-8 m-1" />
            <input :value="inputValue.end" disabled
              class="form-control border h-10 px-2 py-1 rounded focus:outline-none focus:border-indigo-300" />
          </div>
        </template>
      </v-date-picker>
      <div class="relative">
        <u class="text-lg mt-5"> Delivery Note</u>
        <a class="absolute top-0 right-0 text-[15px]" @click="editNotes = false"> Edit</a>
        <textarea class="form-control flex w-[90%] h-48 m-5 " :readonly="editNotes ? true : null">
                Delivery NoteDelivery NoteDelivery NoteDelivery NoteDelivery NoteDelivery Note
                Delivery NoteDelivery NoteDelivery NoteDelivery NoteDelivery NoteDelivery Note
            </textarea>
        <button v-show="!editNotes" class="btn btn-rounded absolute bottom-0 right-2" @click="editNotes = true">
          Submit </button>
      </div>
    </div>
    <span class="col-span-12 text-lg"><strong>Payment Details</strong> </span>
    <div id="paymentDetails" class="col-span-12">
      <AccordionGroup class="accordion-boxed">
        <AccordionItem>
          <Accordion class="bg-primary rounded-t-lg ">
            <div class="text-white mx-3"> Direct Payment </div>
          </Accordion>
          <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary">
            <Dropzone ref-key="dropzoneValidationRef" :options="{
              url: 'https://httpbin.org/post',
              thumbnailWidth: 150,
              maxFilesize: 0.5,
              acceptedFiles: 'image/jpeg|image/png|image/jpg',
              headers: { 'My-Awesome-Header': 'header value' },
            }" class="dropzone">
              <div class="text-lg font-medium">
                Drop files here or click to upload.
              </div>
              <div class="text-gray-600">
                This is just a demo dropzone. Selected files are
                <span class="font-medium">not</span> actually uploaded.
                <br>accepted File types: jpeg, png, jpg
              </div>
            </Dropzone>
            <div class="m-3">
              <label for="regular-form-2" class="form-label">Last Five Digits</label>
              <input id="regular-form-2" type="text" class="form-control form-control" />
            </div>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <Accordion class="bg-primary rounded-t-lg">
            <div class="text-white mx-3"> HitPay </div>
          </Accordion>
          <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining
            essentially unchanged.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <Accordion class="bg-primary rounded-t-lg ">
            <div class="text-white mx-3"> First Data IPG </div>
          </Accordion>
          <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
            When you place an order, you will be taken to PayPal to complete your service.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <Accordion class="bg-primary rounded-t-lg ">
            <div class="text-white mx-3"> PayPal </div>
          </Accordion>
          <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
            When you place an order, you will be taken to PayPal to complete your service.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <Accordion class="bg-primary rounded-t-lg ">
            <div class="text-white mx-3"> Stripe </div>
          </Accordion>
          <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed border-2 border-secondary p-5">
            When you place an order, you will be taken to PayPal to complete your service.
          </AccordionPanel>
        </AccordionItem>
      </AccordionGroup>

    </div>
    <div class="col-span-12 flex justify-end mt-5 text-[#060607]">
      <button class="btn bg-[#969696] mr-5" @click="toggleTabs(1)"> Privious</button>
      <button class="btn bg-[#ED2225]" @click="this.$router.push('/seller/campaign-list')"> Save</button>

    </div>
  </div>

  <!-- Modals-->
  <Modal :show="editDelivery">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Create New Category</h2>
      <a @click="editDelivery = false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
        <XIcon class="w-8 h-8 text-slate-400" />
      </a>
    </ModalHeader>
    <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
      <div class="col-span-12">
        <label for="modal-form-1" class="form-label">Name</label>
        <input id="modal-form-1" type="text" class="form-control" placeholder="" />
      </div>
      <div class="col-span-12">
        <label for="modal-form-1" class="form-label">Name</label>
        <input id="modal-form-1" type="text" class="form-control" placeholder="" />
      </div>
      <div class="col-span-12">
        <label for="modal-form-1" class="form-label">Name</label>
        <input id="modal-form-1" type="text" class="form-control" placeholder="" />
      </div>
    </ModalBody>
    <ModalFooter>
      <button type="button" @click="editDelivery = false" class="btn btn-outline-secondary w-20 mr-1">
        Cancel
      </button>
      <button type="button" class="btn btn-primary w-20">Save</button>
    </ModalFooter>
  </Modal>

</template>

<script>
export default {
  data() {
    return {
      openTab: 1,
      selectProduct: true,
      comfirmProduct: false,
      editDelivery: false,
      editPickup: false,
      editNotes: true,
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
      pickupPeriod: {
        start: new Date(),
        end: new Date(),
      },
      pickupConfig: {
        start: {
          timeAdjust: '',
        },
        end: {
          timeAdjust: '',
        },
      },
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
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber;
    },
  }
}

</script>


<style scoped>
.body {
  font-size: 18px;
  font-weight: 500;
}
</style>
