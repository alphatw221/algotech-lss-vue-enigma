<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Modal</h2>
  </div>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="intro-y col-span-12 lg:col-span-6">
  
      <!-- BEGIN: Stock> Catagory> Create New Category -->
      <PreviewComponent class="intro-y mt-5">
        <div class="p-5">
          <Preview>
            <!-- BEGIN: Modal Toggle -->
            <div class="text-center">
              <a
                href="javascript:;"
                @click="createCategoryModalPreview = true"
                class="btn btn-primary"
                >Create New Category</a
              >
            </div>
            <!-- END: Modal Toggle -->
            <!-- BEGIN: Modal Content -->
            <Modal
              :show="createCategoryModalPreview"
              @hidden="createCategoryModalPreview = false"
            >
              <ModalHeader>
                <h2 class="font-medium text-base mr-auto">Create New Category</h2>
                 <a
                    @click="createCategoryModalPreview = false"
                    class="absolute right-0 top-0 mt-3 mr-3"
                    href="javascript:;"
                  >
                    <XIcon class="w-8 h-8 text-slate-400" />
                  </a>
              </ModalHeader>
              <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="col-span-12">
                  <label for="modal-form-1" class="form-label">Name</label>
                  <input
                    id="modal-form-1"
                    type="text"
                    class="form-control"
                    placeholder=""
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  type="button"
                  @click="createCategoryModalPreview = false"
                  class="btn btn-outline-secondary w-20 mr-1"
                >
                  Cancel
                </button>
                <button type="button" class="btn btn-primary w-20">Save</button>
              </ModalFooter>
            </Modal>
            <!-- END: Modal Content -->
          </Preview>
        </div>
      </PreviewComponent>
      <!-- END: Stock> Catagory> Create New Category -->

      <!-- BEGIN: Create Campaign> Edit Product -->
      <PreviewComponent class="intro-y mt-5">
        <div class="p-5">
          <Preview>
            <!-- BEGIN: Modal Toggle -->
            <div class="text-center">
              <a
                href="javascript:;"
                @click="editProductModalPreview = true"
                class="btn btn-primary"
                >Edit Product</a
              >
            </div>
            <!-- END: Modal Toggle -->
            <!-- BEGIN: Modal Content -->
            <Modal
              :show="editProductModalPreview"
              @hidden="editProductModalPreview = false"
            >
              <ModalHeader>
                <h2 class="font-medium text-base mr-auto">Edit Product</h2>
                 <a
                    @click="editProductModalPreview = false"
                    class="absolute right-0 top-0 mt-3 mr-3"
                    href="javascript:;"
                  >
                    <XIcon class="w-8 h-8 text-slate-400" />
                  </a>
              </ModalHeader>
              <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">      
                <div class="col-span-12">
                  <div class="font-medium text-xl mr-auto">Dark Chocolate Layer Cake</div>
                </div>
                <div class="col-span-12">
                  <label for="modal-form-1" class="form-label">Order Code</label>
                  <input
                    id="modal-form-1"
                    type="text"
                    class="form-control"
                    placeholder=""
                  />
                </div>
                <div class="col-span-12">
                  <label for="modal-form-1" class="form-label">Q'TY For Campaign</label>
                  <input
                    id="modal-form-1"
                    type="text"
                    class="form-control"
                    placeholder=""
                  />
                </div>
                <div class="col-span-12">
                  <label for="modal-form-1" class="form-label">Max Order Q'TY</label>
                  <input
                    id="modal-form-1"
                    type="text"
                    class="form-control"
                    placeholder=""
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  type="button"
                  @click="editProductModalPreview = false"
                  class="btn btn-outline-secondary w-20 mr-1"
                >
                  Cancel
                </button>
                <button type="button" class="btn btn-primary w-20">Save</button>
              </ModalFooter>
            </Modal>
            <!-- END: Modal Content -->
          </Preview>
        </div>
      </PreviewComponent>
      <!-- END: Create Campaign> Edit Product -->

      <!-- BEGIN: Campaign Live> Enter Post ID Alert -->
      <PreviewComponent class="intro-y mt-5">
        <div class="p-5">
          <Preview>
            <!-- BEGIN: Modal Toggle -->
            <div class="text-center">
              <a
                href="javascript:;"
                @click="idPopupModalPreview = true"
                class="btn btn-primary"
                >Post ID Alert</a
              >
            </div>
            <!-- END: Modal Toggle -->
            <!-- BEGIN: Modal Content -->
            <Modal
              :show="idPopupModalPreview"
              @hidden="idPopupModalPreview = false"
            >
              <a
                @click="idPopupModalPreview = false"
                class="absolute right-0 top-0 mt-3 mr-3"
                href="javascript:;"
              >
                <XIcon class="w-8 h-8 text-slate-400" />
              </a>
              <ModalBody class="p-0">
                <div class="p-5 text-center">
                  <div class="text-xl mt-5">Please enter post ID to start live selling.</div>
                </div>
                <div class="px-5 pb-8 text-center">
                  <button
                    type="button"
                    @click="idPopupModalPreview = false"
                    class="btn btn-primary w-24"
                  >
                    Comfirm
                  </button>
                </div>
              </ModalBody>
            </Modal>
            <!-- END: Modal Content -->
          </Preview>
        </div>
      </PreviewComponent>
      <!-- END: Campaign Live> Enter Post ID Alert -->

      <!-- BEGIN: Campaign Live> Enter Post ID -->
      <PreviewComponent class="intro-y mt-5">
        <div class="p-5">
          <Preview>
            <!-- BEGIN: Modal Toggle -->
            <div class="text-center">
              <a
                href="javascript:;"
                @click="enterIDModalPreview = true"
                class="btn btn-primary"
                >Enter Post ID</a
              >
            </div>
            <!-- END: Modal Toggle -->
            <!-- BEGIN: Modal Content -->
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
                <label for="modal-form-1" class="text-lg font-medium mr-5">Facebook</label>
                <div class="col-span-12" style="display:inline-flex">
                  <button
                    type="button"
                    @click="warningModalPreview = false"
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
                <label for="modal-form-1" class="text-lg font-medium mt-3 mr-5">YouTube</label>
                <div class="col-span-12" style="display:inline-flex">
                  <button
                    type="button"
                    @click="warningModalPreview = false"
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
                <label for="modal-form-1" class="text-lg font-medium mt-3 mr-5">Instagram</label>
                <div class="col-span-12" style="display:inline-flex">
                  <button
                    type="button"
                    @click="warningModalPreview = false"
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
              <ModalFooter>
                <button
                  type="button"
                  @click="enterIDModalPreview = false"
                  class="btn btn-outline-secondary w-20 mr-1"
                >
                  Cancel
                </button>
                <button type="button" class="btn btn-primary w-20">Save</button>
              </ModalFooter>
            </Modal>
            <!-- END: Modal Content -->
          </Preview>
        </div>
      </PreviewComponent>
      <!-- END: Campaign Live> Enter Post ID -->

      <!-- BEGIN: Lucky Draw> Create New Animation -->
      <PreviewComponent class="intro-y mt-5">
        <div class="p-5">
          <Preview>
            <!-- BEGIN: Modal Toggle -->
            <div class="text-center">
              <a
                href="javascript:;"
                @click="createAnimationModalPreview = true"
                class="btn btn-primary"
                >Create New Animation</a
              >
            </div>
            <!-- END: Modal Toggle -->
            <!-- BEGIN: Modal Content -->
            <Modal
              size="modal-lg"
              :show="createAnimationModalPreview"
              @hidden="createAnimationModalPreview = false"
            >
              <ModalHeader>
                <h2 class="font-medium text-base mr-auto">Create New Animation</h2>
                 <a
                    @click="createAnimationModalPreview = false"
                    class="absolute right-0 top-0 mt-3 mr-3"
                    href="javascript:;"
                  >
                    <XIcon class="w-8 h-8 text-slate-400" />
                  </a>
              </ModalHeader>
              <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">     
                <label for="modal-form-1" class="text-lg font-medium mr-5">Name</label>
                <div class="col-span-12">
                  <input
                    id="modal-form-1"
                    type="text"
                    class="form-control mb-3"
                    placeholder=""
                  />
                   <Dropzone
                    ref-key="dropzoneMultipleRef"
                    :options="{
                      url: 'https://httpbin.org/post',
                      thumbnailWidth: 150,
                      maxFilesize: 0.5,
                      headers: { 'My-Awesome-Header': 'header value' },
                    }"
                    class="dropzone"
                    >
                    <div class="text-lg font-medium">
                      Drop files here or click to upload.
                    </div>
                    <div class="text-gray-600">
                       Accepted Image Files: jpeg./ png./ jpg.
                    </div>
                    <div class="text-gray-600">
                       Maximun File Size: 20MB
                    </div>
                  </Dropzone>
                </div> 
              </ModalBody>
              <ModalFooter>
                <button
                  type="button"
                  @click="createAnimationModalPreview = false"
                  class="btn btn-outline-secondary w-20 mr-1"
                >
                  Cancel
                </button>
                <button type="button" class="btn btn-primary w-20">Save</button>
              </ModalFooter>
            </Modal>
            <!-- END: Modal Content -->
          </Preview>
        </div>
      </PreviewComponent>
      <!-- END: Lucky Draw> Create New Animation -->

    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";

const basicModalPreview = ref(false);
const smallModalSizePreview = ref(false);
const mediumModalSizePreview = ref(false);
const largeModalSizePreview = ref(false);
const superlargeModalSizePreview = ref(false);
const programmaticallyModal = ref(false);
const warningModalPreview = ref(false);
const buttonModalPreview = ref(false);
const staticBackdropModalPreview = ref(false);
const overlappingModalPreview = ref(false);
const nextOverlappingModalPreview = ref(false);
const deleteModalPreview = ref(false);
const successModalPreview = ref(false);
const tinySliderModalPreview = ref(false);
const createCategoryModalPreview = ref(false);
const editProductModalPreview = ref(false);
const idPopupModalPreview = ref(false);
const enterIDModalPreview = ref(false);
const createAnimationModalPreview = ref(false);
</script>
