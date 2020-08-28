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
        <Button :text="word.word" @click.native="openWordModal(word)" />
      </div>
    </div>
    <Modal ref="wordModal">
      <template v-slot:content>
        <p>『{{ selectedWord.word }}』でよろしいですか？</p>
      </template>
      <template v-slot:btns>
        <Button text="よくない" @click.native="closeWordModal" />
        <Button text="よい" @click.native="turn(selectedWord)" />
      </template>
    </Modal>
    <Modal ref="winModal" :show-always="true">
      <template v-slot:content>
        <p>『{{ winner }}』のかち！</p>
      </template>
      <template v-slot:btns>
        <Button to="/" text="おつかれ" />
      </template>
    </Modal>
    <TurnAnimation
      ref="turnAnimation"
      :count="$refs.turn && $refs.turn.get() ? $refs.turn.get() : 1"
      pekora="うさぎさん"
      baikin-kun="ばいきんくん"
    />
    <div class="btn-pause">
      <Button text="ポーズ" @click.native="openpauseModal()" />
    </div>
    <Modal ref="pauseModal" :is-wrap="true">
      <template v-slot:content>
        <p>メニュー</p>
      </template>
      <template v-slot:btns>
        <div class="pause-choices">
          <Button text="さいかい" @click.native="closepauseModal" />
        </div>
        <!-- :TODO やり直し機能 -->
        <div class="pause-choices"><Button text="やりなおし" /></div>
        <div class="pause-choices">
          <Button text="やめる" to="/" :not-link-style="true" />
        </div>
      </template>
    </Modal>
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
      winner: '',
    }
  },
  mounted() {
    this.getFirstWord()
    this.getWords()
    this.showTurnAnimation()
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
    openWordModal(word) {
      this.selectedWord = word
      this.$refs.wordModal.open()
    },
    closeWordModal() {
      this.$refs.wordModal.close()
    },
    openpauseModal() {
      this.$refs.pauseModal.open()
    },
    closepauseModal() {
      this.$refs.pauseModal.close()
    },
    turn(word) {
      this.closeWordModal()
      this.movePlayer(word)
      if (this.$refs.world.isGoal()) {
        this.winner = 'うさぎさん'
        this.$refs.winModal.open()
        return
      }
      if (this.$refs.world.isHit()) {
        this.winner = 'ばいきんくん'
        this.$refs.winModal.open()
        return
      }
      this.updateBaseWord(word)
      this.$refs.turn.add()
      this.setActiveTurn()
      this.getWords()
      this.showTurnAnimation()
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
    showTurnAnimation() {
      this.$refs.turnAnimation.show()
    },
    isPekoraTurn() {
      return this.$refs.turn.get() % 2 !== 0
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

.btn-pause {
  margin: 40px;
  box-sizing: border-box;
  float: right;
}

.pause-choices {
  width: 100%;
  text-align: center;
  margin: 0 0 25px;

  &:last-of-type {
    margin: 0;
  }
}
</style>
