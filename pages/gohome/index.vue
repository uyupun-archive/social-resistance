<template>
  <div>
    <Field></Field>
    <div>
      <Button :text="word.word" v-for="word in words" :key="word.index" />
    </div>
    <Button to="/" text="おつかれ" />
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
  data() {
    return {
      firstWord: null,
      words: null,
    }
  },
  mounted() {
    this.getFirstWord()
    this.getWords()
    console.log(this.firstWord)
    console.log(this.words)
  },
  methods: {
    getFirstWord() {
      this.firstWord = this.$getFirstWord()
    },
    getWords() {
      this.words = this.$getWords(this.firstWord)
    },
  },
}
</script>

<style scoped lang="scss"></style>
