<template>
  <div>
    <table class="table table-report mt-5">
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
        <tr v-for="(campaign, key) in listItems" :key="key" class="intro-x">
          <td v-if="page_type === 'campaign_list'">
            <div class="flex">
              <div
                class="w-10 h-10 image-fit zoom-in border-0"
                v-if="campaign.facebook_page !== null"
              >
                <Tippy
                  tag="img"
                  class="rounded-full ml-6 border-0"
                  :src="campaign.facebook_page.image"
                  :content="campaign.facebook_page.name"
                />
              </div>
              <div class="w-10 h-10 image-fit zoom-in" v-else>
                <Tippy
                  tag="img"
                  class="rounded-full ml-6"
                  :src="unbound"
                  :content="`Unbound`"
                />
              </div>
              <div
                class="w-10 h-10 image-fit zoom-in"
                v-if="campaign.instagram_profile !== null"
              >
                <Tippy
                  tag="img"
                  class="rounded-full ml-3"
                  :src="campaign.instagram_profile.image"
                  :content="campaign.instagram_profile.name"
                />
              </div>
              <div class="w-10 h-10 image-fit zoom-in" v-else>
                <Tippy
                  tag="img"
                  class="rounded-full ml-3"
                  :src="unbound"
                  :content="`Unbound`"
                />
              </div>
                            <div
                class="w-10 h-10 image-fit zoom-in"
                v-if="campaign.youtube_channel !== null"
              >
                <Tippy
                  tag="img"
                  class="rounded-full"
                  :src="campaign.youtube_channel.image"
                  :content="campaign.youtube_channel.name"
                />
              </div>
              <div class="w-10 h-10 image-fit zoom-in" v-else>
                <Tippy
                  tag="img"
                  class="rounded-full"
                  :src="unbound"
                  :content="`Unbound`"
                />
              </div>
            </div>
          </td>
          <td class="text-center w-18" v-if="page_type === 'campaign_list'">
            <div class="flex ">
              <div
                class="w-10 h-10 image-fit zoom-in"
                v-if="campaign.facebook_page !== null"
              >
                <Tippy
                  tag="img"
                  class="rounded-full ml-6"
                  :src="facebook_platform"
                  :content="`Facebook`"
                />
              </div>
              <div class="w-10 h-10 image-fit zoom-in" v-else>
                <Tippy
                  tag="img"
                  class="rounded-full ml-6"
                  :src="unbound"
                  :content="`Unbound`"
                />
              </div>
              <div
                class="w-10 h-10 image-fit zoom-in"
                v-if="campaign.instagram_profile !== null"
              >
                <Tippy
                  tag="img"
                  class="rounded-full ml-3"
                  :src="instagram_platform"
                  :content="`Instagram`"
                />
              </div>
              <div class="w-10 h-10 image-fit zoom-in" v-else>
                <Tippy
                  tag="img"
                  class="rounded-full ml-3"
                  :src="unbound"
                  :content="`Unbound`"
                />
              </div>
              <div
                class="w-10 h-10 image-fit zoom-in"
                v-if="campaign.youtube_channel !== null"
              >
                <Tippy
                  tag="img"
                  class="rounded-full"
                  :src="youtube_platform"
                  :content="`Youtube`"
                />
              </div>
              <div class="w-10 h-10 image-fit zoom-in" v-else>
                <Tippy
                  tag="img"
                  class="rounded-full"
                  :src="unbound"
                  :content="`Unbound`"
                />
              </div>
            </div>
          </td>
          <td class="text-center">
            {{ campaign.title }}
          </td>
          <td class="text-center">
            {{ campaign.start_at }}
          </td>
          <td class="items-center" v-if="page_type === 'campaign_list'">
            <a class="flex items-center ml-20" href="javascript:;" @click="manageOrder">
              <ListIcon class="w-4 h-4" />
            </a>
          </td>
          <td class="items-center" v-if="page_type === 'campaign_list'">
            <div
              class="
                flex
                items-center
                form-check form-switch
                w-full
                sm:w-auto sm:ml-auto
                mt-3
                sm:mt-0
              "
            >
              <input
                @click="toggle"
                class="form-check-input mr-0 center"
                type="checkbox"
              />
            </div>
          </td>
          <td class="text-center">
            <button
              class="btn btn-elevated-rounded-pending w-24 mr-1 mb-2"
              @click="changeEntry"
            >
              Entry
            </button>
          </td>
          <td class="table-report__action w-30" v-if="page_type === 'campaign_list'">
            <div class="flex justify-center items-center">
              <a class="flex items-center mr-3" href="javascript:;">
                <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
      <Page
        :total="dataCount"
        show-sizer
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </div>
  </div>
</template>

<script>
import { createAxiosWithBearer } from "@/libs/axiosClient";

export default {
  props: {
    requestUrl: String,
    columns: Array,
    routerParam: String,
    page_type: String,
  },
  data() {
    return {
      page: 1,
      totalPage: 1,
      page_size: 10,
      dataCount: 0,
      searchCcolumn: undefined,
      keyword: undefined,
      listItems: [],
      status: this.routerParam,
      order_by: "created_at",

      youtube_platform: "/src/assets/images/lss-img/youtube.png",
      facebook_platform: "/src/assets/images/lss-img/facebook.png",
      instagram_platform: "/src/assets/images/lss-img/instagram.png",
      unbound: "/src/assets/images/lss-img/noname_ad.jpeg",
    };
  },
  mounted() {
    this.search();

    this.eventBus.on("campaignStatus", (payload) => {
      this.page = 1;
      this.status = payload.status;
      this.search();
    });

    this.eventBus.on("searchTable", (payload) => {
      this.page = 1;
      this.searchColumn = payload.searchColumn;
      this.keyword = payload.keyword;
      this.page_size = payload.pageSize;
      this.search();
    });
  },
  unmounted() {
    this.eventBus.off("campaignStatus"); 
    this.eventBus.off("searchTable");
  },
  methods: {
    url_param() {
      let param = "";
      [
        "page_size",
        "page",
        "searchColumn",
        "keyword",
        "status",
        "order_by",
      ].forEach((v) => {
        if (this[v]) param += `&${v}=${this[v]}`;
      });
      return param.substr(1, param.length);
    },
    search() {
      createAxiosWithBearer()
        .get(`${this.requestUrl}?${this.url_param()}`)
        .then((response) => {
          if (response.data.count != undefined) {
            this.dataCount = response.data.count;
            const totalPage = parseInt(response.data.count / this.pageSize);
            this.totalPage = totalPage == 0 ? 1 : totalPage;
          }
          this.listItems = response.data.results;
          console.log(this.listItems);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changePage(page) {
      this.page = page;
      this.search();
    },
    changePageSize(pageSize) {
      this.page_Size = pageSize;
      this.search();
    },
    changeEntry() {
      this.eventBus.emit("entryPoint");
    },
    manageOrder(){
      this.eventBus.emit("manageOrder");
    }
  },
};
</script>