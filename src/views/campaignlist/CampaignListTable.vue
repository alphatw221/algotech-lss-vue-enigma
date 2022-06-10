<template >
  <div class="overflow-x-scroll">
    <table class="table table-report mt-5">
      <thead>
        <tr>
          <th
            class="whitespace-nowrap text-center "
            v-for="column in tableColumns"
            :key="column.key"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(campaign, index) in store[tableName].campaigns" :key="index" class="intro-x">
          <td  class="fan_page items-center">
            <div class="flex">
              <div
                class="w-10 h-10 image-fit zoom-in border-0 lg:w-15"
                v-if="campaign.facebook_page !== null"
              >
                <Tippy
                  tag="img"
                  class="rounded-full ml-3 border-0"
                  :src="campaign.facebook_page.image"
                  :content="campaign.facebook_page.name"
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
                  class="rounded-full ml-0"
                  :src="campaign.instagram_profile.image"
                  :content="campaign.instagram_profile.name"
                />
              </div>
              <div class="w-10 h-10 image-fit zoom-in" v-else>
                <Tippy
                  tag="img"
                  class="rounded-full ml-0"
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
                  class="rounded-full -ml-3"
                  :src="campaign.youtube_channel.image"
                  :content="campaign.youtube_channel.name"
                />
              </div>
              <div class="w-10 h-10 image-fit zoom-in" v-else>
                <Tippy
                  tag="img"
                  class="rounded-full -ml-3"
                  :src="unbound"
                  :content="`Unbound`"
                />
              </div>
            </div>
          </td>

          <td class="text-center w-12 platform" >
            <div class="flex ">
              <div
                class="w-10 h-10 image-fit zoom-in"
                v-if="campaign.facebook_page !== null"
              >
                <Tippy
                  tag="img"
                  class="rounded-full ml-3 2xl:ml-3"
                  :src="facebook_platform"
                  :content="`Facebook`"
                />
              </div>
              <div class="w-10 h-10 image-fit zoom-in" v-else>
                <Tippy
                  tag="img"
                  class="rounded-full ml-3 2xl:ml-3"
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
                  class="rounded-full ml-0 2xl:ml-0"
                  :src="instagram_platform"
                  :content="`Instagram`"
                />
              </div>
              <div class="w-10 h-10 image-fit zoom-in" v-else>
                <Tippy
                  tag="img"
                  class="rounded-full ml-0 2xl:ml-0"
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
                  class="rounded-full -ml-3 2xl:-ml-3"
                  :src="youtube_platform"
                  :content="`Youtube`"
                />
              </div>
              <div class="w-10 h-10 image-fit zoom-in" v-else>
                <Tippy
                  tag="img"
                  class="rounded-full -ml-3 2xl:-ml-3"
                  :src="unbound"
                  :content="`Unbound`"
                />
              </div>
            </div>
          </td>
          <td class="text-center title  w-fit">
            {{ campaign.title }}
          </td>
          <td class="w-5 text-center date">
            <div class="w-40">{{new Date(campaign.start_at).toLocaleTimeString('en-us', {year:"numeric", month:"short", day:"numeric",hour: '2-digit', minute: '2-digit'})}}</div>
          </td>
          <td class="items-center manage_order w-fit" >
            <a class="flex items-center ml-10 2xl:ml-20" @click="manageOrder(campaign.id)">
              <ListIcon class="w-4 h-4" />
            </a>
          </td>
          <td class="items-center checkout w-fit" >
            <div
              class="
                flex
                form-check form-switch
                w-5
                ml-5
                2xl:ml-20
              "
            >
              <input
                @click="toggle"
                class="form-check-input center"
                type="checkbox"
              />
            </div>
          </td>
          <td class="text-center">
            <button
              class="btn btn-elevated-rounded-pending w-24 mr-1 mb-2"
              @click="clickEntry(campaign,index)"
            >
              Entry
            </button>
          </td>
          <td class="table-report__action w-30" >
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
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list"


import { ref, onMounted, onUnmounted, defineProps, defineEmits} from 'vue'


export default {
  props: {
    requestUrl: String,
    tableColumns: Array,
    tableName:String,
    campaignStatus:String
  },
  data() {
    return {
      page: 1,
      totalPage: 1,
      page_size: 10,
      dataCount: 0,
      searchCcolumn: '',
      keyword: '',
      status: this.campaignStatus,
      order_by: "created_at",
      youtube_platform: "/src/assets/images/lss-img/youtube.png",
      facebook_platform: "/src/assets/images/lss-img/facebook.png",
      instagram_platform: "/src/assets/images/lss-img/instagram.png",
      unbound: "/src/assets/images/lss-img/noname.png",
      store:useLSSCampaignListStore(),
    };
  },
  mounted() {
    this.search();

    this.eventBus.on(this.tableName, (payload) => {
      this.page = 1;
      this.searchColumn = payload.searchColumn;
      this.keyword = payload.keyword;
      this.page_size = payload.pageSize;
      this.search();
    });
  },
  unmounted() {
    this.eventBus.off(this.tableName);
  },
  methods: {
    get_url_param() {
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
        .get(`${this.requestUrl}?${this.get_url_param()}`)
        .then((response) => {
          if (response.data.count != undefined) {
            this.dataCount = response.data.count;
            const totalPage = parseInt(response.data.count / this.pageSize);
            this.totalPage = totalPage == 0 ? 1 : totalPage;
          }
          this.store[this.tableName].campaigns = response.data.results
          // this.campaigns = response.data.results;
        })
    },
    changePage(page) {
      this.page = page;
      this.search();
    },
    changePageSize(pageSize) {
      this.page_Size = pageSize;
      this.search();
    },

    clickEntry(campaign,index) {
      // this.$emit('showRemindModal',{'tableName':this.tableName,'campaign':campaign,'index':index})
      //   return
      if(campaign.facebook_page == null && campaign.instagram_profile == null && campaign.youtube_channel == null){

        this.$emit('showRemindModal',{'tableName':this.tableName,'campaign':campaign,'index':index})
        return
      }
      this.$router.push(`/seller/campaign-live/${campaign.id}`)
    },
    manageOrder(campaign_id){
      this.$router.push(`/seller/manage-order/${campaign_id}`)
    }
  },
};
</script>


<style scoped>
.click-icon:hover {
	cursor: pointer;
}

td {
	height: 50px;
}

@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 768px) {

	table,
	thead,
	tbody,
	th,
	td,
	tr {
		display: block;
		font-size: 16px;
		padding: 0px !important;
	}

	.fan_page {
		height: 60px !important;
    width: auto;
	}
  .platform {
		height: 60px !important;
    width: auto;
	}

	thead tr {
		position: absolute;
		top: -9999px;
		left: -9999px;
	}

	tr {
		border-bottom: 1px solid black;
		margin-top: 20px;
	}

	td {
		border: none;
		border-bottom: 1px solid #eee;
		position: relative;
		padding-left: 40% !important;
		text-align: left !important;
	}

	.productName {
		padding-left: 15px;
	}

	td:before {
		position: absolute;
		left: 6px;
		width: 30%;
		padding-right: 10px;
		white-space: nowrap;
		font-weight: bold;
	}

	.fan_page:before {
		content: "Fan Page";
		/* color: #0e9893; */
	}

	.platform:before {
		content: "Platform";
		/* color: #0e9893; */
	}

	.title:before {
		content: "Title";
		/* color: #0e9893; */
	}

	.date:before {
		content: "Time";
		/* color: #0e9893; */
	}

	.manage_order:before {
		content: "Manage Order";
		/* color: #0e9893; */
	}
  .checkout:before {
  content: "Stop Checkout";
  /* color: #0e9893; */
  } 
}
</style>