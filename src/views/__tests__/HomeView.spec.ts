import { mount } from '@vue/test-utils';
import {describe, it, expect, beforeEach} from 'vitest';
import {useMovieStore} from "../../stores/movies";
import HomeView from "../HomeView.vue";
import {createPinia, setActivePinia} from 'pinia';

describe('HomeView.vue', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('renders movie list', () => {
        const movieStore = useMovieStore();
        movieStore.movies = [
            { id: 1, title: 'Movie 1', year: 2021, genre: 'Drama', rating: 8, description: 'Description 1', imageUrl: 'http://example.com/image1.jpg' },
            { id: 2, title: 'Movie 2', year: 2022, genre: 'Comedy', rating: 7, description: 'Description 2', imageUrl: 'http://example.com/image2.jpg' },
        ];

        const wrapper = mount(HomeView);
        const movieCards = wrapper.findAll('.movie-card');
        expect(movieCards.length).toBe(2);
        expect(movieCards[0].text()).toContain('Movie 1');
        expect(movieCards[1].text()).toContain('Movie 2');
    });
});
