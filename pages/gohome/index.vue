<template>
  <div class="container">
    <Field ref="field"></Field>
    <div class="aaa">
      <div v-for="word in words" class="bbb">
        <Button
          :key="word.index"
          :text="word.word"
          @click.native="moveCharacter"
        />
        </div>
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
    moveCharacter() {
      this.$refs.field.moveCharacter()
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  text-align: center;
}
.aaa {
  margin: 0px 180px 40px 180px;
  display: flex;
  flex-wrap: wrap;
  // -webkit-justify-content: space-around;
  justify-content: space-around;
  // -webkit-align-items: center;
  align-items: center;
  align-content: space-around;
}
.bbb{
  margin :10px 20px 30px 20px;
   width: 20% ;
}
</style>
