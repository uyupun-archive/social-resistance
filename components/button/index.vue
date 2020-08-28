<!--
  Button Component

  to を指定した場合、リンク付きボタン
  to を指定しない場合、通常のボタン
-->

<template>
  <nuxt-link
    v-if="to"
    :to="to"
    :class="{
      btn: true,
      'btn-small': size === 'small',
      'btn-large': size === 'large',
    }"
  >
    <span class="btn-text">{{ text }}</span>
  </nuxt-link>
  <button
    v-else
    type="button"
    :class="{
      btn: true,
      'btn-small': size === 'small',
      'btn-large': size === 'large',
      isCompass,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
    }"
  >
    <span class="btn-text">
      {{ text }}
      <Compass
        v-if="isCompass"
        :top-left="topLeft"
        :top-right="topRight"
        :bottom-left="bottomLeft"
        :bottom-right="bottomRight"
      />
    </span>
  </button>
</template>

<script>
import Compass from '~/components/compass/index.vue'

export default {
  components: {
    Compass,
  },
  props: {
    to: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      required: true,
    },
    size: {
      type: String, // 'small' | 'middle' | 'large'
      default: 'middle',
    },
    isCompass: {
      type: Boolean,
      default: false,
    },
    topLeft: {
      type: Boolean,
      default: false,
    },
    topRight: {
      type: Boolean,
      default: false,
    },
    bottomLeft: {
      type: Boolean,
      default: false,
    },
    bottomRight: {
      type: Boolean,
      default: false,
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
  font-size: 3.6rem;
  border: 5px solid $white;
  color: $white;
  background: $black;
  font-family: 'Sawarabi-Gothic', sans-serif;
  text-align: center;
  cursor: pointer;
  line-height: 1;
  box-sizing: border-box;
  outline: none;
  transform: skewX(-30deg);
  text-decoration: none;

  &:after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    width: 0;
    height: calc(100% + 10px);
    background: $white;
    z-index: -1;
    transition: 0.3s;
  }

  &:hover {
    transition: 0.3s;
    color: $black;

    &:after {
      width: calc(100% + 10px);
    }
  }

  &:focus {
    outline: none;
  }

  &-small {
    min-width: 150px;
    padding: 10px 16px;
    font-size: 2.8rem;
  }

  &-large {
    min-width: 450px;
    padding: 22px 40px;
    font-size: 4.8rem;
  }

  &-text {
    display: inline-block;
    z-index: 1;
    transform: skewX(30deg);
  }
}

.isCompass {
  &:hover {
    & span > div {
      border: 1px solid $black;
    }
  }
}

.topLeft {
  &:hover {
    & span > div {
      &:after {
        border-left: 16px solid $black;
      }
    }
  }
}

.topRight {
  &:hover {
    & span > div {
      &:after {
        border-top: 16px solid $black;
      }
    }
  }
}

.bottomLeft {
  &:hover {
    & span > div {
      &:after {
        border-bottom: 16px solid $black;
      }
    }
  }
}

.bottomRight {
  &:hover {
    & span > div {
      &:after {
        border-right: 16px solid $black;
      }
    }
  }
}
</style>
