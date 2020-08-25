<template>
  <div class="container">
    <World ref="world" />
    <Turn ref="turn" />
    <div class="word-wrapper">
      <div v-for="word in words" :key="word.index" class="word">
        <Button :text="word.word" @click.native="openModal(word.word)" />
      </div>
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
import World from '~/components/world/index.vue'
import Modal from '~/components/modal/index.vue'
import Turn from '~/components/turn/index.vue'

export default {
  components: {
    Button,
    World,
    Modal,
    Turn,
  },
  data() {
    return {
      pekora: {
        baseWord: null,
      },
      baikinKun: {
        baseWord: null,
      },
      words: null,
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
      this.$nextTick(() => {
        this.words = this.$getWords(
          this.$refs.turn.get() % 2 === 0
            ? this.baikinKun.baseWord
            : this.pekora.baseWord
        )
      })
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
      if (this.$refs.turn.get() % 2 === 0) this.$refs.world.moveBaikinKun()
      else this.$refs.world.movePekora()
      this.$refs.modal.close()
    },
    addTurn() {
      this.$refs.turn.add()
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  text-align: center;
}

.word-wrapper {
  margin: 0px 180px 40px 180px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: space-around;
}

.word {
  margin: 10px 20px 30px 20px;
  width: 20%;
}
</style>
