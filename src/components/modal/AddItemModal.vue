<template>
  <Modal
    size="modal-lg"
    :show="addItemPopupModalPreview"
    @hidden="addItemPopupModalPreview = false"
  >
    <a
      @click="addItemPopupModalPreview = false"
      class="absolute right-0 top-0 mt-3 mr-3"
      href="javascript:;"
    >
      <XIcon class="w-8 h-8 text-slate-400" />
    </a>
    <ModalBody class="p-0">
      <div class="grid grid-cols-12 gap-5 mt-5 pt-5 border-t">
        <a
          v-for="(product, key) in listItems"
          :key="key"
          href="javascript:;"
          class="intro-y block col-span-6 lg:col-span-4 2xl:col-span-auto"
        >
          <div class="box rounded-md p-3 relative zoom-in ">
            <div
              class="
                flex-none
                relative
                block
                before:block before:w-full before:pt-[100%]
              "
            >
              <div class="absolute top-0 left-0 w-full h-full image-fit">
                <img class="rounded-md" :src="product.image" />
              </div>
            </div>
            <div class="block font-medium text-center truncate mt-3">
              {{ product.name }}
            </div>
            <div class="block font-medium text-center truncate mt-3">
              {{ product.price }}
            </div>
            <div class="block font-medium text-center truncate mt-3">
              <select
                class="
                  form-select
                  py-3
                  px-6
                  box
                  w-full
                  lg:w-auto
                  mt-3
                  lg:mt-0
                  ml-auto
                " 
              >
                <option v-for="num in product.limit">{{ num }}</option>
              </select>
            </div>
          </div>
        </a>
      </div>
      <div class="px-5 pb-8 text-center">
        <button type="button" @click="toEnterID" class="btn btn-primary w-24">
          Comfirm
        </button>
      </div>
    </ModalBody>
  </Modal>
</template>

<script>
export default {
  props: {
    product: Array,
  },
  data() {
    return {
      listItems: this.product,
      addItemPopupModalPreview: false,
    };
  },
  mounted() {
    this.eventBus.on("addPoint", (payload) => {
      this.addItemPopupModalPreview = true;
    });
  },
  unmounted() {
    this.eventBus.off("addPoint");
  },
};
</script>
