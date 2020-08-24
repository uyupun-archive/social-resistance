<template>
  <div>
    <Field ref="field" />
    <Turn ref="turn" />
    <div>
      <Button
        v-for="word in words"
        :key="word.index"
        :text="word.word"
        @click.native="openModal(word.word)"
      />
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

<style scoped lang="scss"></style>
