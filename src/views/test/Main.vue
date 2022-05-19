<template>
  <!-- OUTTER BOX -->
  <div class="intro-y chat grid grid-cols-12 gap-5" style="height: 725px">
    <!-- BEGIN: commit box -->
    <div class="col-span-12">
      <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-2">
        <div class="switch-toggle switch-3 switch-candy col-start-1 m-2">
          <input id="on" name="state-d" type="radio" checked="checked" />
          <label for="on" onclick="" style="width: 100px">Scheduled</label>

          <input id="na" name="state-d" type="radio" class="my-0" />
          <label for="na" onclick="" style="width: 100px">History</label>

          <input id="off" name="state-d" type="radio" />
          <label for="off" onclick="" style="width: 100px">Ongoing</label>
        </div>
        <div class="col-end-13 col-span-2">
          <button
            class="btn btn-primary-soft w-11 col-start-1 m-2 rounded-full"
          >
            <SearchIcon />
          </button>
          <button
            class="btn btn-primary-soft w-11 col-start-1 m-2 rounded-full"
          >
            <FilterIcon />
          </button>
        </div>
      </div>

      <div class="box">
        <div class="overflow-x-auto">
          <table class="table table-report mt-5">
            <thead>
              <tr>
                <th
                  class="whitespace-nowrap"
                  v-for="column in columns"
                  :key="column.key"
                >
                  {{ column.name }}
                </th>
                <!--<th class="text-center whitespace-nowrap">Edit</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, key) in results" :key="key" class="intro-x">
                <td class="w-40">
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
                <td>
                  <a href="" class="font-medium whitespace-nowrap">
                    {{ product.name }}
                  </a>
                </td>
                <td class="text-center">
                  {{ product.order_code }}
                </td>
                <td class="text-center">
                  {{ product.type }}
                </td>
                <td class="text-center">
                  {{ product.category }}
                </td>
                <td class="text-center">
                  {{ product.description }}
                </td>
                <td class="text-center">
                  {{ product.qty }}
                </td>
                <td class="text-center">
                  {{ product.price }}
                </td>
                <td class="table-report__action w-30">
                  <div class="flex justify-center items-center">
                    <a class="flex items-center mr-3" href="javascript:;">
                      <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- <div class="box"> -->
      <!-- BEGIN: Basic Sticky Notification Content -->
      <!-- <Notification refKey="basicStickyNotification" class="">
        <div class="font-medium m-3">
          You have an upcoming campaign in 1 hour
        </div>
        <br />
        <a
          class="
            font-medium
            text-primary
            dark:text-slate-400
            mt-1
            sm:mt-0 sm:ml-40
          "
          href=""
          >Start Now</a
        >
        <a
          class="
            font-medium
            text-primary
            dark:text-slate-400
            mt-1
            sm:mt-0 sm:ml-40
          "
          href=""
          >Remind me 15 mins before</a
        >
      </Notification> -->
      <!-- END: Basic Sticky Notification Content -->
      <!-- BEGIN: Notification Toggle -->
      <!-- <button
        class="btn btn-primary mt-2 sm:mt-0"
        @click="basicStickyNotificationToggle"
      >
        Show Notification
      </button> -->
      <!-- END: Notification Toggle -->
      <!-- <button
        class="btn btn-primary mt-2 sm:mt-0"
        @click="videoStickyNotificationToggle"
      >
        Show video
      </button>

      <Notification refKey="videoStickyNotification" class="">
        <video width="400" controls>
          <source src="mov_bbb.mp4" type="video/mp4" />
          <source src="mov_bbb.ogg" type="video/ogg" />
          Your browser does not support HTML video.
        </video>
      </Notification>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { name: "Fan Page", key: "page" },
        { name: "Platform", key: "platform" },
        { name: "Title", key: "title" },
        { name: "Time", key: "time" },
        { name: "Manage Order", key: "manager_order" },
        { name: "Stop Checkout", key: "stop" },
        { name: " ", key: "entry" },
        { name: "Edit", key: "edit" },
      ],
      results: [
        {
          image:"",
          platform:"",
          title:"",
          time:"",

        },
        {
          id: 124,
          created_by: null,
          meta: {},
          meta_logistic: {},
          tag: [],
          qty: 24,
          name: "2363",
          category: null,
          excerpt: null,
          description: "",
          content: null,
          remark: null,
          price: 8.0,
          price_ori: 0.0,
          tax: 0.0,
          currency: null,
          currency_sign: "$",
          points: 0,
          model: null,
          sku: null,
          upc: null,
          image: "",
          sort_order: 0,
          order_code: "A2M",
          max_order_amount: null,
          customer_removable: false,
          customer_editable: false,
          type: "product",
          status: "enabled",
          created_at: "2022-02-25T09:24:54.512000Z",
          updated_at: "2022-02-25T09:24:54.512000Z",
          user_subscription: 1,
        },
        {
          id: 125,
          created_by: null,
          meta: {},
          meta_logistic: {},
          tag: [],
          qty: 25,
          name: "2364",
          category: null,
          excerpt: null,
          description: "",
          content: null,
          remark: null,
          price: 7.0,
          price_ori: 0.0,
          tax: 0.0,
          currency: null,
          currency_sign: "$",
          points: 0,
          model: null,
          sku: null,
          upc: null,
          image: "",
          sort_order: 0,
          order_code: "A2L",
          max_order_amount: null,
          customer_removable: false,
          customer_editable: false,
          type: "product",
          status: "enabled",
          created_at: "2022-02-25T09:25:39.884000Z",
          updated_at: "2022-02-25T09:25:39.884000Z",
          user_subscription: 1,
        },
        {
          id: 126,
          created_by: null,
          meta: {},
          meta_logistic: {},
          tag: [],
          qty: 68,
          name: "2365",
          category: null,
          excerpt: null,
          description: "",
          content: null,
          remark: null,
          price: 35.0,
          price_ori: 0.0,
          tax: 0.0,
          currency: null,
          currency_sign: "$",
          points: 0,
          model: null,
          sku: null,
          upc: null,
          image: "",
          sort_order: 0,
          order_code: "A3",
          max_order_amount: null,
          customer_removable: false,
          customer_editable: false,
          type: "product",
          status: "enabled",
          created_at: "2022-02-25T09:26:12.655000Z",
          updated_at: "2022-02-25T09:26:12.655000Z",
          user_subscription: 1,
        },
        {
          id: 127,
          created_by: null,
          meta: {},
          meta_logistic: {},
          tag: [],
          qty: 110,
          name: "2366",
          category: null,
          excerpt: null,
          description: "",
          content: null,
          remark: null,
          price: 4.0,
          price_ori: 0.0,
          tax: 0.0,
          currency: null,
          currency_sign: "$",
          points: 0,
          model: null,
          sku: null,
          upc: null,
          image: "",
          sort_order: 0,
          order_code: "DB",
          max_order_amount: null,
          customer_removable: false,
          customer_editable: false,
          type: "product",
          status: "enabled",
          created_at: "2022-02-25T09:26:41.585000Z",
          updated_at: "2022-02-25T09:26:41.585000Z",
          user_subscription: 1,
        },
      ],
    };
  },
  methods: {
    append_1() {
      console.log("popoo");

      this.results.push({
        id: 127,
        created_by: null,
        meta: {},
        meta_logistic: {},
        tag: [],
        qty: 110,
        name: "2366",
        category: null,
        excerpt: null,
        description: "",
        content: null,
        remark: null,
        price: 4.0,
        price_ori: 0.0,
        tax: 0.0,
        currency: null,
        currency_sign: "$",
        points: 0,
        model: null,
        sku: null,
        upc: null,
        image: "",
        sort_order: 0,
        order_code: "DB",
        max_order_amount: null,
        customer_removable: false,
        customer_editable: false,
        type: "product",
        status: "enabled",
        created_at: "2022-02-25T09:26:41.585000Z",
        updated_at: "2022-02-25T09:26:41.585000Z",
        user_subscription: 1,
      });
      console.log(results);
    },
  },
};
</script>

<style scoped>
.switch-toggle {
  float: left;
  height: 42px;
  width: 300px;
  background: #363636ce;
  border-radius: 42px 42px;
}
.switch-toggle input {
  position: absolute;
  opacity: 0;
}
.switch-toggle input + label {
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 15px;
  padding-right: 15px;
  float: left;
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}
.switch-toggle input:checked + label {
  background: #055770;
  height: 42px;
  width: 100px;
  border-radius: 42px 42px;
}
</style>