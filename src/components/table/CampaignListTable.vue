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
          <td>
            <div class="flex">
              <div
                class="w-10 h-10 image-fit zoom-in"
                v-if="campaign.facebook_page !== null"
              >
                <Tippy
                  tag="img"
                  class="rounded-full ml-6"
                  :src="campaign.facebook_page.image"
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
                v-if="campaign.youtube_channel !== null"
              >
                <Tippy
                  tag="img"
                  class="rounded-full ml-3"
                  :src="campaign.youtube_channel.image"
                  :content="`Youtube`"
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
                v-if="campaign.instagram_profile !== null"
              >
                <Tippy
                  tag="img"
                  class="rounded-full"
                  :src="campaign.instagram_profile.image"
                  :content="`Instagram`"
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
            <div class="flex">
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
          <td class="items-center">
            <a class="flex items-center ml-20" href="javascript:;">
              <ListIcon class="w-4 h-4" />
            </a>
          </td>
          <td class="items-center">
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

      youtube_platform: "/src/assets/images/lss-img/yt_ad.jpeg",
      facebook_platform: "/src/assets/images/lss-img/fb_ad.jpeg",
      instagram_platform: "/src/assets/images/lss-img/ig_ad.jpeg",
      unbound: "/src/assets/images/lss-img/noname_ad.jpeg",
    };
  },
  mounted() {
    this.search();

    this.eventBus.on("campaignStatus", (payload) => {
      this.status = payload.status;
      this.search();
    });

    this.eventBus.on("searchTable", (payload) => {
      this.currentPage = 1;
      this.searchColumn = payload.searchColumn;
      this.keyword = payload.keyword;
      this.pageSize = payload.pageSize;
      this.search();
    });
  },
  unmounted() {
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
      this.eventBus.emit("entryPoint", { idPopupModalPreview: true });
    },
  },
};
</script>