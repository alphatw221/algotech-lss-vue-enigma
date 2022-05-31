<template>
  <!-- OUTTER BOX -->
  <div class="intro-y chat grid grid-cols-12 gap-5">
    <!-- BEGIN: commit box -->
    <div class="col-span-12">
      <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-2">
        <div class="switch-toggle switch-3 switch-candy col-start-1 m-2">
          <input id="on" name="state-d" type="radio" checked="checked"/>
          <label for="on" @click="status_change('schedule')" style="width: 100px; font-size:14px;">Scheduled</label>
          <input id="na" name="state-d" type="radio" class="my-0" />
          <label for="na" @click="status_change('history')" style="width: 100px; font-size:14px;">History</label>
          <input id="off" name="state-d" type="radio" />
          <label for="off" @click="status_change('ongoing')" style="width: 100px; font-size:14px;">Ongoing</label>
        </div>
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
            @click="facebookOverlappingModalPreview = true"
            class="btn w-48 btn-primary mr-3"
          >
            Select Page
          </button>
          <input
            id="modal-form-1"
            type="text"
            class="form-control"
            placeholder=""
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
            @click="youtubeOverlappingModalPreview = true"
            class="btn w-48 btn-primary mr-3"
          >
            Select Page
          </button>
          <input
            id="modal-form-1"
            type="text"
            class="form-control"
            placeholder=""
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
            @click="instagramOverlappingModalPreview = true"
            class="btn w-48 btn-primary mr-3"
          >
            Select Page
          </button>
          <input
            id="modal-form-1"
            type="text"
            class="form-control"
            placeholder=""
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
            <div
              @click="facebookAccountClick(fbimg1)"
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
                alt="Midone Tailwind HTML Admin Template"
                src="@/assets/images/lss-img/kuaimai-avatar.jpeg"
              />
            </div>
            <span
              @click="facebookAccountClick(fbimg1)"
              class="col-span-6 text-lg content-center"
            >
              Kuai Mai
            </span>

            <div
              @click="facebookAccountClick(fbimg2)"
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
              <img alt="Midone Tailwind HTML Admin Template" :src="fbimg2" />
            </div>
            <span
              @click="facebookAccountClick(fbimg2)"
              class="col-span-6 text-lg"
            >
              Nick Lian
            </span>

            <div
              @click="facebookAccountClick(fbimg3)"
              class="
                w-14
                flex-none
                image-fit
                rounded-md
                overflow-hidden
                col-start-1 col-span-2
              "
            >
              <img alt="Midone Tailwind HTML Admin Template" :src="fbimg3" />
            </div>
            <span
              @click="facebookAccountClick(fbimg3)"
              class="col-span-6 text-lg"
            >
              Live Show Seller
            </span>
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
            <div
              @click="youtubeAccountClick(ytimg1)"
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
              <img alt="Midone Tailwind HTML Admin Template" :src="ytimg1" />
            </div>
            <span
              @click="youtubeAccountClick(ytimg2)"
              class="col-span-6 text-lg"
            >
              Beboo Feng
            </span>
            <div
              @click="youtubeAccountClick(ytimg2)"
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
              <img alt="Midone Tailwind HTML Admin Template" :src="ytimg2" />
            </div>
            <span
              @click="youtubeAccountClick(ytimg3)"
              class="col-span-6 text-lg"
            >
              Jennifer Nicholson
            </span>
            <div
              @click="youtubeAccountClick(ytimg3)"
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
              <img alt="Midone Tailwind HTML Admin Template" :src="ytimg3" />
            </div>
            <span @click="youtubeAccountClick()" class="col-span-6 text-lg">
              Maureen Hiatt
            </span>
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
            <div
              @click="instagramAccountClick(igimg1)"
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
              <img alt="Midone Tailwind HTML Admin Template" :src="igimg1" />
            </div>
            <span
              @click="instagramAccountClick(igimg1)"
              class="col-span-6 text-lg"
            >
              Alejandro Gonzalez
            </span>
            <div
              @click="instagramAccountClick(igimg2)"
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
              <img alt="Midone Tailwind HTML Admin Template" :src="igimg2" />
            </div>
            <span
              @click="instagramAccountClick(igimg2)"
              class="col-span-6 text-lg"
            >
              David Tsui
            </span>
            <div
              @click="instagramAccountClick(igimg3)"
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
              <img alt="Midone Tailwind HTML Admin Template" :src="igimg3" />
            </div>
            <span
              @click="instagramAccountClick(igimg3)"
              class="col-span-6 text-lg"
            >
              Fushia Liu
            </span>
          </div>
        </ModalBody>
      </Modal>
      <!-- END: Select Instagram Profile Page -->

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

      searchColumns: {
        keywords: [
          { text: "Title", value: "title" },
          { text: "Time", value: "time" },
          { text: "Platform", value: "platform" },
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
    };
  },
  mounted() {
    this.$cookies.set("access_token","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0NTA2NDc0LCJpYXQiOjE2NTM5MDE2NzQsImp0aSI6IjMzZTJjNGQ2YzdhZjRhNzBiYjI1OTYxYTUxNTRmMmRlIiwidXNlcl9pZCI6NzcsImRhdGEiOnsiYXV0aF91c2VyX2lkIjo3Nywic2VsbGVyX2lkIjo5MCwiY3VzdG9tZXJfaWQiOjEwNCwibmFtZSI6IkplcmVteSBDaG91IiwiZW1haWwiOiJqZXJlbXljaG91QGFjY29sYWRlZ2xvYmFsLm5ldCJ9fQ.biiHaWAFjED1nEib9jeT5ncO5lGTBJNjVg9T5IH6vc4");
    this.eventBus.on("entryPoint", (payload) => {
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

    facebookAccountClick(img) {
      this.facebookOverlappingModalPreview = false;
      this.facebookPageSelected = true;
      this.fbAvatar = img;
    },

    youtubeAccountClick(img) {
      this.youtubeOverlappingModalPreview = false;
      this.youtubePageSelected = true;
      this.ytAvatar = img;
    },

    instagramAccountClick(img) {
      this.instagramOverlappingModalPreview = false;
      this.instagramPageSelected = true;
      this.igAvatar = img;
    },

    cancelClean() {
      this.enterIDModalPreview = false;
      this.facebookPageSelected = false;
      this.youtubePageSelected = false;
      this.instagramPageSelected = false;
    },
    closeJump() {
      this.enterIDModalPreview = false;
      this.$router.push("campaign-live");
    },
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