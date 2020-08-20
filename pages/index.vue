<template>
  <div>
    <h1>Social Resistance</h1>
    <h5>STAY HOME</h5>
    <Button to="/gohome" text="はじめる" />
    <Button to="/rule" text="あそびかた" />
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

<style scoped lang="scss"></style>
