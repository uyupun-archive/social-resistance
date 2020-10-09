import Button from '~/components/button/index.vue'
import World from '~/components/world/index.vue'
import Modal from '~/components/modal/index.vue'
import ModalWithButtons from '~/components/modal-with-buttons/index.vue'
import TurnAnimation from '~/components/turn-animation/index.vue'
import Sonar from '~/components/sonar/index.vue'
import Agent from '~/components/agent/index.vue'
import {
  PLAYER_PEKORA,
  PLAYER_PEKORA_NAME,
  PLAYER_PEKORA_ALIAS_NAME,
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
      turn: 1,
      event: '',
      warningText: '',
    }
  },
  mounted() {
    this.$refs.agent.joinWorldEmitter()
  },
  methods: {
    openWaitModal() {
      this.$refs.waitModal.open()
    },
    closeWaitModal() {
      this.$refs.waitModal.close()
    },
    openWordModal(word) {
      // TODO: ここもなんとかしたい
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
    quitGame() {
      this.$refs.agent.disconnectEmitter()
      this.$router.push('/')
    },
    showTurnAnimation() {
      this.$refs.turnAnimation.show()
    },
    proceedGame(obj) {
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
        case 'get_words_and_baseword':
          this.getWordsAndBaseword(obj.payload)
          break
        case 'update_baseword':
          this.updateBaseword(obj.payload)
          break
        case 'get_words':
          this.getWords(obj.payload)
          break
        case 'get_turn':
          this.getTurn(obj.payload)
          break
        case 'judge':
          this.judge(obj.payload)
          break
        case 'invalid_player':
          this.openWarningModal('むこうなプレイヤーです')
          break
        default:
          this.quitGame(obj.payload)
      }
    },
    feedbackPositions(payload) {
      this.spawnPlayer(payload)
      this.movePlayer(payload)
    },
    spawnPlayer(payload) {
      if (!this.$refs.world.isSpawned()) {
        if (payload.player === PLAYER_PEKORA)
          this.$refs.world.spawnPekora({ x: payload.x, y: payload.y })
        else this.$refs.world.spawnBaikinKun({ x: payload.x, y: payload.y })
      }
    },
    movePlayer(payload) {
      if (payload.player === PLAYER_PEKORA)
        this.$refs.world.movePekora({ x: payload.x, y: payload.y })
      else this.$refs.world.moveBaikinKun({ x: payload.x, y: payload.y })
    },
    getWordsAndBaseword(payload) {
      this.words = payload.words
      if (payload.player === PLAYER_PEKORA) {
        this.$refs.world.setBaseWord(PLAYER_PEKORA_NAME, payload.baseWord)
        return
      }
      this.$refs.world.setBaseWord(PLAYER_BAIKINKUN_NAME, payload.baseWord)
    },
    getWords(payload) {
      this.words = payload.words
    },
    updateBaseword(payload) {
      if (payload.player === PLAYER_PEKORA)
        this.$refs.world.setBaseWord(PLAYER_PEKORA_NAME, payload.baseWord)
      else this.$refs.world.setBaseWord(PLAYER_BAIKINKUN_NAME, payload.baseWord)
    },
    getBaseWord(player) {
      if (this.$refs.world) {
        return this.$refs.world.getBaseWord(player)
          ? this.$refs.world.getBaseWord(player).word
          : ''
      }
      return ''
    },
    movePlayerRequest(word) {
      this.$refs.agent.attackEmitter(word)
      this.closeWordModal()
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
    getTurn(payload) {
      this.turn = payload.turn
    },
    judge(payload) {
      if (payload.winner === PLAYER_PEKORA)
        this.winner = PLAYER_PEKORA_ALIAS_NAME
      else this.winner = PLAYER_BAIKINKUN_NAME
      if (!this.$refs.waitModal.showModal) {
        this.$refs.winModal.open()
      } else {
        this.closeWaitModal()
        setTimeout(() => {
          this.$refs.winModal.open()
        }, 300)
      }
    },
    openWarningModal(msg) {
      this.warningText = msg
      this.$refs.warningModal.open()
      setTimeout(() => {
        this.$router.push('/')
      }, 3000)
    },
  },
}
