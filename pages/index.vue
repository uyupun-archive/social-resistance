<template>
  <div class="container">
    <div class="logo"></div>
    <h1 class="title">SOCIAL RESISTANCE</h1>
    <h5 class="subtitle">death is not a go home</h5>
    <div class="btn-start">
      <Button to="/gohome" text="はじめる" size="large" />
    </div>
    <div class="btn-rule">
      <Button to="/rule" text="あそびかた" size="large" />
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
  text-align: center;
}

.logo {
  margin: 10px auto;
  width: 300px;
  height: 300px;
  background-image: url('~assets/images/logo/logo_white.svg');
  background-repeat: no-repeat;
  background-size: contain;
}

.title {
  font-family: 'Roboto-Thin', sans-serif;
  font-size: 9.6rem;
  line-height: 1;
  margin: 0;
}

.subtitle {
  font-family: 'Roboto-Thin', sans-serif;
  font-size: 4.8rem;
  margin: 0 0 50px;
}

.btn {
  &-start {
    margin: 0 0 40px;
  }
  &-rule {
    margin: 0 0 20px;
  }
}
</style>
