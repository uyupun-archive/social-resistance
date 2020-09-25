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
    this.socket = io.connect(this.url)
    this.connect()
  },
  methods: {
    connect() {
      this.declareAttackListener()
      this.declareWaitListener()
      this.feedbackPositionsListener()
      this.getWordsAndBasewordListener()
      this.updateBasewordListener()
      this.getWordsListener()
      this.getTurnListener()
      this.judgeListener()
      this.invalidPlayerListener()
    },
    declareAttackListener() {
      this.socket.on('declare_attack', (payload) => {
        this.$emit('getPayload', { payload, event: 'declare_attack' })
      })
    },
    declareWaitListener() {
      this.socket.on('declare_wait', (payload) => {
        this.$emit('getPayload', { payload, event: 'declare_wait' })
      })
    },
    feedbackPositionsListener() {
      this.socket.on('feedback_positions', (payload) => {
        this.$emit('getPayload', { payload, event: 'feedback_positions' })
      })
    },
    getWordsAndBasewordListener() {
      this.socket.on('get_words_and_baseword', (payload) => {
        this.$emit('getPayload', { payload, event: 'get_words_and_baseword' })
      })
    },
    updateBasewordListener() {
      this.socket.on('update_baseword', (payload) => {
        this.$emit('getPayload', { payload, event: 'update_baseword' })
      })
    },
    getWordsListener() {
      this.socket.on('get_words', (payload) => {
        this.$emit('getPayload', { payload, event: 'get_words' })
      })
    },
    getTurnListener() {
      this.socket.on('get_turn', (payload) => {
        this.$emit('getPayload', { payload, event: 'get_turn' })
      })
    },
    judgeListener() {
      this.socket.on('judge', (payload) => {
        this.$emit('getPayload', { payload, event: 'judge' })
      })
    },
    invalidPlayerListener() {
      this.socket.on('invalid_player', (payload) => {
        this.$emit('getPayload', { payload, event: 'invalid_player' })
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
