<template>
  <div class="movie-collection">
    <div class="movie-collection__header">
      <div class="movie-collection__title">
        <h1>Movie Collection</h1>
        <router-link class="movie-collection__new" to="/add">Add New</router-link>
      </div>
      <UISelect
        v-model="sortingValue"
        :options="[
          {label: 'По дате', value: 0},
          {label: 'По названию', value: 1},
          {label: 'По рейтингу', value: 2},
        ]"
      />
    </div>
    <div class="movie-collection__list">
      <router-link v-for="movie in sortedMovies" :key="movie.id" :to="'/movie/' + movie.id" class="movie-card">
        <div class="movie-card__details">
          <h2 class="movie-card__title">{{ movie.title }}</h2>
          <p class="movie-card__year">{{ movie.year }}</p>
          <p class="movie-card__rating">
            <IStarSolid v-for="item in movie.rating" :key="item" />
          </p>
        </div>
        <img v-if="movie.imageUrl" :src="movie.imageUrl" alt="movie image" class="movie-card__image" @error="onImageError" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useMovieStore} from '@/stores/movies';
import {storeToRefs} from 'pinia';
import IStarSolid from '@/components/icons/IStarSolid.vue';
import {computed, ref} from 'vue';
import UISelect from '@/components/ui/UISelect.vue';

const movieStore = useMovieStore();
const {movies} = storeToRefs(movieStore);

const sortingValue = ref(0);

const sortedMovies = computed(() => {
  const sorted = movies.value.map(obj => Object.assign({}, obj));
  console.log(sorted);
  switch (Number(sortingValue.value)) {
    case 0:
      return sorted.sort((a, b) => b.year - a.year);
    case 1:
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 2:
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
});

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = 'https://placehold.co/250x350?text=No%20image';
};
</script>

<style lang="scss" scoped>
.movie-collection {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__new {
    background-color: #0f172a;
    font-size: 14px;
    padding: 0.5rem 1rem;
    border: none;
    color: white;
    border-radius: 0.5rem;
    transition: background-color 0.3s;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      color: #fff;
      background-color: #1e293b;
    }
  }

  &__list {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }
}

.movie-card {
  position: relative;
  padding: 1rem;
  border-radius: 12px;
  height: 350px;
  transition: 0.3s ease-in-out;
  background-color: #0f172a;
  //border: 1px solid #1e293b;
  overflow: hidden;
  display: flex;
  align-items: end;

  &__title {
    display: flex;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.5rem;
  }

  &__year {
    margin-bottom: 0.3rem;
  }

  &:not(.movie-card--new):hover {
    transform: scale(1.05);
  }

  &--new {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #334155;

    &:hover {
      color: #475569;
    }
  }

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  &__details {
    background: rgb(255, 255, 255);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.4808517156862745) 46%);
    width: 100%;
    padding: 4rem 1rem 1rem;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
    color: #fff;
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
}

@media (max-width: 768px) {
  .movie-collection__header {
    flex-direction: column;

    .movie-collection__title {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }

    h1 {
      font-size: 1.5rem;
    }
  }
}
</style>
