<template>
  <div class="container">
    <World ref="world" />
    <div class="turn-box">
      <div :class="{ 'active-turn': pekora.active }">
        うさぎさんのターン
      </div>
      <Turn ref="turn" />
      <div :class="{ 'active-turn': baikinKun.active }">
        ばいきんくんのターン
      </div>
    </div>
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
    <TurnAnimation
      v-if="showTurnAnimation"
      :count="$refs.turn && $refs.turn.get() ? $refs.turn.get() : 1"
      first-player="うさぎさん"
      second-player="ばいきんくん"
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
  middleware: 'redirectToTop',
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
        active: true,
        baseWord: null,
      },
      baikinKun: {
        active: false,
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
      if (this.isGoal()) {
        console.log('うさぎさんのかち！')
        // TODO: うさぎさんのかち！のモーダルを出す
        return
      }
      if (this.isHit()) {
        console.log('ばいきんくんのかち！')
        // TODO: ばいきんくんのかち！のモーダルを出す
        return
      }
      this.updateBaseWord(word)
      this.addTurn()
      this.setActiveTurn()
      this.getWords()
      this.playTurnAnimation()
    },
    movePlayer() {
      this.$refs.modal.close()
      if (this.$refs.turn.get() % 2 === 0) this.$refs.world.moveBaikinKun()
      else this.$refs.world.movePekora()
    },
    addTurn() {
      this.$refs.turn.add()
    },
    setActiveTurn() {
      this.pekora.active = !this.pekora.active
      this.baikinKun.active = !this.baikinKun.active
    },
    playTurnAnimation() {
      this.showTurnAnimation = true
      setTimeout(() => {
        this.showTurnAnimation = false
      }, 2500)
    },
    isHit() {
      return this.$refs.world.isHit()
    },
    isGoal() {
      return this.$refs.world.isGoal()
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  text-align: center;
}

.turn-box {
  display: flex;
  justify-content: space-around;
}

.turn-box div {
  position: relative;
  display: inline-block;
  font-size: 3.6rem;
  margin: 60px 0px 80px;
  font-family: 'Sawarabi-Gothic', sans-serif;
  text-align: center;
  border: 5px solid;
  padding: 16px 40px;
  box-sizing: border-box;
  color: #808080;
  border-color: #808080;
}

.turn-box p {
  font-size: 7.2rem;
}

.active-turn {
  color: #ffffff !important;
  border-color: #ffffff !important ;
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
