<template>
  <div
    :class="{
      compass: true,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
    }"
  />
</template>

<script>
export default {
  props: {
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
.compass {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  border: 1px solid $white;
  border-radius: 50%;

  &:after {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    transform: rotate(45deg);
    width: 0;
    height: 0;
    border: 16px solid transparent;
    border-radius: 50%;
  }
}

.topLeft {
  &:after {
    border-left: 16px solid $white;
  }
}

.topRight {
  &:after {
    border-top: 16px solid $white;
  }
}

.bottomLeft {
  &:after {
    border-bottom: 16px solid $white;
  }
}

.bottomRight {
  &:after {
    border-right: 16px solid $white;
  }
}
</style>
