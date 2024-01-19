<template >
  <template v-if="props.modelValue">

    <div class="mt-3" v-if="props.setting.type==='images'">
      <label class="form-label">{{ props.setting.name }}</label>
      <div class="flex flex-wrap px-4">
        <template v-for="image,imageIndex in (props.modelValue?.[props.setting.key]||[])" :key="imageIndex">
          <div
            class="w-24 h-24 relative image-fit mb-5 mr-5 cursor-pointer zoom-in"
          >
            <img
              class="rounded-md"
              alt="Midone Tailwind HTML Admin Template"
              :src="image.image"
            />
            <Tippy
              tag="div"
              content="刪除圖片？"
              class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
            >
              <xIcon class="w-4 h-4" @click="props.action[props.setting.remove_action](imageIndex)"/>
            </Tippy>
          </div>
        </template>
      </div>

      <Dropzone :ref-key="props.setting.ref" :options="{
                        thumbnailWidth: 150,
                        method: 'put',
                        url:'url',
                        uploadMultiple: false,
                        maxFilesize: 10,
                        addRemoveLinks: true,
                        autoQueue: true,
                        autoProcessQueue: false,
                        resizeQuality: 0.5,
                        acceptedFiles: 'image/*',

                      }" class="dropzone" >

          <div class="text-lg font-medium">
              拖曳或點擊來上傳
          </div>
      </Dropzone>
    </div>

    <div class="mt-3" v-else-if="props.setting.type==='image'">
      <label class="form-label">{{ props.setting.name }}</label>

      <div class="flex justify-center">
        <div
          class="relative w-fit" v-if="props.modelValue?.[props.setting.key]"
        >
          <img
            class="rounded-md object-cover max-w-[250px]"
            alt="Midone Tailwind HTML Admin Template"
            :src="props.modelValue?.[props.setting.key]"
          />
          <Tippy
            tag="div"
            content="刪除圖片？"
            class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
          >
            <xIcon class="w-4 h-4" @click="props.action[props.setting.remove_action]()"/>
          </Tippy>
        </div>
      </div>
      


<!-- 
      <div class="flex flex-wrap px-4" v-if="props.modelValue?.[props.setting.key]">

          <div
            class="relative image-fit mb-5 mr-5 cursor-pointer zoom-in"
          >
            <img
              class="rounded-md"
              alt="Midone Tailwind HTML Admin Template"
              :src="props.modelValue?.[props.setting.key]"
            />
            <Tippy
              tag="div"
              content="刪除圖片？"
              class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
            >
              <xIcon class="w-4 h-4" @click="props.action[props.setting.remove_action]()"/>
            </Tippy>
          </div>

      </div> -->

      <Dropzone v-show="!props.modelValue?.[props.setting.key]" :ref-key="props.setting.ref" :options="{
                        thumbnailWidth: 150,
                        method: 'put',
                        url:'url',
                        maxFiles: 1,
                        uploadMultiple: false,
                        maxFilesize: 10,
                        addRemoveLinks: true,
                        autoQueue: true,
                        autoProcessQueue: false,
                        resizeQuality: 0.5,
                        acceptedFiles: 'image/*',

                      }" class="dropzone" >

          <div class="text-lg font-medium">
              Drag/Click to upload
          </div>
      </Dropzone>
    </div>


    <div class="mt-3" v-else-if="props.setting.type==='single_image'" :class="props.setting.class">
      <label class="form-label">{{ props.setting.name }}</label>

      <div class="flex justify-center items-center border-slate border-[1px] min-h-[100px]">
        <div
          class="relative w-fit" v-if="props.modelValue?.[props.setting.key]"
        >
          <img
            class="rounded-md object-cover "
            alt="Midone Tailwind HTML Admin Template"
            :src="props.modelValue?.[props.setting.key]"
          />
          <Tippy
            tag="div"
            content="刪除圖片？"
            class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
          >
            <xIcon class="w-4 h-4" @click="props.action[props.setting.remove_action](props.setting.index)"/>
          </Tippy>
        </div>

        <div
          class="relative w-fit" v-else-if="props.modelValue?._preview"
        >
          <img
            class="rounded-md object-cover "
            alt="Midone Tailwind HTML Admin Template"
            :src="props.modelValue?._preview"
          />
          <Tippy
            tag="div"
            content="刪除圖片？"
            class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
          >
            <xIcon class="w-4 h-4" @click="props.action[props.setting.remove_action](props.setting.index)"/>
          </Tippy>
        </div>

        <button class="btn btn-primary h-[30px]" @click="props.action[props.setting.click_action](props.setting.index)" v-else> 上傳</button>
        <input :ref="el=>props.action[props.setting.set_ref_action](props.setting.index, el)" type="file"  accept="image/*" hidden @change="props.action[props.setting.change_action]($event, props.setting.index)">
      </div>
      
      
    </div>


    <div class="mt-3" v-else-if="props.setting.type==='input'" :class="props.setting.class">
      <label class="form-label">{{ props.setting.name }}</label>
      <div class="input-group">
        <input
          :type="props.setting.inputType"
          class="form-control "
          :placeholder="props.setting.placeholder"
          v-model="props.modelValue[props.setting.key]"
          @change="updateModelValue()"
        />
        <div  class="input-group-text" v-if="props.setting.unit">{{ props.setting.unit }}</div>
      </div>  
      <p class="text-red-600" v-for="e,i in (props?.error?.[props.setting?.key]||[])" :key="i">{{ e?.$message||'' }}</p>

    </div>  

    <div  v-else-if="props.setting.type==='text'" :class="props.setting.class">
      <label class="form-label">{{  props.modelValue[props.setting.key] }}</label>

    </div>  

    <div  v-else-if="props.setting.type==='label'" :class="props.setting.class">
      <label class="form-label">{{  props.setting.name }}</label>
    </div>  

    <div v-else-if="props.setting.type==='display'" :class="props.setting.class">
      <label class="form-label" :class="props?.setting?.label_class" v-if="props?.setting?.name">{{ props.setting.name }}</label>
      <span v-if="props?.setting?.delimeter">{{  props?.setting?.delimeter||'' }}</span>
      <span v-if="props?.modelValue?.[props?.setting?.key]" :class="props?.setting?.data_class">
        
        <span v-if="props?.setting?.prefix">{{  props?.setting?.prefix||'' }}</span>
        <span v-if="props.setting.displayType=='text'">{{  props.modelValue[props.setting.key] }}</span>
        <span v-else-if="props.setting.displayType=='datetime'">{{  new Date(props.modelValue[props.setting.key]).toLocaleString() }}</span>
        <img  v-else-if="props.setting.displayType=='image'" :src="props.modelValue[props.setting.key]" alt="">
          

        <span :class="props?.setting?.classes?.[props.modelValue[props.setting.key]]" v-else-if="props?.setting?.displayType=='map'">{{  props?.setting?.map?.[props.modelValue[props.setting.key]] }}</span>
        <span>{{  props?.setting?.postfix||'' }}</span>

      </span>
      
    </div>  

    <div class="mt-3" v-else-if="props.setting.type==='tags'" :class="props.setting.class">
      <label class="form-label">{{ props.setting.name }}</label>
      <TomSelect
        :options="{
          placeholder:(props.setting.placeholder||''),
          ...props.setting.configs||{}
        }"
        v-model="props.modelValue[props.setting.key]"
        class="w-full"
        multiple
        @select="updateModelValue()"
        @change="updateModelValue()"
      >
        <option :value="item" v-for="item, itemIndex in props.modelValue[props.setting.key]" :key="itemIndex">{{ item }}</option>
      </TomSelect>
      <p class="text-red-600" v-for="e,i in (props?.error?.[props.setting?.key]||[])" :key="i">{{ e?.$message||'' }}</p>

    </div>

    <div class="mt-3" v-else-if="props.setting.type==='select'" :class="props.setting.class">
      <label class="form-label">{{ props.setting.name }}</label>
      <TomSelect
        :options="{
          placeholder:(props.setting.placeholder||''),
          ...props.setting.configs||{}
        }"
        v-model="props.modelValue[props.setting.key]"
        :multiple="props.setting.multiple"
        class="w-full"
        @select="updateModelValue();"
        @change="updateModelValue();"
      >
        <option :value="null" v-if="!props.setting.multiple" ></option>
        <template  v-for="option, optionIndex in props.setting.options" :key="optionIndex">
          <option :value="option[props.setting.value_key]" >{{ option[props.setting.name_key] }}</option>
        </template>
        <!-- <option :value="option[props.setting.value_key]" v-for="option, optionIndex in props.setting.options" :key="optionIndex">{{ option[props.setting.name_key] }}</option> -->
      </TomSelect>
      <p class="text-red-600" v-for="e,i in (props?.error?.[props.setting?.key]||[])" :key="i">{{ e?.$message||'' }}</p>

    </div>

    <div class="mt-3" v-else-if="props.setting.type==='search_select'" :class="props.setting.class">
      <label class="form-label">{{ props.setting.name }}</label>

      <SearchSelect
        v-model="props.modelValue[props.setting.key]"
        :placeholder="props.setting.placeholder"
        :searchFunction="props.setting.search_function"
        :optionNameKeys="props.setting.option_name_keys"
        :optionValueKey="props.setting.option_value_key"
        :initialName="props.modelValue[props.setting.display_key]"
        :routerParamKey="props.setting.router_param_key"
        :defaultOptions="props.setting.options"
      />
      <p class="text-red-600" v-for="e,i in (props?.error?.[props.setting?.key]||[])" :key="i">{{ e?.$message||'' }}</p>

    </div>

    
    <div class="mt-3" v-else-if="props.setting.type==='nested_select'" :class="props.setting.class">
      <label class="form-label">{{ props.setting.name }}</label>
      <TomSelect
        :options="{
          placeholder:(props.setting.placeholder||''),
          ...props.setting.configs||{}
        }"
        v-model="props.modelValue[props.setting.key]"
        class="w-full"
        @select="updateModelValue()"
        @change="updateModelValue()"
      >
        <option :value="null" ></option>
        <optgroup :label="group[props.setting.group_key]" v-for="group, groupIndex in props.setting.groups" :key="groupIndex">
          <option :value="option[props.setting.value_key]" v-for="option, optionIndex in group[props.setting.option_key]" :key="optionIndex">{{ option[props.setting.name_key] }}</option>
        </optgroup>
      </TomSelect>
      <p class="text-red-600" v-for="e,i in (props?.error?.[props.setting?.key]||[])" :key="i">{{ e?.$message||'' }}</p>

    </div>


    <div class="mt-3" v-else-if="props.setting.type==='date'" :class="props.setting.class">
      <label class="form-label">{{ props.setting.name }}</label>
      <Litepicker v-model="props.modelValue[props.setting.key]" :options="{
          format:'YYYY-MM-DD',
          autoApply: true,
          showWeekNumbers: true,
          lang:'zh',
          dropdowns: {
            minYear: 2000,
            maxYear: null,
            months: true,
            years: true,
          },
        }" class="form-control w-full block " />
        <p class="text-red-600" v-for="e,i in (props?.error?.[props.setting?.key]||[])" :key="i">{{ e?.$message||'' }}</p>

    </div>


    <div class="mt-3" v-else-if="props.setting.type==='datetime'" :class="props.setting.class">
      <label class="form-label">{{ props.setting.name }}</label>
      <DatetimePickerLSS v-model="props.modelValue[props.setting.key]"/>
      <p class="text-red-600" v-for="e,i in (props?.error?.[props.setting?.key]||[])" :key="i">{{ e?.$message||'' }}</p>

    </div>


    <div class="mt-3" v-else-if="props.setting.type==='date_range'" :class="props.setting.class">
      <label class="form-label">{{ props.setting.name }}</label>
      <Litepicker v-model="props.modelValue[props.setting.key]" :options="{
        format:'YYYY-MM-DD',
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
      }" class="form-control w-[190px] block " />
      <p class="text-red-600" v-for="e,i in (props?.error?.[props.setting?.key]||[])" :key="i">{{ e?.$message||'' }}</p>

    </div>





    <div class="mt-3" v-else-if="props.setting.type==='toggle'" :class="props.setting.class">
      <label class="form-label">{{ props.setting.name }}</label>
      <div class="form-switch mt-2">
        <input type="checkbox" class="form-check-input" v-model="props.modelValue[props.setting.key]" @change="updateModelValue()"/>
      </div>
      <p class="text-red-600" v-for="e,i in (props?.error?.[props.setting?.key]||[])" :key="i">{{ e?.$message||'' }}</p>

    </div>


    <div class="mt-3" v-else-if="props.setting.type==='ckeditor_classic'">
      <label class="form-label">{{ props.setting.name }}</label>
      <div class="mt-2">
        <ClassicEditor 
        v-model="props.modelValue[props.setting.key]" 
        :config="editorConfig" 
        @change="updateModelValue()"/>
      </div>
      <p class="text-red-600" v-for="e,i in (props?.error?.[props.setting?.key]||[])" :key="i">{{ e?.$message||'' }}</p>

    </div> 

    <div class="mt-3" v-else-if="props.setting.type==='textarea'" :class="props.setting.class">
      <label class="form-label">{{ props.setting.name }}</label>

      <div class="mt-2">
        <textarea class="form-control w-full p-2" v-model="props.modelValue[props.setting.key]"></textarea>

      </div>
      <p class="text-red-600" v-for="e,i in (props?.error?.[props.setting?.key]||[])" :key="i">{{ e?.$message||'' }}</p>

    </div> 



    <div class="" :class="props.setting.class" v-else-if="props.setting.type==='buttons'">
      <button type="button" class="btn" v-for="button, buttonIndex in props.setting.buttons" :key="buttonIndex" :class="button.class" @click="props.action[button.action](props.setting.index)">
        {{ button.name }}
      </button>
    </div>

    <!-- <div class="mt-3" :class="props.setting.class" v-else-if="props.setting.type==='hex_color'">
      <label class="form-label">{{ props.setting.name }}</label>
      <ColorPickerKingPork
        v-model="props.modelValue[props.setting.key]"
      >
      </ColorPickerKingPork>
    </div> -->

    <template v-else-if="props.setting.type==='inline'">
        <div class="flex flex-row" :class="props.setting.class">
            <FormItem v-for="inlineItem, index in props.setting.inline_items" :key="index" :setting="inlineItem" :action="action" v-model="props.modelValue" :error="props.error"></FormItem>
        </div>
    </template>


    <template v-else-if="props.setting.type=='accordion_textarea'">

            <div class="flex flex-col border-slate-200 border-[1px] p-5 rounded-md" ref="edit_textarea" :class="props.setting.class">

              <div class="flex flex-row gap-2 justify-start" >
                  <label class="form-label text-base font-medium"> {{props.setting.name}}</label> 
                  <div class="ml-auto">
                      <Tippy  :content="$t('settings.notes.modify')" :options="{ theme: 'light' }"> <SimpleIcon class="cursor-pointer" icon="edit" color="#334155" 
                        @click="editing()"/> </Tippy>
                  </div>
              </div>

              <textarea 
                rows="8"
                cols="40"
                class="h-48 p-2 mr-5 form-control"
                :placeholder="props.setting.placeholder"
                v-model="props.modelValue[props.setting.key]"
                v-if="editTextArea"
                @blur="()=>{editTextArea=false}"
              >
              </textarea>
              <p class="text-slate-400 break-all w-full whitespace-pre-line" v-else> {{props.modelValue?.[props.setting?.key]||'Not Yet Set'}}</p>
                <!-- <div class="flex flex-row gap-2 justify-start" v-else>
                    <label class="form-label text-base font-medium"> {{props.setting.name}}</label> 
                    <div class="ml-auto">
                        <Tippy  :content="$t('settings.notes.modify')" :options="{ theme: 'light' }"> <SimpleIcon icon="edit" color="#334155" 
                          @click="editing()"/> </Tippy>
                    </div>

                    <p class="text-slate-400 break-all w-full whitespace-pre-line"> {{props.modelValue[props.setting.key]}}</p>

                </div> -->
            </div>
            <p class="text-red-600" v-for="e,i in (props?.error?.[props.setting?.key]||[])" :key="i">{{ e?.$message||'' }}</p>

    </template>

   
    <div v-else></div>




  </template>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import FormItem from './FormItem.vue'

// import Cookies from 'js-cookie';
import { useRoute, useRouter } from "vue-router";

// import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

import { useCookies } from "vue3-cookies";

// import VueDatePicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css'
// import DatetimePickerLSS from '../../global-components/datetime-picker-lss/Main.vue'

const { cookies } = useCookies();
const router = useRouter()
const route = useRoute()

const props = defineProps({
    setting:Object,
    modelValue:{
      type:Object,
      default:{}
  },
    action:Object,
    error:Object

})

const edit_textarea = ref(null)
const editTextArea = ref(false)
const handleClickOutside = (event)=>{
  if(!edit_textarea.value.contains(event?.target)){
    editTextArea.value = false
    document.removeEventListener("click", handleClickOutside,true)
  }
}
const editing = ()=>{
  editTextArea.value = true
  document.addEventListener("click", handleClickOutside,true);
}


const emits = defineEmits(['update:modelValue'])

const updateModelValue = ()=>{
  emits('update:modelValue', props.modelValue)
}


const editorConfig = {
  // toolbar:['mediaEmbed'],
  // mediaEmbed: {"previewsInData": "true"},
  mediaEmbed: {previewsInData: "true"},
  simpleUpload: {
      // The URL that the images are uploaded to.
      // uploadUrl: `http://localhost:8000/api/v1/store/${route.params.store_id}/image/ckeditor/upload/`,

      uploadUrl: `${location.protocol}//${location.host}/api/v1/store/${route.params.store_id}/image/ckeditor/upload/`,

      // Enable the XMLHttpRequest.withCredentials property.  
      // withCredentials: true,

      // Headers sent along with the XMLHttpRequest to the upload server.
      headers: {
          'HTTP_X_CSRFTOKEN': cookies.get('csrftoken'),
          Authorization: `Bearer ${cookies.get('user_access_token')}`
      }
    }
}

</script>

<style setup>
  .ck-editor__main{
    overflow-y: scroll;
    height:70vh;
  }
</style>