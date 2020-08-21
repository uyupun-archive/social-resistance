<template>
  <div class="container">
    <h1 class="title">SOCIAL RESISTANCE</h1>
    <h5 class="subtitle">death is not an go home</h5>
    <div class="btn-start">
      <Button to="/gohome" text="はじめる" />
    </div>
    <div class="btn-rule">
      <Button to="/rule" text="あそびかた" />
    </div>
  </div>
</template>

<script>
import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
}
</script>

<style scoped lang="scss">
.container {
  padding: 180px 0 0;
  text-align: center;
}

.title {
  font-family: 'Roboto-Thin';
  font-size: 9.6rem;
  line-height: 1;
  margin: 0;
}

.subtitle {
  font-family: 'Roboto-Thin';
  font-size: 4.8rem;
  margin: 0 0 150px;
}

.btn {
  &-start {
    margin: 0 0 80px;
  }
  &-rule {
    margin: 0 0 20px;
  }
}
</style>
