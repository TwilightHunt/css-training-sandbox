<template>
  <div class="card-slider m-10">
    <div v-if="currentOffset > 0" class="card-slider__chevron-left py-6 px-2" @click="slideTo(-1)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-8 h-8 stroke-white">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </div>
    <div ref="slider" class="card-slider__body">
      <Card v-for="card in cards" :key="card.id" :data="card" />
    </div>
    <div
      v-if="currentOffset < maxOffset"
      class="card-slider__chevron-right py-6 px-2"
      @click="slideTo(1)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-8 h-8 stroke-white">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchItems } from "../composables/useFetch.ts";
import Card from "./Card.vue";
import { ref, onMounted } from "vue";

const cards = ref();
const slider = ref(null);
let currentOffset = ref(0);
const cardAmount: number = 6;

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
const maxOffset = ref();

onMounted(async () => {
  cards.value = await fetchItems();
  // --> Show white space
  maxOffset.value = Math.round(cards.value.length / cardAmount) * 100;
  // --> Fit items
  //maxOffset.value = (cards.value.length / cardAmount) * 100 - 100;
});

const slideTo = (delta: number) => {
  const offset = currentOffset.value + 100 * delta;
  currentOffset.value = clamp(offset, 0, maxOffset.value);
  slider.value.style.transform = `translateX(-${currentOffset.value}%)`;
};
</script>

<style lang="scss" scoped>
.card-slider {
  overflow-x: hidden;
  position: relative;
}
.card-slider__body {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(16.666%, auto);
  transition: transform 0.3s ease-in-out;
}
.card-slider__chevron-left {
  position: absolute;
  background-color: rgba($color: #000000, $alpha: 0.5);
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  opacity: 0;
  transition: all 0.2s ease-out;
  cursor: pointer;
  z-index: 5;
  &:hover {
    opacity: 1;
  }
}
.card-slider__chevron-right {
  @extend .card-slider__chevron-left;
  right: 0;
  left: unset;
}
</style>
