<template>
  <main class="main">
    <div>
      <h2 class="text-3xl mx-10 my-5 font-bold">Card Slider</h2>
      <CardSlider />
      <h2 class="text-3xl mx-10 mb-5 mt-10 font-bold">Card Slider (loop)</h2>
      <CardSlider looped />
    </div>
  </main>
</template>

<script setup>
import CardSlider from "../components/CardSlider.vue";
</script>
