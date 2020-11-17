import io from 'socket.io-client'

export default {
  data() {
    return {
      worldId: sessionStorage.worldId,
      token: sessionStorage.token,
      role: parseInt(sessionStorage.role, 10),
      url: process.env.API_URL,
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
      this.feedbackPositionListener()
      this.getTurnListener()
      this.declareAttackListener()
      this.declareWaitListener()
      this.getWordsAndBaseWordListener()
      this.getWordsListener()
      this.updateBaseWordListener()
      this.judgeListener()
      this.invalidPlayerListener()
    },
    feedbackPositionListener() {
      this.socket.on('feedback_position', (payload) => {
        this.$emit('proceedGame', { payload, event: 'feedback_position' })
      })
    },
    getTurnListener() {
      this.socket.on('get_turn', (payload) => {
        this.$emit('proceedGame', { payload, event: 'get_turn' })
      })
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
    getWordsAndBaseWordListener() {
      this.socket.on('get_words_and_baseword', (payload) => {
        this.$emit('proceedGame', { payload, event: 'get_words_and_baseword' })
      })
    },
    getWordsListener() {
      this.socket.on('get_words', (payload) => {
        this.$emit('proceedGame', { payload, event: 'get_words' })
      })
    },
    updateBaseWordListener() {
      this.socket.on('update_baseword', (payload) => {
        this.$emit('proceedGame', { payload, event: 'update_baseword' })
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
    leaveWorldEmitter() {
      this.socket.emit('leave_world', {
        worldId: this.worldId,
        token: this.token,
        role: this.role,
      })
    },
  },
}
