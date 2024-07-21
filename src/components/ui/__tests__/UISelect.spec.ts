import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import UISelect from '../UISelect.vue';

describe('CustomSelect.vue', () => {
  const options = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3' },
  ];

  it('renders options correctly', () => {
    const wrapper = mount(UISelect, {
      props: {
        options,
        modelValue: 1,
      },
    });

    const selectOptions = wrapper.findAll('option');
    expect(selectOptions.length).toBe(options.length);

    selectOptions.forEach((optionWrapper, index) => {
      expect(optionWrapper.text()).toBe(options[index].label);
      expect(optionWrapper.attributes('value')).toBe(String(options[index].value));
    });
  });

  it('updates modelValue on change', async () => {
    const wrapper = mount(UISelect, {
      props: {
        options,
        modelValue: 1,
      },
    });

    const select = wrapper.find('select');
    await select.setValue(2);
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([2]);
  });

  it('reacts to modelValue prop change', async () => {
    const wrapper = mount(UISelect, {
      props: {
        options,
        modelValue: 1,
      },
    });

    await wrapper.setProps({ modelValue: 2 });
    const select = wrapper.find('select');
    expect(select.element.value).toBe('2');
  });
});
