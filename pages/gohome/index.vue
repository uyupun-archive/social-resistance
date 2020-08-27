<template>
  <div class="container">
    <World ref="world" class="world" />
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
        <Button :text="word.word" @click.native="openModal(word)" />
      </div>
    </div>
    <Modal v-if="showModal" ref="modal" @close="closeModal">
      <template v-slot:content>
        <p>『{{ selectedWord.word }}』でよろしいですか？</p>
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
          this.isPekoraTurn() ? this.pekora.baseWord : this.baikinKun.baseWord
        )
      })
    },
    updateBaseWord(word) {
      if (this.isPekoraTurn()) this.pekora.baseWord = word
      else this.baikinKun.baseWord = word
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
      this.closeModalNative()
      this.movePlayer(word)
      if (this.$refs.world.isGoal()) {
        console.log('うさぎさんのかち！')
        // TODO: うさぎさんのかち！のモーダルを出す
        return
      }
      if (this.$refs.world.isHit()) {
        console.log('ばいきんくんのかち！')
        // TODO: ばいきんくんのかち！のモーダルを出す
        return
      }
      this.updateBaseWord(word)
      this.$refs.turn.add()
      this.setActiveTurn()
      this.getWords()
      this.playTurnAnimation()
    },
    movePlayer(word) {
      if (this.isPekoraTurn())
        this.$refs.world.movePekora(this.pekora.baseWord, word)
      else this.$refs.world.moveBaikinKun(this.baikinKun.baseWord, word)
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
    isPekoraTurn() {
      if (this.$refs.turn.get() % 2 !== 0) return true
      return false
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  margin: 0 auto;
  width: 1200px;
}

.world {
  margin: 40px auto;
}

.turn-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0 0;
  margin: 0 0 30px;

  & div {
    display: inline-block;
    font-size: 3.6rem;
    text-align: center;
    padding: 16px 40px;
    box-sizing: border-box;
    color: #808080;
    border: 5px solid #808080;
  }

  & p {
    font-size: 7.2rem;
    margin: 0;
  }
}

.active-turn {
  color: #ffffff !important;
  border-color: #ffffff !important ;
}

.word-wrapper {
  margin: 0 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.word {
  margin: 0 20px 30px 20px;
  width: 20%;
}
</style>
