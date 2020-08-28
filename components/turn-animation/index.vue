<template>
  <div v-if="showAnimation">
    <div class="container">
      <div class="content">
        <div v-if="count % 2 === 1" class="content-player">
          先攻:&nbsp;{{ pekora }}
        </div>
        <div v-else class="content-player">後攻:&nbsp;{{ baikinKun }}</div>
        <div class="content-turn">ターン{{ count }}</div>
      </div>
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
    pekora: {
      type: String,
      require: true,
      default: '',
    },
    baikinKun: {
      type: String,
      require: true,
      default: '',
    },
  },
  data() {
    return {
      showAnimation: false,
    }
  },
  mounted() {
    this.playAnimation()
  },
  methods: {
    playAnimation() {
      setTimeout(() => {
        this.showAnimation = false
      }, 2500)
    },
    show() {
      this.showAnimation = true
      this.playAnimation()
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
  background: rgba($black, 0.3);
  z-index: 1000;
}

.content {
  text-align: center;
  color: $white;
  font-weight: bold;
  background: $black;
  padding: 16px 40px;
  border: 5px solid $white;
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
