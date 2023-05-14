<template>
  <div ref="container" class="comparison">
    <div class="comparison__image-container">
      <img :src="imageBefore" alt="before image" class="comparison__image image-before" />
      <img :src="imageAfter" alt="after image" class="comparison__image image-after" />
    </div>
    <input
      type="range"
      name=""
      id=""
      min="0"
      max="100"
      value="50"
      class="comparison__slider"
      @input="dragSlider"
      aria-label="Perscentage of before photo shown" />
    <div class="comparison__slider-line"></div>
    <div class="comparison__slider-button" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        viewBox="0 0 256 256">
        <path
          d="M136,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0ZM96,120H35.31l18.35-18.34A8,8,0,0,0,42.34,90.34l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32L35.31,136H96a8,8,0,0,0,0-16Zm149.66,2.34-32-32a8,8,0,0,0-11.32,11.32L220.69,120H160a8,8,0,0,0,0,16h60.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,245.66,122.34Z"></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageBefore: { type: String, required: true },
    imageAfter: { type: String, required: true },
  },
  methods: {
    dragSlider(e) {
      this.$refs.container.style.setProperty("--position", `${e.target.value}%`);
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  display: block;
  max-width: 100%;
}
.comparison {
  position: relative;
  --position: 50%;
  max-width: 700px;
  max-height: 700px;
  margin: 20px 30px;
}
.comparison__image-container {
  display: grid;
  align-items: center;
}
.comparison__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left;
}
.image-before {
  position: absolute;
  inset: 0;
  width: var(--position);
}
.comparison__slider {
  position: absolute;
  inset: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  opacity: 0;
  &:focus-visible ~ .comparison__slider-button {
    outline: 3px solid #000;
    outline-offset: 2px;
  }
}
.comparison__slider-line {
  position: absolute;
  inset: 0;
  width: 0.2rem;
  height: 100%;
  background: #fff;
  z-index: 10;
  left: var(--position);
  transform: translateX(-50%);
  pointer-events: none;
}
.comparison__slider-button {
  position: absolute;
  background: #fff;
  color: #000;
  border-radius: 100vw;
  padding: 0.5rem;
  display: grid;
  place-items: center;
  top: 50%;
  left: var(--position);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 15;
  box-shadow: 3px 3px 10px hsl(0, 50%, 2%, 0.5);
}
</style>
