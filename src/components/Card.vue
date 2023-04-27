<template>
  <div class="card mx-2 p-5 border max-h-[500px]">
    <img class="card__image h-2/3" :src="data.image" alt="" />
    <div class="card__info mt-4 grow">
      <div class="mb-auto">
        <div class="card__price text-2xl font-medium">{{ data.price }}$</div>
        <div class="card__title text-2xl mb-2">{{ data.title }}</div>
      </div>
    </div>
    <div class="flex justify-center w-full align-center mt-auto">
      <button class="card-button grow">Add to card</button>
      <div class="ml-2 card-bookmark w-9 h-9 rounded bg-[#ecf6fe] cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 stroke-[#26a9e0] inline relative left-1/2 top-1/2 translate-y-[-100%] translate-x-[-50%]">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  //justify-content: space-between;
}
.card__image {
  object-fit: contain;
}
.card__info {
}
.card__price {
}
.card__title {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.text-2xl {
}
.card-button {
  background: #26a9e0;
  transition: all 0.3s ease;
  &:hover {
    background: #209cd1;
  }
}
</style>
