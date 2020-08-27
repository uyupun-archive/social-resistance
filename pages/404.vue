<template>
  <div class="container">
    <div class="logo"></div>
    <div class="box">
      <h1 class="title">みせられないよ</h1>
      <div class="btn-rule">
        <Button to="/" text="はじめにもどる" />
      </div>
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
  margin: auto;
  margin-top: 5%;
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
}

.box {
  border: 5px solid white;
}

.subtitle {
  font-family: 'Roboto-Thin', sans-serif;
  font-size: 4.8rem;
  margin: 0 0 50px;
}

.btn {
  &-start {
    margin: 0 0 10%;
  }
  &-rule {
    margin: 0 0 10%;
  }
}
</style>
