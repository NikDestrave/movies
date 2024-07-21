<template>
  <div class="movie-form">
    <h1 class="movie-form__title">{{ isEdit ? 'Edit Movie' : 'Add Movie' }}</h1>
    <form class="movie-form__form" @submit.prevent="submitForm">
      <div class="movie-form__field">
        <label class="movie-form__label">Title:</label>
        <input v-model="movie.title" :class="{error: errors.title}" class="movie-form__input" />
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </div>
      <div class="movie-form__field">
        <label class="movie-form__label">Year:</label>
        <input v-model="movie.year" :class="{error: errors.year}" class="movie-form__input" type="number" />
        <span v-if="errors.year" class="error">{{ errors.year }}</span>
      </div>
      <div class="movie-form__field">
        <label class="movie-form__label">Genre:</label>
        <input v-model="movie.genre" :class="{error: errors.genre}" class="movie-form__input" />
        <span v-if="errors.genre" class="error">{{ errors.genre }}</span>
      </div>
      <div class="movie-form__field">
        <label class="movie-form__label">Rating:</label>
        <input
          v-model="movie.rating"
          :class="{error: errors.rating}"
          class="movie-form__input"
          max="10"
          min="1"
          type="number"
        />
        <span v-if="errors.rating" class="error">{{ errors.rating }}</span>
      </div>
      <div class="movie-form__field">
        <label class="movie-form__label">Description:</label>
        <textarea
          v-model="movie.description"
          :class="{error: errors.description}"
          class="movie-form__textarea"
        ></textarea>
        <span v-if="errors.description" class="error">{{ errors.description }}</span>
      </div>
      <div class="movie-form__field">
        <label class="movie-form__label">Image URL:</label>
        <input v-model="movie.imageUrl" :class="{error: errors.imageUrl}" class="movie-form__input" />
        <span v-if="errors.imageUrl" class="error">{{ errors.imageUrl }}</span>
      </div>
      <button class="movie-form__button" type="submit">{{ isEdit ? 'Update' : 'Add' }}</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {type Movie, useMovieStore} from '@/stores/movies';

const movieStore = useMovieStore();
const route = useRoute();
const router = useRouter();
const isEdit = route.params.id !== undefined;
const movie = reactive<Movie>({
  id: isEdit ? Number(route.params.id) : Date.now(),
  title: '',
  year: new Date().getFullYear(),
  genre: '',
  rating: 1,
  description: '',
  imageUrl: '',
});

const errors = reactive<{[key: string]: string}>({});

if (isEdit) {
  onMounted(() => {
    const existingMovie = movieStore.getMovieById(Number(route.params.id));
    if (existingMovie) {
      Object.assign(movie, existingMovie);
    }
  });
}

const validateForm = () => {
  errors.title = !movie.title ? 'Title is required' : '';
  errors.year = !movie.year ? 'Year is required' : '';
  errors.genre = !movie.genre ? 'Genre is required' : '';
  errors.rating = !movie.rating ? 'Rating is required' : '';
  errors.description = !movie.description ? 'Description is required' : '';
  errors.imageUrl = !movie.imageUrl ? 'Image URL is required' : '';

  return !Object.values(errors).some(error => error);
};

const submitForm = () => {
  if (validateForm()) {
    if (isEdit) {
      movieStore.updateMovie(movie);
    } else {
      movieStore.addMovie(movie);
    }
    router.push('/');
  }
};
</script>

<style scoped>
.movie-form {
  max-width: 500px;
  margin: 0 auto;
}

.movie-form__title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.movie-form__form {
  display: flex;
  flex-direction: column;
}

.movie-form__field {
  margin-bottom: 1rem;
}

.movie-form__label {
  display: block;
  margin-bottom: 0.5rem;
}

.movie-form__input,
.movie-form__textarea {
  width: 100%;
  padding: 0.5rem;
  background-color: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 4px;
  outline: #1e293b;
  color: #fff;
}

.movie-form__input.error,
.movie-form__textarea.error {
  border-color: #f87171;
}

.error {
  color: #f87171;
  font-size: 0.875rem;
}

.movie-form__textarea {
  height: 100px;
  resize: vertical;
}

.movie-form__button {
  padding: 0.6rem 1rem;
  border: none;
  background-color: #007bff;
  transition: background-color 0.3s;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
}

.movie-form__button:hover {
  background-color: #0056b3;
}
</style>
