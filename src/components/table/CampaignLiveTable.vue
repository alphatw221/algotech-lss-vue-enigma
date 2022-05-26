<template>
    <div v-for="item in listItems" :key="item.pk"  class="intro-x cursor-pointer relative flex items-center p-3">
        <Tippy class="rounded-full" content="Reply" theme='light'>
            <div class="w-12 h-12 flex-none image-fit mr-1">
                <img alt="" class="rounded-full zoom-in" :src="item.fields.image" />
                <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
                </div>
            </div>
        </Tippy>
        <div class="ml-2 overflow-hidden">
            <div class="flex items-center">
                <a href="javascript:;" class="font-medium zoom-in">Kuai.mai</a>
                <div class="text-xs text-slate-400 ml-auto">

                </div>
            </div>
            <div class="w-full truncate text-slate-500 mt-0.5">
                {{ item.fields.message }}
            </div>
        </div>
    </div>
</template>


<script>
import { axiosInstance, createAxiosWithBearer } from "@/libs/axiosClient";
import { get_comments } from "@/api/campaign_comment"

export default {
  props: {
    requestUrl: String,
    columns: Array,
    routerParam: String,
  },
  data() {
    return {
      status: this.routerParam,
      order_by: "created_at",
      campaign_id: this.$route.params.campaign_id,
      listItems: []
    };
  },
  mounted() {
      console.log(this.campaign_id)
      this.eventBus.on("commentStatus", (payload) => {
    //   this.status = payload.status;
      this.get_campaign_comments(payload.status);
    });

  },
  unmounted() {
    this.eventBus.off("commentStatus"); 
  },

  methods: {
    url_param() {
      let param = "";
      [ "campaign_id",
        "status"
      ].forEach((v) => {
        if (this[v]) param += `&${v}=${this[v]}`;
      });
      return param.substr(1, param.length);
    },
    search() {
      createAxiosWithBearer()
        .get(`${this.requestUrl}?${this.url_param()}`)
        .then((response) => {
          console.log(this.listItems);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_campaign_comments(status) {
        console.log("in");
        console.log(status)
        get_comments(this.campaign_id, status)
        .then((response) => {
            console.log(response);
            this.listItems = response.data
            console.log(response.data);
            var array = response.data;
            for (var i = 0; i<array.length; i++) {
                const item = array[i];
                console.log(i, item.fields.main_categories);
            }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeEntry() {
      this.eventBus.emit("entryPoint", {idPopupModalPreview: true})
    }
  },
};
</script>