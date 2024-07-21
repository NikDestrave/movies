import { defineStore } from 'pinia'
import mockData from '@/mock/movies.json';

export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  description: string;
  imageUrl: string;
}

const STORAGE_KEY = 'movie-collection';

function loadMovies(): Movie[] {
  const storedMovies = localStorage.getItem(STORAGE_KEY);
  if (storedMovies) return JSON.parse(storedMovies) as Movie[];
  else {
    saveMovies(mockData);
    return mockData;
  }
}

function saveMovies(movies: Movie[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
}

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: loadMovies() as Movie[],
  }),
  getters: {
    getMovies: (state) => state.movies,
    getMovieById: (state) => (id: number) => state.movies.find(movie => movie.id === id),
  },
  actions: {
    addMovie(movie: Movie) {
      this.movies.push(movie);
      saveMovies(this.movies);
    },
    updateMovie(updatedMovie: Movie) {
      const index = this.movies.findIndex(movie => movie.id === updatedMovie.id);
      if (index !== -1) {
        this.movies.splice(index, 1, updatedMovie);
        saveMovies(this.movies);
      }
    },
    deleteMovie(movieId: number) {
      this.movies = this.movies.filter(movie => movie.id !== movieId);
      saveMovies(this.movies);
    },
  },
});
