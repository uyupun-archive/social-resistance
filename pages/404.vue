<template>
  <div class="container">
    <div class="logo"></div>
    <div class="box">
      <h1 class="title">みせられないよ</h1>
      <Button to="/" text="はじめにもどる" />
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
  width: 60%;
  margin: 5% auto 0;
}

.logo {
  width: 100%;
  height: 100px;
  background-image: url('~assets/images/objects/pekora.gif'),
    url('~assets/images/objects/baikin_1.gif'),
    url('~assets/images/objects/baikin_2.gif');
  background-position: left 0, 100% 0, 90% 0;
  background-repeat: no-repeat;
  background-size: contain;
}

.title {
  font-size: 9.6rem;
  line-height: 1;
  margin: 0 0 50px;
}

.box {
  padding: 60px 40px;
  border: 5px solid $white;
}

.subtitle {
  font-family: 'Roboto-Thin', sans-serif;
  font-size: 4.8rem;
  margin: 0 0 50px;
}
</style>
