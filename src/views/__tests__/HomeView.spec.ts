import {mount, RouterLinkStub} from '@vue/test-utils';
import {beforeEach, describe, expect, it} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {useMovieStore} from '@/stores/movies';
import HomeView from '@/views/HomeView.vue';
import IStarSolid from '@/components/icons/IStarSolid.vue';
import UISelect from '@/components/ui/UISelect.vue';

describe('HomeView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders movie list', () => {
    const movieStore = useMovieStore();
    movieStore.movies = [
      {
        id: 1,
        title: 'Movie 1',
        year: 2021,
        genre: 'Drama',
        rating: 8,
        description: 'Description 1',
        imageUrl: 'http://example.com/image1.jpg',
      },
      {
        id: 2,
        title: 'Movie 2',
        year: 2022,
        genre: 'Comedy',
        rating: 7,
        description: 'Description 2',
        imageUrl: 'http://example.com/image2.jpg',
      },
    ];

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterLink: RouterLinkStub,
          IStarSolid,
          UISelect,
        },
      },
    });

    const movieCards = wrapper.findAll('.movie-card');
    expect(movieCards.length).toBe(11);
    expect(movieCards[0].text()).toContain('Фуриоса: Хроники Безумного Макса2024');
    expect(movieCards[1].text()).toContain('Планета обезьян: Новое царство');
  });

  it('sorts movies by date', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterLink: RouterLinkStub,
          IStarSolid,
          UISelect,
        },
      },
    });

    await wrapper.vm.$nextTick();

    const movieStore = useMovieStore();
    movieStore.movies = [
      {
        id: 1,
        title: 'Movie 1',
        year: 2021,
        genre: 'Drama',
        rating: 8,
        description: 'Description 1',
        imageUrl: 'http://example.com/image1.jpg',
      },
      {
        id: 2,
        title: 'Movie 2',
        year: 2022,
        genre: 'Comedy',
        rating: 7,
        description: 'Description 2',
        imageUrl: 'http://example.com/image2.jpg',
      },
    ];

    await wrapper.setData({sortingValue: 0});

    const movieCards = wrapper.findAll('.movie-card');
    expect(movieCards[0].text()).toContain('Movie 2');
    expect(movieCards[1].text()).toContain('Movie 1');
  });

  it('sorts movies by name', async () => {
    const movieStore = useMovieStore();
    movieStore.movies = [
      {
        id: 1,
        title: 'Alpha Movie',
        year: 2021,
        genre: 'Drama',
        rating: 8,
        description: 'Description 1',
        imageUrl: 'http://example.com/image1.jpg',
      },
      {
        id: 2,
        title: 'Beta Movie',
        year: 2022,
        genre: 'Comedy',
        rating: 7,
        description: 'Description 2',
        imageUrl: 'http://example.com/image2.jpg',
      },
    ];

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterLink: RouterLinkStub,
          IStarSolid,
          UISelect,
        },
      },
    });

    await wrapper.setData({sortingValue: 1});

    const movieCards = wrapper.findAll('.movie-card');
    expect(movieCards[0].text()).toContain('Alpha Movie');
    expect(movieCards[1].text()).toContain('Beta Movie');
  });

  it('sorts movies by rating', async () => {
    const movieStore = useMovieStore();
    movieStore.movies = [
      {
        id: 1,
        title: 'Movie 1',
        year: 2021,
        genre: 'Drama',
        rating: 7,
        description: 'Description 1',
        imageUrl: 'http://example.com/image1.jpg',
      },
      {
        id: 2,
        title: 'Movie 2',
        year: 2022,
        genre: 'Comedy',
        rating: 8,
        description: 'Description 2',
        imageUrl: 'http://example.com/image2.jpg',
      },
    ];

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterLink: RouterLinkStub,
          IStarSolid,
          UISelect,
        },
      },
    });

    await wrapper.setData({sortingValue: 2});

    const movieCards = wrapper.findAll('.movie-card');
    expect(movieCards[0].text()).toContain('Movie 2');
    expect(movieCards[1].text()).toContain('Movie 1');
  });

  it('handles image error correctly', async () => {
    const movieStore = useMovieStore();
    movieStore.movies = [
      {
        id: 1,
        title: 'Movie 1',
        year: 2021,
        genre: 'Drama',
        rating: 8,
        description: 'Description 1',
        imageUrl: 'http://example.com/image1.jpg',
      },
    ];

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterLink: RouterLinkStub,
          IStarSolid,
          UISelect,
        },
      },
    });

    const img = wrapper.find('.movie-card__image');
    await img.trigger('error');

    expect(img.attributes('src')).toBe('https://placehold.co/250x350?text=No%20image');
  });
});
