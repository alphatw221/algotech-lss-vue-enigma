<template>
  <!-- OUTTER BOX -->
  <div
    class="intro-y chat grid grid-cols-12 gap-5"
    style="height: 100%; overflow: auto"
  >
    <!-- BEGIN: Comments -->
    <TabGroup class="col-span-12 lg:col-span-5 2xl:col-span-4">
      <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-6 w-150">
        <div class="col-start-1 col-span-5 -mt-4">
          <h2 class="text-lg font-medium">
            Comments
            <button class="p-3" @click="showTags">
              <FolderIcon />
            </button>
          </h2>
        </div>
        <div class="col-end-11 -mt-3">
          <TabList class="nav-pills">
            <Tab class="tabSelect w-8 h-8 pr-1 pl-0 mt-1" tag="button">
              <FacebookIcon class="m-1 -mt-1" />
            </Tab>
            <Tab class="tabSelect w-8 h-8 pr-1 pl-0 mt-1" tag="button">
              <InstagramIcon class="m-1 -mt-1" />
            </Tab>
            <Tab class="tabSelect w-8 h-8 pr-1 pl-0 mt-1" tag="button">
              <YoutubeIcon class="m-1 -mt-1" />
            </Tab>
          </TabList>
        </div>
        <div class="col-start-1 col-span-12 -mt-2">
          <video width="600" controls>
            <source src="mov_bbb.mp4" type="video/mp4" />
            <source src="mov_bbb.ogg" type="video/ogg" />
            Your browser does not support HTML video.
          </video>
        </div>
        <div v-show="tagBox" class="col-start-1 col-span-12 -mt-2 -mb-6">
          <button
            class="btn btn-rounded-danger w-fit m-1"
            @click="this.tags = 'Tag : # Shipping'"
          >
            <HashIcon class="w-4 h-4 mr-2" /> Shipping
          </button>
          <button
            class="btn btn-rounded-pending w-fit m-1"
            @click="this.tags = 'Tag : # Return'"
          >
            <HashIcon class="w-4 h-4 mr-2" /> Return
          </button>
          <button
            class="btn btn-rounded-warning w-fit m-1"
            @click="this.tags = 'Tag : # Size'"
          >
            <HashIcon class="w-4 h-4 mr-2" /> Size
          </button>
          <button
            class="btn btn-rounded-dark w-fit h-10 m-1"
            @click="this.tags = 'Tag : Undefined'"
          >
            <HashIcon class="w-4 h-4 mr-2" /> Undefined
          </button>
          <button
            class="btn btn-outline-none w-18"
            style="border: 0px; box-shadow: 0px"
            @click="this.tags = 'Tag : '"
          >
            <XIcon class="w-4 h-4 mr-2" /> Clean
          </button>
          <h2 class="p-2">{{ tags }}</h2>
        </div>
      </div>

      <TabPanels>
        <TabPanel>
          <div
            class="
              chat__chat-list
              box
              overflow-y-auto
              scrollbar-hidden
              pr-1
              pt-1
              mt-4
            "
          >
            <div
              v-for="(faker, fakerKey) in $_.take($f(), 10)"
              :key="fakerKey"
              class="intro-x cursor-pointer relative flex items-center p-3"
              @click="showReplyBar"
            >
              <Tippy class="rounded-full" content="Reply" theme="light">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="Midone Tailwind HTML Admin Template"
                    class="rounded-full"
                    :src="faker.photos[0]"
                  />
                  <div
                    class="
                      w-3
                      h-3
                      bg-success
                      absolute
                      right-0
                      bottom-0
                      rounded-full
                      border-2 border-white
                      dark:border-darkmode-600
                    "
                  ></div>
                </div>
              </Tippy>
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="javascript:;" class="font-medium">{{
                    faker.users[0].name
                  }}</a>
                  <div class="text-xs text-slate-400 ml-auto">
                    {{ faker.times[0] }}
                  </div>
                </div>
                <div class="w-full truncate text-slate-500 mt-0.5">
                  {{ faker.news[0].shortContent }}
                </div>
              </div>
            </div>
          </div>
          <div
            v-show="replyBar"
            class="
              pt-4
              pb-10
              sm:py-4
              flex
              items-center
              border-t border-slate-200/60
              dark:border-darkmode-400
            "
          >
            <textarea
              class="
                chat__box__input
                form-control
                dark:bg-darkmode-600
                h-16
                resize-none
                border-transparent
                px-5
                py-3
                shadow-none
                focus:border-transparent focus:ring-0
              "
              rows="1"
              placeholder="Type your message..."
            ></textarea>
            <div
              class="
                flex
                absolute
                sm:static
                left-0
                bottom-0
                ml-5
                sm:ml-0
                mb-5
                sm:mb-0
              "
            >
              <a
                href="javascript:;"
                class="
                  w-8
                  h-8
                  sm:w-10 sm:h-10
                  block
                  bg-primary
                  text-white
                  rounded-full
                  flex-none flex
                  items-center
                  justify-center
                  mx-2
                "
              >
                <SendIcon class="w-4 h-4" />
              </a>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div
            class="
              chat__chat-list
              box
              overflow-y-auto
              scrollbar-hidden
              pr-1
              pt-1
              mt-4
            "
          >
            <div
              v-for="(faker, fakerKey) in $_.take($f(), 10)"
              :key="fakerKey"
              class="intro-x cursor-pointer relative flex items-center p-3"
              @click="showReplyBar"
            >
              <Tippy class="rounded-full" content="Reply" theme="light">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="Midone Tailwind HTML Admin Template"
                    class="rounded-full"
                    :src="faker.photos[1]"
                  />
                  <div
                    class="
                      w-3
                      h-3
                      bg-success
                      absolute
                      right-0
                      bottom-0
                      rounded-full
                      border-2 border-white
                      dark:border-darkmode-600
                    "
                  ></div>
                </div>
              </Tippy>
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="javascript:;" class="font-medium">{{
                    faker.users[1].name
                  }}</a>
                  <div class="text-xs text-slate-400 ml-auto">
                    {{ faker.times[1] }}
                  </div>
                </div>
                <div class="w-full truncate text-slate-500 mt-0.5">
                  {{ faker.news[1].shortContent }}
                </div>
              </div>
            </div>
          </div>
          <div
            v-show="replyBar"
            class="
              pt-4
              pb-10
              sm:py-4
              flex
              items-center
              border-t border-slate-200/60
              dark:border-darkmode-400
            "
          >
            <textarea
              class="
                chat__box__input
                form-control
                dark:bg-darkmode-600
                h-16
                resize-none
                border-transparent
                px-5
                py-3
                shadow-none
                focus:border-transparent focus:ring-0
              "
              rows="1"
              placeholder="Type your message..."
            ></textarea>
            <div
              class="
                flex
                absolute
                sm:static
                left-0
                bottom-0
                ml-5
                sm:ml-0
                mb-5
                sm:mb-0
              "
            >
              <a
                href="javascript:;"
                class="
                  w-8
                  h-8
                  sm:w-10 sm:h-10
                  block
                  bg-primary
                  text-white
                  rounded-full
                  flex-none flex
                  items-center
                  justify-center
                  mx-2
                "
              >
                <SendIcon class="w-4 h-4" />
              </a>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div
            class="
              chat__chat-list
              box
              overflow-y-auto
              scrollbar-hidden
              pr-1
              pt-1
              mt-4
            "
          >
            <div
              v-for="(faker, fakerKey) in $_.take($f(), 10)"
              :key="fakerKey"
              class="intro-x cursor-pointer relative flex items-center p-3"
              @click="showReplyBar"
            >
              <Tippy class="rounded-full" content="Reply" theme="light">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="Midone Tailwind HTML Admin Template"
                    class="rounded-full"
                    :src="faker.photos[2]"
                  />
                  <div
                    class="
                      w-3
                      h-3
                      bg-success
                      absolute
                      right-0
                      bottom-0
                      rounded-full
                      border-2 border-white
                      dark:border-darkmode-600
                    "
                  ></div>
                </div>
              </Tippy>
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="javascript:;" class="font-medium">{{
                    faker.users[2].name
                  }}</a>
                  <div class="text-xs text-slate-400 ml-auto">
                    {{ faker.times[2] }}
                  </div>
                </div>
                <div class="w-full truncate text-slate-500 mt-0.5">
                  {{ faker.news[2].shortContent }}
                </div>
              </div>
            </div>
          </div>
          <div
            v-show="replyBar"
            class="
              pt-4
              pb-10
              sm:py-4
              flex
              items-center
              border-t border-slate-200/60
              dark:border-darkmode-400
            "
          >
            <textarea
              class="
                chat__box__input
                form-control
                dark:bg-darkmode-600
                h-16
                resize-none
                border-transparent
                px-5
                py-3
                shadow-none
                focus:border-transparent focus:ring-0
              "
              rows="1"
              placeholder="Type your message..."
            ></textarea>
            <div
              class="
                flex
                absolute
                sm:static
                left-0
                bottom-0
                ml-5
                sm:ml-0
                mb-5
                sm:mb-0
              "
            >
              <a
                href="javascript:;"
                class="
                  w-8
                  h-8
                  sm:w-10 sm:h-10
                  block
                  bg-primary
                  text-white
                  rounded-full
                  flex-none flex
                  items-center
                  justify-center
                  mx-2
                "
              >
                <SendIcon class="w-4 h-4" />
              </a>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
    <!-- END: comments -->

    <!-- BEGIN: Product -->
    <div class="col-span-12 lg:col-span-5 2xl:col-span-4" height="750px">
      <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-6">
        <row class="col-span-12" style="margin: -13px 0 -13px 0px;">
          <h2 class="text-lg font-medium w-48">Product</h2>
          <a
            href="javascript:;"
            @click="this.addProductFromStock = !this.addProductFromStock"
            class="btn btn-primary right-0"
            >Add Product From Stock</a
          >
        </row>
      </div>
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
              <td>
                {{ data.qty_sold }}/{{ data.qty_for_sale - data.qty_sold }}
              </td>
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
    </div>
    <!-- END: Product -->

    <!-- BEGIN: Incoming Order -->
    <div class="col-span-12 lg:col-span-4 2xl:col-span-4" height="750px">
      <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-6">
        <div class="col-start-1 col-span-5 -mt-4">
          <h2 class="text-lg font-medium">Incoming Order</h2>
        </div>
      </div>
      <div class="overflow-x-auto box">
        <table class="table table-sm">
          <thead class="table-dark">
            <tr>
              <th
                class="whitespace-nowrap"
                style=""
                v-for="column in incoming_order_columns"
                :key="column.key"
              >
                {{ column.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in incoming_order_results" :key="data.id">
              <td>#{{ data.id }}</td>
              <td>
                <div
                  v-if="data.platform === 'facebook'"
                  class="w-10 h-10 image-fit"
                >
                  <div class="w-10 h-10 image-fit">
                    <img src="/src/assets/images/lss-img/facebook.png" />
                  </div>
                </div>
                <div
                  v-else-if="data.platform === 'instagram'"
                  class="w-10 h-10 image-fit"
                >
                  <div class="w-10 h-10 image-fit">
                    <img src="/src/assets/images/lss-img/instagram.png" />
                  </div>
                </div>
                <div
                  v-else-if="data.platform === 'youtube'"
                  class="w-10 h-10 image-fit"
                >
                  <div class="w-10 h-10 image-fit">
                    <img src="/src/assets/images/lss-img/youtube.png" />
                  </div>
                </div>
              </td>
              <td>{{ data.customer_name }}</td>
              <td>{{ data.currency_sign }}{{ data.subtotal }}</td>
              <td>
                <EyeIcon />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- END: Incoming Order -->

    <!-- BEGIN: Add Product From Stock -->
    <Modal
      size="modal-xl"
      class="text-center"
      :slideOver="true"
      :show="addProductFromStock"
      @hidden="addProductFromStock = false"
    >
      <ModalHeader class="text-center p-5">
        <h2 class="font-medium text-base text-center">
          Add Product From Stock
        </h2>
      </ModalHeader>
      <ModalBody>
        <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
          <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
            <form
              id="tabulator-html-filter-form"
              class="xl:flex sm:mr-auto sm:flex items-center"
            >
              <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
                >Category</label
              >
              <select
                id="tabulator-html-filter-field"
                class="
                  form-select
                  w-full
                  sm:w-32
                  2xl:w-full
                  mt-2
                  sm:mt-0 sm:w-auto
                "
              >
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="remaining_stock">Remaining Stock</option>
              </select>
            </form>
          </div>

          <table class="table table-report mt-3">
            <thead>
              <tr>
                <th
                  class="whitespace-nowrap"
                  v-for="column in add_product_columns"
                  :key="column.key"
                >
                  <template v-if="column.key == 'select'">
                    <div class="form-check mt-2">
                      <input
                        id="checkbox-switch-1"
                        class="form-check-input"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </template>
                  <template
                    v-if="
                      column.key === 'qty_for_campaign' ||
                      column.key === 'max_qty'
                    "
                    style="width: 80px"
                  >
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
              <tr
                v-for="(product, key) in add_product_results"
                :key="key"
                class="intro-x"
              >
                <td v-for="column in add_product_columns" :key="column.key">
                  <template
                    v-if="
                      column.key === 'select' ||
                      column.key == 'editable' ||
                      column.key == 'deletable'
                    "
                  >
                    <div class="form-check mt-2">
                      <input
                        id="checkbox-switch-1"
                        class="form-check-input"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </template>
                  <template v-if="column.key === 'image'" class="w-40">
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
                  </template>
                  <template
                    v-if="
                      column.key === 'qty_for_campaign' ||
                      column.key === 'max_qty'
                    "
                  >
                    <input
                      id="regular-form-1"
                      type="text"
                      class="form-control"
                      placeholder=""
                      style="width: 100px"
                    />
                  </template>
                  <template v-else class="w-30">
                    {{ product[column.key] }}
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ModalBody>
    </Modal>

    <!-- END: Add Product From Stock -->
  </div>
</template>

<script>
// import {campaign_comment_summarize} from '@/api/user';
export default {
  data() {
    return {
      imagePath: import.meta.env.VITE_APP_IMG_URL,
      tags: "",
      replyBar: false,
      tagBox: false,
      addProductFromStock: false,
      add_product_columns: [
        { name: "", key: "select" },
        { name: "Image", key: "image" },
        { name: "Name", key: "name" },
        { name: "Order Code", key: "order_code" },
        { name: "OTY for Campaign", key: "qty_for_campaign" },
        { name: "Max OTY/Order", key: "max_qty" },
        { name: "Price", key: "price" },
        { name: "Editable", key: "editable" },
        { name: "Deletable", key: "deletable" },
        { name: "Type", key: "type" },
      ],
      add_product_results: [
        {
          image: "",
          name: "Box 1",
          order_code: "B1",
          qty_for_campaign: "",
          max_qty: 20,
          price: 20,
          type: "Product",
        },
        {
          image: "",
          name: "Box 2",
          order_code: "B2",
          qty_for_campaign: "",
          max_qty: 20,
          price: 20,
          type: "Product",
        },
        {
          image: "",
          name: "Box 3",
          order_code: "B3",
          qty_for_campaign: "",
          max_qty: 20,
          price: 20,
          type: "Product",
        },
        {
          image: "",
          name: "Box 4",
          order_code: "B4",
          qty_for_campaign: "",
          max_qty: 20,
          price: 20,
          type: "Product",
        },
      ],
      product_columns: [
        { name: "Image", key: "image" },
        { name: "Name", key: "name" },
        { name: "Order Code", key: "order_code" },
        { name: "Sold/Left", key: "Sold_Left" },
        { name: "Price", key: "price" },
        { name: "Activate", key: "activate" },
      ],
      product_results: [
        {
          id: 407,
          campaign_id: 155,
          created_by_id: 44,
          product_id: 53,
          qty_for_sale: 50,
          qty_sold: 4,
          name: "trousers",
          excerpt: null,
          description: null,
          content: null,
          remark: null,
          price: 950,
          price_ori: 0,
          tax: 0,
          currency: null,
          currency_sign: "$",
          points: 0,
          model: null,
          sku: null,
          upc: null,
          image: "3/product/53/6ece99405ad93e0ce091b798cea2f0f5.jpg",
          sort_order: 0,
          order_code: "tro",
          max_order_amount: 10,
          customer_removable: true,
          customer_editable: true,
          type: "product",
          status: 0,
          created_at: {
            $date: "2022-05-05T09:06:47.734Z",
          },
          updated_at: {
            $date: "2022-05-05T09:07:37.779Z",
          },
          meta: {},
          meta_logistic: {},
          tag: {},
        },
        {
          id: 7615,
          campaign_id: 441,
          created_by_id: 360,
          product_id: 628,
          qty_for_sale: 50,
          qty_sold: 13,
          name: "flower",
          excerpt: null,
          description: null,
          content: null,
          remark: null,
          price: 100,
          price_ori: 0,
          tax: 0,
          currency: null,
          currency_sign: "$",
          points: 0,
          model: null,
          sku: null,
          upc: null,
          image: "1/product/628/flower.jpg",
          sort_order: 0,
          order_code: "fl",
          max_order_amount: 10,
          customer_removable: true,
          customer_editable: true,
          type: "product",
          status: 1,
          created_at: {
            $date: "2022-05-23T04:30:46.484Z",
          },
          updated_at: {
            $date: "2022-05-23T04:40:22.857Z",
          },
          meta: {},
          meta_logistic: {},
          tag: {},
        },
        {
          id: 7614,
          campaign_id: 441,
          created_by_id: 360,
          product_id: 630,
          qty_for_sale: 50,
          qty_sold: 3,
          name: "chocolate",
          excerpt: null,
          description: null,
          content: null,
          remark: null,
          price: 250,
          price_ori: 0,
          tax: 0,
          currency: null,
          currency_sign: "$",
          points: 0,
          model: null,
          sku: null,
          upc: null,
          image: "1/product/630/chocolate.jpg",
          sort_order: 0,
          order_code: "choco",
          max_order_amount: 10,
          customer_removable: true,
          customer_editable: true,
          type: "product",
          status: 1,
          created_at: {
            $date: "2022-05-23T04:30:41.248Z",
          },
          updated_at: {
            $date: "2022-05-23T04:40:21.946Z",
          },
          meta: {},
          meta_logistic: {},
          tag: {},
        },
        {
          id: 7613,
          campaign_id: 441,
          created_by_id: 360,
          product_id: 633,
          qty_for_sale: 50,
          qty_sold: 13,
          name: "vitamin C",
          excerpt: null,
          description: null,
          content: null,
          remark: null,
          price: 1600,
          price_ori: 0,
          tax: 0,
          currency: null,
          currency_sign: "$",
          points: 0,
          model: null,
          sku: null,
          upc: null,
          image: "1/product/633/C.png",
          sort_order: 0,
          order_code: "c",
          max_order_amount: 10,
          customer_removable: true,
          customer_editable: true,
          type: "product",
          status: 1,
          created_at: {
            $date: "2022-05-23T04:30:30.564Z",
          },
          updated_at: {
            $date: "2022-05-23T04:40:21.364Z",
          },
          meta: {},
          meta_logistic: {},
          tag: {},
        },
        {
          id: 7612,
          campaign_id: 441,
          created_by_id: 360,
          product_id: 643,
          qty_for_sale: 50,
          qty_sold: 6,
          name: "guava",
          excerpt: null,
          description: null,
          content: null,
          remark: null,
          price: 10,
          price_ori: 0,
          tax: 0,
          currency: null,
          currency_sign: "$",
          points: 0,
          model: null,
          sku: null,
          upc: null,
          image: "1/product/643/guava.jpg",
          sort_order: 0,
          order_code: "g",
          max_order_amount: 10,
          customer_removable: true,
          customer_editable: true,
          type: "product",
          status: 1,
          created_at: {
            $date: "2022-05-23T04:30:22.449Z",
          },
          updated_at: {
            $date: "2022-05-23T04:40:20.652Z",
          },
          meta: {},
          meta_logistic: {},
          tag: {},
        },
        {
          id: 7610,
          campaign_id: 440,
          created_by_id: 360,
          product_id: 631,
          qty_for_sale: 50,
          qty_sold: 3,
          name: "prize cookie",
          excerpt: null,
          description: null,
          content: null,
          remark: null,
          price: 150,
          price_ori: 0,
          tax: 0,
          currency: null,
          currency_sign: "$",
          points: 0,
          model: null,
          sku: null,
          upc: null,
          image: "1/product/631/prize cookie.jpg",
          sort_order: 0,
          order_code: "coo",
          max_order_amount: 10,
          customer_removable: true,
          customer_editable: true,
          type: "lucky_draw",
          status: 1,
          created_at: {
            $date: "2022-05-20T06:14:38.016Z",
          },
          updated_at: {
            $date: "2022-05-20T06:15:07.645Z",
          },
          meta: {},
          meta_logistic: {},
          tag: {},
        }
      ],
      incoming_order_columns: [
        { name: "Order No", key: "order_no" },
        { name: "Platform", key: "platform" },
        { name: "Name", key: "name" },
        { name: "Amount", key: "amount" },
        { name: "Detail", key: "detail" },
      ],
      incoming_order_results: [
        {
          id: 801,
          campaign_id: 440,
          customer_id: "4715244265240387",
          customer_name: "Chiangcheng Lien",
          customer_img:
            "https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=4715244265240387&height=50&width=50&ext=1655619700&hash=AeS_9qc2HVOMIfvys18",
          email: null,
          phone: null,
          first_name: null,
          last_name: null,
          gender: null,
          remark: null,
          subtotal: 3200,
          total: 3200,
          currency: null,
          currency_sign: "$",
          cost: 0,
          cost_currency: null,
          cost_currency_sign: "$",
          payment_first_name: "",
          payment_last_name: "",
          payment_gender: "",
          payment_company: "",
          payment_postcode: "",
          payment_region: "",
          payment_location: "",
          payment_address_1: "",
          payment_address_2: "",
          payment_method: "",
          payment_status: "",
          payment_remark: "",
          paid_at: null,
          shipping_cost: 0,
          shipping_first_name: "",
          shipping_last_name: "",
          shipping_email: "",
          shipping_phone: "",
          shipping_gender: "",
          shipping_company: "",
          shipping_postcode: "",
          shipping_region: "",
          shipping_location: "",
          shipping_address_1: "",
          shipping_address_2: "",
          shipping_method: "",
          shipping_status: "",
          shipping_details: "",
          shipping_remark: "",
          shipping_date: null,
          shipping_time: null,
          tracking: "",
          platform: "facebook",
          platform_id: 1,
          type: null,
          status: "review",
          created_at: {
            $date: "2022-05-20T06:21:45.512Z",
          },
          updated_at: null,
          meta: {},
          products: {
            7609: {
              order_product_id: 252822,
              name: "vitamin C",
              image: "1/product/633/C.png",
              price: 1600,
              type: "product",
              currency: null,
              currency_sign: "$",
              qty: 2,
              subtotal: 3200,
            },
          },
          checkout_details: {},
          history: {},
          lock_at: {
            $date: "2022-05-20T06:24:38.529Z",
          },
          adjust_title: null,
          adjust_price: 0,
          free_delivery: false,
          buyer_id: null,
        },
        {
          id: 804,
          campaign_id: 441,
          customer_id: "c22_ce",
          customer_name: "c22_ce",
          customer_img: "",
          email: null,
          phone: null,
          first_name: null,
          last_name: null,
          gender: null,
          remark: null,
          subtotal: 1500,
          total: 0,
          currency: null,
          currency_sign: "$",
          cost: 0,
          cost_currency: null,
          cost_currency_sign: "$",
          payment_first_name: "",
          payment_last_name: "",
          payment_gender: "",
          payment_company: "",
          payment_postcode: "",
          payment_region: "",
          payment_location: "",
          payment_address_1: "",
          payment_address_2: "",
          payment_method: "",
          payment_status: "",
          payment_remark: "",
          paid_at: null,
          shipping_cost: 80,
          shipping_first_name: "KK",
          shipping_last_name: "W",
          shipping_email: "mbrw19@gmail.com",
          shipping_phone: "fff",
          shipping_gender: "",
          shipping_company: "",
          shipping_postcode: "691",
          shipping_region: "無",
          shipping_location: "花蓮市",
          shipping_address_1: "花蓮市中正路",
          shipping_address_2: "",
          shipping_method: "delivery",
          shipping_status: "",
          shipping_details: "",
          shipping_remark: "",
          shipping_date: null,
          shipping_time: null,
          tracking: "",
          platform: "instagram",
          platform_id: 3,
          type: null,
          status: "review",
          created_at: {
            $date: "2022-05-23T05:53:43.920Z",
          },
          updated_at: {
            $date: "2022-05-23T05:56:51.815Z",
          },
          meta: {},
          products: {},
          checkout_details: {},
          history: {},
          lock_at: {
            $date: "2022-05-23T05:55:02.225Z",
          },
          adjust_title: "",
          adjust_price: 0,
          free_delivery: false,
          buyer_id: null,
        },
        {
          id: 803,
          campaign_id: 441,
          customer_id: "4558136927628885",
          customer_name: "Cecilia W",
          customer_img:
            "https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=4558136927628885&height=50&width=50&ext=1655875693&hash=AeQ7zZCkBqVDP8lzuHI",
          email: null,
          phone: null,
          first_name: null,
          last_name: null,
          gender: null,
          remark: null,
          subtotal: 1545,
          total: 0,
          currency: null,
          currency_sign: "$",
          cost: 0,
          cost_currency: null,
          cost_currency_sign: "$",
          payment_first_name: "",
          payment_last_name: "",
          payment_gender: "",
          payment_company: "",
          payment_postcode: "",
          payment_region: "",
          payment_location: "",
          payment_address_1: "",
          payment_address_2: "",
          payment_method: "",
          payment_status: "",
          payment_remark: "",
          paid_at: null,
          shipping_cost: 80,
          shipping_first_name: "33",
          shipping_last_name: "ff",
          shipping_email: "mbrw19@gmail.com",
          shipping_phone: "ff",
          shipping_gender: "",
          shipping_company: "",
          shipping_postcode: "789",
          shipping_region: "456",
          shipping_location: "123",
          shipping_address_1: "gg",
          shipping_address_2: "",
          shipping_method: "delivery",
          shipping_status: "",
          shipping_details: "",
          shipping_remark: "",
          shipping_date: null,
          shipping_time: null,
          tracking: "",
          platform: "facebook",
          platform_id: 1,
          type: null,
          status: "review",
          created_at: {
            $date: "2022-05-23T05:28:21.668Z",
          },
          updated_at: {
            $date: "2022-05-23T10:56:31.264Z",
          },
          meta: {},
          products: {},
          checkout_details: {},
          history: {},
          lock_at: null,
          adjust_title: "",
          adjust_price: 0,
          free_delivery: false,
          buyer_id: null,
        },
        {
          id: 802,
          campaign_id: 441,
          customer_id: "UCO838o9QQAsYMQPd2U63rWQ",
          customer_name: "Cecilia Weng",
          customer_img:
            "https://yt3.ggpht.com/ytc/AKedOLQOu8R4cmwsI8djmFZ8uASWgElSavxttOf0NvuQaBLMv19FYpXkOtmWT4CU1hG3=s88-c-k-c0x00ffffff-no-rj",
          email: null,
          phone: null,
          first_name: null,
          last_name: null,
          gender: null,
          remark: null,
          subtotal: 500,
          total: 0,
          currency: null,
          currency_sign: "$",
          cost: 0,
          cost_currency: null,
          cost_currency_sign: "$",
          payment_first_name: "",
          payment_last_name: "",
          payment_gender: "",
          payment_company: "",
          payment_postcode: "",
          payment_region: "",
          payment_location: "",
          payment_address_1: "",
          payment_address_2: "",
          payment_method: "",
          payment_status: "",
          payment_remark: "",
          paid_at: null,
          shipping_cost: 0,
          shipping_first_name: "Cece",
          shipping_last_name: "c",
          shipping_email: "mbrw19@gmail.com",
          shipping_phone: "09000",
          shipping_gender: "",
          shipping_company: "",
          shipping_postcode: "",
          shipping_region: "",
          shipping_location: "",
          shipping_address_1: "",
          shipping_address_2: "",
          shipping_method: "in_store",
          shipping_status: "",
          shipping_details: "",
          shipping_remark: "kk",
          shipping_date: null,
          shipping_time: null,
          tracking: "",
          platform: "youtube",
          platform_id: 11,
          type: null,
          status: "review",
          created_at: {
            $date: "2022-05-23T04:55:32.491Z",
          },
          updated_at: {
            $date: "2022-05-23T05:50:54.544Z",
          },
          meta: {},
          products: {},
          checkout_details: {},
          history: {},
          lock_at: {
            $date: "2022-05-23T05:43:53.512Z",
          },
          adjust_title: "",
          adjust_price: 0,
          free_delivery: false,
          buyer_id: null,
        },
        {
          id: 800,
          campaign_id: 440,
          customer_id: "5077425909042957",
          customer_name: "Nicole Chen",
          customer_img:
            "https://scontent.ftpe8-1.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c15.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=12b3be&_nc_ohc=23vCQ5EX8ugAX84DxEC&_nc_ht=scontent.ftpe8-1.fna&edm=AIjQbYoEAAAA&oh=00_AT_uoNGBAw-2h2Lw3fhRoO4QCHTqXzYZW6K4buDbJRavtg&oe=62ACB719",
          email: null,
          phone: null,
          first_name: null,
          last_name: null,
          gender: null,
          remark: null,
          subtotal: 250,
          total: 260,
          currency: null,
          currency_sign: "$",
          cost: 0,
          cost_currency: null,
          cost_currency_sign: "$",
          payment_first_name: "",
          payment_last_name: "",
          payment_gender: "",
          payment_company: "",
          payment_postcode: "",
          payment_region: "",
          payment_location: "",
          payment_address_1: "",
          payment_address_2: "",
          payment_method: "",
          payment_status: "",
          payment_remark: "",
          paid_at: null,
          shipping_cost: 10,
          shipping_first_name: "Yuyu",
          shipping_last_name: "Chen",
          shipping_email: "yuyuchen@accoladeglobal.com",
          shipping_phone: "123465",
          shipping_gender: "",
          shipping_company: "",
          shipping_postcode: "15484",
          shipping_region: "8644",
          shipping_location: "78798",
          shipping_address_1: "789879798",
          shipping_address_2: "",
          shipping_method: "delivery",
          shipping_status: "",
          shipping_details: "",
          shipping_remark: "",
          shipping_date: null,
          shipping_time: null,
          tracking: "",
          platform: "facebook",
          platform_id: 1,
          type: null,
          status: "review",
          created_at: {
            $date: "2022-05-20T06:19:21.422Z",
          },
          updated_at: {
            $date: "2022-05-20T06:23:59.551Z",
          },
          meta: {},
          products: {
            7606: {
              order_product_id: 252828,
              name: "chocolate",
              image: "1/product/630/chocolate.jpg",
              price: 250,
              type: "product",
              currency: null,
              currency_sign: "$",
              qty: 1,
              subtotal: 250,
            },
          },
          checkout_details: {},
          history: {},
          lock_at: {
            $date: "2022-05-20T06:30:58.987Z",
          },
          adjust_title: "",
          adjust_price: 0,
          free_delivery: false,
          buyer_id: null,
        },
        {
          id: 799,
          campaign_id: 440,
          customer_id: "4422762234485468",
          customer_name: "Yi-Hsueh Lin",
          customer_img:
            "https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=4422762234485468&height=50&width=50&ext=1655619504&hash=AeQM1mo6_gTsGDu_9Gc",
          email: null,
          phone: null,
          first_name: null,
          last_name: null,
          gender: null,
          remark: null,
          subtotal: 3200,
          total: 3215,
          currency: null,
          currency_sign: "$",
          cost: 0,
          cost_currency: null,
          cost_currency_sign: "$",
          payment_first_name: "",
          payment_last_name: "",
          payment_gender: "",
          payment_company: "",
          payment_postcode: "",
          payment_region: "",
          payment_location: "",
          payment_address_1: "",
          payment_address_2: "",
          payment_method: "",
          payment_status: "",
          payment_remark: "",
          paid_at: null,
          shipping_cost: 15,
          shipping_first_name: "test",
          shipping_last_name: "test",
          shipping_email: "alphatw22193@gmail.com",
          shipping_phone: "123",
          shipping_gender: "",
          shipping_company: "",
          shipping_postcode: "test",
          shipping_region: "test",
          shipping_location: "test",
          shipping_address_1: "test",
          shipping_address_2: "",
          shipping_method: "delivery",
          shipping_status: "",
          shipping_details: "",
          shipping_remark: "",
          shipping_date: null,
          shipping_time: null,
          tracking: "",
          platform: "facebook",
          platform_id: 1,
          type: null,
          status: "review",
          created_at: {
            $date: "2022-05-20T06:18:29.944Z",
          },
          updated_at: {
            $date: "2022-05-20T06:25:04.673Z",
          },
          meta: {
            is_in_store_pickup: false,
            pick_up_store: "",
            pick_up_store_address: "",
            pick_up_date: "",
            subtotal_over_free_delivery_threshold: true,
          },
          products: {
            7609: {
              order_product_id: 252817,
              name: "vitamin C",
              image: "1/product/633/C.png",
              price: 1600,
              type: "product",
              currency: null,
              currency_sign: "$",
              qty: 2,
              subtotal: 3200,
            },
            7610: {
              order_product_id: 252825,
              name: "prize cookie",
              image: "1/product/631/prize cookie.jpg",
              price: 0,
              type: "lucky_draw",
              currency: null,
              currency_sign: "$",
              qty: 1,
              subtotal: 0,
            },
          },
          checkout_details: {},
          history: {},
          lock_at: null,
          adjust_title: null,
          adjust_price: 0,
          free_delivery: false,
          buyer_id: null,
        },
        {
          id: 798,
          campaign_id: 440,
          customer_id: "UCO838o9QQAsYMQPd2U63rWQ",
          customer_name: "Cecilia Weng",
          customer_img:
            "https://yt3.ggpht.com/ytc/AKedOLQOu8R4cmwsI8djmFZ8uASWgElSavxttOf0NvuQaBLMv19FYpXkOtmWT4CU1hG3=s88-c-k-c0x00ffffff-no-rj",
          email: null,
          phone: null,
          first_name: null,
          last_name: null,
          gender: null,
          remark: null,
          subtotal: 560,
          total: 560,
          currency: null,
          currency_sign: "$",
          cost: 0,
          cost_currency: null,
          cost_currency_sign: "$",
          payment_first_name: "",
          payment_last_name: "",
          payment_gender: "",
          payment_company: "",
          payment_postcode: "",
          payment_region: "",
          payment_location: "",
          payment_address_1: "",
          payment_address_2: "",
          payment_method: "",
          payment_status: "",
          payment_remark: "",
          paid_at: null,
          shipping_cost: 0,
          shipping_first_name: "",
          shipping_last_name: "",
          shipping_email: "",
          shipping_phone: "",
          shipping_gender: "",
          shipping_company: "",
          shipping_postcode: "",
          shipping_region: "",
          shipping_location: "",
          shipping_address_1: "",
          shipping_address_2: "",
          shipping_method: "",
          shipping_status: "",
          shipping_details: "",
          shipping_remark: "",
          shipping_date: null,
          shipping_time: null,
          tracking: "",
          platform: "youtube",
          platform_id: 11,
          type: null,
          status: "review",
          created_at: {
            $date: "2022-05-20T06:17:29.236Z",
          },
          updated_at: null,
          meta: {},
          products: {
            7606: {
              order_product_id: 252815,
              name: "chocolate",
              image: "1/product/630/chocolate.jpg",
              price: 250,
              type: "product",
              currency: null,
              currency_sign: "$",
              qty: 1,
              subtotal: 250,
            },
            7607: {
              order_product_id: 252811,
              name: "bag",
              image: "1/product/632/bag.jpg",
              price: 300,
              type: "product",
              currency: null,
              currency_sign: "$",
              qty: 1,
              subtotal: 300,
            },
            7608: {
              order_product_id: 252812,
              name: "candy",
              image: "1/product/629/candy.jpg",
              price: 10,
              type: "product",
              currency: null,
              currency_sign: "$",
              qty: 1,
              subtotal: 10,
            },
            7610: {
              order_product_id: 252826,
              name: "prize cookie",
              image: "1/product/631/prize cookie.jpg",
              price: 0,
              type: "lucky_draw",
              currency: null,
              currency_sign: "$",
              qty: 1,
              subtotal: 0,
            },
          },
          checkout_details: {},
          history: {},
          lock_at: null,
          adjust_title: null,
          adjust_price: 0,
          free_delivery: false,
          buyer_id: null,
        },
        {
          id: 797,
          campaign_id: 440,
          customer_id: "c22_ce",
          customer_name: "c22_ce",
          customer_img: "",
          email: null,
          phone: null,
          first_name: null,
          last_name: null,
          gender: null,
          remark: null,
          subtotal: 950,
          total: 0,
          currency: null,
          currency_sign: "$",
          cost: 0,
          cost_currency: null,
          cost_currency_sign: "$",
          payment_first_name: "",
          payment_last_name: "",
          payment_gender: "",
          payment_company: "",
          payment_postcode: "",
          payment_region: "",
          payment_location: "",
          payment_address_1: "",
          payment_address_2: "",
          payment_method: "",
          payment_status: "",
          payment_remark: "",
          paid_at: null,
          shipping_cost: 0,
          shipping_first_name: "22",
          shipping_last_name: "33",
          shipping_email: "mbrw19@gmail.com",
          shipping_phone: "gg",
          shipping_gender: "",
          shipping_company: "",
          shipping_postcode: "",
          shipping_region: "",
          shipping_location: "",
          shipping_address_1: "",
          shipping_address_2: "",
          shipping_method: "in_store",
          shipping_status: "",
          shipping_details: "",
          shipping_remark: "",
          shipping_date: null,
          shipping_time: null,
          tracking: "",
          platform: "instagram",
          platform_id: 3,
          type: null,
          status: "review",
          created_at: {
            $date: "2022-05-20T06:16:41.844Z",
          },
          updated_at: {
            $date: "2022-05-20T06:24:57.027Z",
          },
          meta: {},
          products: {},
          checkout_details: {},
          history: {},
          lock_at: {
            $date: "2022-05-20T06:22:02.383Z",
          },
          adjust_title: "",
          adjust_price: 0,
          free_delivery: false,
          buyer_id: null,
        },
        {
          id: 796,
          campaign_id: 440,
          customer_id: "4558136927628885",
          customer_name: "Cecilia W",
          customer_img:
            "https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=4558136927628885&height=50&width=50&ext=1655619371&hash=AeT4aGJVWNvSFXrCnYo",
          email: null,
          phone: null,
          first_name: null,
          last_name: null,
          gender: null,
          remark: null,
          subtotal: 320,
          total: 335,
          currency: null,
          currency_sign: "$",
          cost: 0,
          cost_currency: null,
          cost_currency_sign: "$",
          payment_first_name: "",
          payment_last_name: "",
          payment_gender: "",
          payment_company: "",
          payment_postcode: "",
          payment_region: "",
          payment_location: "",
          payment_address_1: "",
          payment_address_2: "",
          payment_method: "",
          payment_status: "",
          payment_remark: "",
          paid_at: null,
          shipping_cost: 15,
          shipping_first_name: "XX",
          shipping_last_name: "CeCe",
          shipping_email: "mbrw19@gmail.com",
          shipping_phone: "090000",
          shipping_gender: "",
          shipping_company: "",
          shipping_postcode: "33",
          shipping_region: "123",
          shipping_location: "123",
          shipping_address_1: "123",
          shipping_address_2: "",
          shipping_method: "delivery",
          shipping_status: "",
          shipping_details: "",
          shipping_remark: "",
          shipping_date: null,
          shipping_time: null,
          tracking: "",
          platform: "facebook",
          platform_id: 1,
          type: null,
          status: "review",
          created_at: {
            $date: "2022-05-20T06:16:16.770Z",
          },
          updated_at: {
            $date: "2022-05-20T10:35:08.330Z",
          },
          meta: {},
          products: {
            7607: {
              order_product_id: 252832,
              name: "bag",
              image: "1/product/632/bag.jpg",
              price: 300,
              type: "product",
              currency: null,
              currency_sign: "$",
              qty: 1,
              subtotal: 300,
            },
            7611: {
              order_product_id: 252836,
              name: "test",
              image: null,
              price: 20,
              type: "product-fast",
              currency: null,
              currency_sign: "$",
              qty: 1,
              subtotal: 20,
            },
          },
          checkout_details: {},
          history: {},
          lock_at: {
            $date: "2022-05-23T05:19:27.406Z",
          },
          adjust_title: "",
          adjust_price: 0,
          free_delivery: false,
          buyer_id: null,
        },
        {
          id: 795,
          campaign_id: 440,
          customer_id: "bl_233",
          customer_name: "bl_233",
          customer_img: "",
          email: null,
          phone: null,
          first_name: null,
          last_name: null,
          gender: null,
          remark: null,
          subtotal: 3450,
          total: 3450,
          currency: null,
          currency_sign: "$",
          cost: 0,
          cost_currency: null,
          cost_currency_sign: "$",
          payment_first_name: "",
          payment_last_name: "",
          payment_gender: "",
          payment_company: "",
          payment_postcode: "",
          payment_region: "",
          payment_location: "",
          payment_address_1: "",
          payment_address_2: "",
          payment_method: "",
          payment_status: "",
          payment_remark: "",
          paid_at: null,
          shipping_cost: 0,
          shipping_first_name: "",
          shipping_last_name: "",
          shipping_email: "",
          shipping_phone: "",
          shipping_gender: "",
          shipping_company: "",
          shipping_postcode: "",
          shipping_region: "",
          shipping_location: "",
          shipping_address_1: "",
          shipping_address_2: "",
          shipping_method: "",
          shipping_status: "",
          shipping_details: "",
          shipping_remark: "",
          shipping_date: null,
          shipping_time: null,
          tracking: "",
          platform: "instagram",
          platform_id: 3,
          type: null,
          status: "review",
          created_at: {
            $date: "2022-05-20T06:15:38.121Z",
          },
          updated_at: null,
          meta: {},
          products: {
            7606: {
              order_product_id: 252804,
              name: "chocolate",
              image: "1/product/630/chocolate.jpg",
              price: 250,
              type: "product",
              currency: null,
              currency_sign: "$",
              qty: 1,
              subtotal: 250,
            },
            7609: {
              order_product_id: 252803,
              name: "vitamin C",
              image: "1/product/633/C.png",
              price: 1600,
              type: "product",
              currency: null,
              currency_sign: "$",
              qty: 2,
              subtotal: 3200,
            },
          },
          checkout_details: {},
          history: {},
          lock_at: null,
          adjust_title: null,
          adjust_price: 0,
          free_delivery: false,
          buyer_id: null,
        },
        {
          id: 794,
          campaign_id: 440,
          customer_id: "UCMvKW4FZPr4irFZ_VME2w1g",
          customer_name: "Nivea Chen",
          customer_img:
            "https://yt3.ggpht.com/ytc/AKedOLQqdiNeR4pSCk0e7xSPgdtYUrEB6L5SZCJg2eZVjsy82u37QIk_wtxnUmLu0aRu=s88-c-k-c0x00ffffff-no-rj",
          email: null,
          phone: null,
          first_name: null,
          last_name: null,
          gender: null,
          remark: null,
          subtotal: 1600,
          total: 1600,
          currency: null,
          currency_sign: "$",
          cost: 0,
          cost_currency: null,
          cost_currency_sign: "$",
          payment_first_name: "",
          payment_last_name: "",
          payment_gender: "",
          payment_company: "",
          payment_postcode: "",
          payment_region: "",
          payment_location: "",
          payment_address_1: "",
          payment_address_2: "",
          payment_method: "",
          payment_status: "",
          payment_remark: "",
          paid_at: null,
          shipping_cost: 0,
          shipping_first_name: "",
          shipping_last_name: "",
          shipping_email: "",
          shipping_phone: "",
          shipping_gender: "",
          shipping_company: "",
          shipping_postcode: "",
          shipping_region: "",
          shipping_location: "",
          shipping_address_1: "",
          shipping_address_2: "",
          shipping_method: "",
          shipping_status: "",
          shipping_details: "",
          shipping_remark: "",
          shipping_date: null,
          shipping_time: null,
          tracking: "",
          platform: "youtube",
          platform_id: 11,
          type: null,
          status: "review",
          created_at: {
            $date: "2022-05-20T06:15:10.911Z",
          },
          updated_at: null,
          meta: {},
          products: {
            7609: {
              order_product_id: 252802,
              name: "vitamin C",
              image: "1/product/633/C.png",
              price: 1600,
              type: "product",
              currency: null,
              currency_sign: "$",
              qty: 1,
              subtotal: 1600,
            },
          },
          checkout_details: {},
          history: {},
          lock_at: null,
          adjust_title: null,
          adjust_price: 0,
          free_delivery: false,
          buyer_id: null,
        },
        {
          id: 793,
          campaign_id: 440,
          customer_id: "4869164659762789",
          customer_name: "Derek Hwang",
          customer_img:
            "https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=4869164659762789&height=50&width=50&ext=1655619275&hash=AeRvWfUjMLpSzNST-WA",
          email: null,
          phone: null,
          first_name: null,
          last_name: null,
          gender: null,
          remark: null,
          subtotal: 2548,
          total: 0,
          currency: null,
          currency_sign: "$",
          cost: 0,
          cost_currency: null,
          cost_currency_sign: "$",
          payment_first_name: "",
          payment_last_name: "",
          payment_gender: "",
          payment_company: "",
          payment_postcode: "",
          payment_region: "",
          payment_location: "",
          payment_address_1: "",
          payment_address_2: "",
          payment_method: "",
          payment_status: "",
          payment_remark: "",
          paid_at: null,
          shipping_cost: 15,
          shipping_first_name: "qqqq",
          shipping_last_name: "qq",
          shipping_email: "derekhwang33@gmail.com",
          shipping_phone: "0000000000",
          shipping_gender: "",
          shipping_company: "",
          shipping_postcode: "qqq",
          shipping_region: "qq",
          shipping_location: "qq",
          shipping_address_1: "qqq",
          shipping_address_2: "",
          shipping_method: "delivery",
          shipping_status: "",
          shipping_details: "",
          shipping_remark: "",
          shipping_date: null,
          shipping_time: null,
          tracking: "",
          platform: "facebook",
          platform_id: 1,
          type: null,
          status: "review",
          created_at: {
            $date: "2022-05-20T06:14:43.969Z",
          },
          updated_at: {
            $date: "2022-05-20T06:14:32.184Z",
          },
          meta: {},
          products: {},
          checkout_details: {},
          history: {},
          lock_at: {
            $date: "2022-05-20T06:21:59.475Z",
          },
          adjust_title: "",
          adjust_price: 0,
          free_delivery: false,
          buyer_id: null,
        }
      ],
    };
  },
  methods: {
    showReplyBar() {
      this.replyBar = !this.replyBar;
    },
    showTags() {
      this.tagBox = !this.tagBox;
    },
  },
};
</script>

<style scoped>
.demo-breadcrumb-separator {
  color: #ff5500;
  padding: 0 5px;
}

.form-check-input {
  border-color: black !important;
}

.table th {
  /*padding-left: 0 !important;*/
  padding-right: 0 !important;
}

.table td {
  /*padding-left: 0 !important;*/
  padding-right: 0 !important;
}
</style>
