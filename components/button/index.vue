<!--
  Button Component

  to を指定した場、リンク付きボタン
  to を指定しない場合、通常のボタン
-->

<template>
  <nuxt-link v-if="to" :to="to" class="btn">{{ text }}</nuxt-link>
  <button v-else type="button" class="btn">{{ text }}</button>
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
  color: #ffffff;
  background: #111111;
}
</style>
