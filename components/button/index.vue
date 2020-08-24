<!--
  Button Component

  to を指定した場合、リンク付きボタン
  to を指定しない場合、通常のボタン
-->

<template>
  <nuxt-link v-if="to" :to="to" class="btn btn-link">
    <span class="btn-text">{{ text }}</span>
  </nuxt-link>
  <button v-else type="button" class="btn">
    <span class="btn-text">{{ text }}</span>
  </button>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.btn {
  position: relative;
  display: inline-block;
  min-width: 250px;
  padding: 16px 40px;
  border: 5px solid #ffffff;
  color: #ffffff;
  background: #111111;
  font-size: 3.6rem;
  font-family: 'Sawarabi Gothic', sans-serif;
  text-align: center;
  cursor: pointer;
  line-height: 1;
  box-sizing: border-box;
  outline: none;
  transform: skewX(-30deg);

  &:after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    width: 0;
    height: calc(100% + 10px);
    background: #ffffff;
    z-index: -1;
    transition: 0.3s;
  }

  &:hover {
    transition: 0.3s;
    color: #111111;

    &:after {
      width: calc(100% + 10px);
    }
  }

  &:focus {
    outline: none;
  }

  &-link {
    min-width: 450px;
    padding: 22px 40px;
    font-size: 4.8rem;
    text-decoration: none;
  }

  &-text {
    display: inline-block;
    z-index: 1;
    transform: skewX(30deg);
  }
}
</style>
