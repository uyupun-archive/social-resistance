import Button from '~/components/button/index.vue'
import World from '~/components/world/index.vue'
import Modal from '~/components/modal/index.vue'
import Turn from '~/components/turn/index.js'
import TurnAnimation from '~/components/turn-animation/index.vue'
import Sonar from '~/components/sonar/index.vue'

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
    this.initGame()
  },
  methods: {
    initGame() {
      this.getWords()
      this.showTurnAnimation()
      this.startTurn()
    },
    getWords() {
      this.$nextTick(() => {
        this.words = this.$getWords(
          this.isPekoraTurn()
            ? this.$refs.world.getBaseWord('ぺこら')
            : this.$refs.world.getBaseWord('ばいきんくん')
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
    refreshGame() {
      this.$refs.pauseModal.close()
      this.$refs.world.refreshWorld()
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
      this.setActiveTurn()
      this.getWords()
      this.showTurnAnimation()
      this.startTurn()
    },
    movePlayer(word) {
      if (this.isPekoraTurn()) this.$refs.world.movePekora(word)
      else this.$refs.world.moveBaikinKun(word)
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
    startTurn() {
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
        this.turnProcess(this.selectedWord)
      }, 3000)
    },
  },
}
