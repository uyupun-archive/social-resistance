import Button from '~/components/button/index.vue'
import World from '~/components/world/index.vue'
import Modal from '~/components/modal/index.vue'
import ModalWithButtons from '~/components/modal-with-buttons/index.vue'
import TurnAnimation from '~/components/turn-animation/index.vue'
import Sonar from '~/components/sonar/index.vue'
import Dealer from '~/components/dealer/index.vue'
import {
  PLAYER_PEKORA,
  PLAYER_BAIKINKUN,
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
    Dealer,
  },
  data() {
    return {
      isStart: false,
      turn: 1,
      words: null,
      selectedWord: null,
      winner: '',
      warningMsg: '',
    }
  },
  mounted() {
    this.$refs.dealer.joinWorldEmitter()
  },
  methods: {
    openWaitModal() {
      this.$refs.waitModal.open()
    },
    closeWaitModal() {
      this.$refs.waitModal.close()
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
    quitGame() {
      this.$refs.dealer.disconnectEmitter()
      this.$router.push('/')
    },
    showTurnAnimation() {
      this.$refs.turnAnimation.show()
    },
    proceedGame(obj) {
      switch (obj.event) {
        case 'feedback_position':
          this.feedbackPosition(obj.payload)
          break
        case 'get_turn':
          this.getTurn(obj.payload)
          break
        case 'get_words_and_baseword':
          this.getWordsAndBaseWord(obj.payload)
          break
        case 'get_words':
          this.getWords(obj.payload)
          break
        case 'update_baseword':
          this.updateBaseword(obj.payload)
          break
        case 'declare_attack':
          this.declareAttack()
          break
        case 'declare_wait':
          this.declareWait()
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
    feedbackPosition(payload) {
      this.movePlayer(payload)
      this.spawnPlayer(payload)
    },
    spawnPlayer(payload) {
      if (!this.$refs.world.isSpawned()) {
        if (payload.player === PLAYER_PEKORA)
          this.$refs.world.spawnPekora({ x: payload.x, y: payload.y })
        else this.$refs.world.spawnBaikinKun({ x: payload.x, y: payload.y })
        this.isStart = true
      }
    },
    movePlayer(payload) {
      if (this.$refs.world.isSpawned()) {
        if (payload.player === PLAYER_PEKORA)
          this.$refs.world.movePekora({ x: payload.x, y: payload.y })
        else this.$refs.world.moveBaikinKun({ x: payload.x, y: payload.y })
      }
    },
    getTurn(payload) {
      this.turn = payload.turn
    },
    getWordsAndBaseWord(payload) {
      this.words = payload.words
      if (payload.player === PLAYER_PEKORA) {
        this.$refs.world.setBaseWord(PLAYER_PEKORA, payload.baseWord)
        return
      }
      this.$refs.world.setBaseWord(PLAYER_BAIKINKUN, payload.baseWord)
    },
    getWords(payload) {
      this.words = payload.words
    },
    updateBaseword(payload) {
      if (payload.player === PLAYER_PEKORA)
        this.$refs.world.setBaseWord(PLAYER_PEKORA, payload.baseWord)
      else this.$refs.world.setBaseWord(PLAYER_BAIKINKUN, payload.baseWord)
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
      this.$refs.dealer.attackEmitter(word)
      this.closeWordModal()
    },
    declareAttack() {
      this.closeWaitModal()
      setTimeout(() => {
        this.showTurnAnimation()
      }, 300)
    },
    declareWait() {
      this.showTurnAnimation()
      setTimeout(() => {
        this.openWaitModal()
      }, 2500)
    },
    judge(payload) {
      if (payload.winner === PLAYER_PEKORA)
        this.winner = PLAYER_PEKORA_ALIAS_NAME
      else this.winner = PLAYER_BAIKINKUN_NAME
      this.closeWaitModal()
      setTimeout(() => {
        this.$refs.winModal.open()
      }, 300)
    },
    openWarningModal(msg) {
      this.warningMsg = msg
      this.$refs.warningModal.open()
      setTimeout(() => {
        this.$router.push('/')
      }, 3000)
    },
  },
}
