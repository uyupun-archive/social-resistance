<template>
  <span class="compass">
    <span
      :class="{
        needle: true,
        topLeft,
        topRight,
        bottomLeft,
        bottomRight,
      }"
    ></span>
  </span>
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
  width: 50px;
  height: 50px;
  background: $black;
  border: 1px solid $white;
  border-radius: 50%;
}

.needle {
  display: inline-block;
  position: absolute;
  top: -1px;
  left: -1px;
  transform: rotate(45deg);
  width: 0;
  height: 0;
  border: 25px solid transparent;
  border-radius: 50%;
}

.topLeft {
  border-left: 25px solid $white;
}

.topRight {
  border-top: 25px solid $white;
}

.bottomLeft {
  border-bottom: 25px solid $white;
}

.bottomRight {
  border-right: 25px solid $white;
}
</style>
