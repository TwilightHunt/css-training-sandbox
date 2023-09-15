<template>
  <button class="btn btn-slide">
    <slot></slot>
  </button>
</template>

<style lang="scss">
.btn {
  background-color: #ff7518;
  color: #fff;
  padding: 0.75rem 1.25rem;
  border-radius: 10rem;
  font-weight: 600;
  font-size: 1.2rem;
  position: relative;
  &-slide {
    isolation: isolate;
    overflow: hidden;
    border: 2px solid #923a00;
    &::after {
      position: absolute;
      content: "";
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 0%;
      background-color: #923a00;
      transition: all 0.2s;
      border-radius: 10rem;
      z-index: -1;
      //isolation: isolate;
    }
    &:hover {
      &::after {
        height: 100%;
      }
    }
  }
}
</style>
