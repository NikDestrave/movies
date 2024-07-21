<template>
  <div class="custom-select">
    <select v-model="selectedValue" @change="handleChange">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';

interface Option {
  value: number;
  label: string;
}

const props = defineProps<{
  options: Option[];
  modelValue: string | number;
}>();

const emit = defineEmits(['update:modelValue']);

const selectedValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  newValue => {
    selectedValue.value = newValue;
  }
);

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<style lang="scss">
.custom-select {
  select {
    background-color: #0f172a;
    border: 1px solid #1e293b;
    font-size: 14px;
    color: #cbd5e1;
    border-radius: 6px;
    padding: 6px 8px;
    cursor: pointer;

    &:focus {
      border-color: #66afe9;
      outline: none;
      box-shadow: 0 0 5px rgba(102, 175, 233, 0.6);
    }
  }
}
</style>
