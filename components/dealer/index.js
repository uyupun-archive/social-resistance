import io from 'socket.io-client'

export default class Dealer {
  constructor() {
    this.worldId = sessionStorage.worldId
    this.token = sessionStorage.token
    this.role = Number(sessionStorage.role)
    this.url = process.env.API_URL
    this.socket = null

    this.connect()
  }

  connect() {
    this.socket = io.connect(this.url)
  }

  feedbackPositionListener(callback) {
    this.socket.on('feedback_position', (payload) => {
      callback(payload)
    })
  }

  getWordsAndBaseWordListener(callback) {
    this.socket.on('get_words_and_baseword', (payload) => {
      callback(payload)
    })
  }

  getWordsListener(callback) {
    this.socket.on('get_words', (payload) => {
      callback(payload)
    })
  }

  updateBaseWordListener(callback) {
    this.socket.on('update_baseword', (payload) => {
      callback(payload)
    })
  }

  getTurnListener(callback) {
    this.socket.on('get_turn', (payload) => {
      callback(payload)
    })
  }

  getCountdownListener(callback) {
    this.socket.on('get_countdown', (payload) => {
      callback(payload)
    })
  }

  declareAttackListener(callback) {
    this.socket.on('declare_attack', (payload) => {
      callback()
    })
  }

  declareWaitListener(callback) {
    this.socket.on('declare_wait', (payload) => {
      callback()
    })
  }

  noticeTurnTimeoutListener(callback) {
    this.socket.on('notice_turn_timeout', (payload) => {
      callback(payload)
    })
  }

  judgeListener(callback) {
    this.socket.on('judge', (payload) => {
      callback(payload)
    })
  }

  invalidPlayerListener(callback) {
    this.socket.on('invalid_player', (payload) => {
      callback()
    })
  }

  noticeDisconnectListener(callback) {
    this.socket.on('notice_disconnect', (payload) => {
      callback()
    })
  }

  joinWorldEmitter() {
    this.socket.emit('join_world', {
      worldId: this.worldId,
      token: this.token,
      role: this.role,
    })
  }

  attackEmitter(word) {
    this.socket.emit('attack', {
      worldId: this.worldId,
      token: this.token,
      role: this.role,
      baseWord: word,
    })
  }

  leaveWorldEmitter() {
    this.socket.emit('leave_world', {
      worldId: this.worldId,
      token: this.token,
      role: this.role,
    })
    this.socket.disconnect()
  }
}
