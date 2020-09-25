import Button from '~/components/button/index.vue'
import World from '~/components/world/index.vue'
import Modal from '~/components/modal/index.vue'
import ModalWithButtons from '~/components/modal-with-buttons/index.vue'
import TurnAnimation from '~/components/turn-animation/index.vue'
import Sonar from '~/components/sonar/index.vue'
import Agent from '~/components/agent/index.vue'
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
    ModalWithButtons,
    TurnAnimation,
    Sonar,
    Agent,
  },
  data() {
    return {
      words: null,
      selectedWord: null,
      winner: '',
      turn: 0,
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
    attack(word) {
      this.closeWordModal()
      this.$refs.agent.attackEmitter(word)
    },
    movePlayer(word) {
      if (this.turn.active.pekora) this.$refs.world.movePekora(word)
      else this.$refs.world.moveBaikinKun(word)
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
        this.attack(this.selectedWord)
      }, 3000)
    },
    getBaseWord(player) {
      if (this.$refs.world) {
        return this.$refs.world.getBaseWord(player)
          ? this.$refs.world.getBaseWord(player).word
          : ''
      }
      return ''
    },
    getPayload(obj) {
      this.event = obj.event
      switch (obj.event) {
        case 'declare_attack':
          this.declareAttack()
          break
        case 'declare_wait':
          this.declareWait()
          break
        case 'feedback_positions':
          this.feedbackPositions(obj.payload)
          break
        case 'game_resources':
          this.gameResources(obj.payload)
          break
        case 'invalid_player':
          this.invalidPlayer()
          break
        default:
          this.disconnect(obj.payload)
      }
    },
    declareAttack() {
      if (!this.$refs.waitModal.showModal) {
        this.showTurnAnimation()
      } else {
        this.closeWaitModal()
        setTimeout(() => {
          this.showTurnAnimation()
        }, 300)
      }
    },
    declareWait() {
      this.showTurnAnimation()
      setTimeout(() => {
        this.openWaitModal()
      }, 2500)
    },
    feedbackPositions(payload) {
      if (payload.player === 1) {
        this.$refs.world.setPosition(PLAYER_PEKORA_NAME, payload.x, payload.y)
      } else {
        this.$refs.world.setPosition(
          PLAYER_BAIKINKUN_NAME,
          payload.x,
          payload.y
        )
      }
    },
    gameResources(payload) {
      this.words = payload.words
      this.turn = payload.turn
      if (!this.$refs.world.pekora && !this.$refs.world.baikinKun) {
        this.$refs.world.createPekora(payload.baseWord)
        this.$refs.world.createBaikinKun(null)
        return
      }
      if (payload.player === 1) {
        this.$refs.world.movePekora(payload.baseWord)
      } else {
        this.$refs.world.moveBaikinKun(payload.baseWord)
      }
    },
    invalidPlayer() {
      this.$refs.invalidPlayerModal.open()
      setTimeout(() => {
        this.$router.push('/')
      }, 3000)
    },
    disconnect() {
      this.$refs.agent.disconnectEmitter()
      this.$router.push('/')
    },
  },
}
