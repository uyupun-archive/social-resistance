import io from 'socket.io-client'
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

export default {
  middleware: 'redirectToTop',
  components: {
    Button,
    World,
    Modal,
    ModalWithButtons,
    TurnAnimation,
    Sonar,
  },
  data() {
    return {
      words: null,
      selectedWord: '',
      winner: '',
      turn: new Turn(),
      socket: null,
    }
  },
  mounted() {
    this.stepFirstTurn()

    this.socket = io.connect(process.env.MITSU_URL)
    this.socket.emit('join_world', {
      worldId: sessionStorage.worldId,
      token: sessionStorage.token,
    })
    this.socket.on('declare_attack', (payload) => {
      console.log('declare_attack', payload)
    })
    this.socket.on('declare_wait', (payload) => {
      console.log('declare_wait', payload)
    })
    this.socket.on('feedback', (payload) => {
      console.log('feedback', payload)
    })
    this.socket.on('invalid_player', (payload) => {
      console.log('invalid_player', payload)
    })
    this.socket.on('disconnect', (payload) => {
      console.log(payload)
    })
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

      this.socket.emit('attack', { word: 'A' })
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
  },
}
