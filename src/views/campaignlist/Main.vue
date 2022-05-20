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
          <button class="btn btn-primary-soft w-11 col-start-1 m-2 rounded-full">
            <SearchIcon />
          </button>
          <button class="btn btn-primary-soft w-11 col-start-1 m-2 rounded-full">
            <FilterIcon />
          </button>
        </div>
      </div>

      <div class="box">
        <div class="overflow-x-auto">
          <table class="table table-report mt-5">
            <thead>
              <tr>
                <th class="whitespace-nowrap text-center" v-for="column in columns" :key="column.key">
                  {{ column.name }}
                </th>
                <!--<th class="text-center whitespace-nowrap">Edit</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(campaign, key) in results" :key="key" class="intro-x">
                <td class="w-32">
                  <div class="flex">
                    <div class="w-10 h-10 image-fit zoom-in">
                      <Tippy tag="img" class="rounded-full" :src="campaign.image" :content="`Uploaded at`" />
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  {{ campaign.platform }}
                </td>
                <td class="text-center">
                  {{ campaign.title }}
                </td>
                <td class="text-center">
                  {{ campaign.time }}
                </td>
                <td class="items-center">
                  <a class="flex items-center ml-20" href="javascript:;">
                    <ListIcon class="w-4 h-4" />
                  </a>
                </td>
                <td class="text-center">
                  <div class="
                      form-check form-switch
                      w-full
                      sm:w-auto sm:ml-auto
                      mt-3
                      sm:mt-0
                    ">
                    <input @click="toggle" class="form-check-input mr-0 ml-20" type="checkbox" />
                  </div>
                </td>
                <td class="text-center">
                  <button class="btn btn-elevated-rounded-pending w-24 mr-1 mb-2" @click="idPopupModalPreview = true">
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
        </div>
      </div>
    </div>

    <!-- Modal ID Popup -->
    <Modal :show="idPopupModalPreview" @hidden="idPopupModalPreview = false">
      <a @click="idPopupModalPreview = false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
        <XIcon class="w-8 h-8 text-slate-400" />
      </a>
      <ModalBody class="p-0">
        <div class="p-5 text-center">
          <div class="text-xl mt-5">Please enter post ID to start live selling.</div>
        </div>
        <div class="px-5 pb-8 text-center">
          <button type="button" @click="toEnterID" class="btn btn-primary w-24">
            Comfirm
          </button>
        </div>
      </ModalBody>
    </Modal>
    <!--Modal Enter Post ID -->
    <Modal size="modal-lg" :show="enterIDModalPreview" @hidden="enterIDModalPreview = false">
      <ModalHeader>
        <h2 class="font-medium text-base mr-auto">Enter Post ID</h2>
        <a @click="enterIDModalPreview = false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
          <XIcon class="w-8 h-8 text-slate-400" />
        </a>
      </ModalHeader>
      <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
        <div class="col-span-12 items-end" style="display:inline-flex">
          <label for="modal-form-1" class="text-lg font-medium  mr-5">Facebook</label>
          <div v-show="facebookPageSelected" class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
            <img alt="Midone Tailwind HTML Admin Template" :src="fbAvatar" />
          </div>
        </div>
        <div class="col-span-12" style="display:inline-flex">
          <button type="button" href="javascript:;" @click="facebookOverlappingModalPreview = true"
            class="btn w-48 btn-primary mr-3">
            Select Page
          </button>
          <input id="modal-form-1" type="text" class="form-control" placeholder="" />
        </div>
        <div class="col-span-12 items-end" style="display:inline-flex">
          <label for="modal-form-1" class="text-lg font-medium  mr-5">YouTube</label>
          <div v-show="youtubePageSelected" class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
            <img alt="Midone Tailwind HTML Admin Template" :src="ytAvatar" />
          </div>
        </div>
        <div class="col-span-12" style="display:inline-flex">
          <button type="button" href="javascript:;" @click="youtubeOverlappingModalPreview = true"
            class="btn w-48 btn-primary mr-3">
            Select Page
          </button>
          <input id="modal-form-1" type="text" class="form-control" placeholder="" />
        </div>
        <div class="col-span-12 items-end" style="display:inline-flex">
          <label for="modal-form-1" class="text-lg font-medium  mr-5">Instagram</label>
          <div v-show="instagramPageSelected" class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
            <img alt="Midone Tailwind HTML Admin Template" :src="igAvatar" />
          </div>
        </div>
        <div class="col-span-12" style="display:inline-flex">
          <button type="button" href="javascript:;" @click="instagramOverlappingModalPreview = true"
            class="btn w-48 btn-primary mr-3">
            Select Page
          </button>
          <input id="modal-form-1" type="text" class="form-control" placeholder="" />

        </div>

      </ModalBody>
      <!-- BEGIN: Select Facebook Fan Page -->
      <Modal :show="facebookOverlappingModalPreview" @hidden="facebookOverlappingModalPreview = false">
        <ModalBody class="text-left content-center">
          <div class="intro-y grid grid-cols-12 gap-5 my-5">
            <div @click="facebookAccountClick(fbimg1)"
              class="w-14 h-14 flex-none image-fit rounded-md overflow-hidden col-start-1 col-span-2 ">
              <img alt="Midone Tailwind HTML Admin Template" src="@/assets/images/lss-img/kuaimai-avatar.jpeg" />
            </div>
            <span @click="facebookAccountClick(fbimg1)" class="col-span-6 text-lg content-center"> Kuai Mai </span>

            <div @click="facebookAccountClick(fbimg2)"
              class="w-14 h-14 flex-none image-fit rounded-md overflow-hidden col-start-1 col-span-2">
              <img alt="Midone Tailwind HTML Admin Template" :src="fbimg2" />
            </div>
            <span @click="facebookAccountClick(fbimg2)" class="col-span-6 text-lg"> Nick Lian </span>

            <div @click="facebookAccountClick(fbimg3)"
              class="w-14 flex-none image-fit rounded-md overflow-hidden col-start-1 col-span-2">
              <img alt="Midone Tailwind HTML Admin Template" :src="fbimg3" />
            </div>
            <span @click="facebookAccountClick(fbimg3)" class="col-span-6 text-lg"> Live Show Seller </span>
          </div>
        </ModalBody>
      </Modal>
      <!-- END: Select Facebook Fan Page -->

      <!-- BEGIN: Select YouTube Channel Page -->
      <Modal :show="youtubeOverlappingModalPreview" @hidden="youtubeOverlappingModalPreview = false">
        <ModalBody class="text-left align-middle">
          <div class="intro-y grid grid-cols-12 gap-5 my-5">
            <div @click="youtubeAccountClick(ytimg1)"
              class="w-14 h-14 flex-none image-fit rounded-md overflow-hidden col-start-1 col-span-2">
              <img alt="Midone Tailwind HTML Admin Template" :src="ytimg1" />
            </div>
            <span @click="youtubeAccountClick(ytimg2)" class="col-span-6 text-lg"> Beboo Feng </span>
            <div @click="youtubeAccountClick(ytimg2)"
              class="w-14 h-14 flex-none image-fit rounded-md overflow-hidden col-start-1 col-span-2">
              <img alt="Midone Tailwind HTML Admin Template" :src="ytimg2" />
            </div>
            <span @click="youtubeAccountClick(ytimg3)" class="col-span-6 text-lg"> Jennifer Nicholson </span>
            <div @click="youtubeAccountClick(ytimg3)"
              class="w-14 h-14 flex-none image-fit rounded-md overflow-hidden col-start-1 col-span-2">
              <img alt="Midone Tailwind HTML Admin Template" :src="ytimg3" />
            </div>
            <span @click="youtubeAccountClick()" class="col-span-6 text-lg"> Maureen Hiatt </span>
          </div>
        </ModalBody>
      </Modal>
      <!-- END: Select Select YouTube Channel Page -->

      <!-- BEGIN: Select Instagram Profile Page -->
      <Modal :show="instagramOverlappingModalPreview" @hidden="instagramOverlappingModalPreview = false">
        <ModalBody class="text-left">
          <div class="intro-y grid grid-cols-12 gap-5 my-5">
            <div @click="instagramAccountClick(igimg1)"
              class="w-14 h-14 flex-none image-fit rounded-md overflow-hidden col-start-1 col-span-2">
              <img alt="Midone Tailwind HTML Admin Template" :src="igimg1" />
            </div>
            <span @click="instagramAccountClick(igimg1)" class="col-span-6 text-lg"> Alejandro Gonzalez </span>
            <div @click="instagramAccountClick(igimg2)"
              class="w-14 h-14 flex-none image-fit rounded-md overflow-hidden col-start-1 col-span-2">
              <img alt="Midone Tailwind HTML Admin Template" :src="igimg2" />
            </div>
            <span @click="instagramAccountClick(igimg2)" class="col-span-6 text-lg"> David Tsui </span>
            <div @click="instagramAccountClick(igimg3)"
              class="w-14 h-14 flex-none image-fit rounded-md overflow-hidden col-start-1 col-span-2">
              <img alt="Midone Tailwind HTML Admin Template" :src="igimg3" />
            </div>
            <span @click="instagramAccountClick(igimg3)" class="col-span-6 text-lg"> Fushia Liu </span>
          </div>
        </ModalBody>
      </Modal>
      <!-- END: Select Instagram Profile Page -->

      <ModalFooter>
        <button type="button" class="btn btn-outline-secondary w-20 mr-1" @click="cancelClean()">
          Cancel
        </button>
        <button type="button" class="btn btn-primary w-20" @click="closeJump">Save</button>
      </ModalFooter>
    </Modal>


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
      idPopupModalPreview: false,
      enterIDModalPreview: false,
      facebookOverlappingModalPreview: false,
      youtubeOverlappingModalPreview: false,
      instagramOverlappingModalPreview: false,
      facebookPageSelected: false,
      instagramPageSelected: false, 
      youtubePageSelected: false,  

      fbAvatar: '', 
      fbimg1:'/src/assets/images/lss-img/kuaimai-avatar.jpeg',
      fbimg2:'/src/assets/images/profile-1.jpg',
      fbimg3:'/src/assets/images/lss-logo/LSS_logo_words.png',
      ytAvatar: '',
      ytimg1:'/src/assets/images/lss-img/beboo-avatar.png',
      ytimg2:'/src/assets/images/profile-2.jpg',
      ytimg3:'/src/assets/images/profile-3.jpg',
      igAvatar: '',
      igimg1:'/src/assets/images/profile-4.jpg',
      igimg2:'/src/assets/images/profile-5.jpg',
      igimg3:'/src/assets/images/profile-6.jpg',
      columns: [
        { name: "Fan Page", key: "page" },
        { name: "Platform", key: "platform" },
        { name: "Title", key: "title" },
        { name: "Time", key: "time" },
        { name: "Manage Order", key: "manager_order" },
        { name: "Stop Checkout", key: "stop" },
        { name: " ", key: "entry" },
        { name: " ", key: "edit" },
      ],
      results: [
        {
          image: "",
          platform: "",
          title: "uuaaakjdkh",
          time: "2022/07/08",
        },
        {
          image: "",
          platform: "",
          title: "test0708",
          time: "2022/07/08",
        },
        {
          image: "",
          platform: "",
          title: "test0101",
          time: "2022/01/01",
        },
        {
          image: "",
          platform: "",
          title: "test1231",
          time: "2022/12/31",
        },
        {
          image: "",
          platform: "",
          title: "UU",
          time: "2022/07/08",
        },
      ],
    };
  },
  methods: {
    toEnterID() {
      this.idPopupModalPreview = false
      this.enterIDModalPreview = true
    },

    facebookAccountClick(img){
      this.facebookOverlappingModalPreview = false
      this.facebookPageSelected = true
      this.fbAvatar = img
    },

    youtubeAccountClick(img){
      this.youtubeOverlappingModalPreview = false
      this.youtubePageSelected = true
      this.ytAvatar = img
    },

    instagramAccountClick(img){
      this.instagramOverlappingModalPreview = false
      this.instagramPageSelected = true
      this.igAvatar = img
    },

    cancelClean(){
      this.enterIDModalPreview = false
      this.facebookPageSelected = false
      this.youtubePageSelected = false
      this.instagramPageSelected = false
    },
    closeJump(){
      this.enterIDModalPreview = false
      this.$router.push('campaign-live')
    }
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

  .switch-toggle input+label {
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

  .switch-toggle input:checked+label {
    background: #055770;
    height: 42px;
    width: 100px;
    border-radius: 42px 42px;
  }
</style>