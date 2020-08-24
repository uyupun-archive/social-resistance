<template>
  <div class="container">
    <Field ref="field" />
    <Turn ref="turn" />
    <div class="aaa">
      <div v-for="word in words" class="bbb">
        <Button
          :key="word.index"
          :text="word.word"
          @click.native="openModal(word.word)"
        />
      </div>
    </div>
    <Modal v-if="showModal" ref="modal" @close="closeModal">
      <template v-slot:content>
        <p>『{{ selectedWord }}』でよろしいですか？</p>
      </template>
      <template v-slot:btns>
        <Button text="よくない" @click.native="closeModalNative" />
        <Button
          text="よい"
          @click.native="
            movePlayer()
            addTurn()
          "
        />
      </template>
    </Modal>
    <Button to="/" text="おつかれ" />
  </div>
</template>

<script>
import Button from '~/components/button/index.vue'
import Field from '~/components/field/index.vue'
import Modal from '~/components/modal/index.vue'
import Turn from '~/components/turn/index.vue'

export default {
  components: {
    Button,
    Field,
    Modal,
    Turn,
  },
  data() {
    return {
      firstWord: null,
      words: null,
      selectedWord: '',
      showModal: false,
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
    movePlayer() {
      if (this.$refs.turn.get() % 2 === 0) this.$refs.field.moveBaikinKun()
      else this.$refs.field.movePekora()
      this.$refs.modal.close()
    },
    addTurn() {
      this.$refs.turn.add()
    },
    openModal(word) {
      this.selectedWord = word
      this.showModal = true
    },
    closeModalNative() {
      this.$refs.modal.close()
    },
    closeModal() {
      this.showModal = false
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
