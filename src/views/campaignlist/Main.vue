<template>
  <!-- OUTTER BOX -->
  <div class="intro-y chat grid grid-cols-12 gap-5">
    <!-- BEGIN: commit box -->
    <div class="col-span-12">
      <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-2">
        <div class="switch-toggle switch-3 switch-candy col-start-1 col-span-12 m-2 lg:col-span-8 2xl:col-span-8">
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
                @click="this.$router.push('create-campaign')" > 
          <span class="font-bold mr-1 text-lg">+</span> Create</button>
      </div>

      <div class="box mt-3">
          <SearchBar :searchColumns="searchColumns" :page_type="'campaign_list'"> </SearchBar>

          <div class="overflow-x-scroll">
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
          
        </div>
        <div class="col-span-4 mr-5">
          <div class="items-end h-10" style="display: inline-flex">
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
          <button
            type="button"
            href="javascript:;"
            @click="facebookSelectPage(); hasSelectFbPage = true"
            class="btn w-40 btn-primary mt-3 mr-3"
            :disabled='facebookPageSelected && fb_post_id !== "" && !hasSelectFbPage'
          >
            Select Page
          </button>
          <div>
            Post ID:<br>{{ fb_post_id }}
          </div>
        </div>
        <div class="col-span-4">
          <div class="items-end h-10" style="display: inline-flex">
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
          <button
            type="button"
            href="javascript:;"
            @click="instagramSelectPage(); hasSelectIgPage = true"
            class="btn w-40 btn-primary mt-3 mr-3"
            :disabled='instagramPageSelected && ig_live_media_id !== "" && !hasSelectIgPage'
          >
            Select Page
          </button>
          <!-- <input
            id="modal-form-1"
            type="text"
            class="form-control"
            placeholder=""
            v-model="ig_live_media_id"
            @click="instagramSelectCurrentLive()"
          /> -->
          <div>
            Post ID:<br>{{ ig_live_media_id }}
          </div>
        </div>
        <div class="col-span-4">
          <div class="items-end h-10" style="display: inline-flex">
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
          <button
            type="button"
            href="javascript:;"
            @click="youtubeSelectPage(); hasSelectYtPage = true"
            class="btn w-40 btn-primary mt-3 mr-3"
            :disabled='youtubePageSelected && yt_live_video_id !== "" && !hasSelectYtPage'
          >
            Select Page
          </button>
          <!-- <input
            id="modal-form-1"
            type="text"
            class="form-control"
            placeholder=""
            v-model="yt_live_video_id"
            @click="youtubeSelectCurrentLive()"
          /> -->
          <div>
            Post ID:<br>{{ yt_live_video_id }}
          </div>
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
                @click="facebookAccountClick(page.id, page.image, page.page_id)"
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
                @click="facebookAccountClick(page.id, page.image, page.page_id)"
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
                @click="youtubeAccountClick(page.id, page.image, page.channel_id)"
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
                @click="youtubeAccountClick(page.id, page.image, page.channel_id)"
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
                @click="instagramAccountClick(page.id, page.image, page.business_id)"
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
                @click="instagramAccountClick(page.id, page.image, page.business_id)"
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
import { check_facebook_page_token, check_instagram_profile_token, check_youtube_channel_token } from "@/api_v2/campaign"

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
      ytAvatar: "",
      igAvatar: "",
      fb_page_id: null,
      fb_post_id: null,
      ig_profile_id: null,
      ig_live_media_id: null,
      yt_channel_id: null,
      yt_live_video_id:null,


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
            post_id: this.fb_post_id
          },
        },
        instagram:{
          ownPageItems:{},
          chosenPageInfo:{
            pageID: this.ig_profile_id,
            live_media_id: this.ig_live_media_id,
          },
        },
        youtube:{
          ownPageItems:{},
          chosenPageInfo:{
            pageID:this.yt_channel_id,
            live_video_id: this.yt_live_video_id,
          },
        },
      }
    };
  },
  mounted() {
    
    this.eventBus.on("entryPoint", (payload) => {
      console.log(payload)
      this.EntryCampaignId = payload.id
      
      this.fb_page_id = payload.facebook_page?payload.facebook_page.page_id:null,
      this.fb_post_id = payload.facebook_campaign.post_id,
      this.fbAvatar = payload.facebook_page?payload.facebook_page.image:"",

      this.ig_profile_id = payload.instagram_profile?payload.instagram_profile.business_id:null,
      this.ig_live_media_id = payload.instagram_campaign.live_media_id,
      this.igAvatar = payload.instagram_profile?payload.instagram_profile.image:"",
      
      this.yt_channel_id = payload.youtube_channel?payload.youtube_channel.channel_id:null,
      this.yt_live_video_id = payload.youtube_campaign.live_video_id,
      this.ytAvatar = payload.youtube_channel?payload.youtube_channel.image:"",

      this.facebookPageSelected = this.fbAvatar?true:false,
      this.instagramPageSelected = this.igAvatar?true:false,
      this.youtubePageSelected = this.ytAvatar?true:false

      this.idPopupModalPreview = true;
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
          this.campaignEntrydata.facebook.ownPageItems = response.data
          this.facebookOverlappingModalPreview = true
      })
      .catch((error) => {
        console.log(error);
      });
    },
    facebookAccountClick(id, img, official_page_id) {
      check_facebook_page_token(id).then(res=>{
        console.log("check_facebook_page_token")
        return res.data
      }).then(res=>{
        return this.facebookSelectCurrentLive(official_page_id, res.token)
      }).then(res=>{
        this.fb_page_id = official_page_id
        this.facebookOverlappingModalPreview = false;
        this.fbAvatar = img;
      }).catch(error => {
        this.facebookOverlappingModalPreview = false;
        switch (error.status) {
            case 500:
                alert('Oops! Something went wrong when fetch data. Please contact tech support.')
                break
            case 404:
                error.json().then(e => alert(e.detail))
                break
            case 400:
                error.json().then(e => alert(e.message))
                break
            case 401:
                // error.json().then(e => console.log(e))
                this.$router.push(`/seller/login/`);
        }
      })
      
      
      
    },
    facebookSelectCurrentLive(fb_page_id, fb_page_token) {
      get_fb_page_live_media(fb_page_id, fb_page_token)
      .then((response) => {
          console.log(response.data);
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
          this.campaignEntrydata.instagram.ownPageItems = response.data
          this.instagramOverlappingModalPreview = true
      })
      .catch((error) => {
        console.log(error);
      });
    },
    instagramAccountClick(id, img, official_page_id) {
      check_instagram_profile_token(id).then(res=>{
        return res.data
      }).then(res=>{
        return this.instagramSelectCurrentLive(official_page_id, res.token)
      }).then(res=>{
        this.ig_profile_id = official_page_id
        // console.log(this.campaignEntrydata.instagram.chosenPageInfo)
        this.instagramOverlappingModalPreview = false;
        this.igAvatar = img;
      }).catch(error => {
        this.instagramOverlappingModalPreview = false;
          switch (error.status) {
              case 500:
                  alert('Oops! Something went wrong when fetch data. Please contact tech support.')
                  break
              case 404:
                  error.json().then(e => alert(e.detail))
                  break
              case 400:
                  error.json().then(e => alert(e.message))
                  break
              case 401:
                  // error.json().then(e => console.log(e))
                  this.$router.push(`/seller/login/`);
          }
      })
      
      
      
    },
    instagramSelectCurrentLive(ig_page_id, ig_page_token) {
      get_ig_live_media(ig_page_id, ig_page_token)
      .then((response) => {
        console.log(response.data)
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
          this.campaignEntrydata.youtube.ownPageItems = response.data
          this.youtubeOverlappingModalPreview = true
      })
      .catch((error) => {
        console.log(error);
      });
    },
    youtubeAccountClick(id, img, official_page_id) {
      check_youtube_channel_token(id).then(res=>{
        return res.data
      }).then(res=>{
        return this.youtubeSelectCurrentLive(res.token)
      }).then(res=>{
        this.yt_channel_id = official_page_id
        // console.log(this.campaignEntrydata.youtube.chosenPageInfo)
        this.youtubeOverlappingModalPreview = false;
        this.ytAvatar = img;
      }).catch(error => {
        this.youtubeOverlappingModalPreview = false;
          switch (error.status) {
              case 500:
                  alert('Oops! Something went wrong when fetch data. Please contact tech support.')
                  break
              case 404:
                  error.json().then(e => alert(e.detail))
                  break
              case 400:
                  error.json().then(e => alert(e.message))
                  break
              case 401:
                  // error.json().then(e => console.log(e))
                  this.$router.push(`/seller/login/`);
          }
      })

    },
    youtubeSelectCurrentLive(yt_page_token) {
      get_yt_live_media(yt_page_token)
      .then((response) => {
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
      this.$router.push(`/seller/campaign-live/${this.EntryCampaignId}`);
    },

    chooseFacebookLive(post_id) {
      this.fb_post_id = post_id
      this.facebookPageSelected = true
    },
    chooseInstagramLive(live_media_id) {
      this.ig_live_media_id = live_media_id
      this.instagramPageSelected = true
    },
    chooseYoutubeLive(live_video_id) {
      this.yt_live_video_id = live_video_id
      this.youtubePageSelected = true
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