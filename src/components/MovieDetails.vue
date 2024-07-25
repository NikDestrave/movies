<template>
  <RouterLink class="button-back-list" to="/">
    <IArrow />
  </RouterLink>
  <div v-if="movie" class="movie-details">
    <div class="movie-details__content">
      <h1 class="movie-details__title">{{ movie.title }}</h1>
      <p class="movie-details__year">{{ movie.year }}</p>
      <p class="movie-details__genre">{{ movie.genre }}</p>
      <p class="movie-details__rating">
        <IStarSolid v-for="item in movie.rating" :key="item" />
      </p>
      <p class="movie-details__description">{{ movie.description }}</p>
      <router-link :to="'/edit/' + movie.id" class="movie-details__edit-link">Edit</router-link>
      <button class="movie-details__delete-button" @click="deleteMovie(movie)">Delete</button>
    </div>
    <img :src="movie.imageUrl" alt="Movie Image" class="movie-details__image" @error="onImageError" />
    <Teleport to="#app">
      <img :src="movie.imageUrl" alt="Movie Image" class="movie-details__background-image" />
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import {type Movie, useMovieStore} from '@/stores/movies';
import {useRoute, useRouter} from 'vue-router';
import IStarSolid from '@/components/icons/IStarSolid.vue';
import IArrow from '@/components/icons/IArrow.vue';

const movieStore = useMovieStore();
const route = useRoute();
const router = useRouter();
const movie = movieStore.getMovieById(Number(route.params.id));

const deleteMovie = (movie: Movie): void => {
  if (confirm('Are you sure you want to delete this movie?')) {
    movieStore.deleteMovie(movie.id);
    router.push('/');
  }
};

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = 'https://placehold.co/250x350?text=No%20image';
};
</script>

<style lang="scss" scoped>
.button-back-list {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.09);
  color: white;
  border: none;
  height: 2rem;
  width: 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-bottom: 1rem;

  svg {
    width: 1rem;
    height: 1rem;
    fill: #fff;
  }
}

.movie-details {
  display: flex;
  gap: 2rem;

  &__content {
    flex: 1;
  }

  &__image {
    width: 400px;
    border-radius: 1rem;
  }

  &__rating {
    margin-top: 4px;
    display: flex;
    gap: 0.2rem;

    svg {
      width: 0.8rem;
      height: 0.8rem;
      fill: #f59e0b;
    }
  }

  &__background-image {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    opacity: 0.05;
  }

  &__title {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 800;
  }

  &__year,
  &__genre,
  &__rating,
  &__description {
    margin-bottom: 1rem;
  }

  &__edit-link {
    display: inline-block;
    margin-right: 1rem;
    color: #007bff;
    text-decoration: none;
    background-color: transparent;
    font-weight: 600;
  }

  &__edit-link:hover {
    text-decoration: underline;
  }

  &__delete-button {
    padding: 0.8rem 1.2rem;
    border: none;
    background-color: #ef4444;
    color: white;
    border-radius: 0.5rem;
    transition: background-color 0.3s;
    cursor: pointer;
    font-weight: 600;
  }

  &__delete-button:hover {
    background-color: #f87171;
  }
}

@media (max-width: 768px) {
  .movie-details {
    flex-direction: column;

    &__image {
      width: 100%;
    }
  }
}
</style>
