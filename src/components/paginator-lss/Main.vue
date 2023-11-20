<template>
    <nav class="w-full sm:w-auto sm:mr-auto">
    <ul class="pagination">
        <li class="page-item">
            <button class="page-link" @click="changePage(1)">
                <ChevronsLeftIcon class="w-4 h-4" />
            </button>
        </li>

        <li class="page-item" >
            <button class="page-link btn"  @click="lastPage()">
                <ChevronLeftIcon class="w-4 h-4" />
            </button>
        </li>

        <li class="page-item" v-if="props.modelValue.page-2>=1">
            <button class="page-link btn" @click="changePage(props.modelValue.page-2)">
                ...
            </button>
        </li>

        <li class="page-item" v-if="props.modelValue.page-1>=1">
            <button class="page-link btn"  @click="(e)=>{e.target?.blur();changePage(props.modelValue.page-1);}">
                {{ props.modelValue.page -1}}
            </button>
        </li>

        <li class="page-item active">
            <button class="page-link btn" >{{ props.modelValue.page }}</button>
        </li>

        <li class="page-item" v-if="props.modelValue.page+1<=computedTotalPage">
            <button class="page-link btn" @click="(e)=>{e.target?.blur();changePage(props.modelValue.page+1);}">
                {{ props.modelValue.page +1}}
            </button>
        </li>

        <li class="page-item" v-if="props.modelValue.page+2<=computedTotalPage">
            <button class="page-link btn" @click="changePage(props.modelValue.page+2)">
                ...
            </button>
        </li>

        <li class="page-item" >
            <button class="page-link btn" @click="nextPage()">
                <ChevronRightIcon class="w-4 h-4" />
            </button>
        </li>

        <li class="page-item">
            <button class="page-link btn" @click="changePage(computedTotalPage)">
                <ChevronsRightIcon class="w-4 h-4" />
            </button>
        </li>
    </ul>
    </nav>
</template>

<script setup>
import { ref, defineProps, computed, defineEmits } from "vue";
const props = defineProps({
    modelValue:Object,
    actions:Object
})

const emits = defineEmits(['update:modelValue'])

const updateModelValue = ()=>{
  emits('update:modelValue', props.modelValue)
}

const changePage = (page)=>{
    props.modelValue.page = page
    updateModelValue()
    props.actions.get()
}

const lastPage = ()=>{
    if(props.modelValue.page-1>=1) changePage(props.modelValue.page-1)
}
const nextPage = ()=>{
    if(props.modelValue.page+1<=computedTotalPage.value) changePage(props.modelValue.page+1)
}
const computedTotalPage = computed(()=>{
    return Math.ceil(props.modelValue.dataCount/props.modelValue.size)
})

</script>
