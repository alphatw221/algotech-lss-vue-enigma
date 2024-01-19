import dom from "@left4code/tw-starter/dist/js/dom";
import TomSelect from "tom-select";

const setValue = (el, props) => {

  // console.log(`set value length ${props.modelValue.length}`)
  // if (props.modelValue.length) {
  //   dom(el).val(props.modelValue);
  // }
  // console.log(props.modelValue)
  
  // dom(el).val(props.modelValue);
  // if(props.modelValue==0){
  //   console.log(el)
  // }
  el.value = props.modelValue
};

const init = (originalEl, clonedEl, props, emit, computedOptions) => {
  // On option add
  if (Array.isArray(props.modelValue)) {
    computedOptions = {
      onOptionAdd: function (value) {
        // Add new option
        const newOption = document.createElement("option");
        newOption.value = value;
        newOption.text = value;
        originalEl.add(newOption);

        // Emit option add
        emit("optionAdd", value);
      },
      ...computedOptions,
    };
  }

  clonedEl.TomSelect = new TomSelect(clonedEl, computedOptions);

  // //Initial Value
  // emit("update:modelValue", props.modelValue);
  // On change
  clonedEl.TomSelect.on("change", function (selectedItems) {
    emit("update:modelValue", selectedItems);
  });
};

const reInit = (originalEl, clonedEl, props, emit, computedOptions) => {
  clonedEl.TomSelect.destroy();
  dom(clonedEl).html(dom(clonedEl).prev().html());
  setValue(clonedEl, props);
  init(originalEl, clonedEl, props, emit, computedOptions);
};

export { setValue, init, reInit };
