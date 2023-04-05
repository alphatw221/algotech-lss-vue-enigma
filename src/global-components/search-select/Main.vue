<template>
    <div class="relative" ref="dropdownElement">
        <div v-if="displayName" class="form-control min-h-[40px] cursor-text border-[1px] px-5 py-2 bg-white" @click="showDropdown()" >{{ displayName }}</div>
        <div v-else class="form-control min-h-[40px] cursor-text border-[1px] px-5 py-2 bg-white " @click="showDropdown()">{{ props.initialName }}</div>

        <div v-show="dropdownShow"  class="absolute box top-[100%] form-control z-50 border-[1px] border-slate-200">
            <div class="pt-2 px-2 pb-1">
                <input type="text"
                class="form-control"
                :placeholder="props.placeholder"
                v-model="searchText"

                    @keydown.enter.prevent="search()"
                >
            </div>
            
            <!-- <div class="flex flex-row cursor-pointer px-3 py-1 hover:bg-slate-400" @click="deSelectOption()" >
                無
            </div> -->
            
            <div v-for="option, optionIndex in props.defaultOptions" :key="optionIndex" class="flex flex-row flex-wrap cursor-pointer px-3 py-1 hover:bg-slate-400" @click="selectDefaultOption(optionIndex, option)" 

            :class="{'bg-primary':option?.[props.optionValueKey]==props.modelValue}">

                <div v-for="optionNameKey, optionNameKeyIndex in props.optionNameKeys" :key="optionNameKeyIndex" >
                    {{ option?.[optionNameKey] }}
                </div>
            </div>


            <div v-for="option, optionIndex in options" :key="optionIndex" class="flex flex-row flex-wrap cursor-pointer px-3 py-1 hover:bg-slate-400" @click="selectOption(optionIndex, option)" 

            :class="{'bg-primary':option?.[props.optionValueKey]==props.modelValue}">

                <template v-for="optionNameKey, optionNameKeyIndex in props.optionNameKeys" :key="optionNameKeyIndex">
                    <span v-if="optionNameKeyIndex!=0" class="mx-1">|</span>
                    <div >
                        {{ option?.[optionNameKey] }}
                    </div>
                    
                </template>
                
            </div>
        </div>
    </div>
    

</template>
  
<script setup>
    import { computed, watch, defineProps, ref, onMounted, onBeforeUnmount } from "vue";


    import { useRoute, useRouter } from "vue-router";
    const router = useRouter()
    const route = useRoute()

    const props = defineProps({
        placeholder: {
            type: String,
            default: "",
        },
        modelValue: {
            type: [String, Number],
            default: "",
        },
        searchFunction:{
            type:Function,
            default:()=>{}
        },
        optionNameKeys:{
            type:Array,
            default:['name']
        },  
        optionValueKey:{
            type:String,
            default:'id'
        },
        initialName:{
            type:String,
            default:'無'
        },
        routerParamKey:{
            type:String,
            default:null
        },
        defaultOptions:{
            type:Array,
            default:[]
        }

    });

    const dropdownShow = ref(false)
    const options = ref(null)
    const searchText = ref('')
    const displayName = ref(null)
    const emits = defineEmits();
    const dropdownElement = ref(null)


    const handleClickOutSide = (elRef, onClickOutside) => {
        if (!elRef) return;
        const handler = (e) => {
            // 注意一下，如果是在 setup 中使用 vue.ref 取得 dom，那麼必須使用 el.value 提取 dom
            const el = elRef.value;
            if (!el) return;
            if (!el.contains(e.target)) {
            if (typeof onClickOutside === 'function') {
                onClickOutside();
            }
            }
        };
        onMounted(() => {
            window.addEventListener('click', handler);
        });
        onBeforeUnmount(() => {
            window.removeEventListener('click', handler);
        });
    };


    handleClickOutSide(dropdownElement,()=>{
        dropdownShow.value = false
    })

    const search = ()=>{

        props.searchFunction(searchText.value, route.params?.[props.routerParamKey]).then(res=>{
            options.value = res.data.results
        })
    }

    const showDropdown = ()=>{
        if(options.value==null){
            search()
        }
        dropdownShow.value = true
    }

   const deSelectOption = ()=>{
        updateModelValue(null)
        displayName.value = '無'
        dropdownShow.value = false
   }

    const selectDefaultOption = (index, option)=>{


        updateModelValue(option?.[props.optionValueKey])
        
        const _displayName = []
        props.optionNameKeys.forEach(optionNameKey => {
            _displayName.push(option?.[optionNameKey])
        });
        displayName.value = _displayName.join('-')
        dropdownShow.value = false


    }



    const selectOption = (optionIndex, option)=>{
        updateModelValue(option?.[props.optionValueKey])
        
        const _displayName = []
        props.optionNameKeys.forEach(optionNameKey => {
            _displayName.push(option?.[optionNameKey])
        });
        displayName.value = _displayName.join('-')
        dropdownShow.value = false
    }

    const updateModelValue = (value)=>{
        emits('update:modelValue', value)
        emits('change', value)
    }

</script>
  