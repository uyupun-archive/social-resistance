<template>
  <p>{{ count }}</p>
</template>

<script>
export default {
  data() {
    return {
      count: 1,
    }
  },
  methods: {
    get() {
      return this.count
    },
    add() {
      this.count++
    },
  },
}
</script>
