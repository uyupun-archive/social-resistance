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
      countdown: 30,
      countdownTimerID: null,
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
      this.startTimer()
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
      this.$refs.world.freshWorld()
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
      this.startTimer()
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
    startTimer() {
      clearTimeout(this.countdownTimerID)
      this.countdown = 30
      setTimeout(() => {
        this.countdownTimer()
      }, 2500)
    },
    countdownTimer() {
      if (this.countdown > 0) {
        this.countdownTimerID = setTimeout(() => {
          this.countdown -= 1
          this.countdownTimer()
        }, 1000)
      } else {
        this.forceSelectWord()
      }
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
