import Button from '~/components/button/index.vue'
import World from '~/components/world/index.vue'
import Modal from '~/components/modal/index.vue'
import Turn from '~/components/turn/index.js'
import TurnAnimation from '~/components/turn-animation/index.vue'
import Sonar from '~/components/sonar/index.vue'
import {
  PLAYER_PEKORA_NAME,
  PLAYER_BAIKINKUN_NAME,
} from '~/components/constants/index.js'

export default {
  middleware: 'redirectToTop',
  components: {
    Button,
    World,
    Modal,
    TurnAnimation,
    Sonar,
  },
  data() {
    return {
      pekora: {
        active: true,
      },
      baikinKun: {
        active: false,
      },
      words: null,
      selectedWord: '',
      winner: '',
      turn: new Turn(),
    }
  },
  mounted() {
    this.stepFirstTurn()
  },
  methods: {
    openWordModal(word) {
      this.selectedWord = word
      this.$refs.wordModal.open()
    },
    closeWordModal() {
      this.$refs.wordModal.close()
    },
    openPauseModal() {
      this.$refs.pauseModal.open()
    },
    restartGame() {
      this.$refs.pauseModal.close()
    },
    refreshGame() {
      this.$refs.pauseModal.close()
      this.$refs.world.refreshWorld()
      this.stepFirstTurn()
      this.turn = new Turn()
      this.pekora.active = true
      this.baikinKun.active = false
    },
    stepFirstTurn() {
      this.getWords()
      this.showTurnAnimation()
      this.proceedTurn()
    },
    stepAfterSecondTurn(word) {
      this.closeWordModal()
      this.movePlayer(word)
      if ((this.winner = this.$refs.world.judgeWinner())) {
        this.$refs.winModal.open()
        return
      }
      this.setActiveTurn()
      this.getWords()
      this.showTurnAnimation()
      this.proceedTurn()
    },
    movePlayer(word) {
      if (this.isPekoraTurn()) this.$refs.world.movePekora(word)
      else this.$refs.world.moveBaikinKun(word)
    },
    setActiveTurn() {
      this.pekora.active = !this.pekora.active
      this.baikinKun.active = !this.baikinKun.active
    },
    getWords() {
      this.words = this.$getWords(
        this.isPekoraTurn()
          ? this.$refs.world.getBaseWord(PLAYER_PEKORA_NAME)
          : this.$refs.world.getBaseWord(PLAYER_BAIKINKUN_NAME)
      )
    },
    showTurnAnimation() {
      this.$refs.turnAnimation.show()
    },
    isPekoraTurn() {
      return this.turn.count % 2 !== 0
    },
    proceedTurn() {
      this.turn.proceed().then(() => {
        this.forceSelectWord()
      })
    },
    forceSelectWord() {
      const randomIndex = Math.floor(Math.random() * this.words.length)
      this.selectedWord = this.words[randomIndex]
      this.$refs.forceSelectWordModal.open()
      setTimeout(() => {
        this.$refs.forceSelectWordModal.close()
        this.stepAfterSecondTurn(this.selectedWord)
      }, 3000)
    },
  },
}
