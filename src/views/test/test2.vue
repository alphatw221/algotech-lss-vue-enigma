<template>
<!-- OUTTER BOX --> 
  <div class="intro-y chat grid grid-cols-12 gap-5" style="height: 725px">
    <!-- BEGIN: commit box -->
    <div class="col-span-12">
        <div class="box p-2 intro-y grid grid-cols-12 gap-5 mt-5 p-2"> 
            <div class="switch-toggle switch-3 switch-candy col-start-1 m-2">
                <input id="on" name="state-d" type="radio" checked="checked" />
                <label for="on" onclick="" style="width:100px;">History</label>
                <input id="na" name="state-d" type="radio" checked="" class="my-0" />
                <label for="na" onclick="" style="width:100px;">Scheduled</label>
                <input id="off" name="state-d" type="radio" />
                <label for="off" onclick="" style="width:100px;">Ongoing</label>
            </div>
            <div class="col-end-13 col-span-2 "> 
                <button class="btn btn-primary-soft w-11 col-start-1 m-2 rounded-full">
                    <SearchIcon  />
                </button>
                <button class="btn btn-primary-soft  w-11 col-start-1 m-2 rounded-full">
                    <FilterIcon />
                </button>
            </div>
        </div>
        
        <div class="box">
            <div class="overflow-x-auto">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th class="whitespace-nowrap">#</th>
                            <th class="whitespace-nowrap">First Name</th>
                            <th class="whitespace-nowrap">Last Name</th>
                            <th class="whitespace-nowrap">Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Angelina</td>
                            <td>Jolie</td>
                            <td>@angelinajolie</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Brad</td>
                            <td>Pitt</td>
                            <td>@bradpitt</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Charlie</td>
                            <td>Hunnam</td>
                            <td>@charliehunnam</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div> 
    </div> 
    <div class="box"> 
        <!-- BEGIN: Basic Sticky Notification Content -->
          <Notification
            refKey="basicStickyNotification"
            class=""
          >
            <div class="font-medium m-3">You have an upcoming campaign in 1 hour</div>
            <br>
            <a
              class="font-medium text-primary dark:text-slate-400 mt-1 sm:mt-0 sm:ml-40"
              href=""
              >Start Now</a
            >
            <a
              class="font-medium text-primary dark:text-slate-400 mt-1 sm:mt-0 sm:ml-40"
              href=""
              >Remind me 15 mins before</a
            >
          </Notification>
          <!-- END: Basic Sticky Notification Content -->
          <!-- BEGIN: Notification Toggle -->
          <button
            class="btn btn-primary mt-2 sm:mt-0"
            @click="basicStickyNotificationToggle"
          >
            Show Notification
          </button>
          <!-- END: Notification Toggle -->
          <button
            class="btn btn-primary mt-2 sm:mt-0"
            @click="videoStickyNotificationToggle"
          >
            Show video
          </button>

        <Notification
            refKey="videoStickyNotification"
            class=""
          >
            <video width="400" controls>
                <source src="mov_bbb.mp4" type="video/mp4">
                <source src="mov_bbb.ogg" type="video/ogg">
                Your browser does not support HTML video.
            </video>
        </Notification>
    
    </div>

    </div>
</template>

<script setup>
// import {campaign_comment_summarize} from '@/api/user';
import { ref, provide } from "vue";

// Basic sticky notification
const basicStickyNotification = ref();
provide("bind[basicStickyNotification]", (el) => {
  // Binding
  basicStickyNotification.value = el;
});
const basicStickyNotificationToggle = () => {
  // Show notification
  basicStickyNotification.value.showToast();
};

// Basic sticky notification
const videoStickyNotification = ref();
provide("bind[videoStickyNotification]", (el) => {
  // Binding
  videoStickyNotification.value = el;
});
const videoStickyNotificationToggle = () => {
  // Show notification
  videoStickyNotification.value.showToast();
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
    float:left;
    text-align: center;
    font-weight: 500;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
}
.switch-toggle input:checked + label {
    background: #064e3b;
    height: 42px;
    width: 100px; 
    border-radius: 42px 42px;
}
</style>