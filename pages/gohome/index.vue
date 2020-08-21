<template>
  <div>
    <h3>gohome</h3>
    <div>
      <Button text="単語" />
    </div>
    <Button to="/" text="おつかれ" />
  </div>
</template>

<script>
import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  created() {
    const firstWord = this.$getFirstWord()
    const words = this.$getWords(firstWord)
    console.log(firstWord)
    console.log(words)
  },
}
</script>

<style scoped lang="scss"></style>
