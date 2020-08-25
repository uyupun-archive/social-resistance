<template>
  <div>
    <World ref="world" />
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
        <Button text="よい" @click.native="turn(selectedWord)" />
      </template>
    </Modal>
    <TurnAnimation
      v-if="showTurnAnimation"
      :count="$refs.turn && $refs.turn.get() ? $refs.turn.get() : 1"
      firstPlayer="うさぎさん"
      secondPlayer="ばいきんくん"
    />
    <Button to="/" text="おつかれ" />
  </div>
</template>

<script>
import Button from '~/components/button/index.vue'
import World from '~/components/world/index.vue'
import Modal from '~/components/modal/index.vue'
import Turn from '~/components/turn/index.vue'
import TurnAnimation from '~/components/turn-animation/index.vue'

export default {
  components: {
    Button,
    World,
    Modal,
    Turn,
    TurnAnimation,
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
      showTurnAnimation: true,
    }
  },
  mounted() {
    this.getFirstWord()
    this.getWords()
    this.playTurnAnimation()
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
      this.playTurnAnimation()
    },
    movePlayer() {
      if (this.$refs.turn.get() % 2 === 0) this.$refs.world.moveBaikinKun()
      else this.$refs.world.movePekora()
      this.$refs.modal.close()
    },
    addTurn() {
      this.$refs.turn.add()
    },
    playTurnAnimation() {
      this.showTurnAnimation = true
      setTimeout(() => {
        this.showTurnAnimation = false
      }, 2500)
    },
  },
}
</script>

<style scoped lang="scss"></style>
