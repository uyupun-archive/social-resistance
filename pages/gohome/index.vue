<template>
  <div>
    <Field ref="field" />
    <Turn ref="turn" />
    <div v-if="$refs.turn % 2 === 0">
      <p>ばいきん</p>
      <Button
        v-for="word in baikinKun.words"
        :key="word.index"
        :text="word.word"
        @click.native="openModal(word.word)"
      />
    </div>
    <div v-else>
      <p>ぺこら</p>
      <Button
        v-for="word in pekora.words"
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
        <Button text="よい" @click.native="turn(selectedWord)" />
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
      pekora: {
        baseWord: null,
        words: null,
      },
      baikinKun: {
        baseWord: null,
        words: null,
      },
      selectedWord: '',
      showModal: false,
    }
  },
  mounted() {
    this.getFirstWord()
    this.getWords()
  },
  methods: {
    getFirstWord() {
      this.pekora.baseWord = this.$getFirstWord()
      this.baikinKun.baseWord = this.$getFirstWord()
    },
    getWords() {
      if (this.$refs.turn.get() % 2 === 0)
        this.baikinKun.words = this.$getWords(this.baikinKun.baseWord)
      else this.pekora.words = this.$getWords(this.pekora.baseWord)
      console.log(this.pekora.words, this.baikinKun.words)
    },
    updateBaseWord(word) {
      if (this.$refs.turn.get() % 2 === 0) this.baikinKun.baseWord = word
      else this.pekora.baseWord = word
    },
    openModal(word) {
      this.selectedWord = word
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    closeModalNative() {
      this.$refs.modal.close()
    },
    turn(word) {
      this.movePlayer()
      this.updateBaseWord(word)
      this.addTurn()
      this.getWords()
    },
    movePlayer() {
      if (this.$refs.turn.get() % 2 === 0) this.$refs.field.moveBaikinKun()
      else this.$refs.field.movePekora()
      this.$refs.modal.close()
    },
    addTurn() {
      this.$refs.turn.add()
    },
  },
}
</script>

<style scoped lang="scss"></style>
