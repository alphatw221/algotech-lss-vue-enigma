<template>
  <div class="p-5">

    
    <h2 class="intro-y text-lg font-medium mt-10 mb-5" v-if="props?.title">{{ props.title }}</h2>
    <div class="box p-5">

      <slot :name="'tabs'"></slot>

      <div
        class="intro-y col-span-12 flex flex-wrap items-center my-2 gap-2" v-if="props?.searchBarSettings"
      >
        <template v-for="item, itemIndex in props.searchBarSettings" :key="itemIndex">

          <div class="sm:flex items-center sm:mr-4" v-if="item.type==='select'">
            <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
              >{{ item.name }}</label
            >
            <select
              class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
              v-model="props.modelValue[item.key]"
              @change="updateModelValue(); props.actions.search()"
            >
              <option :value="''" >無</option>
              <option :value="option[item.value_key].toString()" v-for="option, optionIndex in item.options" :key="optionIndex">{{ option[item.name_key] }}</option>
            </select>
          </div>

          <div class="sm:flex items-center sm:mr-4" v-else-if="item.type==='search_select'">
            <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
              >{{ item.name }}</label
            >
            <SearchSelect
              class="w-[150px]"
              v-model="props.modelValue[item.key]"
              :placeholder="item.placeholder"
              :searchFunction="item.search_function"
              :optionNameKeys="item.option_name_keys"
              :optionValueKey="item.option_value_key"
              :initialName="props.modelValue[item.display_key]"
              :routerParamKey="item.router_param_key"
              :defaultOptions="item.options"
              @change="updateModelValue(); props.actions.search()"
            />


          </div>

          <div class="sm:flex items-center sm:mr-4" v-else-if="item.type==='date_range'">
            <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
              >{{ item.name }}</label
            >
            <Litepicker v-model="props.modelValue[item.key]" :options="{
              autoApply: false,
              singleMode: false,
              numberOfColumns: 2,
              numberOfMonths: 2,
              showWeekNumbers: true,
              lang:'zh',
              dropdowns: {
                minYear: 2000,
                maxYear: null,
                months: true,
                years: true,
              },
            }" class="form-control w-[190px] block " @change="updateModelValue(); props.actions.search()"/>

          </div>

          <div class="sm:flex items-center sm:mr-4" v-else-if="item.type==='timezone_datetime'" >
            <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
              >{{ item.name }}</label
            >
            <TimezoneDatetimePicker v-model="props.modelValue[item.key]"/>
          </div>

          <div class="sm:flex items-center sm:mr-4 " v-else-if="item.type==='input'">
            <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
              >{{ item.name }}</label
            >

             <input
                type="text"
                class="form-control w-full mt-2 sm:mt-0"
                :placeholder="item.placeholder"
                v-model="props.modelValue[item.key]"
                @change="updateModelValue(); "
                @keydown.enter.prevent="props.actions.search()"
              />

            <!-- <div class="w-56 relative">
              <input
                type="text"
                class="form-control w-full mt-2 sm:mt-0"
                :placeholder="item.placeholder"
                v-model="props.modelValue[item.key]"
                @change="updateModelValue(); "
                @keydown.enter.prevent="props.actions.search()"
              />
              <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
            </div> -->
            
          </div>

          <div class="sm:flex items-center sm:mr-4 " v-else-if="item.type==='checkbox'">
            <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
              >{{ item.name }}</label
            >

             <input
                type="checkbox"
                class="form-control w-6 h-6 mt-2 sm:mt-0"
                v-model="props.modelValue[item.key]"
                @change="updateModelValue(); props.actions.search();"
              />
            
          </div>



          <button class="btn btn-primary shadow-md mr-2" v-else-if="item.type==='button'" @click="props.actions[item.action]()" :class="item.class">{{ item.name }}</button>

          <Dropdown v-else-if="item.type==='dropdown'">
            <DropdownToggle class="btn px-2 box">
              <span class="w-5 h-5 flex items-center justify-center" v-if="item.name">
                {{ item.name }}
              </span>
              <span class="w-5 h-5 flex items-center justify-center" v-else>
                <PlusIcon class="w-4 h-4" />
              </span>
            </DropdownToggle>
            <DropdownMenu class="w-40">
              <DropdownContent>
                <DropdownItem v-for="action,actionIndex in item.actions" :key="actionIndex" @click="props.actions[action.key]()">
                  {{ action.name }}
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>



          <slot v-if="item.type==='slot'" :name="item.slot_name"></slot>

        </template>

      </div>

      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto " :class="props?.tableClass">
        <table class="table table-report -mt-2 ">
          <thead class="sticky top-0 z-[99]">
            <tr>
              <template  v-for="item, itemIndex in props.dataListSettings" :key="itemIndex">
                <th class="whitespace-nowrap bg-secondary" :class="item.headerClass" v-if="item.type=='checkbox'">
                  <input type="checkbox " class="form-control h-[18px] w-[18px]" @click="props.actions[item.action]($event, null, null)">
                </th>
                <th class="whitespace-nowrap bg-secondary" :class="item.headerClass" v-else>
                 
                  
                  <span>
                      {{ item.name}} 
                  </span>

                  <!-- <HelpCircleIcon class="w-5 tippy-icon inline"  v-if="item?.tippy"/> -->
                  <template v-if="item?.sortable">

                    <template v-if="(props.modelValue?.order_by||'').split(',').includes(item.key)">
                      <ChevronsDownIcon class="ml-3 h-5 w-5 text-white bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50 cursor-pointer inline" 
                        @click="()=>{
                            const fields = (props.modelValue?.order_by||'').split(',');
                            props.modelValue.order_by = fields.map(f=>f==`${item.key}`?`-${item.key}`:f).join(',');
                            updateModelValue();

                            props.actions.get();
                        }" 
                        />
                      <XIcon class="w-5 h-5 text-slate-400 cursor-pointer inline" @click="()=>{

                        const fields = (props.modelValue?.order_by||'').split(',');
                        props.modelValue.order_by = fields.filter(f=>f!=`${item.key}`).join(',');
                        updateModelValue();

                        props.actions.get();
                      }"/>
                    </template>
                    <template v-else-if="(props.modelValue?.order_by||'').split(',').includes('-'+item.key)">
                      <ChevronsUpIcon class="ml-3 h-5 w-5 text-white bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50 cursor-pointer inline" 
                        @click="()=>{
                            const fields = (props.modelValue?.order_by||'').split(',');
                            props.modelValue.order_by = fields.map(f=>f==`-${item.key}`?`${item.key}`:f).join(',');
                            updateModelValue();

                            props.actions.get();
                          }" 
                        />
                      <XIcon class="w-5 h-5 text-slate-400 cursor-pointer inline" @click="()=>{

                        const fields = (props.modelValue?.order_by||'').split(',');
                        props.modelValue.order_by = fields.filter(f=>f!=`-${item.key}`).join(',');
                        updateModelValue();

                        props.actions.get();
                      }"/>
                    </template>
                    <template v-else> 
                      <ChevronDownIcon class="ml-3 h-5 w-5 text-black bg-null opacity-[.85] rounded-full right-[5%] z-50 cursor-pointer inline" @click="()=>{
                        const fields = (props.modelValue?.order_by||'').split(',');
                        fields.push(item.key);
                        
                        props.modelValue.order_by = fields.join(',');
                        updateModelValue();

                        props.actions.get();

                      }" />
                    </template>
                  </template>

                  <Tippy 
                      class="rounded-full  whitespace-wrap  inline w-5" 
                      data-tippy-allowHTML="true" 
                      data-tippy-placement="right" 
                      :content="item.tippy" 
                      v-if="item?.tippy"
                    > 
                      <HelpCircleIcon class="w-5 tippy-icon inline" />
                    </Tippy> 
                 
                </th>
              </template>
              <!-- <th class="whitespace-nowrap" :class="item.headerClass" v-for="item, itemIndex in props.dataListSettings" :key="itemIndex">{{ item.name }}</th> -->
            </tr>
          </thead>

          <tbody >

            
            <tr v-if="(props?.data||[]).length<=0">
              <td colspan="100%">
                <div class=" w-full flex flex-column justify-center p-[150px]">
                  <h1 class="text-slate-500 text-sm md:text-lg font-bold inline">{{ props?.emptyDataMessage||'' }}</h1>
                </div>
              </td>
            </tr>

            <tr class="intro-x" v-for="data, dataIndex in props.data" :key="dataIndex" >
              <template  v-for="item, itemIndex in props.dataListSettings" :key="itemIndex">
                
                <template v-if="item.type==='images'" >
                  <td class="w-40" >
                    <div class="flex" v-for="image, imageIndex in data?.[item.key]||[]" :key="imageIndex">
                      <div class="w-10 h-10 image-fit zoom-in">
                        <img alt="" :src="image.image" data-action="zoom" class="w-full rounded-md" />
                      </div>
                    </div>
                  </td>
                </template>

                <template v-else-if="item.type==='image'" >
                  <td class="w-40" >
                    <div class="w-10 h-10 image-fit zoom-in" v-if="data[item.key]">
                      <img alt="" :src="data[item.key]" data-action="zoom" class="w-full rounded-md" />
                    </div>
                  </td>
                </template>

                <template v-else-if="item.type==='text'" >
                  <td class="w-40" :class="item.class">
                    <p :class="item.classes?.[data[item.key]]||''" v-if="item.dataType=='string'">{{ data[item.key]||'' }}</p>
                    <p :class="item.classes?.[data[item.key]]||''" v-else-if="item.dataType=='integer'">{{ data?.[item.key] }}</p>

                  </td>
                </template>

                <template v-else-if="item.type==='map_text'" >
                  <td class="w-40" :class="item.class">
                    <p :class="item.classes?.[data[item.key]]||''">{{ item.map?.[data[item.key]]||'' }}</p>
                  </td>
                </template>

                <template v-else-if="item.type==='checkbox'" >
                  <td class="w-40" :class="item.class">
                    <input type="checkbox" class="form-control w-[18px]"  v-model="data.check">
                  </td>
                </template>

                <template v-if="item.type==='date'" >
                  <td class="w-40" :class="item.class">
                    <p :class="item.classes?.[data[item.key]]||''">{{ new Date(data[item.key]||'').toLocaleDateString() }}</p>
                  </td>
                </template>

                <template v-if="item.type==='time'" >
                  <td class="w-40" :class="item.class">
                    <p :class="item.classes?.[data[item.key]]||''">{{ new Date(data[item.key]||'').toLocaleTimeString() }}</p>
                  </td>
                </template>

                <template v-if="item.type==='datetime'" >
                  <td class="w-40" :class="item.class">
                    <p :class="item.classes?.[data[item.key]]||''">{{ new Date(data[item.key]||'').toLocaleString() }}</p>
                  </td>
                </template>

                <template v-if="item.type==='list'" >
                  <td class="w-40" :class="item.class">
                    <div v-for="s,i in (data?.[item.key]||[])" :key="i">
                      {{ s }}
                    </div>
                  </td>
                </template>

                <template v-else-if="item.type==='actions'" >
                  <td class="table-report__action w-56">
                    <div class="flex justify-center items-center">

                      <button class="btn border-transparent" 
                      v-for="action, actionIndex in item.actions" 
                      :key="actionIndex"
                      :class="action.class"
                      @click="props.actions[action.action](data, dataIndex)"
                      >
                        {{ action.name }}


                      </button>

                    </div>
                  </td>






                </template>

                <template v-else-if="item.type==='custom'" >
                  <td>
                    <component :is="props.customColumns?.[item.key]" v-model="props.data[dataIndex]" :data="data" :dataIndex="dataIndex" :actions="props.actions"/>
                  </td>
                </template>


              </template>
            </tr>



            <!-- <tr
              v-for="(faker, fakerKey) in $_.take($f(), 9)"
              :key="fakerKey"
              class="intro-x"
            >
              <td class="w-40">
                <div class="flex">
                  <div class="w-10 h-10 image-fit zoom-in">
                    <Tippy
                      tag="img"
                      alt="Midone Tailwind HTML Admin Template"
                      class="rounded-full"
                      :src="faker.images[0]"
                      :content="`Uploaded at ${faker.dates[0]}`"
                    />
                  </div>
                  <div class="w-10 h-10 image-fit zoom-in -ml-5">
                    <Tippy
                      tag="img"
                      alt="Midone Tailwind HTML Admin Template"
                      class="rounded-full"
                      :src="faker.images[1]"
                      :content="`Uploaded at ${faker.dates[1]}`"
                    />
                  </div>
                  <div class="w-10 h-10 image-fit zoom-in -ml-5">
                    <Tippy
                      tag="img"
                      alt="Midone Tailwind HTML Admin Template"
                      class="rounded-full"
                      :src="faker.images[2]"
                      :content="`Uploaded at ${faker.dates[2]}`"
                    />
                  </div>
                </div>
              </td>
              <td>
                <a href="" class="font-medium whitespace-nowrap">{{
                  faker.products[0].name
                }}</a>
                <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                  {{ faker.products[0].category }}
                </div>
              </td>
              <td class="text-center">{{ faker.stocks[0] }}</td>
              <td class="w-40">
                <div
                  class="flex items-center justify-center"
                  :class="{
                    'text-success': faker.trueFalse[0],
                    'text-danger': !faker.trueFalse[0],
                  }"
                >
                  <CheckSquareIcon class="w-4 h-4 mr-2" />
                  {{ faker.trueFalse[0] ? "Active" : "Inactive" }}
                </div>
              </td>
              <td class="table-report__action w-56">
                <div class="flex justify-center items-center">
                  <a class="flex items-center mr-3" href="javascript:;">
                    <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
                  </a>
                  <a
                    class="flex items-center text-danger"
                    href="javascript:;"
                    @click="deleteConfirmationModal = true"
                  >
                    <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                  </a>
                </div>
              </td>
            </tr> -->


          </tbody>
        </table>
      </div>
      <!-- END: Data List -->
      <!-- BEGIN: Pagination -->
      <div
        v-if="props.paginator"
        class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
      >
        <PaginatorLSS
          v-model="props.modelValue"
          :actions="props.actions"
        />

        <select class="w-20 form-select box mt-3 sm:mt-0" 
          v-model="props.modelValue.size" 
          @change="updateModelValue(); props.actions.search()"
        >
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="35">35</option>
          <option :value="50">50</option>
        </select>
      </div>
      <!-- END: Pagination -->
    </div>
    <!-- BEGIN: Delete Confirmation Modal -->
    <!-- <Modal
      :show="deleteConfirmationModal"
      @hidden="deleteConfirmationModal = false"
    >
      <ModalBody class="p-0">
        <div class="p-5 text-center">
          <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
          <div class="text-3xl mt-5">Are you sure?</div>
          <div class="text-slate-500 mt-2">
            Do you really want to delete these records? <br />This process cannot
            be undone.
          </div>
        </div>
        <div class="px-5 pb-8 text-center">
          <button
            type="button"
            @click="deleteConfirmationModal = false"
            class="btn btn-outline-secondary w-24 mr-1"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-danger w-24">Delete</button>
        </div>
      </ModalBody>
    </Modal> -->
    <!-- END: Delete Confirmation Modal -->
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import PaginatorLSS from "../../components/paginator-lss/Main.vue"

const props = defineProps({
  modelValue:Object,
  title:String,
  searchBarSettings:Object,
  dataListSettings:Object,
  emptyDataMessage:String,
  data:Object,
  actions:Object,
  paginator:{
    type:Boolean,
    default:true
  },
  customColumns:Object,
  tableClass:String
})

const emits = defineEmits(['update:modelValue'])

const updateModelValue = ()=>{
  emits('update:modelValue', props.modelValue)
}



</script>

<style scope>



</style>