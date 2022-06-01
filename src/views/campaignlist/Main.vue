<template>
  <!-- OUTTER BOX -->
  <div class="intro-y chat grid grid-cols-12 gap-5">
    <!-- BEGIN: commit box -->
    <div class="col-span-12">
      <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-2">
        <div class="switch-toggle switch-3 switch-candy col-start-1 col-span-12 m-2">
          <input id="on" name="state-d" type="radio" checked="checked"/>
          <label for="on" @click="status_change('schedule')" style="width: 100px; font-size:14px;">Scheduled</label>
          <input id="na" name="state-d" type="radio" class="my-0" />
          <label for="na" @click="status_change('history')" style="width: 100px; font-size:14px;">History</label>
          <input id="off" name="state-d" type="radio" />
          <label for="off" @click="status_change('ongoing')" style="width: 100px; font-size:14px;">Ongoing</label>
        </div>
        <button 
          class="col-start-1 btn btn-warning btn-rounded w-24 h-10 text-white
            lg:col-start-11 lg:m-2 
              2xl:col-start-11 2xl:m-2"
                @click="this.$router.push('/create-campaign')" > 
          <span class="font-bold mr-1 text-lg">+</span> Create</button>
      </div>

      <div class="box">
        <div class="overflow-x-auto">
          <SearchBar :searchColumns="searchColumns" :page_type="'campaign_list'"> </SearchBar>
          <CampaignListTable
            :requestUrl="'/api/v2/campaign/list_campaign/'"
            :columns="tableColumns"
            :routerParam="campaign_status"
            :page_type="'campaign_list'"
          >
          </CampaignListTable>
        </div>
      </div>
    </div>

    <!-- Modal ID Popup -->
    <Modal :show="idPopupModalPreview" @hidden="idPopupModalPreview = false">
      <a
        @click="idPopupModalPreview = false"
        class="absolute right-0 top-0 mt-3 mr-3"
        href="javascript:;"
      >
        <XIcon class="w-8 h-8 text-slate-400" />
      </a>
      <ModalBody class="p-0">
        <div class="p-5 text-center">
          <div class="text-xl mt-5">
            Please enter post ID to start live selling.
          </div>
        </div>
        <div class="px-5 pb-8 text-center">
          <button type="button" @click="toEnterID" class="btn btn-primary w-24">
            Comfirm
          </button>
        </div>
      </ModalBody>
    </Modal>
    <!--Modal Enter Post ID -->
    <Modal
      size="modal-lg"
      :show="enterIDModalPreview"
      @hidden="enterIDModalPreview = false"
    >
      <ModalHeader>
        <h2 class="font-medium text-base mr-auto">Enter Post ID</h2>
        <a
          @click="enterIDModalPreview = false"
          class="absolute right-0 top-0 mt-3 mr-3"
          href="javascript:;"
        >
          <XIcon class="w-8 h-8 text-slate-400" />
        </a>
      </ModalHeader>
      <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
        <div class="col-span-12 items-end" style="display: inline-flex">
          <label for="modal-form-1" class="text-lg font-medium mr-5"
            >Facebook</label
          >
          <div
            v-show="facebookPageSelected"
            class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden"
          >
            <img alt="Midone Tailwind HTML Admin Template" :src="fbAvatar" />
          </div>
        </div>
        <div class="col-span-12" style="display: inline-flex">
          <button
            type="button"
            href="javascript:;"
            @click="facebookSelectPage()"
            class="btn w-48 btn-primary mr-3"
          >
            Select Page
          </button>
          <input
            id="modal-form-1"
            type="text"
            class="form-control"
            placeholder=""
            v-model="fb_post_id"
            @click="facebookSelectCurrentLive()"
          />
        </div>
        <div class="col-span-12 items-end" style="display: inline-flex">
          <label for="modal-form-1" class="text-lg font-medium mr-5"
            >Instagram</label
          >
          <div
            v-show="instagramPageSelected"
            class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden"
          >
            <img alt="Midone Tailwind HTML Admin Template" :src="igAvatar" />
          </div>
        </div>
        <div class="col-span-12" style="display: inline-flex">
          <button
            type="button"
            href="javascript:;"
            @click="instagramSelectPage()"
            class="btn w-48 btn-primary mr-3"
          >
            Select Page
          </button>
          <input
            id="modal-form-1"
            type="text"
            class="form-control"
            placeholder=""
            v-model="ig_live_media_id"
            @click="instagramSelectCurrentLive()"
          />
        </div>
                <div class="col-span-12 items-end" style="display: inline-flex">
          <label for="modal-form-1" class="text-lg font-medium mr-5"
            >YouTube</label
          >
          <div
            v-show="youtubePageSelected"
            class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden"
          >
            <img alt="Midone Tailwind HTML Admin Template" :src="ytAvatar" />
          </div>
        </div>
        <div class="col-span-12" style="display: inline-flex">
          <button
            type="button"
            href="javascript:;"
            @click="youtubeSelectPage()"
            class="btn w-48 btn-primary mr-3"
          >
            Select Page
          </button>
          <input
            id="modal-form-1"
            type="text"
            class="form-control"
            placeholder=""
            v-model="yt_live_video_id"
            @click="youtubeSelectCurrentLive()"
          />
        </div>
      </ModalBody>
      <!-- BEGIN: Select Facebook Fan Page -->
      <Modal
        :show="facebookOverlappingModalPreview"
        @hidden="facebookOverlappingModalPreview = false"
      >
        <ModalBody class="text-left content-center">
          <div class="intro-y grid grid-cols-12 gap-5 my-5">
            <template v-for="page in campaignEntrydata.facebook.ownPageItems" :key="page.page_id">
              <div
                @click="facebookAccountClick(page.image, page.page_id, page.token)"
                class="
                  w-14
                  h-14
                  flex-none
                  image-fit
                  rounded-md
                  overflow-hidden
                  col-start-1 col-span-2
                "
              >
                <img
                  alt=""
                  :src="page.image"
                />
              </div>
              <span
                @click="facebookAccountClick(page.image, page.page_id, page.token)"
                class="col-span-6 text-lg content-center"
              >
                {{ page.name }}
              </span>
            </template>
          </div>
        </ModalBody>
      </Modal>
      <!-- END: Select Facebook Fan Page -->

      <!-- BEGIN: Select YouTube Channel Page -->
      <Modal
        :show="youtubeOverlappingModalPreview"
        @hidden="youtubeOverlappingModalPreview = false"
      >
        <ModalBody class="text-left align-middle">
          <div class="intro-y grid grid-cols-12 gap-5 my-5">
            <template v-for="page in campaignEntrydata.youtube.ownPageItems" :key="page.channel_id">
              <div
                @click="youtubeAccountClick(page.image, page.channel_id, page.token)"
                class="
                  w-14
                  h-14
                  flex-none
                  image-fit
                  rounded-md
                  overflow-hidden
                  col-start-1 col-span-2
                "
              >
                <img
                  alt=""
                  :src="page.image"
                />
              </div>
              <span
                @click="youtubeAccountClick(page.image, page.channel_id, page.token)"
                class="col-span-6 text-lg content-center"
              >
                {{ page.name }}
              </span>
            </template>
          </div>
        </ModalBody>
      </Modal>
      <!-- END: Select Select YouTube Channel Page -->

      <!-- BEGIN: Select Instagram Profile Page -->
      <Modal
        :show="instagramOverlappingModalPreview"
        @hidden="instagramOverlappingModalPreview = false"
      >
        <ModalBody class="text-left">
          <div class="intro-y grid grid-cols-12 gap-5 my-5">
            <template v-for="page in campaignEntrydata.instagram.ownPageItems" :key="page.business_id">
              <div
                @click="instagramAccountClick(page.image, page.business_id, page.token)"
                class="
                  w-14
                  h-14
                  flex-none
                  image-fit
                  rounded-md
                  overflow-hidden
                  col-start-1 col-span-2
                "
              >
                <img
                  alt=""
                  :src="page.image"
                />
              </div>
              <span
                @click="instagramAccountClick(page.image, page.business_id, page.token)"
                class="col-span-6 text-lg content-center"
              >
                {{ page.name }}
              </span>
            </template>
          </div>
        </ModalBody>
      </Modal>
      <!-- END: Select Instagram Profile Page -->

      <!-- BEGIN: Select Current Live -->
      <Modal
        :show="CurrentLiveOverlappingModalPreview"
        @hidden="CurrentLiveOverlappingModalPreview = false"
      >
        <ModalBody class="text-left content-center">
          <div class="intro-y grid grid-cols-12 gap-5 my-5">
            <template v-for="live in currentLiveItems" :key="live.id">
              <div
                class="
                  flex-none
                  rounded-md
                  overflow-hidden
                  col-start-1 col-span-12
                "
                @click="chooseLive(live.id, currentLiveListPlatform)"  style="cursor: pointer"
              >
                <template v-if="live.embed_html">
                  <div v-html="live.embed_html" style="z-index: 0"></div>
                </template>
                <template v-else-if="live.image">
                  <img
                    alt=""
                    :src="live.image"
                    style="z-index: 0"
                  />
                </template>
              </div>
              <span
                class="col-span-6 text-lg content-center"
                @click="chooseLive(live.id, currentLiveListPlatform)"  style="cursor: pointer"
              >
                {{ live.title }}
              </span>
            </template>
          </div>
        </ModalBody>
      </Modal>
      <!-- END: Select Current Live -->

      <ModalFooter>
        <button
          type="button"
          class="btn btn-outline-secondary w-20 mr-1"
          @click="cancelClean()"
        >
          Cancel
        </button>
        <button type="button" class="btn btn-primary w-20" @click="closeJump">
          Save
        </button>
      </ModalFooter>
    </Modal>
  </div>
</template>

<script>
import SearchBar from "@/components/bar/SearchBar.vue";
import CampaignListTable from "@/components/table/CampaignListTable.vue";
import { get_user_subscription_facebook_pages, get_user_subscription_instagram_profiles, get_user_subscription_youtube_channels } from "@/api/user_subscription"
import { get_fb_page_live_media } from "@/api/facebook"
import { get_ig_live_media } from "@/api/instagram"
import { get_yt_live_media } from "@/api/youtube"

export default {
  components: { 
		SearchBar,
		CampaignListTable
	},
  data() {
    return {
      idPopupModalPreview: false,
      enterIDModalPreview: false,
      facebookOverlappingModalPreview: false,
      youtubeOverlappingModalPreview: false,
      instagramOverlappingModalPreview: false,
      facebookPageSelected: false,
      instagramPageSelected: false,
      youtubePageSelected: false,
      currentLiveItems: [],
      currentLiveListPlatform: null,
      CurrentLiveOverlappingModalPreview: false,
      EntryCampaignId: null,

      fbAvatar: "",
      fbimg1: "/src/assets/images/lss-img/kuaimai-avatar.jpeg",
      fbimg2: "/src/assets/images/profile-1.jpg",
      fbimg3: "/src/assets/images/lss-logo/LSS_logo_words.png",
      ytAvatar: "",
      ytimg1: "/src/assets/images/lss-img/beboo-avatar.png",
      ytimg2: "/src/assets/images/profile-2.jpg",
      ytimg3: "/src/assets/images/profile-3.jpg",
      igAvatar: "",
      igimg1: "/src/assets/images/profile-4.jpg",
      igimg2: "/src/assets/images/profile-5.jpg",
      igimg3: "/src/assets/images/profile-6.jpg",
      fb_page_id: null,
      fb_post_id: null,
      fb_page_token: null,
      ig_profile_id: null,
      ig_live_media_id: null,
      ig_page_token: null,
      yt_channel_id: null,
      yt_live_video_id:null,
      yt_page_token: null,



      searchColumns: {
        keywords: [
          { text: "Title", value: "title" },
        ],
      },
      tableColumns: [
        { name: "Fan Page", key: "page" },
        { name: "Platform", key: "platform" },
        { name: "Title", key: "title" },
        { name: "Time", key: "start_at" },
        { name: "Manage Order", key: "manager_order" },
        { name: "Stop Checkout", key: "stop" },
        { name: " ", key: "entry" },
        { name: " ", key: "edit" },
      ],
      campaign_status: "schedule",
      campaignEntrydata: {
        facebook:{
          ownPageItems:{},
          chosenPageInfo:{
            pageID: this.fb_page_id,
            pageAccessToken:this.fb_page_token,
            post_id: this.fb_post_id
          },
        },
        instagram:{
          ownPageItems:{},
          chosenPageInfo:{
            pageID: this.ig_profile_id,
            pageAccessToken:this.fb_page_token,
            live_media_id: this.ig_live_media_id,
          },
        },
        youtube:{
          ownPageItems:{},
          chosenPageInfo:{
            pageID:this.yt_channel_id,
            pageAccessToken:this.yt_page_token,
            live_video_id: this.yt_live_video_id,
          },
        },
      }
    };
  },
  mounted() {
    this.$cookies.set("access_token","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0NTcwNjE4LCJpYXQiOjE2NTM5NjU4MTgsImp0aSI6ImEwZDk5MDNmNTdiYTQyMGM5OTczMGVlM2NhNDEyMDg0IiwidXNlcl9pZCI6MSwiZGF0YSI6eyJhdXRoX3VzZXJfaWQiOjEsInNlbGxlcl9pZCI6MTQsImN1c3RvbWVyX2lkIjoxMDMsIm5hbWUiOiJDaGlhbmdjaGVuZyBMaWVuIiwiZW1haWwiOiJuaWNrODgwNjhAZ21haWwuY29tIn19.35cm9DgWG4dJ82mBPqDetkca_g6E_SSges-aQr9YuPU");
    this.eventBus.on("entryPoint", (payload) => {
      console.log(payload)
      this.EntryCampaignId = payload
      this.idPopupModalPreview = true
    })
  },
  unmounted() {
    this.eventBus.off("entryPoint")
  },
  methods: {
    status_change(status){
        this.campaign_status = status
        this.eventBus.emit("campaignStatus", {status: this.campaign_status})
    },
    toEnterID() {
      this.idPopupModalPreview = false;
      this.enterIDModalPreview = true;
    },
    facebookSelectPage() {
      get_user_subscription_facebook_pages()
      .then((response) => {
          console.log(response);
          console.log(response.data);
          this.campaignEntrydata.facebook.ownPageItems = response.data
          this.facebookOverlappingModalPreview = true
      })
      .catch((error) => {
        console.log(error);
      });
    },
    facebookAccountClick(img, official_page_id, token) {
      this.fb_page_id = official_page_id
      this.fb_page_token = token
      console.log(this.campaignEntrydata.facebook.chosenPageInfo)
      this.facebookOverlappingModalPreview = false;
      this.facebookPageSelected = true;
      this.fbAvatar = img;
    },
    facebookSelectCurrentLive() {
      get_fb_page_live_media(this.fb_page_id, this.fb_page_token)
      .then((response) => {
          console.log(response);
          console.log(response.data);
          // const sort = response.data.data.filter(v => v.status === "LIVE")
          const live_campaign = response.data.data.filter(v => v.status === "LIVE")
          if (!live_campaign.length) {
              alert('You have no Facebook live posts now.')
          } else {
              let currentLiveItems = []
              live_campaign.forEach(v => {

                currentLiveItems.push({
                  id: v.video.id,
                  title: v.title?v.title:"Current Live",
                  image: null,
                  video_url: null,
                  embed_html: v.embed_html,
                })
              });
              this.currentLiveItems = currentLiveItems
              this.currentLiveListPlatform = "facebook"
              this.CurrentLiveOverlappingModalPreview = true
          }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    
    instagramSelectPage() {
      get_user_subscription_instagram_profiles()
      .then((response) => {
          console.log(response);
          console.log(response.data);
          this.campaignEntrydata.instagram.ownPageItems = response.data
          this.instagramOverlappingModalPreview = true
      })
      .catch((error) => {
        console.log(error);
      });
    },
    instagramAccountClick(img, official_page_id, token) {
      this.ig_profile_id = official_page_id
      this.ig_page_token = token
      console.log(this.campaignEntrydata.instagram.chosenPageInfo)
      this.instagramOverlappingModalPreview = false;
      this.instagramPageSelected = true;
      this.igAvatar = img;
    },
    instagramSelectCurrentLive() {
      get_ig_live_media(this.ig_profile_id, this.ig_page_token)
      .then((response) => {
          console.log(response);
          console.log(response.data);
          // const sort = response.data.data.filter(v => v.status === "LIVE")
          const live_campaign = response.data.data
          if (!live_campaign.length) {
              alert('You have no Instagram live posts now.')
          } else {
              let currentLiveItems = []
              live_campaign.forEach(v => {

                currentLiveItems.push({
                  id: v.id,
                  title: v.username,
                  image: v.media_url,
                  video_url: null,
                  embed_html: null,
                })
              });
              this.currentLiveItems = currentLiveItems
              this.currentLiveListPlatform = "instagram"
              this.CurrentLiveOverlappingModalPreview = true
          }
      })
      .catch((error) => {
        console.log(error);
      });
    },

    youtubeSelectPage() {
      get_user_subscription_youtube_channels()
      .then((response) => {
          console.log(response);
          console.log(response.data);
          this.campaignEntrydata.youtube.ownPageItems = response.data
          this.youtubeOverlappingModalPreview = true
      })
      .catch((error) => {
        console.log(error);
      });
    },
    youtubeAccountClick(img, official_page_id, token) {
      this.yt_channel_id = official_page_id
      this.yt_page_token = token
      console.log(this.campaignEntrydata.youtube.chosenPageInfo)
      this.youtubeOverlappingModalPreview = false;
      this.youtubePageSelected = true;
      this.ytAvatar = img;
    },
    youtubeSelectCurrentLive() {
      get_yt_live_media(this.yt_page_token)
      .then((response) => {
          console.log(response);
          console.log(response.data);
          // const sort = response.data.data.filter(v => v.status === "LIVE")
          const live_campaign = response.data.items
          if (!live_campaign.length) {
              alert('You have no YouTube live stream now.')
          } else {
              let currentLiveItems = []
              live_campaign.forEach(v => {

                currentLiveItems.push({
                  id: v.id,
                  title: v.snippet.title,
                  image: v.snippet.thumbnails.standard.url,
                  video_url: null,
                  embed_html: null,
                })
              });
              this.currentLiveItems = currentLiveItems
              this.currentLiveListPlatform = "youtube"
              this.CurrentLiveOverlappingModalPreview = true
          }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    cancelClean() {
      this.enterIDModalPreview = false;
      this.facebookPageSelected = false;
      this.youtubePageSelected = false;
      this.instagramPageSelected = false;
    },
    closeJump() {
      this.enterIDModalPreview = false;
      console.log(this.EntryCampaignId)
      this.$router.push(`/campaign-live/${this.EntryCampaignId}`);
    },

    chooseFacebookLive(post_id) {
      this.fb_post_id = post_id
    },
    chooseInstagramLive(live_media_id) {
      this.ig_live_media_id = live_media_id
    },
    chooseYoutubeLive(live_video_id) {
      this.yt_live_video_id = live_video_id
    },
    chooseLive(live_id, platform) {
      if (platform === "facebook") {
        this.chooseFacebookLive(live_id)
      }
      if (platform === "instagram") {
        this.chooseInstagramLive(live_id)
      }
      if (platform === "youtube") {
        this.chooseYoutubeLive(live_id)
      }
      this.CurrentLiveOverlappingModalPreview = false
    }
  },
};
</script>

<style scoped>
.switch-toggle {
  overflow: visible;
  float: left;
  height: 42px;
  width: 300px;
  background: theme("colors.secondary");
  border-radius: 42px 42px;
  letter-spacing: 0.7px;
  box-shadow: inset -4px -4px 8px rgba(255, 255, 255, 0.185),
    inset 8px 8px 16px rgba(0, 0, 0, 0.1);
}
.dark .switch-toggle {
  box-shadow: inset -4px -4px 8px rgba(22, 22, 22, 0.596),
    inset 8px 8px 16px rgba(0, 0, 0, 0.1);
  --color-secondary: theme("colors.rgb.blueGray.800");
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
  font-size: 16px;
  color: rgb(56, 56, 56);
  cursor: pointer;
}
.dark .switch-toggle input + label {
  color: rgb(255, 255, 255);
}

.switch-toggle input:checked + label {
  background: theme("colors.primary");
  height: 42px;
  width: 100px;
  border-radius: 42px 42px;
  font-weight: 500;
  color: aliceblue;
}
</style>