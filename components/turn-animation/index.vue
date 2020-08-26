<template>
  <div class="container">
    <div class="content">
      <div v-if="count % 2 === 1" class="content-player">
        先攻:&nbsp;{{ firstPlayer }}
      </div>
      <div v-else class="content-player">後攻:&nbsp;{{ secondPlayer }}</div>
      <div class="content-turn">ターン{{ count }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      require: true,
      default: 1,
    },
    firstPlayer: {
      type: String,
      require: true,
      default: '',
    },
    secondPlayer: {
      type: String,
      require: true,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(17, 17, 17, 0.3);
  z-index: 1000;
}

.content {
  text-align: center;
  color: #ffffff;
  font-weight: bold;
  background: #111111;
  padding: 16px 40px;
  border: 5px solid #ffffff;
  transform: skewX(-30deg) translateX(calc(-100vw - 100px));
  animation: content 2.5s forwards;

  &-player {
    font-size: 9.6rem;
    transform: skewX(30deg);
  }

  &-turn {
    font-size: 6.4rem;
    transform: skewX(30deg);
  }
}

@keyframes content {
  0% {
    transform: skewX(-30deg) translateX(calc(-100vw - 1000px));
  }
  35% {
    transform: skewX(-30deg) translateX(0);
  }
  65% {
    transform: skewX(-30deg) translateX(0);
  }
  100% {
    transform: skewX(-30deg) translateX(calc(100vw + 1000px));
  }
}
</style>
