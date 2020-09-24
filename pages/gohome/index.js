import Button from '~/components/button/index.vue'
import World from '~/components/world/index.vue'
import Modal from '~/components/modal/index.vue'
import ModalWithButtons from '~/components/modal-with-buttons/index.vue'
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
      baseWord: {
        pekora: '',
        baikinKun: '',
      },
      words: null,
      selectedWord: null,
      winner: '',
      turn: 1,
      event: '',
    }
  },
  mounted() {
    this.$refs.agent.joinWorldEmitter()
  },
  methods: {
    openWordModal(word) {
      if (this.event !== 'declare_attack') return
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
    stepFirstTurn() {
      this.getWords()
      this.showTurnAnimation()
      this.proceedTurn()
    },
    stepAfterSecondTurn(word) {
      this.closeWordModal()
      // this.movePlayer(word)
      // if ((this.winner = this.$refs.world.judgeWinner())) {
      //   this.$refs.winModal.open()
      //   return
      // }
      // this.getWords()
      // this.showTurnAnimation()
      // this.proceedTurn()

      this.$refs.agent.attackEmitter(word)
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
    openWaitModal() {
      this.$refs.waitModal.open()
    },
    closeWaitModal() {
      this.$refs.waitModal.close()
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
      return player === 1
        ? this.baseWord.pekora.word
        : this.baseWord.baikinKun.word
    },
    getPayload(obj) {
      console.log(obj)
      this.event = obj.event
      switch (obj.event) {
        case 'declare_attack':
          this.declareAttack(obj.payload)
          break
        case 'declare_wait':
          this.declareWait(obj.payload)
          break
        case 'feedback':
          this.feedback(obj.payload)
          break
        case 'invalid_player':
          this.invalidPlayer(obj.payload)
          break
        default:
          this.disconnect(obj.payload)
      }
    },
    declareAttack(payload) {
      this.words = payload.words
      if (payload.turn % 2 === 1) this.baseWord.pekora = payload.baseWord
      else this.baseWord.baikinKun = payload.baseWord
      this.turn = payload.turn
      if (!this.event) {
        this.showTurnAnimation()
      } else {
        this.closeWaitModal()
        setTimeout(() => {
          this.showTurnAnimation()
        }, 300)
      }
    },
    declareWait(payload) {
      this.words = payload.words
      if (payload.turn % 2 === 1) this.baseWord.pekora = payload.baseWord
      else this.baseWord.baikinKun = payload.baseWord
      this.turn = payload.turn
      this.showTurnAnimation()
      setTimeout(() => {
        this.openWaitModal()
      }, 2500)
    },
    feedback() {},
    invalidPlayer() {},
    disconnect() {
      this.$refs.agent.disconnectEmitter()
      this.$router.push('/')
    },
  },
}
