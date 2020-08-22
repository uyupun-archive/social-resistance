<template>
  <div>
    <h3>gohome</h3>
    <div>
      <Button text="単語" />
    </div>
    <Button to="/" text="おつかれ" />
    <Field></Field>
  </div>
</template>

<script>
import Button from '~/components/button/index.vue'
import Field from '~/components/field/index.vue'

export default {
  components: {
    Button,
    Field,
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
