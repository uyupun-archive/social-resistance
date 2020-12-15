import Button from '~/components/button/index.vue'
import World from '~/components/world/index.vue'
import Modal from '~/components/modal/index.vue'
import ModalWithButtons from '~/components/modal-with-buttons/index.vue'
import TurnAnimation from '~/components/turn-animation/index.vue'
import Sonar from '~/components/sonar/index.vue'
import Dealer from '~/objects/dealer/script.js'
import {
  PLAYER_PEKORA,
  PLAYER_BAIKINKUN,
  PLAYER_PEKORA_NAME,
  PLAYER_BAIKINKUN_NAME,
} from '~/objects/constants/script.js'

export default {
  middleware: ['redirectToTop', 'detectBrowserBack'],
  components: {
    Button,
    World,
    Modal,
    ModalWithButtons,
    TurnAnimation,
    Sonar,
  },
  layout: 'default',
  data() {
    return {
      dealer: new Dealer(
        this.$store.state.world.id,
        this.$store.state.world.role,
        this.$store.state.world.token
      ),
      isStart: false,
      turn: 1,
      words: null,
      selectedWord: null,
      winner: '',
      warningMsg: '',
      second: 30,
    }
  },
  mounted() {
    this.dealer.joinWorldEmitter()
    this.proceedGame()
    this.$store.commit('dealer/update', {
      openModal: this.$refs.confirmModal.open.bind(this.$refs.confirmModal),
    })
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
    openWarningModal(msg) {
      this.warningMsg = msg
      this.$refs.warningModal.open()
    },
    restartGame() {
      this.$refs.pauseModal.close()
    },
    quitGame() {
      this.dealer.disconnect()
      this.resetStore()
      this.$router.push('/')
    },
    showTurnAnimation() {
      this.$refs.turnAnimation.show()
    },
    closeConfirmModal() {
      this.$refs.confirmModal.close()
    },
    resetStore() {
      this.$store.commit('world/reset')
      this.$store.commit('dealer/reset')
    },
    proceedGame() {
      this.dealer.feedbackPositionListener((payload) => {
        this.feedbackPosition(payload)
      })

      this.dealer.getWordsAndBaseWordListener((payload) => {
        this.getWordsAndBaseWord(payload)
      })

      this.dealer.getWordsListener((payload) => {
        this.getWords(payload)
      })

      this.dealer.updateBaseWordListener((payload) => {
        this.updateBaseword(payload)
      })

      this.dealer.getTurnListener((payload) => {
        this.getTurn(payload)
      })

      this.dealer.getCountdownListener((payload) => {
        this.getCountdown(payload)
      })

      this.dealer.declareAttackListener(() => {
        this.declareAttack()
      })

      this.dealer.declareWaitListener(() => {
        this.declareWait()
      })

      this.dealer.noticeTurnTimeoutListener((payload) => {
        this.noticeTurnTimeout(payload)
      })

      this.dealer.judgeListener((payload) => {
        this.judge(payload)
      })

      this.dealer.invalidPlayerListener(() => {
        this.invalidPlayer()
      })

      this.dealer.noticeDisconnectListener(() => {
        this.noticeDisconnect()
      })
    },
    feedbackPosition(payload) {
      this.movePlayer(payload)
      this.spawnPlayer(payload)
    },
    spawnPlayer(payload) {
      if (!this.$refs.world.isSpawned()) {
        if (payload.role === PLAYER_PEKORA)
          this.$refs.world.spawnPekora({ x: payload.x, y: payload.y })
        else this.$refs.world.spawnBaikinKun({ x: payload.x, y: payload.y })
        this.isStart = true
      }
    },
    movePlayer(payload) {
      if (this.$refs.world.isSpawned()) {
        if (payload.role === PLAYER_PEKORA)
          this.$refs.world.movePekora({ x: payload.x, y: payload.y })
        else this.$refs.world.moveBaikinKun({ x: payload.x, y: payload.y })
      }
    },
    getTurn(payload) {
      this.turn = payload.turn
    },
    getCountdown(payload) {
      this.second = payload.second
    },
    getWordsAndBaseWord(payload) {
      this.words = payload.words
      if (payload.role === PLAYER_PEKORA) {
        this.$refs.world.setBaseWord(PLAYER_PEKORA, payload.baseWord)
        return
      }
      this.$refs.world.setBaseWord(PLAYER_BAIKINKUN, payload.baseWord)
    },
    getWords(payload) {
      this.words = payload.words
    },
    updateBaseword(payload) {
      if (payload.role === PLAYER_PEKORA)
        this.$refs.world.setBaseWord(PLAYER_PEKORA, payload.baseWord)
      else this.$refs.world.setBaseWord(PLAYER_BAIKINKUN, payload.baseWord)
    },
    showBaseWord(role) {
      if (this.$refs.world) {
        return this.$refs.world.getBaseWord(role)
          ? this.$refs.world.getBaseWord(role).word
          : ''
      }
      return ''
    },
    movePlayerRequest(word) {
      this.second = 30
      this.dealer.attackEmitter(word)
      this.closeWordModal()
    },
    declareAttack() {
      this.closeWaitModal()
      if (this.turn === 1) {
        this.showTurnAnimation()
        return
      }
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
      if (payload.winner === PLAYER_PEKORA) this.winner = PLAYER_PEKORA_NAME
      else this.winner = PLAYER_BAIKINKUN_NAME
      this.closeWaitModal()
      this.resetStore()
      setTimeout(() => {
        this.$refs.winModal.open()
      }, 300)
    },
    invalidPlayer() {
      this.resetStore()
      this.openWarningModal('むこうなプレイヤーです')
    },
    noticeTurnTimeout(payload) {
      this.selectedWord = payload.word
      this.$refs.forceSelectWordModal.open()
      setTimeout(() => {
        this.second = 30
        this.dealer.attackEmitter(payload.word)
        this.$refs.forceSelectWordModal.close()
      }, 3000)
    },
    noticeDisconnect() {
      this.closeWaitModal()
      this.resetStore()
      if (!this.winner) {
        this.$refs.disconnectModal.open()
      }
    },
  },
}
