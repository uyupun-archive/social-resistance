import Button from '~/components/button/index.vue'
import World from '~/components/world/index.vue'
import Modal from '~/components/modal/index.vue'
import Turn from '~/components/turn/index.js'
import TurnAnimation from '~/components/turn-animation/index.vue'

export default {
  middleware: 'redirectToTop',
  components: {
    Button,
    World,
    Modal,
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
      turn: new Turn(),
    }
  },
  mounted() {
    this.initGame()
  },
  methods: {
    initGame() {
      this.getFirstWord()
      this.getWords()
      this.showTurnAnimation()
    },
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
    openPauseModal() {
      this.$refs.pauseModal.open()
    },
    restartGame() {
      this.$refs.pauseModal.close()
    },
    freshGame() {
      this.$refs.pauseModal.close()
      this.initGame()
      this.turn = new Turn()
      this.pekora.active = true
      this.baikinKun.active = false
    },
    turnProcess(word) {
      this.closeWordModal()
      this.movePlayer(word)
      if ((this.winner = this.$refs.world.judgeWinner())) {
        this.$refs.winModal.open()
        return
      }
      this.updateBaseWord(word)
      this.turn.add()
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
      return this.turn.count % 2 !== 0
    },
  },
}