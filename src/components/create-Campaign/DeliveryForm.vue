<template class="grid grid-cols-12 gap-5 w-full">
        <div class="col-start-1 text-sm col-span-12 lg:text-[15px] 2xl:text-[16px]">
      <div class="relative">
        <u class="text-lg"> Delivery</u>
        <a class="absolute top-0 right-0 text-[15px]" @click="editDelivery = true"> Edit</a>
        <div class="flex mt-2">
          <span class="w-52"> Delivery Charge</span>
          <span> USD $20</span>
        </div>
        <div class="flex">
          <span class="w-52"> Free Delivery Charge Above</span>
          <span> USD $200</span>
        </div>
        <div class="flex">
          <span class="w-52"> Free Delivery for Minimum</span>
          <span> 10 Items</span>
        </div>
        <div class="flex flex-wrap">
          <span class="w-52">Delivery Charge Option</span>
          <div class="grid grid-cols-2">
            <span class="col-start-1 mr-3">Express Delivery </span>
            <span class="col-start-2"> ---------- USD $35</span>

            <span class="col-start-1 mr-3">Overseas </span>
            <span class="col-start-2"> ---------- USD $35</span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-1 relative">
        <u class="col-start-1 col-span-12 text-lg mt-5 mb-2"> Collect In Store</u>
        <a class="absolute top-0 right-0 text-[15px]" @click="editPickup = true"> Edit</a>
        <span class="col-start-1 col-span-12 lg:col-span-4 2xl:col-span-4"> Pickup Store/Pickup Address</span>
        <span class="col-start-1 col-span-2 lg:col-start-5  lg:col-span-1 2xl:col-start-5 2xl:col-span-1">Store 1</span>
        <span class="col-start-1 col-span-12 lg:col-start-6 lg:col-span-6 2xl:col-start-6 2xl:col-span-6">2401
          Utah Avenue South Seattle, Washington, U.S.</span>
        <span class="col-start-1 col-span-2 lg:col-start-5 lg:col-span-1 2xl:col-start-5 2xl:col-span-1">Store 2</span>
        <span class="col-start-1 col-span-12 lg:col-start-6 lg:col-span-6 2xl:col-start-6 2xl:col-span-6">2401
          Utah Avenue South Seattle, Washington, U.S.</span>
        <span class="col-start-1 col-span-2 lg:col-start-5  lg:col-span-1 2xl:col-start-5 2xl:col-span-1">Store 3</span>
        <span class="col-start-1 col-span-12 lg:col-start-6 lg:col-span-6 2xl:col-start-6 2xl:col-span-6">2401
          Utah Avenue South Seattle, Washington, U.S.</span>
      </div>
      <label for="regular-form-2" class="form-label col-start-1 col-span-1 mt-5"> Choose pickup start & end date
      </label>
      <v-date-picker class="mb-5" v-model="pickupPeriod" :timezone="timezone" mode="dateTime"
        :model-config="pickupConfig" is-range is-required>
        <template v-slot="{ inputValue, inputEvents }">
          <div class="flex justify-start ml-10 items-center">
            <input :value="inputValue.start" v-on="inputEvents.start"
              class="form-control border h-10 px-2 py-1 rounded focus:outline-none focus:border-indigo-300" />
            <ChevronsRightIcon class="w-8 h-8 m-1" />
            <input :value="inputValue.end" disabled
              class="form-control border h-10 px-2 py-1 rounded focus:outline-none focus:border-indigo-300" />
          </div>
        </template>
      </v-date-picker>
      <div class="relative">
        <u class="text-lg mt-5"> Delivery Note</u>
        <a class="absolute top-0 right-0 text-[15px]" @click="editNotes = false"> Edit</a>
        <textarea class="form-control flex w-[90%] indent-4 h-48 m-5 " :readonly="editNotes ? true : null">
                Delivery NoteDelivery NoteDelivery NoteDelivery NoteDelivery NoteDelivery Note
                Delivery NoteDelivery NoteDelivery NoteDelivery NoteDelivery NoteDelivery Note
            </textarea>
        <button v-show="!editNotes" class="btn btn-rounded absolute bottom-0 right-2" @click="editNotes = true">
          Submit </button>
      </div>
    </div>
      <!-- Modals-->
  <Modal :show="editDelivery" @hidden="editDelivery = false">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Create New Category</h2>
      <a @click="editDelivery = false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
        <XIcon class="w-8 h-8 text-slate-400" />
      </a>
    </ModalHeader>
    <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
      <div class="col-span-12">
        <label for="modal-form-1" class="form-label">Name</label>
        <input id="modal-form-1" type="text" class="form-control" placeholder="" />
      </div>
      <div class="col-span-12">
        <label for="modal-form-1" class="form-label">Name</label>
        <input id="modal-form-1" type="text" class="form-control" placeholder="" />
      </div>
      <div class="col-span-12">
        <label for="modal-form-1" class="form-label">Name</label>
        <input id="modal-form-1" type="text" class="form-control" placeholder="" />
      </div>
    </ModalBody>
    <ModalFooter>
      <button type="button" @click="editDelivery = false" class="btn btn-outline-secondary w-20 mr-1">
        Cancel
      </button>
      <button type="button" class="btn btn-primary w-20">Save</button>
    </ModalFooter>
  </Modal>

    <Modal :show="editPickup" @hidden="editPickup = false">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Create New Category</h2>
      <a @click="editPickup = false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
        <XIcon class="w-8 h-8 text-slate-400" />
      </a>
    </ModalHeader>
    <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
      <div class="col-span-12">
        <label for="modal-form-1" class="form-label">Name</label>
        <input id="modal-form-1" type="text" class="form-control" placeholder="" />
      </div>
      <div class="col-span-12">
        <label for="modal-form-1" class="form-label">Name</label>
        <input id="modal-form-1" type="text" class="form-control" placeholder="" />
      </div>
      <div class="col-span-12">
        <label for="modal-form-1" class="form-label">Name</label>
        <input id="modal-form-1" type="text" class="form-control" placeholder="" />
      </div>
    </ModalBody>
    <ModalFooter>
      <button type="button" @click="editPickup = false" class="btn btn-outline-secondary w-20 mr-1">
        Cancel
      </button>
      <button type="button" class="btn btn-primary w-20">Save</button>
    </ModalFooter>
  </Modal>
</template>

<script>

export default{
    data() {
        return {
            editDelivery: false,
            editPickup: false,
            editNotes: true,
            pickupPeriod: {
                start: new Date(),
                end: new Date(),
            },
            pickupConfig: {
                start: {
                    timeAdjust: "",
                },
                end: {
                    timeAdjust: "",
                },
            },
        };
    },
}

</script>