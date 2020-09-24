import Button from '~/components/button/index.vue'
import World from '~/components/world/index.vue'
import Modal from '~/components/modal/index.vue'
import ModalWithButtons from '~/components/modal-with-buttons/index.vue'
import Turn from '~/components/turn/index.js'
import TurnAnimation from '~/components/turn-animation/index.vue'
import Sonar from '~/components/sonar/index.vue'
import {
  PLAYER_PEKORA_NAME,
  PLAYER_BAIKINKUN_NAME,
} from '~/components/constants/index.js'
import Agent from '~/components/agent/index.vue'

export default {
  middleware: 'redirectToTop',
  components: {
    Button,
    World,
    Modal,
    ModalWithButtons,
    TurnAnimation,
    Sonar,
    Agent,
  },
  data() {
    return {
      words: null,
      selectedWord: '',
      winner: '',
      turn: new Turn(),
      event: 'wait_player',
    }
  },
  mounted() {
    this.stepFirstTurn()
    this.$refs.agent.joinWorldEmitter()
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
      this.getWords()
      this.showTurnAnimation()
      this.proceedTurn()
    },
    movePlayer(word) {
      if (this.turn.active.pekora) this.$refs.world.movePekora(word)
      else this.$refs.world.moveBaikinKun(word)
    },
    getWords() {
      this.words = this.$getWords(
        this.turn.active.pekora
          ? this.getBaseWord(PLAYER_PEKORA_NAME)
          : this.getBaseWord(PLAYER_BAIKINKUN_NAME)
      )
    },
    showTurnAnimation() {
      this.$refs.turnAnimation.show()
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
    getBaseWord(player) {
      if (this.$refs.world) return this.$refs.world.getBaseWord(player)
      return ''
    },
    getPayload(obj) {
      this.event = obj.event
    },
  },
}
