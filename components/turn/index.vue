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
    addTurn() {
      this.count++
    },
  },
}
</script>
