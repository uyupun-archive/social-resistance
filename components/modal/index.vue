<!--
  Modal Component

  content には p 要素を, btns には Button Component を1つ以上指定する
-->

<template>
  <div v-if="showModal">
    <div class="container" @click.self="close">
      <div :class="{ modal: true, close: isClose }">
        <div class="modal-content">
          <slot name="content" />
          <div :class="{ 'modal-btns': true, wrap: isWrap, nowrap: !isWrap }">
            <slot name="btns" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showAlways: {
      type: Boolean,
      default: false,
    },
    isWrap: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isClose: false,
      showModal: false,
    }
  },
  methods: {
    close() {
      if (this.showAlways) return
      this.isClose = true
      setTimeout(() => {
        this.isClose = false
        this.showModal = false
      }, 300)
    },
    open() {
      this.showModal = true
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
  z-index: 999;
}

.modal {
  width: 650px;
  transform: scale(0);
  transform-origin: center;
  background: $black;
  padding: 120px 40px 100px;
  border: 5px solid $white;
  box-sizing: border-box;
  animation: modal 0.3s forwards;

  &-content {
    width: 100%;
    & p {
      text-align: center;
      font-size: 3.6rem;
      margin: 0 0 100px;
    }
  }

  &-btns {
    display: flex;
    justify-content: space-around;
  }
}

.close {
  animation: close 0.3s forwards;
}

.wrap {
  flex-wrap: wrap;
}

.nowrap {
  flex-wrap: nowrap;
}

@keyframes modal {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes close {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
