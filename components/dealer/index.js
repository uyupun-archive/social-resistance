import io from 'socket.io-client'

export default {
  data() {
    return {
      worldId: sessionStorage.worldId,
      token: sessionStorage.token,
      role: parseInt(sessionStorage.role, 10),
      url: process.env.MITSU_URL,
      socket: null,
    }
  },
  mounted() {
    this.connect()
  },
  methods: {
    connect() {
      this.socket = io.connect(this.url)
      this.startListener()
    },
    startListener() {
      this.declareAttackListener()
      this.declareWaitListener()
      this.feedbackPositionListener()
      this.getWordsAndBasewordListener()
      this.updateBasewordListener()
      this.getWordsListener()
      this.getTurnListener()
      this.judgeListener()
      this.invalidPlayerListener()
    },
    declareAttackListener() {
      this.socket.on('declare_attack', (payload) => {
        this.$emit('proceedGame', { payload, event: 'declare_attack' })
      })
    },
    declareWaitListener() {
      this.socket.on('declare_wait', (payload) => {
        this.$emit('proceedGame', { payload, event: 'declare_wait' })
      })
    },
    feedbackPositionListener() {
      this.socket.on('feedback_position', (payload) => {
        this.$emit('proceedGame', { payload, event: 'feedback_position' })
      })
    },
    getWordsAndBasewordListener() {
      this.socket.on('get_words_and_baseword', (payload) => {
        this.$emit('proceedGame', { payload, event: 'get_words_and_baseword' })
      })
    },
    updateBasewordListener() {
      this.socket.on('update_baseword', (payload) => {
        this.$emit('proceedGame', { payload, event: 'update_baseword' })
      })
    },
    getWordsListener() {
      this.socket.on('get_words', (payload) => {
        this.$emit('proceedGame', { payload, event: 'get_words' })
      })
    },
    getTurnListener() {
      this.socket.on('get_turn', (payload) => {
        this.$emit('proceedGame', { payload, event: 'get_turn' })
      })
    },
    judgeListener() {
      this.socket.on('judge', (payload) => {
        this.$emit('proceedGame', { payload, event: 'judge' })
      })
    },
    invalidPlayerListener() {
      this.socket.on('invalid_player', (payload) => {
        this.$emit('proceedGame', { payload, event: 'invalid_player' })
      })
    },
    joinWorldEmitter() {
      this.socket.emit('join_world', {
        worldId: this.worldId,
        token: this.token,
        role: this.role,
      })
    },
    attackEmitter(word) {
      this.socket.emit('attack', {
        worldId: this.worldId,
        token: this.token,
        role: this.role,
        baseWord: word,
      })
    },
    disconnectEmitter() {
      this.socket.emit('disconnect_world', {
        worldId: this.worldId,
        token: this.token,
        role: this.role,
      })
    },
  },
}
