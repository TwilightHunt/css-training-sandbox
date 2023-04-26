<template>
  <div class="card-slider">
    <Card v-for="card in cards" :key="card.id" :data="card" />
  </div>
</template>

<script setup>
import { fetchItems } from "../composables/useFetch.ts";
import Card from "./Card.vue";
import { ref, onMounted } from "vue";

const cards = ref();

onMounted(async () => {
  cards.value = await fetchItems();
  console.log(cards.value);
});
</script>

<style lang="scss" scoped>
.card-slider {
  display: grid;
  align-items: baseline;
  grid-auto-flow: column;
  grid-auto-columns: minmax(200px, auto);
  overflow-x: hidden;
}
</style>
