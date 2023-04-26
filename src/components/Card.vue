<template>
  <div class="card">
    <img class="card__image" :src="data.image" alt="" />
    <div class="card__price">{{ data.price }}</div>
    <div class="card__title">{{ data.title }}</div>
    <button>Add to card</button>
  </div>
</template>

<script setup>
defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped></style>
