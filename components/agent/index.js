import io from 'socket.io-client'

export default {
  data() {
    return {
      worldId: sessionStorage.worldId,
      token: sessionStorage.token,
      role: sessionStorage.role,
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
      this.feedbackListener()
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
    feedbackListener() {
      this.socket.on('feedback', (payload) => {
        this.$emit('getPayload', { payload, event: 'feedback' })
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
      this.socket.emit('attack', { word })
    },
    disconnectEmitter() {
      this.socket.disconnect()
    },
  },
}
