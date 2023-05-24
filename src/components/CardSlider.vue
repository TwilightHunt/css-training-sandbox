<template>
  <div class="card-slider m-10" ref="target">
    <div
      v-if="isMobile() === false && (currentOffset > 0 || props.looped)"
      class="card-slider__chevron-left py-6 px-2"
      @click="slideTo(-1)">
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
      <Card class="card" v-for="card in cards" :key="card.id" :data="card" />
    </div>
    <div
      v-if="isMobile() === false && (currentOffset < maxOffset || props.looped)"
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
import { useSwipe } from "@vueuse/core";
import { isMobile } from "../composables/useDevice.js";

const cards = ref();
const slider = ref(null);
let currentOffset = ref(0);
const cardAmount = ref(6);

const setWidth = () => {
  if (window.innerWidth >= 1560) {
    cardAmount.value = 6;
  } else if (window.innerWidth >= 1315) {
    cardAmount.value = 5;
  } else if (window.innerWidth >= 1068) {
    cardAmount.value = 4;
  } else if (window.innerWidth >= 821) {
    cardAmount.value = 3;
  } else if (window.innerWidth >= 575) {
    cardAmount.value = 2;
  } else {
    cardAmount.value = 1;
  }
  slider.value.style.gridAutoColumns = `minmax(${100 / cardAmount.value}%, auto)`;
  maxOffset.value = Math.floor(cards.value.length / cardAmount.value) * 100;
  if (cards.value.length % cardAmount.value === 0) maxOffset.value -= 100;
};

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
const maxOffset = ref();

const props = defineProps({
  looped: Boolean,
});

onMounted(async () => {
  cards.value = await fetchItems();
  // --> Show white space
  maxOffset.value = Math.floor(cards.value.length / cardAmount.value) * 100;

  // --> Fit items
  //maxOffset.value = (cards.value.length / cardAmount.value) * 100 - 100;
  setWidth();
});

const target = ref<HTMLElement | null>(null);

const { direction, lengthX } = useSwipe(slider, {
  passive: false,
  onSwipe(e: TouchEvent) {
    if (direction.value === "left") {
      slider.value.style.right = `${lengthX.value}px`;
    }
    if (direction.value === "right") {
      slider.value.style.right = `${lengthX.value}px`;
    }
  },
  onSwipeEnd(e: TouchEvent) {
    const maxLength = window.innerWidth / 2 - 30;
    console.log(lengthX.value, maxLength);

    if (lengthX.value > maxLength) {
      slideTo(1);
      slider.value.style.right = 0;
    }
    if (lengthX.value < -maxLength) {
      slideTo(-1);
      slider.value.style.right = 0;
    }
  },
});

const slideTo = (delta: number) => {
  if (props.looped) {
    for (let index = 0; index < cardAmount.value; index++) {
      if (delta > 0) cards.value.push(cards.value.shift());
      else cards.value.unshift(cards.value.pop());
    }
  } else {
    const offset = currentOffset.value + 100 * delta;
    currentOffset.value = clamp(offset, 0, maxOffset.value);
    slider.value.style.transform = `translateX(-${currentOffset.value}%)`;
  }
};

window.addEventListener("resize", function (event) {
  setWidth();
});
</script>

<style lang="scss" scoped>
.card-slider {
  overflow-x: hidden;
  position: relative;
}
.card-slider__body {
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(16.66%, auto);
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
