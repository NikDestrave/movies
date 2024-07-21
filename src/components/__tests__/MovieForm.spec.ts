import {mount} from '@vue/test-utils';
import {createRouter, createWebHistory, useRouter} from 'vue-router';
import {describe, expect, it, beforeEach} from 'vitest';
import MovieForm from '@/components/MovieForm.vue';
import {routes} from '../../router';
import {createPinia, setActivePinia} from 'pinia';

describe('MovieForm.vue', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders form', async () => {
    await router.push('/add');
    await router.isReady();

    const wrapper = mount(MovieForm, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('validates required fields', async () => {
    await router.push('/add');
    await router.isReady();

    const wrapper = mount(MovieForm, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.findAll('.error').length).toBeGreaterThan(0);
  });
});